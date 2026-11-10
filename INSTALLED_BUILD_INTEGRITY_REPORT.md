# RELATÓRIO DE AUDITORIA DE INTEGRIDADE DA BUILD INSTALADA (AUDITORIA 2.3)
**Skill Auditada:** `ultimate-research` v1.1.0  
**Ambiente:** Google Antigravity / Workstation Windows x64  
**Data da Auditoria:** 2026-11-04  
**Auditor:** NEXUS OMEGA (Engenharia de Sistemas, Validação Epistêmica e Integridade de Builds)  
**Veredito de Integridade:** `INTEGRIDADE CONFIRMADA`  
**Classificação de Prontidão Operacional:** `APROVADO PARA TESTES CONTROLADOS` (Mantido estritamente, sem inflação de nota)

---

## 1. COMPARAÇÃO DOS DIRETÓRIOS E ARQUITETURA DE INSTALAÇÃO

### 1.1. Arquitetura Dual: Repositório de Desenvolvimento vs. Skill Instalada
A auditoria constatou a separação arquitetural intencional e desacoplada entre os dois diretórios:
- **Repositório do Motor (`c:\Users\tharcio\Downloads\DESLOP SEARCH SKILL`):**
  - Contém o código-fonte TypeScript (`src/types.ts`, `src/verifier.ts`, `src/pipeline.ts`, etc.), configuração de compilação (`tsconfig.json`), suíte de testes Vitest (`test/`, `tests/`) e o diretório de compilação limpa (`dist/`).
