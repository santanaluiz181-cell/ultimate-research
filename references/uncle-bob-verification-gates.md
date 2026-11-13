# Portoes Objetivos e Teste de Mutacao (`uncle-bob-verification-gates`)

Inspirado diretamente na regra de engenharia de Robert C. Martin ("Uncle Bob", `DfpaKb1k2Og`): em escala de agentes autonomos, revisao manual linha a linha vira gargalo. Os criterios qualitativos sao convertidos em metricas deterministicas verificadas por maquina a cada entrega.

---

## 1. Aplicacao Dual no Ultimate Research

### A. Em `MODE 5: TECHNICAL RESEARCH` & Execucao de Codigo
Sempre que uma investigacao tecnica recomendar refatoracao, biblioteca ou codigo produzido por agente (inclusive via `/improve`), valide as 5 metricas objetivas antes de aprovar qualquer achado tecnico:

1. **Cobertura de Testes (Coverage Delta):** Todo caminho critico ou correcao possui teste automatizado que exercita sucesso e falha.
2. **Estrutura de Dependencias:** Grafo aciclico; modulos de dominio nao importam camada de apresentacao/transporte; sem vazamento de segredos ou acoplamento circular.
3. **Complexidade Ciclomatica:** Funcoes com ramificacao excessiva devem ser apontadas para aprofundamento modular (`improve-codebase-architecture`).
4. **Tamanho dos Modulos:** Rejeite arquivos monoliticos ilegíveis e tambem micro-wrappers rasos sem profundidade (`deletion test`).
5. **Teste de Mutacao:** Cobertura alta com assercoes frouxas nao prova nada; exija casos negativos que quebrem se a logica central for invertida.

### B. Em Auditoria Epistemica (`Fase 8` & Cardume `Goldfish - Fase 9`): Mutacao de Alegacoes
Ao auditar relatorios e evidencias antes de emitir o selo `[VERIFICADA]`, os agentes **Goldfish (contexto zero)** aplicam **Claim Mutation Testing** nos pontos centrais:

| Mutacao Aplicada na Alegacao | O Que Deve Acontecer com a Fonte Citada (`supporting_excerpt`) | Se Nao Quebrar, Diagnostico |
| :--- | :--- | :--- |
| **Inversao de Polaridade** (`permitido` -> `proibido`, `aprovado` -> `rejeitado`) | A evidência original precisa contradizer explicitamente a versao mutada | Citacao generica / tangencial -> rebaixar para `[NAO_COMPROVADO]` |
| **Perturbacao Numerica / Temporal** (`2025` -> `2021`, `50%` -> `5%`) | O trecho citado precisa conter o numero/data literal que rejeita a mutacao | Numero ausente do excerpt -> exigir trecho literal ou corrigir |
| **Inversao Causal** (`A causou B` -> `correlacao entre A e B`) | O estudo/documento primario precisa demonstrar causalidade, nao mera co-ocorrencia | Excesso interpretativo -> reescrever respeitando `Correlacao != Causalidade` |

---

## 2. Integracao com Advisor -> Executor Tiering (`shadcn/improve`)
- **Elefante / Queen (`pro`):** Audita, desenha `UR-PLAN`, escreve especs e executa mutacao critica nos vereditos.
- **Scouts / Executores (`flash_lite` / `flash`):** Executam coletas isoladas, scripts `deslop-bridge.mjs` / `validate-schemas.mjs` e rodam suites de teste sem gastar contexto nobre.
