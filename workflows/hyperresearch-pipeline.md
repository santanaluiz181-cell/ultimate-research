# Workflow: Pipeline Hyperresearch DRACO em 16 Etapas (`hyperresearch-pipeline`)

**Objetivo:** Executar investigacoes profundas e exaustivas utilizando a arquitetura do Hyperresearch (vencedor do benchmark DRACO com score 77.7), integrando cofre persistente em `research/notes/`, recuperacao de acesso aberto e ensemble multi-minutas.

---

## 1. Selecao de Tiers Operacionais

| Tier | Escopo | Etapas Executadas | Tempo Estimado |
| :--- | :--- | :--- | :--- |
| **LIGHT TIER** | Fatos pontuais, mercado rapido, duvidas tecnicas | 5 etapas: 01, 02, 09, 10 (draft unico) e 14.5 (cite-check) | ~15 a 30 min |
| **FULL TIER (Padrao)** | Politicas publicas, analise setorial, investigacao completa | Todas as 16 etapas com Triple-Draft Ensemble e Patcher | ~60 a 120 min |
| **DISSERTATION TIER** | Teses academicas, grandes contenciosos juridicos | 16 etapas com particionamento em capitulos (etapa 01.5) | ~2 a 4 horas |

---

## 2. O Roteiro Sequencial em 16 Etapas

### Fase 1: Decomposicao e Particionamento
1. **Etapa 01 (`decompose`):**
   - Inicializa o cofre com `node scripts/vault.mjs init`.
   - Decompoe a pergunta central em vetores declarativos independentes salvos em `templates/research-plan.md`.
2. **Etapa 01.5 (`chapter-partition`):**
   - Obrigatoria em `dissertation tier`; define matriz de capitulos e escopo de cada frente.

### Fase 2: Coleta Horizontal e Mapeamento de Tensao
3. **Etapa 02 (`width-sweep`):**
   - Dispara busca em fontes primarias, repositorios oficiais e academicos via Super Deslop.
   - Salva notas brutas no cofre via `node scripts/vault.mjs store`.
4. **Etapa 03 (`contradiction-graph`):**
   - Registra tensoes e contradicoes no grafo de evidencias.
5. **Etapa 04 (`loci-analysis`):**
   - Isola os pontos nodais de divergencia (ex: impactos fiscais, validade normativa).

### Fase 3: Mergulho Vertical e Reconciliacao
6. **Etapa 05 (`depth-investigation`):**
   - Subagentes isolados mergulham nos loci tematicos, perseguindo cadeias de citacoes primarias.
   - Aciona recuperacao Open-Access (Europe PMC / Unpaywall) para papers com paywall.
7. **Etapa 06 (`cross-locus-reconcile`):**
   - Confronta achados entre subagentes e consolida `comparisons.md`.
8. **Etapa 07 (`source-tensions`):**
   - Mapeia interesses e vieses das organizacoes envolvidas.
9. **Etapa 08 (`corpus-critic`):**
   - Poda conteudos redundantes e aplica filtro anti-slop.

### Fase 4: Redacao e Sintese
10. **Etapa 09 (`evidence-digest`):**
    - Condensa as evidencias auditadas em tabelas de suporte indexadas pelo ID da nota no cofre.
11. **Etapa 10 (`triple-draft` - Ensemble Mandatorio no Full Tier):**
    - Tres subagentes redigem minutas completas de forma paralela e independente.
12. **Etapa 11 (`synthesize`):**
    - O agente sintetizador funde as 3 minutas no relatorio principal, retendo a maior densidade informacional.

### Fase 5: Auditoria, Patcher e Fechamento
13. **Etapa 12 (`critics`):**
    - Subagentes avaliadores atacam a minuta em busca de furos e premissas frageis.
14. **Etapa 13 (`gap-fetch`):**
    - Busca cirurgica direcionada apenas para fechar lacunas identificadas pelos criticos.
15. **Etapa 14 (`patcher`) e 14.5 (`cite-check`):**
    - Executa `node scripts/vault.mjs citecheck relatorio.md`.
    - Ajusta claims extrapoladas e garante que toda alegacao tem respaldo comprovado no cofre.
16. **Etapa 15 (`polish`) e 16 (`readability-audit`):**
    - Higienizacao de estilo, formatacao conforme padrao executivo e emissao do selo final.