- **Diretório Global da Skill Instalada (`C:\Users\tharcio\.gemini\config\skills\ultimate-research`):**
  - Contém a especificação da skill (`SKILL.md`), scripts de orquestração (`scripts/orchestrate.mjs`, `scripts/env-check.mjs`), documentação metodológica (`references/`), esquemas JSON (`schemas/`), fluxos (`workflows/`), suíte executável de testes (`tests/`) e o **Runtime Bridge** (`scripts/deslop-bridge.mjs`).
  - **Padrão Zero-Duplication:** O arquivo `scripts/deslop-bridge.mjs` conecta diretamente o runtime do `ultimate-research` à build compilada `dist/index.js` em `c:\Users\tharcio\Downloads\DESLOP SEARCH SKILL\dist\`, eliminando duplicações de código e garantindo que o agente execute exatamente o mesmo código auditado.

---

## 2. HASHES CRIPTOGRÁFICOS (SHA-256) E ANÁLISE DE DIVERGÊNCIAS

### 2.1. Relatórios de Auditoria e Documentação Técnica (Correspondência de 100%)

| Arquivo Auditado | Hash SHA-256 (Desenvolvimento) | Hash SHA-256 (Instalação) | Status |
| :--- | :--- | :--- | :--- |
| `CORRECTIVE_AUDIT_REPORT.md` | `7ae7153fcf19eb41be763ec4765ccae12a283ba470ee5cf3d711755ee630d0bd` | `7ae7153fcf19eb41be763ec4765ccae12a283ba470ee5cf3d711755ee630d0bd` | **IDENTICAL** |
| `LEGAL_TEMPORAL_VALIDATION.md` | `8153af1f92616d12e0c17f75ccee8dfeb9d269c65f459b201741c09d576f55cf` | `8153af1f92616d12e0c17f75ccee8dfeb9d269c65f459b201741c09d576f55cf` | **IDENTICAL** |
| `STF_VERIFICATION_FIX.md` | `c2fc77e615436915127d94afaea6fa3ec3b8eb3fc6c01737a7188b708b584ce8` | `c2fc77e615436915127d94afaea6fa3ec3b8eb3fc6c01737a7188b708b584ce8` | **IDENTICAL** |
| `PRECEDENT_REGEX_TESTS.md` | `57809694e576210120dbf7d241469b4776aaecde1ce4662f36655c7cc511ca97` | `57809694e576210120dbf7d241469b4776aaecde1ce4662f36655c7cc511ca97` | **IDENTICAL** |
| `CNC_METHODOLOGY_REAUDIT.md` | `5ccac557ea7b25840ce13b4bfba6cb3121b9c28b2ff3eb55b98071975a775771` | `5ccac557ea7b25840ce13b4bfba6cb3121b9c28b2ff3eb55b98071975a775771` | **IDENTICAL** |
| `TEMPORAL_REGRESSION_TESTS.md` | `9e794a885ded52a25e1d5fc0eba2fad36164a4675fce936289def837f7e6b806` | `9e794a885ded52a25e1d5fc0eba2fad36164a4675fce936289def837f7e6b806` | **IDENTICAL** |
| `ADVERSARIAL_AUDIT_REPORT.md` | `bea760795da4294f1a6b2ec1670d248f3841ac201f3dc880b2a2ef868c555ca4` | `bea760795da4294f1a6b2ec1670d248f3841ac201f3dc880b2a2ef868c555ca4` | **IDENTICAL** |
| `ADVERSARIAL_SCORECARD.md` | `f5cd9a6036194063177a8cce4494ce5d23d4ec9c0c0d36ef46ace52692d4eff8` | `f5cd9a6036194063177a8cce4494ce5d23d4ec9c0c0d36ef46ace52692d4eff8` | **IDENTICAL** |
| `CLAIM_VERIFICATION_MATRIX.md` | `87b036728d2a49942d505c0307d86bef8a77a210800a9fe688c46f578ff59bcf` | `87b036728d2a49942d505c0307d86bef8a77a210800a9fe688c46f578ff59bcf` | **IDENTICAL** |
| `CONTRADICTION_AUDIT.md` | `2ba1480550087541a3352c492f13e10c4f83516c689fca945321612010c71aa4` | `2ba1480550087541a3352c492f13e10c4f83516c689fca945321612010c71aa4` | **IDENTICAL** |
| `DOCUMENTARY_VERIFICATION_AUDIT.md` | `273659ecc87008b0010842ab7a9bf7c7f09465d9f5b972973ca20075971b6511` | `273659ecc87008b0010842ab7a9bf7c7f09465d9f5b972973ca20075971b6511` | **IDENTICAL** |
| `FAILURE_CASES.md` | `683932395998c850705b19be490a3beba28da68b573dd173fa34cb259d0060a4` | `683932395998c850705b19be490a3beba28da68b573dd173fa34cb259d0060a4` | **IDENTICAL** |
| `INDEPENDENT_FIELD_VALIDATION.md` | `1ca8ac69527bdb857aebacb9463001d346b3eb72a03bdbff210830bf0d455cc5` | `1ca8ac69527bdb857aebacb9463001d346b3eb72a03bdbff210830bf0d455cc5` | **IDENTICAL** |
| `PRODUCTION_READINESS_DECISION.md` | `09eeab77f6b5ad0f8ec16e53950cc48c0dabfbdb0108c5dd3125ff3ac50e7c76` | `09eeab77f6b5ad0f8ec16e53950cc48c0dabfbdb0108c5dd3125ff3ac50e7c76` | **IDENTICAL** |
| `REGRESSION_TEST_RESULTS.md` | `cf4125985a2bdf0662b9e5c6d13a11830fb981cf7a678b621fec802fd059ed18` | `cf4125985a2bdf0662b9e5c6d13a11830fb981cf7a678b621fec802fd059ed18` | **IDENTICAL** |
| `REPRODUCIBILITY_REPORT.md` | `ba84a6b1c0480ac630c4dcd75d5bd8cfb322c51de841de9c1cb350c710ac75d1` | `ba84a6b1c0480ac630c4dcd75d5bd8cfb322c51de841de9c1cb350c710ac75d1` | **IDENTICAL** |
| `SOURCE_INDEPENDENCE_AUDIT.md` | `2307cca39c4b165420a347fa41cf5ac856375b52a6993cff9646c03b1497a28e` | `2307cca39c4b165420a347fa41cf5ac856375b52a6993cff9646c03b1497a28e` | **IDENTICAL** |
| `STRESS_TEST_REPORT.md` | `ae4eef93db6eaae43323a830ab04446513cd717d24abde96ecb5bfa2fd8ccc60` | `ae4eef93db6eaae43323a830ab04446513cd717d24abde96ecb5bfa2fd8ccc60` | **IDENTICAL** |
| `STRESS_TEST_SCORECARD.md` | `b978b5c7d1e29b566f4decfe92795ba197b50154078ecf8ba4507aa8e4d5bcc0` | `b978b5c7d1e29b566f4decfe92795ba197b50154078ecf8ba4507aa8e4d5bcc0` | **IDENTICAL** |

### 2.2. Arquivos de Código, Runtime e Testes

| Arquivo | Localização | Hash SHA-256 | Justificativa Arquitetural |
| :--- | :--- | :--- | :--- |
| `src/types.ts` | Dev (`c:/.../DESLOP SEARCH SKILL`) | `ea667e3be6d90808647dc9d8970bdf7fcd09fa5b9bad90776845b0d6611fab70` | Módulo fonte TypeScript (compilado para `dist/types.js`). |
| `src/verifier.ts` | Dev (`c:/.../DESLOP SEARCH SKILL`) | `9d349a7dda1613561448d85a937c8746d391f45ffa3a5c5a0d2cdae17ee239ae` | Módulo fonte TypeScript (compilado para `dist/verifier.js`). |
| `scripts/deslop-bridge.mjs` | Install (`C:/.../ultimate-research`) | `508256bf20e58d83f15f00f1e215dab2005d45e1687e23b409a9a3c8a446a8ed` | Runtime Bridge do agente (consome `dist/index.js`). |
| `SKILL.md` (Dev) | Dev (`c:/.../DESLOP SEARCH SKILL`) | `bd6c06fbe2cb7519c226718d088b0eb204008bb406d191e93ef28fb6ff6689b8` | Manifesto do pacote `deslop-search`. |
| `SKILL.md` (Install) | Install (`C:/.../ultimate-research`) | `6e69be8e8a8fab9b2834ccc903eaffcd8b04432137bdae389050373a5e62032d` | Manifesto do motor unificado `ultimate-research`. |
| `tests/ts/deslop.test.ts` | Ambos | `35e22bed0d9e433f6ab5c3261d1d390d772fa0cf2fe5cfa43c8db10320023907` | **IDENTICAL** em ambas as localizações. |
| `tests/py/test_deslop.py` | Ambos | `a58c8a634e3eb8f7fd68dbd223a1f902d00931790d6945bb6e9c10d5af4692ea` | **IDENTICAL** em ambas as localizações. |
| `tests/negative-scenarios.test.mjs`| Ambos | `4871d34c11b01c10d32bb58661623910c0e86b039cb01ee4d4f8373356e40995` | **IDENTICAL** em ambas as localizações. |

---

## 3. COMPILAÇÃO LIMPA (CLEAN BUILD VERIFICATION)

Para assegurar que nenhum artefato intermediário ou residual corrompesse os resultados, o diretório `dist/` foi totalmente removido antes da compilação:

- **Comando executado:** `powershell -Command "Remove-Item -Recurse -Force dist; npm run build"`
- **Diretório de execução:** `c:\Users\tharcio\Downloads\DESLOP SEARCH SKILL`
- **Compilador:** TypeScript `tsc -p tsconfig.json`
- **Código de saída (Exit Code):** `0`
- **Erros e avisos:** `0 erros`, `0 avisos`
- **Arquivos gerados em `dist/`:**
  - `dist/classifier.js` (12.552 bytes), `classifier.d.ts` (277 bytes)
  - `dist/cli.js` (13.291 bytes), `cli.d.ts` (64 bytes)
  - `dist/dorks.js` (10.506 bytes), `dorks.d.ts` (558 bytes)
  - `dist/index.js` (309 bytes), `index.d.ts` (311 bytes)
  - `dist/mcp-tools.js` (10.185 bytes), `mcp-tools.d.ts` (428 bytes)
  - `dist/pipeline.js` (15.077 bytes), `pipeline.d.ts` (3.147 bytes)
  - `dist/router.js` (2.338 bytes), `router.d.ts` (468 bytes)
  - `dist/rules.js` (3.157 bytes), `rules.d.ts` (570 bytes)
  - `dist/split-horizon.js` (15.274 bytes), `split-horizon.d.ts` (1.277 bytes)
  - `dist/types.js` (44 bytes), `types.d.ts` (9.014 bytes)
  - `dist/verifier.js` (56.589 bytes), `verifier.d.ts` (4.070 bytes)

---

## 4. RESULTADOS INDIVIDUAIS DE TODAS AS SUÍTES DE TESTES

A totalidade das suítes de testes da versão instalada e do pacote do motor foi executada:

```text
========================================================================================
RESULTADOS INDIVIDUAIS DAS SUÍTES DE TESTES (VERSÃO INSTALADA EM C:\...\ultimate-research)
========================================================================================

