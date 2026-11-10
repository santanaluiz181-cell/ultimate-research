<p align="center">
  <img src="./assets/hero-banner.svg" alt="ultimate-research hero banner" width="100%" />
</p>

# `ultimate-research` v2.0 — The Unified Autonomous Investigation, ARS Verification, Elephant-Goldfish & Google Harness² Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](./package.json)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933?logo=node.js&logoColor=white)](./package.json)
[![Python](https://img.shields.io/badge/Python-%3E%3D3.10-3776AB?logo=python&logoColor=white)](./pyproject.toml)
[![Agent Skill](https://img.shields.io/badge/AI_Skill-Antigravity_%7C_MCP_%7C_Claude_Code-6B46C1)](./SKILL.md)
[![Status: Produção Assistida](https://img.shields.io/badge/Auditoria_3.0-Aprovado_Produção_Assistida-brightgreen.svg)](./PRODUCTION_READINESS_DECISION.md)
[![Factual Accuracy](https://img.shields.io/badge/Scorecard-9.88%2F10.0-success.svg)](./BLIND_EVALUATION_SCORECARD.md)

> **O Mecanismo Supremo de Pesquisa e Investigação Digital.** Uma arquitetura unificada de 5 camadas que funde engenharia de consultas, busca sem slop via Split-Horizon, auditoria documental determinística (ARS), teste de estresse adversarial de contexto zero (Elephant-Goldfish) e auto-otimização recursiva de prompts e ferramentas (Google Research Harness²).

---

## 1. A Arquitetura das 5 Camadas Unificadas

```mermaid
flowchart TD
    User["Operador: /ultimate-research [Demanda / Pauta]"] --> Dispatcher["Orquestrador Central Ultimate Research 2.0"]

    subgraph CAMADA_1["1. GOOGLE RESEARCH HARNESS² (Pré-Voo & Poda)"]
        Dispatcher --> Pruning["Dynamic Tool Pruner (skills-pruner)"]
        Pruning --> ActiveTools["Poda ferramentas ociosas (Economiza até 50% de tokens)"]
    end

    subgraph CAMADA_2["2. PERPLEXITY PROMPTING & SUPER DESLOP (Busca Limpa)"]
        ActiveTools --> Dorking["Query Engineering (Sem few-shot, âncoras temporais)"]
        Dorking --> Split["Split-Horizon 3-Lanes (Canônico pré-2023 vs Contemporâneo pós-2023)"]
        Split --> SlopFilter["SlopClassifier O(N) (Exclui SEO farms e preserva fontes primárias)"]
    end

    subgraph CAMADA_3["3. DEEP RESEARCH (Onda Construtiva do Elefante)"]
        SlopFilter --> Subagents["Enxame de Subagentes em Ondas Isoladas"]
        Subagents --> Triangulation["Triangulação Anti-Eco (origin_fingerprint)"]
        Triangulation --> ElephantDraft["Gera Minuta Completa com 100% de Contexto (Elefante)"]
    end

    subgraph CAMADA_4["4. ARS EPISTÊMICO & ELEPHANT-GOLDFISH (Destruição e Estresse)"]
        ElephantDraft --> ARS["Módulo ARS: Checagem de DOI, ISBN, CNJ Mod97 e Leis"]
        ARS --> PurgeContext["Corte Sanitário de Contexto (Zero Context)"]
        PurgeContext --> Goldfish["Cardume Goldfish (3x flash_lite caçam furos, nulidades e contradições)"]
    end

    subgraph CAMADA_5["5. FECHAMENTO & REASONINGBANK"]
        Goldfish --> Convergence{"Aprovado pelos Goldfish?"}
        Convergence -- "Com Furos" --> ReOptimize["Harness² ajusta regras + Salva no claude-mem + Corrige Minuta"]
        ReOptimize --> ElephantDraft
        Convergence -- "100% Aprovado" --> FinalReport["Relatório com Certidão ARS de Conformidade de Fontes"]
    end

    FinalReport --> Done["Entrega Pronta para Publicação"]
```

---

## 2. As 5 Camadas Explicadas

| Camada | Tecnologia | O que resolve |
| :--- | :--- | :--- |
| **1. Search Intelligence** | *Perplexity Prompting* | Consultas cirúrgicas de 2–3 termos, âncoras temporais numéricas, busca multi-perspectiva e sem ruído de SEO. |
| **2. Clean Search & Split-Horizon** | *Super Deslop Search* | Restaura a web humana pré-2023 sem cegueira temporal, comparando o horizonte canônico com a realidade auditada contemporânea. |
| **3. Investigation Intelligence** | *Deep Research (Mitra)* | Decomposição em subproblemas, extração *span-level* por subagentes em ondas paralelas e critério estrito de convergência. |
| **4. Adversarial Stress & ARS** | *Elephant-Goldfish + ARS* | A Queen (Elefante) cria com memória total; 3 subagentes descartáveis com **contexto zero** (Goldfish) trituram o rascunho. O ARS valida DOIs no CrossRef/OpenAlex, CNJ (Mod 97) no DJEN e leis no LexML. |
| **5. Meta-Optimization** | *Google Research Harness²* | Poda de ferramentas desnecessárias antes da execução (`skills-pruner`), reescrita de prompts heurísticos e persistência de lições no ReasoningBank (`claude-mem`). |

---

## 3. Instalação e Uso

### Como AI Agent Skill (Google Antigravity / Claude Code / Cursor)
Dispare diretamente no chat com um único comando:
```markdown
/ultimate-research "Investigar a crise da concessão da Enel SP e o rito de caducidade"
```
*O motor executa o Elefante, os Goldfish e o Harness² automaticamente nos bastidores.*

### Via Linha de Comando (CLI)
```bash
# Execução da pesquisa
npx ultimate-research query "Reforma tributária impactos no setor de serviços"

# Split-Horizon comparativo
npx ultimate-research split "React Server Components architecture"

# Auditoria epistêmica determinística de citações (ARS)
npx ultimate-research verify --file "relatorio.md" --strict
```
*(Nota: O comando legado `npx deslop` permanece disponível como alias de compatibilidade).*

---

## 4. Auditorias e Benchmarks Oficiais

O motor foi submetido a três ciclos de auditoria epistêmica independente:

- **Auditoria 1.0 (Stress Test):** Nota 9.25/10 — Validação da fusão de ferramentas.
- **Auditoria 2.2 / 2.3 (Auditoria Adversarial e Integridade de Build):** 144 testes executados, 144 aprovados (100% de sucesso). Máquina de 6 estados documentais (`CONFIRMADO`, `NÃO LOCALIZADO`, `FONTE INDISPONÍVEL`, `ACESSO RESTRITO`, `DIVERGÊNCIA DOCUMENTAL`, `FALSO DOCUMENTO`) e regex universal de precedentes judiciais.
- **Auditoria 3.0 (Avaliação Cega com Gabarito Independente):**
  - **Pauta:** Concessão da Enel SP, Apagão de Outubro/2024, Decreto nº 12.068/2024 e Ações Civis Públicas.
  - **Precisão Factual:** **100% de acerto (20 de 20 afirmações do gabarito cego confirmadas)**.
  - **Scorecard Global:** **9.88 / 10.0** ([Scorecard Detalhado](./BLIND_EVALUATION_SCORECARD.md)).
  - **Homologação:** **Aprovado para Produção Assistida** ([Termo de Decisão](./PRODUCTION_READINESS_DECISION.md)).

---

## 5. Estrutura de Diretórios

```text
ultimate-research/
├── bin/
├── data/
│   ├── blocklist.json         # 60+ domínios de content-farms e scrapers de IA
│   ├── slop-lexicon.json      # Léxico heurístico bilíngue de jargões de IA
│   └── sources.json           # Rotas comunitárias (Reddit, HN, SO, GitHub)
├── references/
│   ├── citation-verification.md
│   ├── deep-research-methodology.md
│   ├── deslop-methodology.md
│   ├── elephant-goldfish-architecture.md  # Arquitetura de teste cego
│   ├── google-harness-loop.md             # Motor de auto-otimização recursiva
│   ├── perplexity-prompting.md
│   ├── report-standards.md
│   └── research-modes.md
├── src/
│   ├── classifier.ts          # Classificador estatístico e heurístico O(N)
│   ├── dorks.ts               # Injetor de operadores temporais e udm=14
│   ├── pipeline.ts            # Orquestrador de busca e Split-Horizon
│   ├── router.ts              # Roteador de hubs comunitários
│   ├── types.ts               # Estados documentais e esquemas
│   └── verifier.ts            # Módulo de verificação ARS determinístico
├── test/
├── tests/
│   ├── negative-scenarios.test.mjs  # 10 cenários de teste negativo
│   ├── precedent-regex.test.mjs     # 16 variações formais de jurisprudência
│   └── temporal-legal.test.mjs      # 20 casos de regressão temporal
├── package.json
├── README.md
└── SKILL.md                   # Manifesto unificado para agentes Antigravity
```

---

## 6. Licença

Distribuído sob licença MIT. Incorpora metodologias abertas de Perplexity Prompting (Joel Helbling & Nate B. Jones), Deep Research (Ramit Mitra), Elephant-Goldfish Model (Google Open Source) e Google Research Harness² (Apache 2.0).
