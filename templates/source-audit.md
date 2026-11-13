# Certificado de Auditoria Epistêmica e Verificação ARS (`UR-ARS`)

**Protocolo de Auditoria:** `UR-ARS-[ANO][MES][DIA]-[NUMERO_SEQUENCIAL]`  
**Plano de Pesquisa Auditado:** `[UR-PLAN-YYYYMMDD-XXXX]`  
**Matriz de Evidências Auditada:** `[UR-EVMAT-YYYYMMDD-XXXX]`  
**Data de Emissão da Auditoria:** `[AAAA-MM-DD HH:MM:SS UTC]`  
**Auditor Responsável:** Queen Orchestrator / Super Deslop ARS Engine  
**Modo de Rigor:** `[NORMAL | STRICT]`  
**Status Consolidado do Laudo:** `[APROVADO INTEGRALMENTE | APROVADO COM RESSALVAS | REPROVADO POR ALUCINAÇÃO | BLOQUEADO]`

---

## 1. Sumário Executivo de Verificação Epistêmica

> **REGRA DE OURO INVIOLÁVEL:** É estritamente proibido classificar uma citação como `[VERIFICADA]` quando apenas a existência do link ou documento for confirmada. A classificação `[VERIFICADA]` exige prova determinística de Acarretamento Semântico Direto (Direct Semantic Entailment) entre o trecho da fonte e a alegação formulada.

### Contadores de Classificação Semântica
- Total de Citações / Alegações Submetidas à Auditoria: `[N]`
- `[VERIFICADA]`: `[QTD]` - *Existência confirmada + Entailment semântico direto provado.*
- `[EXISTÊNCIA CONFIRMADA SEM ENTAILMENT]`: `[QTD]` - *Documento/URL existe, mas não sustenta a alegação.*
- `[DIVERGÊNCIA DE TESE]`: `[QTD]` - *Fonte existe, mas sustenta tese oposta à alegação.*
- `[NÃO COMPROVADA]`: `[QTD]` - *Fonte inacessível, dados insuficientes ou ausência de prova documental.*
- `[ALUCINAÇÃO DETECTADA]`: `[QTD]` - *Citação espúria, número forjado ou trecho inexistente na fonte.*

---

## 2. Checklists Determinísticos de Validação

### 2.1 Checklist de URLs e Recursos Web
- [ ] **Acessibilidade HTTP Canônica:** Verificação de status code `200 OK` (ou redirecionamento permanente `301` para URL canônica).
- [ ] **Persistência e Arquivamento:** Snapshot conferido na Wayback Machine (`web.archive.org`) ou perma.cc para fontes efêmeras.
- [ ] **Detecção de Dead Links / Paywalls Cegos:** Nenhuma citação sustentada exclusivamente por página com erro `404`, soft-404 ou paywall intransponível sem cópia preservada.
- [ ] **Correspondência de Domínio:** O domínio do link corresponde exatamente à entidade jurídica ou editorial referenciada.

### 2.2 Checklist de DOIs (Digital Object Identifiers)
- [ ] **Resolução via CrossRef REST API:** Consulta determinística a `https://api.crossref.org/works/{doi}` com sucesso.
- [ ] **Fallback OpenAlex:** Validação complementar em `https://api.openalex.org/works/{doi}` para publicações abertas.
- [ ] **Correspondência de Metadados:** Título do paper, primeiro autor e ano de publicação conferem 100% com os dados do registro CrossRef/OpenAlex.
- [ ] **Recuperação de Abstract/Full-Text:** Abstract ou texto integral recuperado e confrontado com a alegação.

### 2.3 Checklist de Livros e Obras Impressas (ISBN)
- [ ] **ISBN-10 (Módulo 11):** Validação matemática do dígito verificador pela ponderação `10*x1 + 9*x2 + ... + 2*x9 + x10 ≡ 0 (mod 11)`.
- [ ] **ISBN-13 (Módulo 10):** Validação matemática pela ponderação alternada `1` e `3`: `(x1 + 3*x2 + x3 + 3*x4 + ... + x13) ≡ 0 (mod 10)`.
- [ ] **Identificação de Edição e Editora:** Número da edição, página referenciada e casa publicadora especificadas.

### 2.4 Checklist de Processos Judiciais Brasileiros (CNJ - Padrão Resolução 65/2008)
- [ ] **Validação ISO 7064 Módulo 97-10:** Cálculo algorítmico do dígito verificador `NNNNNNN-DD.AAAA.J.TR.OOOO`.
  $$\text{Resto} = (\text{Número Sequencial} \times 10^7 + \text{Ano} \times 10^3 + \text{Justiça} \times 10^2 + \text{Tribunal}) \pmod{97}$$
  $$\text{Dígito Calculado} = 98 - (\text{Resto} \pmod{97})$$