1. tests/citation-tests/citation.test.mjs (Unitários / ARS & Entailment Gate)
   - Status: PASS | 4 testes | 4 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: CrossRef DOI real, detecção de DOI forjado, polaridade judicial e ISBN-13 checksum.

2. tests/citation-tests/entailment-20-pairs.test.mjs (Epistêmico / Acarretamento Semântico)
   - Status: PASS | 20 testes | 20 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Pares de entailment, generalizações indevidas, alterações de datas e números.

3. tests/citation-tests/hallucination-resistance.test.mjs (Resistência a Alucinações)
   - Status: PASS | 20 testes | 20 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: 20 cenários sintéticos forjados por IA rejeitados sem carimbo [VERIFICADA].

4. tests/integration-tests/integration.test.mjs (Integração e Contratos Antigravity)
   - Status: PASS | 5 testes | 5 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Frontmatter YAML do SKILL.md, limites de tamanho e resolução de ferramentas.

5. tests/precedent-regex.test.mjs (Precedentes Judiciais / Parser Universal)
   - Status: PASS | 16 testes | 16 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Variações de ADI, RE, REsp, HC, Súmulas Vinculantes e Temas repetitivos.

6. tests/routing-tests/routing.test.mjs (Roteamento de Modos e Esquemas)
   - Status: PASS | 5 testes | 5 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Validação de research-plan.schema.json e isolamento de argumentos CLI.

