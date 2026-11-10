# REGRESSION TEST RESULTS: SUÍTE COMPLETA DE VALIDAÇÃO EPISTÊMICA
**Skill Avaliada:** `ultimate-research` v1.1.0  
**Data da Execução:** 04 de Novembro de 2026  
**Ambiente de Execução:** Node.js v24.14.1 (Windows x64 / PowerShell)  
**Runner:** `node --test` nativo  
**Resultado Consolidado:** **68 TESTES EXECUTADOS | 68 APROVADOS (100% SUCESSO)**

---

## 1. Sumário Executivo das Suítes de Teste

| Arquivo de Teste | Suíte / Módulo Testado | Testes | Sucessos | Falhas | Tempo de Execução |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `citation.test.mjs` | TESTE 05: Verificação de Citações Acadêmicas e Jurídicas (ARS + Entailment Gate) | 4 | 4 | 0 | 1.75s |
| `entailment-20-pairs.test.mjs` | FASE 4: Teste Epistêmico Adversarial de Entailment (20 Pares) | 20 | 20 | 0 | 0.64s |
| `hallucination-resistance.test.mjs` | FASE 5: Teste Adversarial de Resistência a Alucinações (20 Casos Falsos Plausíveis) | 20 | 20 | 0 | 2.71s |
| `integration.test.mjs` | TESTE 08 & E2E: Disponibilidade de Ferramentas, Fallback Nativo e Integridade da Skill | 5 | 5 | 0 | 1.78s |
| `routing.test.mjs` | Roteamento de Modos de Pesquisa, Schemas de Plano e Sanitização Zero-Width | 5 | 5 | 0 | 1.09s |
| `independence.test.mjs` | FASE 3: Teste de Independência de Fontes e `origin_fingerprint` | 5 | 5 | 0 | 0.47s |
| `source-quality.test.mjs` | TESTE 04: Anti-Slop Contextual, Preservação de Documentos Oficiais e Triagem | 6 | 6 | 0 | 0.48s |
| `temporal.test.mjs` | TESTE 03: Sistema Temporal em 3 Pistas (Lane A/B/C) e Split-Horizon | 3 | 3 | 0 | 7.04s |
| **TOTAL CONSOLIDADO** | **Suíte Completa de Regressão Epistêmica e Funcional** | **68** | **68** | **0** | **~15.96s** |

---

## 2. Detalhamento das Suítes Adversariais Criadas

### A. `tests/citation-tests/entailment-20-pairs.test.mjs` (20 Casos)
Valida a capacidade do motor de discernir relações lógicas sutis entre alegações de texto e registros primários:
1. `TOTALMENTE_CONFIRMADA`: Maritaca AI (Sabiá-4 128k e 1M tokens) $\rightarrow$ `CONFIRMADA`.
2. `ALTERACAO_NUMERO`: Escriba preço adulterado (R$ 50 vs R$ 80) $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
3. `NAO_DECORRENTE`: Substituição total de juízes vs automação de triagem $\rightarrow$ `NÃO CONFIRMADA`.
4. `DESFECHO_CONTRADITORIO`: Rejeição de liminar vs concessão de tutela $\rightarrow$ `CONTRADITA`.
5. `EVIDENCIA_DESATUALIZADA`: PL 2338 na comissão do Senado vs remetido à Câmara $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
6. `OMISSAO_CONDICOES`: Bloqueio total da Meta vs suspensão de termos de IA $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
7. `ALTERACAO_PORCENTAGEM`: Rejeição de IA de 85% vs 47% $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
8. `INVERSAO_SUJEITO_OBJETO`: OpenAI processou Folha vs Folha processou OpenAI $\rightarrow$ `CONTRADITA`.
9. `CAUSALIDADE_INDEVIDA`: IA causou fechamento de redações vs crise de anúncios $\rightarrow$ `NÃO CONFIRMADA`.
10. `GENERALIZACAO_EXCESSIVA`: Redações do interior com IA autônoma (50% vs 8%) $\rightarrow$ `NÃO CONFIRMADA`.
11. `TOTALMENTE_CONFIRMADA`: Planos Arena.im ($49 e $999) $\rightarrow$ `CONFIRMADA`.
12. `DESFECHO_CONTRADITORIO`: Postura irredutível vs acordo OpenAI e Folha/UOL $\rightarrow$ `CONTRADITA`.
13. `OMISSAO_CONDICOES`: Treinamento em dados de usuários vs sigilo no Escriba $\rightarrow$ `CONTRADITA`.
14. `TOTALMENTE_CONFIRMADA`: Campanha salarial da FENAJ e cláusula anti-IA $\rightarrow$ `CONFIRMADA`.
15. `ALTERACAO_NUMERO`: JOTA PRO estudante R$ 12,50 vs contratos anuais B2B $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
16. `NAO_DECORRENTE`: Exceção expressa TDM na Lei 9.610/98 vs vácuo legislativo $\rightarrow$ `CONTRADITA`.
17. `OMISSAO_CONDICOES`: Proibição total de envio de dados aos EUA vs regras da ANPD $\rightarrow$ `NÃO CONFIRMADA`.
18. `TOTALMENTE_CONFIRMADA`: Custo do Sabiazinho-4 a R$ 1 por 1M tokens $\rightarrow$ `CONFIRMADA`.
19. `ALTERACAO_DATA`: Ajuizamento Folha vs OpenAI em 2023 vs agosto/2025 $\rightarrow$ `PARCIALMENTE CONFIRMADA`.
20. `TOTALMENTE_CONFIRMADA`: Tutela deferida pelo Juiz Guilherme Madeira Dezem $\rightarrow$ `CONFIRMADA`.

---

### B. `tests/citation-tests/hallucination-resistance.test.mjs` (20 Casos Falsos)
Comprova que o sistema não confunde identificadores bem-formados com fatos reais:
- **DOI Inexistente com Sintaxe Válida:** Interceptado e marcado como não verificado (`exists: false`).
- **ISBN Inexistente com Checksum Válido:** Interceptado por `applyEpistemicCitationGuardrails` e rebaixado para `[NÃO COMPROVADA]` por falta de catálogo bibliográfico.
- **Número CNJ com Módulo 97 Válido (Prisão Fictícia):** Interceptado e marcado como `[ALUCINAÇÃO DETECTADA]`, com veto a carimbo positivo.
- **Empresas, Preços e Leis Forjadas:** Nenhuma afirmação fictícia obteve o carimbo `[VERIFICADA]`.

---

### C. `tests/source-quality-tests/independence.test.mjs` (5 Cenários)
- **Cenário 1 (Syndicated PR):** 5 veículos de imprensa reproduzindo press-release da ANJ colapsam para 1 única origem independente (`clusters.length === 1`).
- **Cenário 2 (Distinct Legal Docs):** Petição da Folha vs Contestação da OpenAI geram 2 origens independentes.
- **Cenário 3 e 4 (Court Ruling vs Association Interpretation):** Decisão judicial e nota institucional recebem fingerprints ontologicamente distintos.
- **Cenário 5 (Methodological Triangulation):** Duas pesquisas empíricas independentes mantêm suas fontes preservadas.
- **Cenário 6 (State Agency Wire):** Dois portais replicando fio da Agência Brasil colapsam para a mesma origem estatal.

---

## 3. Conclusão de Engenharia

Todos os testes automatizados foram integrados ao repositório de testes da skill e passam sem advertências, dependências fantasma ou simulações artificiais. A regressão garante estabilidade contínua contra as 4 classes de falha documentadas.