- [ ] **Consulta DJEN / ComunicaAPI / eproc:** Confirmação de distribuição real no tribunal competente (ex: TJTO código `8.22`).
- [ ] **Conferência de Segredo de Justiça:** Ausência de exposição indevida de dados protegidos por sigilo processual legal.

### 2.5 Checklist de Normas Legais e Precedentes (LexML Brasil)
- [ ] **URN Canônica LexML:** Existência de identificador uniforme (ex: `urn:lex:br:federal:lei:2021-04-01;14133`).
- [ ] **Vigência e Revogação:** Aferição de vigência da norma (não aplicar artigo revogado tacitamente ou expressamente).
- [ ] **Divergência Jurisprudencial:** Acórdão ou súmula confrontado com súmulas vinculantes posteriores do STF/STJ.

---

## 3. Tabela de Acarretamento Semântico e Auditoria por Citação (Claim-to-Source Entailment)

| ID Citação | Alegação / Citação Textual no Relatório | Fonte e Identificador Permanente | Trecho Literal Comprovado na Fonte | Status da Auditoria | Justificativa do Auditor |
|---|---|---|---|---|---|
| **CIT-01** | `[Ex: "O STJ fixou que honorários..." ]` | `REsp 1.741.123/SP (STJ)` | `"Acórdão: A fixação dos honorários sucumbenciais..."` | `[VERIFICADA]` | Trecho citado é fidedigno e acarreta diretamente a premissa sustentada. |
| **CIT-02** | `[Ex: "O pacote reduziu a latência em 80%"]` | `https://github.com/org/repo/benchmarks` | `"Our microbenchmark indicates 25% throughput gain"` | `[DIVERGÊNCIA DE TESE]` | O benchmark original reportou 25% de throughput, não 80% de latência. |
| **CIT-03** | `[Ex: "Segundo a Lei 19.999/2026..."]` | `Diário Oficial da União` | `Não localizado no acervo LexML/DOU` | `[ALUCINAÇÃO DETECTADA]` | Lei inexistente no ordenamento jurídico nacional. |
| **CIT-04** | `[Ex: "O autor defende a tese X na p. 45"]` | `Livro de Referência (ISBN 978-...)` | `Página 45 trata de tópico distinto (introdução)` | `[EXISTÊNCIA CONFIRMADA SEM ENTAILMENT]` | A obra e a página existem fisicamente, mas não abordam a tese alegada. |
| **CIT-05** | `[Ex: "Relatório confidencial interno atesta Y"]` | `Sem link ou documento anexado` | `Inacessível` | `[NÃO COMPROVADA]` | Prova puramente anedótica sem comprovação documental. |

---

## 4. Auditoria de Autoria, Datas e Anacronismos

| ID Citação | Autor Declarado | Autor Real da Fonte | Data Citada | Data Real da Publicação | Anacronismo Detectado? |
|---|---|---|---|---|---|
| **CIT-01** | Min. Relator Oficial | Min. Relator Oficial | 2023-05-10 | 2023-05-10 | Não |
| **CIT-02** | Equipe Core | Contribuidor Externo | 2024-01-15 | 2022-11-20 | Sim (Publicado 14 meses antes do alegado) |
| **CIT-04** | Doutrinador Titular | Coletânea Coletiva | 2025 | 2018 | Sim (Edição desatualizada sem nota da reforma) |

---

## 5. Parecer Conclusivo da Auditoria Epistêmica

```
PROTOCOLO: UR-ARS-[NUMERO]
TAXA DE CONFIABILIDADE EPISTÊMICA: [XX.X]%
ÍNDICE DE ALUCINAÇÃO: [X.X]% (Tolerância máxima: 0.0%)

PARECER DO AUDITOR:
[ ] APROVADO: Todas as alegações críticas contam com comprovação documental direta [VERIFICADA].
[ ] APROVADO COM RESSALVAS: Há itens classificados como [DIVERGÊNCIA DE TESE] ou [EXISTÊNCIA CONFIRMADA SEM ENTAILMENT], porém identificados com ressalvas claras no relatório.
[ ] BLOQUEADO / REPROVADO: Detectada citação classificada como [ALUCINAÇÃO DETECTADA]. O relatório não pode ser emitido sem a supressão imediata ou correção integral da referência espúria.
```

**Assinatura Digital / Carimbo do Sistema:**  
`SHA-256 Checksum do Laudo: [HASH_HEXADECIMAL_64_CHARS]`