7. tests/source-quality-tests/independence.test.mjs (Independência de Fontes)
   - Status: PASS | 5 testes | 5 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Fingerprint de origens, agrupamento de agências estatais e detecção de eco.

8. tests/source-quality-tests/source-quality.test.mjs (Anti-Slop e Tiers de Qualidade)
   - Status: PASS | 6 testes | 6 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: Classificação de fontes oficiais e preservação incondicional de Tier 1.

9. tests/temporal-legal.test.mjs (Regressão Temporal-Jurídica)
   - Status: PASS | 20 testes | 20 aprovados | 0 falhas | 0 cancelados | 0 ignorados
   - Cobertura: MP 1.394/2026, Decreto 13.128/2026, modulação STF e detecção de leis anacrônicas.

10. tests/temporal-tests/temporal.test.mjs (Sistema Temporal em 3 Lanes)
    - Status: PASS | 3 testes | 3 aprovados | 0 falhas | 0 cancelados | 0 ignorados
    - Cobertura: Split-Horizon diferencial e regras temporais de corte.

11. tests/negative-scenarios.test.mjs (Bateria de 10 Testes Negativos Adicionais)
    - Status: PASS | 10 testes | 10 aprovados | 0 falhas | 0 cancelados | 0 ignorados
    - Cobertura: Distinção estrita entre validade sintática, existência documental e suporte semântico.

12. scratch/test_anti_slop_audit.mjs (Auditoria Anti-Slop Heurística)
    - Status: PASS | 1 suíte | 1 aprovada | 0 falhas

13. Suíte Vitest do Repositório (test/verifier.test.ts + tests/ts/deslop.test.ts)
    - Status: PASS | 30 testes | 30 aprovados | 0 falhas

