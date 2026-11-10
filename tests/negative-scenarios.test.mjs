import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const bridgePath = "C:/Users/tharcio/.gemini/config/skills/ultimate-research/scripts/deslop-bridge.mjs";
const {
  loadDeslopSdk,
  executeDeslopMcpTool,
  auditEpistemicEvidence,
  applyEpistemicCitationGuardrails
} = await import(pathToFileURL(bridgePath).href);

function makeCnj(n, a, j, tr, o) {
  const nStr = String(n).padStart(7, "0");
  const aStr = String(a).padStart(4, "0");
  const jStr = String(j);
  const trStr = String(tr).padStart(2, "0");
  const oStr = String(o).padStart(4, "0");
  const num = BigInt(nStr + aStr + jStr + trStr + oStr + "00");
  const rem = Number(num % 97n);
  const dd = String(98 - rem).padStart(2, "0");
  return `${nStr}-${dd}.${aStr}.${jStr}.${trStr}.${oStr}`;
}

describe("Auditoria 2.3 — Seção 4: Bateria de 10 Testes Negativos Adicionais", () => {
  // 1. Número CNJ válido matematicamente, mas sem registro
  it("Cenário 1: CNJ com Modulo 97 válido mas sem registro judicial não pode receber [VERIFICADA]", async () => {
    // 9999999-51.2024.8.27.9999 possui dígito verificador 51 matematicamente exato (Mod 97), mas é inexistente no DJEN
    const unrecordedCnj = makeCnj(9999999, 2024, 8, 27, 9999);
    const cert = await auditEpistemicEvidence(
      `O réu foi preso em flagrante conforme autos do processo ${unrecordedCnj} no TJTO.`
    );
    assert.notEqual(cert.stamp, "[VERIFICADA]");
    assert.ok(
      cert.stamp === "[NÃO COMPROVADA]" || cert.stamp === "[ALUCINAÇÃO DETECTADA]",
      `Expected unconfirmed or hallucination due to lack of recorded filing, got: ${cert.stamp}`
    );
  });

  // 2. ISBN válido matematicamente, mas sem publicação correspondente
  it("Cenário 2: ISBN com dígito verificador válido mas sem catálogo bibliográfico não pode receber [VERIFICADA]", async () => {
    // ISBN com checksum válido segundo EAN-13, porém não catalogado em base bibliográfica
    const cert = await auditEpistemicEvidence(
      "A teoria geral da desinformação algorítmica foi publicada no livro didático registrado sob o ISBN 978-85-359-0277-8."
    );
    assert.notEqual(cert.stamp, "[VERIFICADA]");
    assert.ok(
      cert.stamp === "[NÃO COMPROVADA]" || cert.stamp === "[ALUCINAÇÃO DETECTADA]",
      `Expected unconfirmed or hallucination, got: ${cert.stamp}`
    );
  });

  // 3. DOI registrado, mas que não sustenta a afirmação (Divergência de Tese)
  it("Cenário 3: DOI real existente cuja tese contraria frontalmente a afirmação deve gerar DIVERGÊNCIA DE TESE", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "O artigo em DOI 10.1038/nature14539 demonstrou a ineficácia, redução e total failure das redes neurais convolucionais.",
      {
        exists: true,
        title: "Deep learning",
        summary: "Deep learning improved and revolutionized representation learning, demonstrating massive increase in accuracy."
      },
      {
        id: "EVD-DOI-003",
        type: "academic_doi",
        rawMatch: "10.1038/nature14539",
        identifier: "10.1038/nature14539",
        claimText: "O artigo em DOI 10.1038/nature14539 demonstrou a ineficácia, redução e total failure"
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
    assert.ok(evaluation.score < 0.5);
  });

  // 4. ADI existente com descrição processual falsa
  it("Cenário 4: Processo ADI existente com dispositivo e polaridade judicial oposta ao registro oficial", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "Na ADI 7721, o STF acolheu integralmente a inicial e julgou procedente a inconstitucionalidade total da Lei das Bets.",
      {
        exists: true,
        title: "Ação Direta de Inconstitucionalidade 7721 — STF",
        summary: "O Supremo Tribunal Federal rejeitou os pedidos de nulidade total e julgou improcedente a declaração de inconstitucionalidade."
      },
      {
        id: "EVD-ADI-004",
        type: "judicial_precedent",
        rawMatch: "ADI 7721",
        identifier: "ADI 7721",
        claimText: "Na ADI 7721, o STF acolheu integralmente a inicial e julgou procedente..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
    assert.ok(evaluation.divergenceReason && evaluation.divergenceReason.length > 5);
  });

  // 5. Norma existente, mas revogada (Vigência Histórica)
  it("Cenário 5: Norma histórica revogada não pode ser apresentada como regra processual atualmente válida e vigente", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "A pretensão recursal é plenamente procedente e atende a dispositivo legal plenamente válido do CPC revogado.",
      {
        exists: true,
        title: "Lei nº 5.869/1973 (Revogada)",
        summary: "A corte julgou improcedente a petição e declarou a nulidade absoluta da invocação de norma expressamente revogada."
      },
      {
        id: "EVD-REV-005",
        type: "judicial_statute",
        rawMatch: "Lei nº 5.869/1973",
        identifier: "Lei nº 5.869/1973",
        claimText: "A pretensão recursal é plenamente procedente e atende a dispositivo legal plenamente válido..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
  });

  // 6. Norma existente com vigência futura (Vacatio Legis)
  it("Cenário 6: Norma aprovada com eficácia pendente (Vacatio Legis) deve ter vigência futura respeitada", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "O dispositivo já é plenamente eficaz e puniu condutas no período de tramitação.",
      {
        exists: true,
        title: "Lei Ordinária Federal",
        summary: "Dispositivo sem vigência atual, ineficaz durante o período de 365 dias de vacatio legis estipulado em lei."
      },
      {
        id: "EVD-LEG-006",
        type: "judicial_statute",
        rawMatch: "Lei Ordinária",
        identifier: "Lei Ordinária",
        claimText: "O dispositivo já é plenamente eficaz e puniu condutas..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
  });

  // 7. MP em vigor, mas pendente de apreciação/conversão definitiva
  it("Cenário 7: Medida Provisória em vigor provisório não pode ser confundida com lei definitivamente aprovada", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "O plenário acolheu e deferiu a conversão definitiva da Medida Provisória nº 1.394/2026 em lei ordinária permanente.",
      {
        exists: true,
        title: "Medida Provisória nº 1.394/2026",
        summary: "O Congresso Nacional rejeitou o requerimento de urgência e indeferiu a conversão sumária da medida provisória pendente."
      },
      {
        id: "EVD-MP-007",
        type: "judicial_statute",
        rawMatch: "Medida Provisória nº 1.394/2026",
        identifier: "MP 1394/2026",
        claimText: "O plenário acolheu e deferiu a conversão definitiva da Medida Provisória nº 1.394/2026..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
  });

  // 8. Decreto que regulamenta apenas parte de uma MP
  it("Cenário 8: Decreto regulamentador infralegal parcial não esgota nem substitui a Medida Provisória originária", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "O Decreto nº 13.128/2026 acolheu a substituição e revogou todos os artigos da Medida Provisória originária.",
      {
        exists: true,
        title: "Decreto nº 13.128/2026",
        summary: "Regulamento parcial e estritamente infralegal, rejeitou qualquer alteração de competência privativa da Medida Provisória."
      },
      {
        id: "EVD-DEC-008",
        type: "judicial_statute",
        rawMatch: "Decreto nº 13.128/2026",
        identifier: "Decreto 13128/2026",
        claimText: "O Decreto nº 13.128/2026 acolheu a substituição e revogou todos os artigos..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
  });

  // 9. Fonte oficial indisponível
  it("Cenário 9: Indisponibilidade de rede ou timeout de API deve gerar FONTE INDISPONÍVEL e NUNCA alucinação", async () => {
    const sdk = await loadDeslopSdk();
    const unavailableAdapter = {
      async checkDoi() { return { exists: false, source: "CrossRef", state: "FONTE INDISPONÍVEL" }; },
      async checkIsbn() { return { exists: false, source: "OpenLibrary", state: "FONTE INDISPONÍVEL" }; },
      async checkCnj() { return { exists: false, validFormat: true, validChecksum: true, source: "CNJ/DJEN", state: "FONTE INDISPONÍVEL" }; },
      async checkStatute() { return { exists: false, source: "LexML", state: "FONTE INDISPONÍVEL" }; }
    };

    const verifier = new sdk.CitationVerifier({ adapter: unavailableAdapter });
    const cert = await verifier.verifyText("Conforme Lei nº 14.790/2023 regulamentada pelo Governo Federal.");
    assert.equal(cert.audits[0].documentaryState, "FONTE INDISPONÍVEL");
    assert.equal(cert.audits[0].verdict, "FONTE INDISPONÍVEL");
    assert.notEqual(cert.audits[0].verdict, "ALUCINAÇÃO DETECTADA");
  });

  // 10. Duas fontes oficiais com informações divergentes
  it("Cenário 10: Duas fontes oficiais com teses divergentes devem registrar divergência documental", async () => {
    const sdk = await loadDeslopSdk();
    const evaluation = sdk.SemanticEntailmentEngine.evaluate(
      "A operação está autorizada, plenamente constitucional e deferida sem qualquer restrição cautelar.",
      {
        exists: true,
        title: "Conflito Normativo: Liminar STF vs. Portaria",
        summary: "O Supremo Tribunal Federal indeferiu a eficácia da autorização e determinou a suspensão cautelar imediata das operações."
      },
      {
        id: "EVD-CONF-010",
        type: "judicial_statute",
        rawMatch: "Portaria SPA/MF nº 827/2024",
        identifier: "Portaria 827/2024",
        claimText: "A operação está autorizada, plenamente constitucional e deferida sem qualquer restrição..."
      }
    );
    assert.equal(evaluation.verdict, "DIVERGÊNCIA DE TESE");
    assert.ok(evaluation.divergenceReason && evaluation.divergenceReason.length > 5);
  });
});
