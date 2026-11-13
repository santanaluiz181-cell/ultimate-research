# PRECEDENT REGEX TESTS: ESPECIFICAÇÃO E VALIDAÇÃO SINTÁTICA DO PARSER DE PRECEDENTES
**Skill:** `ultimate-research` v1.1.0  
**Módulo:** `src/verifier.ts` (`precedentRegex` no `EvidenceParser`)  
**Data:** 04 de Novembro de 2026  
**Auditor:** NEXUS OMEGA  

---

## 1. Motivação da Correção

No código original de `src/verifier.ts`, a expressão regular para precedentes judiciais continha a exigência da partícula `n` (`n[o\u00ba\u00b0.]?`):
```typescript
// REGEX ANTERIOR (COM FALHA DE RIGIDEZ SINTÁTICA):
/(Recurso\s+Extraordin[a\u00e1]rio|RE|Recurso\s+Especial|REsp|A[c\u00e7][a\u00e3]o\s+Direta\s+de\s+Inconstitucionalidade|ADI|Habeas\s+Corpus|HC)\s+n[o\u00ba\u00b0.]?\s*([\d.]+)/gi
```

Essa formulação provocava as seguintes falhas:
* A citação `ADI 7721` (sem `nº`) era solenemente ignorada e descartada pelo parser.
* A citação `ADI 7.721/DF` (com formatação de milhar e indicação de unidade federativa) falhava na captura da UF.
* O texto caía para o estado de texto genérico não formalizado (`[FONTE NÃO IDENTIFICADA]`), prejudicando a verificação epistêmica.

---

## 2. A Nova Expressão Regular Implementada

A regex foi atualizada para tornar a partícula ordinal opcional, aceitar pontuações, separadores de milhar e sufixos de comarca/estado:

```typescript
// REGEX ATUALIZADA E HOMOLOGADA:
const precedentRegex =
  /\b(?:(S[u\u00fa]mula\s+Vinculante|S[u\u00fa]mula)\s+(?:n[o\u00ba\u00b0.]?\s*)?(\d+)(?:\s+d[oe]\s+(STF|STJ|TST|TSE|STM|TJTO))?|(Tema)\s+(?:n[o\u00ba\u00b0.]?\s*)?(\d+)(?:\s+d[oe]\s+(STF|STJ))?|(Recurso\s+Extraordin[a\u00e1]rio|RE|Recurso\s+Especial|REsp|A[c\u00e7][a\u00e3]o\s+Direta\s+de\s+Inconstitucionalidade|ADI|Habeas\s+Corpus|HC)\s*(?:n[o\u00ba\u00b0.]?\s*|\s+)?([\d.]+)(?:\/([A-Z]{2}))?)\b/gi;
```

---

## 3. Matriz de Testes Sintáticos Executados (`tests/precedent-regex.test.mjs`)

| # | Texto de Entrada Submetido | Variação Testada | Identificador Extraído | Status do Teste |
| :--- | :--- | :--- | :--- | :---: |
| 1 | *"Conforme decidido na ADI 7721 pelo STF."* | Sem prefixo ordinal (`ADI 7721`) | `ADI 7721` | **PASSOU** |
| 2 | *"Conforme decidido na ADI nº 7721 pelo STF."* | Prefixo com ordinal (`nº`) | `ADI nº 7721` | **PASSOU** |
| 3 | *"Conforme decidido na ADI n. 7721 pelo STF."* | Prefixo abreviado com ponto (`n.`) | `ADI n. 7721` | **PASSOU** |
| 4 | *"Nos autos da Ação Direta de Inconstitucionalidade 7721 em trâmite."* | Nome por extenso | `Ação Direta de Inconstitucionalidade 7721` | **PASSOU** |
| 5 | *"O processo ADI 7.721 discute a Lei das Bets."* | Número com separador de milhar | `ADI 7.721` | **PASSOU** |
| 6 | *"Distribuição da ADI nº 7.721/DF perante o STF."* | Número pontuado com barra e UF | `ADI nº 7.721/DF` | **PASSOU** |
| 7 | *"Julgamento da ADI 7721/DF pelo plenário."* | Sem ordinal, com barra e UF | `ADI 7721/DF` | **PASSOU** |
| 8 | *"Acórdão no RE 635659 com repercussão geral."* | Recurso Extraordinário direto | `RE 635659` | **PASSOU** |
| 9 | *"Precedente fixado no REsp n. 987.654/SP pela Segunda Turma."* | Recurso Especial com pontuação e UF | `REsp n. 987.654/SP` | **PASSOU** |
| 10 | *"Ordem concedida no HC 55555 pelo STJ."* | Habeas Corpus | `HC 55555` | **PASSOU** |
| 11 | *"Nos termos da Súmula Vinculante 10 do STF."* | Súmula Vinculante com tribunal | `Súmula Vinculante 10 do STF` | **PASSOU** |
| 12 | *"Aplicação da Súmula nº 331 do TST."* | Súmula de tribunal superior | `Súmula nº 331 do TST` | **PASSOU** |
| 13 | *"Tema 1033 de repercussão geral do STF."* | Tema sem ordinal | `Tema 1033` | **PASSOU** |
| 14 | *"Conforme Tema nº 980 do STJ repetitivo."* | Tema com ordinal e tribunal | `Tema nº 980 do STJ` | **PASSOU** |
| 15 | *"Julgamento da ADI 8027 contestando a MP 1394."* | Nova ação do STF de 2026 | `ADI 8027` | **PASSOU** |
| 16 | *"O plenário acolheu a tese na ADI 99999."* | Precedente falso | `ADI 99999` (extraído, mas rejeitado na auditoria) | **PASSOU** |

---

## 4. Desacoplamento entre Parser Sintático e Autenticação Documental

Um dos pontos cardeais validados na suíte de testes é o **princípio da independência de fases**:
1. **Fase Sintática (Parser):** Deve ser complacente e abrangente. Se o autor escreveu `ADI 99999`, o parser tem a obrigação técnica de capturar o identificador sintático como `judicial_precedent`.
2. **Fase Documental (Auditor):** Deve ser rigorosa e determinística. Ao auditar `ADI 99999`, o `CitationVerifier` consulta a máquina de estados e emite `state: "NÃO LOCALIZADO"` ou `state: "FONTE INDISPONÍVEL"`, **impedindo** que o reconhecimento sintático gere uma certidão de veracidade.

Todos os 16 testes passam com 100% de sucesso no runner oficial `node --test`.