========================================================================================
TOTAL: 144 testes executados | 144 aprovados | 0 falhas | 0 ignorados | 100% de aprovação
========================================================================================
```

---

## 5. BATERIA DE 10 TESTES NEGATIVOS ADICIONAIS (SEÇÃO 4)

A suíte [`tests/negative-scenarios.test.mjs`](file:///C:/Users/tharcio/.gemini/config/skills/ultimate-research/tests/negative-scenarios.test.mjs) foi criada e validada para aferir se o sistema diferencia:
*(1) Validade Sintática / Matemática* vs. *(2) Existência Documental em Registro Oficial* vs. *(3) Sustentação Semântica da Tese*.

| Nº | Cenário Negativo Testado | Validade Sintática | Existência Documental | Sustentação Semântica | Resultado Obtido |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **1** | CNJ com Módulo 97 exato (`9999999-51.2024.8.27.9999`), mas sem registro no DJEN. | **SIM** | **NÃO** | Incompatível | `[ALUCINAÇÃO DETECTADA]` / `[NÃO COMPROVADA]`. Jamais carimba como `[VERIFICADA]`. |
| **2** | ISBN com checksum EAN-13 exato, mas sem catálogo bibliográfico registrado. | **SIM** | **NÃO** | Incompatível | `[NÃO COMPROVADA]`. Validação matemática não implica existência física do livro. |
| **3** | DOI registrado (`10.1038/nature14539`), mas texto afirma tese contrária ao artigo. | **SIM** | **SIM** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Score rebaixado para `< 0.50`. |
| **4** | ADI existente (`ADI 7721`), mas texto inverte a polaridade do dispositivo processual. | **SIM** | **SIM** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Detecta inversão de pedido acolhido vs. rejeitado. |
| **5** | Norma existente (`Lei nº 5.869/1973`), mas revogada no tempo pelo CPC/2015. | **SIM** | **SIM (Histórica)** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Rejeita norma revogada como vigente no ordenamento. |
| **6** | Norma aprovada com eficácia pendente sob vacatio legis de 365 dias. | **SIM** | **SIM** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Respeita a eficácia suspensa da norma futura. |
| **7** | Medida Provisória em vigor provisório alegada como lei ordinária definitiva. | **SIM** | **SIM (Provisória)** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Não confunde precariedade de MP com lei convertida. |
| **8** | Decreto infralegal alegado como revogador de competência de Medida Provisória. | **SIM** | **SIM** | **NÃO** | `[DIVERGÊNCIA DE TESE]`. Preserva hierarquia das normas e escopo infralegal parcial. |
| **9** | Indisponibilidade de rede ou timeout de API governamental externa. | - | **INDETERMINADA** | - | `[FONTE INDISPONÍVEL]` (score 0.50). Proibido carimbar como alucinação. |
| **10** | Conflito entre Portaria permissiva anterior e Decisão Judicial cautelar posterior. | **SIM** | **SIM (Múltiplas)** | **CONFLITO** | `[DIVERGÊNCIA DE TESE]`. Registra conflito sem arbitramento mecânico. |

---

## 6. AUDITORIA DE INSTRUÇÕES DO SKILL.MD E ARQUIVOS AUXILIARES

A inspeção detalhada do [`SKILL.md`](file:///C:/Users/tharcio/.gemini/config/skills/ultimate-research/SKILL.md), [`references/citation-verification.md`](file:///C:/Users/tharcio/.gemini/config/skills/ultimate-research/references/citation-verification.md) e [`references/source-credibility.md`](file:///C:/Users/tharcio/.gemini/config/skills/ultimate-research/references/source-credibility.md) confirmou o cumprimento estrito das 7 diretrizes epistêmicas:

1. **Ausência de resultado não é prova de falsidade:** Previsto no Item 3 da Seção 5 do `SKILL.md` (*"Correlação ≠ causalidade e ausência de evidência ≠ evidência de falsidade"*) e implementado no código através do estado `FONTE INDISPONÍVEL` e `NÃO LOCALIZADO`.
2. **Checksum matemático não se confunde com existência:** O cálculo do Módulo 97 do CNJ e dígito do ISBN validam apenas consistência formal; a atribuição de veracidade documental requer obrigatoriamente a consulta à publicação no DJEN/ComunicaAPI ou base catalogada.
3. **Republicações não contam como fontes independentes:** O cálculo do `origin_fingerprint` agrupa releases sindicais, cópias de portais agregadores e despachos da EBC em uma única origem primária.
4. **Norma original não se confunde com redação vigente:** O sistema impõe checagem da linha temporal superveniente (Lane C e sucessão legislativa).
5. **Medida provisória não é lei definitivamente aprovada:** O sistema distingue a vigência precária e temporária do art. 62 da CF/88 de diplomas formalmente convertidos pelo Congresso Nacional.
6. **Crítica metodológica não é refutação empírica:** O sistema segrega a ausência de microdados ou premissa de elasticidade arbitrária (como no caso da CNC) de comprovação empírica em contrário, adotando o carimbo `METODOLOGIA INSUFICIENTEMENTE DEMONSTRADA`.
7. **Hipóteses não são fatos comprovados:** As saídas exigem explicitação da probabilidade epistêmica e rotulagem de alegações univariadas com `[single-source]`.

---

## 7. FALHAS ENCONTRADAS E SANADAS NA AUDITORIA 2.3

Durante a elaboração da suíte de testes negativos, foi diagnosticada uma vulnerabilidade nos testes sintéticos:
- **Falha Identificada:** A suíte preliminar utilizava o processo `0001234-48.2023.8.27.2729` como caso de "CNJ inexistente", sem considerar que este número é uma ação de execução real catalogada na base do TJTO, o que causava retorno positivo inesperado da API pública.
- **Correção:** O caso de teste foi sanitizado para utilizar a função determinística `makeCnj(9999999, 2024, 8, 27, 9999)`, gerando um identificador matematicamente válido sob o algoritmo do Módulo 97 (`9999999-51.2024.8.27.9999`), porém comprovadamente ausente de qualquer acervo judiciário real. A asserção foi aprovada com sucesso.

---

## 8. LIMITAÇÕES CONHECIDAS

1. **Dependência de Conectividade Externa para Fontes Não Cacheadas:** Quando serviços governamentais (como o LexML ou a ComunicaAPI do CNJ) entram em manutenção programada ou sofrem instabilidade, a ferramenta transiciona confiavelmente para `FONTE INDISPONÍVEL`, dependendo do julgamento humano posterior para validação definitiva daquela citação isolada.
2. **Precedentes de Tribunais Regionais Estaduais com Numeração Histórica:** Processos ajuizados antes de 2008 que não foram redistribuídos sob a numeração única da Resolução CNJ nº 65/2008 não possuem algoritmo determinístico unificado de dígitos verificadores e são tratados no canal genérico de verificação documental.

---

## 9. VEREDITO OFICIAL DE INTEGRIDADE

Com base na correspondência dos hashes criptográficos, na compilação limpa do código-fonte sem erros, na aprovação com 100% de sucesso de 144 testes automatizados em 13 suítes distintas e no estrito cumprimento das instruções epistêmicas:

### Veredito de Integridade da Build: `INTEGRIDADE CONFIRMADA`
A versão instalada em `C:\Users\tharcio\.gemini\config\skills\ultimate-research` executa determinística e comprovadamente a mesma base de código auditada, corrigida e testada no repositório de desenvolvimento.

### Prontidão Operacional: `APROVADO PARA TESTES CONTROLADOS`
Em observância às regras inegociáveis de governança técnica que proíbem o aumento artificial de prontidão decorrente de validações de integridade, a skill permanece sob a classificação **`APROVADO PARA TESTES CONTROLADOS`**, condicionada a exercícios investigativos externos em condições reais de produção.

---
*Assinado eletronicamente por NEXUS OMEGA — Engenheiro Principal de Sistemas e Guardião Técnico.*
