# Google Research Harness² Loop (`google-harness-loop`)

**Fase Operacional:** Fase 3 (Query Engineering) / Fase 5 (Poda Dinâmica) / Fase 10 (ReasoningBank Feedback)  
**Origem Metodológica:** Google Research (`google/harness-2`)  
**Padrão de Integridade:** Auto-Otimização Recursiva Contínua e Poda Dinâmica de Ferramentas Ociosas

---

## 1. O Conceito de "Harness²" (Harness ao Quadrado)
Um *Harness* tradicional é a armadura estática que envolve um modelo de linguagem: seus system prompts, regras de skills, catálogos de MCPs e memórias.
O **Google Harness²** atua como uma camada meta-cognitiva que avalia empiricamente os acertos e falhas de cada ciclo de pesquisa e reescreve recursivamente o próprio harness, elevando a precisão sem alterar os pesos do modelo.

```
┌───────────────────────────────────────┐
│     System Prompt + Tools Atuais      │
└──────────────────┬────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────┐
│      Agente Executa Investigação      │
└──────────────────┬────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────┐
│        Mede Desempenho Factual        │  Taxa de Erro, Alucinações,
│     (Banca Goldfish + Validador ARS)  │  Tokens Gastos e Latência
└──────────────────┬────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────┐
│         Meta-Agente Harness²          │
│            (ReasoningBank)            │
└──────────────────┬────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Poda Dinâmica   │ │ Reescrita de    │
│ de Tools        │ │ Prompts/Regras  │
│ (skills-pruner) │ │ no claude-mem   │
└─────────────────┘ └─────────────────┘
```

---

## 2. Os 3 Pilares do Harness² no Ultimate Research

### 2.1. Dynamic Tool Pruning (`skills-pruner`)
- **Problema:** Manter 80+ ferramentas no context window gasta dezenas de milhares de tokens antes da primeira busca e aumenta a taxa de tool-calls errôneas.
- **Mecânica:** O Harness² classifica o modo da pesquisa (ex: `MODE 7: LEGAL RESEARCH` ou `MODE 4: JOURNALISTIC INVESTIGATION`) e isola em quarentena ferramentas incompatíveis (áudio DSP, geradores 3D, design systems), deixando ativas estritamente as ferramentas essenciais de busca, scraping e checagem.
- **Ganho:** Economia de até 50% dos tokens de cabeçalho.

### 2.2. Prompt Optimization Loop
- O Harness² analisa o resultado do ataque dos Goldfish. Se um Goldfish detectou que uma consulta omitiu a data de revogação de uma lei, o Harness² muta a regra de geração de query para incluir obrigatoriamente a verificação de sucessão temporal (`Lane C`).

### 2.3. ReasoningBank (Memória de Lições Cumulativas)
- Todo erro empírico detectado na sessão é destilado em uma regra atômica invariável e persistido no `claude-mem` (`work_state_write` / `save_memory`).
- Exemplo de lição: *"Em consultas processuais do TJTO/CNJ, o dígito verificador regular não prova existência documental; verificar sempre o DJEN/ComunicaAPI"*.
