# Workflow: Blindagem Adversarial Elephant-Goldfish (`elephant-goldfish-adversarial`)

**Objetivo:** Eliminar a cegueira de confirmacao e o viés de auto-aprovacao atraves de uma arquitetura dual em dois estágios:
1. **Agente Elefante (Queen / Arquiteto):** Produz o plano, minuta ou tese com 100% de memória e contexto acumulado;
2. **Cardume Goldfish (Subagentes Independentes):** Recebe exclusivamente o artefato gerado com **0% de memória (Contexto Zero)**, aplicando **Claim Mutation Testing** e caçando premissas frágeis, nulidades e brechas.

---

## 1. Topologia Operacional

```
[Contexto / Demanda / Autos / Dados Brutos]
                   │
                   ▼
       ┌────────────────────────┐
       │    AGENTE ELEFANTE     │  Memoria Total (100% Contexto)
       │  (Queen / Arquiteto)   │  Gera Minuta, Plano ou Tese
       └───────────┬────────────┘
                   │
                   ▼ [Corte Sanitario de Contexto: Purgar Historico]
       ┌────────────────────────┐
       │    CARDUME GOLDFISH    │  Contexto Zero (Fresh Eyes)
       │ (3 Subagentes Leves)   │  Atacam o artefato sem premissas previas
       └───────────┬────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼                   ▼
  [Goldfish 1:        [Goldfish 2:        [Goldfish 3:
   Mutacao de          Contradicao         Regulatorio/
   Polaridade]         Interna]            Nulidades]
                   │
                   ▼
       ┌────────────────────────┐
       │  RELATORIO DE ESTRESSE │  So avanca se todas as brechas
       │   (Go / No-Go Gate)    │  forem corrigidas no Patcher
       └────────────────────────┘
```

---

## 2. As 3 Baterias de Mutacao Aplicadas pelos Goldfish

Ao receber a minuta isolada, cada Goldfish executa testes de mutacao nas afirmacoes centrais:

1. **Mutacao 1: Inversao de Polaridade (`permitido` -> `proibido`, `constitucional` -> `inconstitucional`)**
   - O Goldfish inverte o sentido da afirmacao e verifica se os documentos citados refutam a versao invertida de forma irrefutavel. Se a citacao for generica e tolerar ambos os sentidos, o veredito e rebaixado para `[NAO COMPROVADA]`.

2. **Mutacao 2: Perturbacao Numerica e Temporal (`R$ 30 bi` -> `R$ 3 bi`, `2025` -> `2023`)**
   - O Goldfish perturba os valores citados. A citacao deve conter o numero exato e o recorte temporal correto. Citacoes desprovidas de dados literais sao marcadas como extrapolacao.

3. **Mutacao 3: Inversao Causal (`A causou B` -> `correlacao temporal sem causalidade provada`)**
   - O Goldfish audita se ha prova documental de nexo causal ou se o autor confundiu associacao estatistica com causa real.

---

## 3. Criterio de Saida (Go / No-Go Gate)

- **Go (Aprovado):** Zero alucinacoes detectadas, zero contradicoes insanaveis, todas as alegacoes passam pelo teste de mutacao.
- **No-Go (Reprovado):** O relatorio retorna ao Elefante com o log de falhas do Goldfish para re-escrita cirurgica antes da entrega final.
