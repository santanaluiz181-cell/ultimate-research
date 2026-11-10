import { describe, expect, it } from "vitest";
import {
  CitationVerifier,
  DefaultSourceCheckAdapter,
  EvidenceParser,
  formatCertificateTerminal,
  SemanticEntailmentEngine,
  validateCnjNumber,
  validateIsbn
} from "../src/verifier.js";
import type { SourceCheckAdapter } from "../src/types.js";

describe("ARS Epistemic Citation Verifier", () => {
  describe("1. CNJ Checksum Validation (Resolução CNJ nº 65/2008 - Módulo 97)", () => {
    it("should accurately validate genuine CNJ process numbers", () => {
      // Calculate a valid CNJ for TJTO:
      // N=0001234, A=2023, J=8, TR=27, O=2729
      const baseStr = "00012342023827272900";
      const remainder = Number(BigInt(baseStr) % 97n);
      const dv = String(98 - remainder).padStart(2, "0");
      const validCnj = `0001234-${dv}.2023.8.27.2729`;

      const result = validateCnjNumber(validCnj);
      expect(result.valid).toBe(true);
      expect(result.dvProvided).toBe(dv);
      expect(result.dvCalculated).toBe(dv);
      expect(result.tribunalName).toContain("TJTO");
      expect(result.justiceSegmentName).toContain("Justiça dos Estados");
    });

    it("should detect hallucinated/fabricated CNJ numbers with invalid checksum", () => {
      // 0000000-00.0000.8.27.0000 is mathematically invalid (remainder 0 -> DV 98 != 00)
      const fakeCnj = "0000000-00.0000.8.27.0000";
      const result = validateCnjNumber(fakeCnj);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("Dígito verificador inválido");
    });

    it("should reject malformed CNJ strings", () => {
      const malformed = "1234-56.2023";
      const result = validateCnjNumber(malformed);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("Tamanho inválido");
    });
  });

  describe("2. ISBN Checksum Validation", () => {
    it("should validate valid ISBN-10 and ISBN-13", () => {
      // Valid ISBN-13: 978-0-306-40615-7
      const isbn13 = validateIsbn("978-0-306-40615-7");
      expect(isbn13.valid).toBe(true);
      expect(isbn13.format).toBe("ISBN-13");

      // Valid ISBN-10: 0-306-40615-2
      const isbn10 = validateIsbn("0-306-40615-2");
      expect(isbn10.valid).toBe(true);
      expect(isbn10.format).toBe("ISBN-10");
    });

    it("should reject corrupted/hallucinated ISBNs", () => {
      const invalidIsbn = validateIsbn("978-0-306-40615-9");
      expect(invalidIsbn.valid).toBe(false);
      expect(invalidIsbn.reason).toContain("Dígito verificador");
    });
  });

  describe("3. Evidence Parser", () => {
    it("should parse academic DOIs, ISBNs and author-year citations", () => {
      const sampleText = `
No trabalho pioneiro de Vasconcelos et al. (2023), foi demonstrado o impacto da IA.
Para mais detalhes, consulte o artigo oficial em https://doi.org/10.1016/j.compind.2023.103980.
A obra de referência catalogada sob ISBN 978-0-306-40615-7 corrobora a tese.
      `.trim();

      const items = EvidenceParser.parse(sampleText);
      expect(items.length).toBe(3);

      const doiItem = items.find((it) => it.type === "academic_doi");
      expect(doiItem).toBeDefined();
      expect(doiItem?.identifier).toBe("10.1016/j.compind.2023.103980");
      expect(doiItem?.claimText).toContain("artigo oficial");

      const isbnItem = items.find((it) => it.type === "academic_isbn");
      expect(isbnItem).toBeDefined();
      expect(isbnItem?.identifier).toBe("9780306406157");

      const citItem = items.find((it) => it.type === "academic_citation");
      expect(citItem).toBeDefined();
      expect(citItem?.identifier).toBe("Vasconcelos et al. (2023)");
    });

    it("should parse judicial CNJ numbers, statutes and precedents", () => {
      const sampleLegalText = `
Conforme assentado no art. 300 do CPC e reiterado no art. 5º da CF/88, a tutela de urgência é cabível.
Tal entendimento converge com a Súmula Vinculante 13 do STF e com o Tema 988 do STJ.
No âmbito do TJTO, o processo nº 0001234-90.2023.8.27.2729 deferiu a medida liminar requerida.
      `.trim();

      const items = EvidenceParser.parse(sampleLegalText);
      const cnjItem = items.find((it) => it.type === "judicial_cnj");
      expect(cnjItem).toBeDefined();
      expect(cnjItem?.identifier).toBe("0001234-90.2023.8.27.2729");

      const statuteItems = items.filter((it) => it.type === "judicial_statute");
      expect(statuteItems.length).toBeGreaterThanOrEqual(2);

      const precedentItems = items.filter((it) => it.type === "judicial_precedent");
      expect(precedentItems.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("4. Semantic Entailment & Polarity Incongruence", () => {
    it("should detect [DIVERGÊNCIA DE TESE] when text asserts positive outcome but court denied it", () => {
      const claim = "O tribunal concedeu e deferiu a liminar para assegurar o tratamento de saúde.";
      const officialData = {
        exists: true,
        title: "Agravo de Instrumento - TJTO",
        summary: "A câmara negou e indeferiu a liminar ante a ausência de verossimilhança da alegação."
      };
      const evidence = {
        id: "EVD-001",
        type: "judicial_cnj" as const,
        rawMatch: "0001234-90.2023.8.27.2729",
        identifier: "0001234-90.2023.8.27.2729",
        claimText: claim
      };

      const result = SemanticEntailmentEngine.evaluate(claim, officialData, evidence);
      expect(result.verdict).toBe("DIVERGÊNCIA DE TESE");
      expect(result.divergenceReason).toContain("Inversão de tese jurídica");
    });

    it("should detect [ALUCINAÇÃO DETECTADA] when official source does not exist", () => {
      const claim = "Conforme demonstrado no artigo com DOI forjado 10.9999/fake.paper.2026.";
      const officialData = {
        exists: false,
        error: "DOI não localizado nas bases oficiais"
      };
      const evidence = {
        id: "EVD-002",
        type: "academic_doi" as const,
        rawMatch: "10.9999/fake.paper.2026",
        identifier: "10.9999/fake.paper.2026",
        claimText: claim
      };

      const result = SemanticEntailmentEngine.evaluate(claim, officialData, evidence);
      expect(result.verdict).toBe("ALUCINAÇÃO DETECTADA");
      expect(result.score).toBe(0);
    });

    it("should award [VERIFICADA] when source exists and thesis is compatible", () => {
      const claim = "O art. 300 do CPC disciplina os requisitos gerais para concessão da tutela provisória.";
      const officialData = {
        exists: true,
        title: "Código de Processo Civil (Lei 13.105/2015)",
        summary: "A tutela de urgência será concedida quando houver elementos que evidenciem a probabilidade do direito e o perigo de dano."
      };
      const evidence = {
        id: "EVD-003",
        type: "judicial_statute" as const,
        rawMatch: "art. 300 do CPC",
        identifier: "art. 300 do CPC",
        claimText: claim
      };

      const result = SemanticEntailmentEngine.evaluate(claim, officialData, evidence);
      expect(result.verdict).toBe("VERIFICADA");
      expect(result.score).toBeGreaterThan(0.8);
    });
  });

  describe("5. End-to-End Epistemic Citation Verifier with Mock Adapter", () => {
    const mockAdapter: SourceCheckAdapter = {
      async checkDoi(doi: string) {
        if (doi === "10.1016/j.compind.2023.103980") {
          return {
            exists: true,
            source: "CrossRef",
            title: "Artificial Intelligence in Industrial Engineering",
            authors: ["Vasconcelos, Paulo", "Silva, Marcos"],
            year: "2023",
            abstract: "This study evaluates the positive operational impact of automated systems."
          };
        }
        if (doi === "10.1000/hallucinated.doi.12345") {
          return {
            exists: false,
            source: "CrossRef",
            error: "DOI inexistente nas bases CrossRef e OpenAlex"
          };
        }
        return { exists: false, source: "CrossRef" };
      },

      async checkCnj(cnj: string) {
        const val = validateCnjNumber(cnj);
        if (!val.valid) {
          return {
            exists: false,
            validFormat: val.cleanDigits.length === 20,
            validChecksum: false,
            source: "CNJ Módulo 97",
            error: val.reason
          };
        }
        return {
          exists: true,
          validFormat: true,
          validChecksum: true,
          tribunal: val.tribunalName,
          source: "DJEN/ComunicaAPI",
          title: `Processo nº ${cnj}`,
          summary: "Decisão proferida no âmbito do Tribunal de Justiça do Estado do Tocantins."
        };
      },

      async checkStatute(statuteQuery: string) {
        if (statuteQuery.toLowerCase().includes("cpc")) {
          return {
            exists: true,
            source: "LexML Brasil / Lei 13.105/2015",
            title: "Código de Processo Civil",
            summary: "Disciplina a tutela provisória e o sistema processual civil."
          };
        }
        return { exists: false, source: "LexML Brasil", error: "Norma não localizada" };
      }
    };

    it("should issue an Approved Compliance Certificate for a clean document", async () => {
      const cleanMarkdown = `
# Relatório de Pesquisa Jurídica e Acadêmica

Segundo demonstrado por Vasconcelos et al. (2023) no artigo com DOI 10.1016/j.compind.2023.103980,
a automação traz melhorias substanciais.
No direito processual, o art. 300 do CPC ampara a tutela de urgência.
      `.trim();

      const verifier = new CitationVerifier({ adapter: mockAdapter });
      const cert = await verifier.verifyText(cleanMarkdown, "doc_clean.md");

      expect(cert.approved).toBe(true);
      expect(cert.summary.hallucinationCount).toBe(0);
      expect(cert.summary.verifiedCount).toBeGreaterThanOrEqual(2);
      expect(cert.formattedMarkdown).toContain("✅ APROVADA (CONFORME)");
      expect(cert.formattedMarkdown).toContain("CERTIDÃO DE CONFORMIDADE DE FONTES");

      const terminalText = formatCertificateTerminal(cert);
      expect(terminalText).toContain("[APROVADA - FONTES CONFORMES]");
      expect(terminalText).toContain("[VERIFICADA]");
    });

    it("should flag [ALUCINAÇÃO DETECTADA] when fake DOI or fake CNJ is present", async () => {
      const hallucinatedMarkdown = `
# Artigo com Citações Forjadas

A inteligência artificial forjou o paper 10.1000/hallucinated.doi.12345.
Além disso, forjou o processo judicial 0000000-00.0000.8.27.0000 do TJTO.
      `.trim();

      const verifier = new CitationVerifier({ adapter: mockAdapter });
      const cert = await verifier.verifyText(hallucinatedMarkdown, "doc_fake.md");

      expect(cert.approved).toBe(false);
      expect(cert.summary.hallucinationCount).toBe(2);
      expect(cert.formattedMarkdown).toContain("❌ REPROVADA");
      expect(cert.formattedMarkdown).toContain("🚨 `[ALUCINAÇÃO DETECTADA]`");

      const terminalText = formatCertificateTerminal(cert);
      expect(terminalText).toContain("[REPROVADA - RISCO DETECTADO]");
      expect(terminalText).toContain("[ALUCINAÇÃO DETECTADA]");
    });

    it("should fail under --strict mode when divergence of thesis is detected", async () => {
      const divergentAdapter: SourceCheckAdapter = {
        ...mockAdapter,
        async checkDoi(doi: string) {
          return {
            exists: true,
            source: "CrossRef",
            title: "Study on Model Efficiency",
            authors: ["Vasconcelos, P."],
            year: "2023",
            abstract: "The experiment showed a drastic decrease, reduction and overall failure in productivity."
          };
        }
      };

      const divergentText = `
O autor demonstrou um aumento e melhoria consistente na eficácia (DOI: 10.1016/j.compind.2023.103980).
      `.trim();

      // Normal mode: approved because source exists (hallucinationCount = 0)
      const normalVerifier = new CitationVerifier({ adapter: divergentAdapter, strict: false });
      const certNormal = await normalVerifier.verifyText(divergentText);
      expect(certNormal.summary.divergenceCount).toBe(1);
      expect(certNormal.approved).toBe(true);

      // Strict mode: rejected because divergenceCount > 0
      const strictVerifier = new CitationVerifier({ adapter: divergentAdapter, strict: true });
      const certStrict = await strictVerifier.verifyText(divergentText);
      expect(certStrict.summary.divergenceCount).toBe(1);
      expect(certStrict.approved).toBe(false);
    });
  });

  describe("6. Default Live Adapter Resilience", () => {
    it("should handle invalid statutes gracefully without throwing uncaught exceptions", async () => {
      const adapter = new DefaultSourceCheckAdapter(1500);
      const res = await adapter.checkStatute("Lei 99999999/9999", "judicial_statute");
      expect(res).toBeDefined();
    });

    it("should validate known statutes directly through built-in canonical index", async () => {
      const adapter = new DefaultSourceCheckAdapter(1500);
      const cfRes = await adapter.checkStatute("art. 5º da CF/88", "judicial_statute");
      expect(cfRes.exists).toBe(true);
      expect(cfRes.title).toContain("Constituição");

      const cpcRes = await adapter.checkStatute("art. 300 do CPC", "judicial_statute");
      expect(cpcRes.exists).toBe(true);
      expect(cpcRes.title).toContain("Código de Processo Civil");
    });
  });
});
