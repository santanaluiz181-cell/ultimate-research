# Arquitetura de Vault Persistente e Recuperação Open-Access (Hyperresearch)

**Origem:** Inspirado no motor aberto `jordan-gibbs/hyperresearch`, classificado em **#1 no benchmark DRACO Deep Research (Score 77.7)**, à frente de Claude Research, ChatGPT, Gemini e Perplexity.  
**Papel no Ultimate Research:** Camada de Memória Cumulativa de Longo Prazo, Recuperação de Texto Integral e Patcher Automático de Citações.

---

## 1. O Problema da Memória Efêmera em Agentes de Pesquisa

A maioria dos agentes de pesquisa profunda opera de forma descartável:
1. Uma pergunta é feita;
2. Dezenas de URLs e papers são consultados;
3. Uma resposta é emitida e todo o acervo bruto lido é evaporado no término da sessão.

Se uma investigação correlata for disparada no dia seguinte, o agente recomeça do zero: refaz consultas idênticas, consome cotas de API desnecessárias e perde a linhagem de descobertas anteriores.

O **Hyperresearch Vault Engine** resolve essa limitação estrutural através de um **Cofre Zettelkasten Persistente e Indexado (`research/notes/`)**:
- Cada documento, decisão, acórdão ou paper lido é persistido em disco com frontmatter estruturado (`id`, `title`, `url`, `doi`, `author`, `published`, `oa_status`, `origin_fingerprint`, `tags`).
- Um índice local com busca textual e contextual (`research/vault-index.json`) permite que cada nova sessão inicie mais informada que a anterior (`each run builds on the last`).

---

## 2. A Pipeline de 16 Etapas Adaptativa por Tiers

O Hyperresearch V8 define uma decomposição cirúrgica em 16 etapas sequenciais na orquestração e paralelas na execução interna:

| Etapa | Nome da Fase | Função Principal |
| :--- | :--- | :--- |
| **01** | `decompose` | Decomposição em vetores declarativos, extração de entidades e metas. |
| **01.5**| `chapter-partition` | Particionamento estrutural em capítulos para relatórios de grande porte (Dissertation Tier). |
| **02** | `width-sweep` | Varredura horizontal em fontes primárias e governamentais. |
| **03** | `contradiction-graph` | Mapeamento explícito de tensões e afirmações divergentes. |
| **04** | `loci-analysis` | Identificação de pontos centrais de controvérsia dialética. |
| **05** | `depth-investigation` | Mergulho vertical com subagentes especializados por locus temático. |
| **06** | `cross-locus-reconcile` | Reconciliação cruzada entre achados de diferentes subagentes. |
| **07** | `source-tensions` | Auditoria de interesses e potenciais vieses institucionais de cada fonte. |
| **08** | `corpus-critic` | Avaliação crítica do acervo acumulado para expurgo de redundâncias e SEO slop. |
| **09** | `evidence-digest` | Condensação estruturada das evidências em matrizes de suporte. |
| **10** | `triple-draft` | Geração paralela de 3 minutas independentes (Ensemble Multi-Drafter). |
| **11** | `synthesize` | Fusão e síntese das 3 minutas em um relatório unificado e coeso. |
| **12** | `critics` | Julgamento adversarial independente da minuta sintetizada. |
| **13** | `gap-fetch` | Rodada cirúrgica de busca complementar para preenchimento de lacunas abertas. |
| **14** | `patcher` | Correção e ajuste determinístico de afirmações extrapoladas. |
| **14.5**| `cite-check` | Validação literal de cada citação contra o trecho salvo no cofre. |
| **15** | `polish` | Refinamento estilístico, formatação e eliminação de clichês robóticos. |
| **16** | `readability-audit` | Auditoria final de legibilidade, fluência e clareza para o público-alvo. |

---

## 3. Recuperação de Acesso Aberto (Open-Access Recovery)

Quando um paper científico possui paywall em seu portal comercial original (ex: Springer, Elsevier, Nature, Wiley), a maioria das ferramentas falha ou analisa apenas o abstract.

O **OA Recovery Engine** consulta automaticamente três fontes legais de texto integral:
1. **Europe PMC REST API (`api.europepmc.org`):** Acesso aberto estruturado em XML/JATS e PDF sem necessidade de credenciais ou chaves pagas.
2. **Unpaywall REST API (`api.unpaywall.org`):** Localização do PDF legal ou preprint em repositórios universitários mundiais.
3. **OpenAlex & CrossRef:** Resolução de metadados, autores, afiliações e DOI persistente.
4. **SEC EDGAR & FRED:** Ingestão de relatórios 10-K/10-Q e séries históricas macroeconômicas.

O documento pleno é baixado, higienizado pelo Super Deslop e registrado no vault com a tag `oa_status: "open_access_recovered"`.

---

## 4. O Verificador de Citações e Patcher Automático (`citecheck`)

Antes de qualquer relatório receber o carimbo de conclusão (`Ship Gate`):
- O script `scripts/vault.mjs citecheck <relatorio.md>` varre todos os links e DOIs citados no texto.
- Confirma se cada referência possui uma nota correspondente no vault com o trecho exato que sustenta a frase.
- Qualquer alegação com citação inexistente no vault ou que extrapole os dados documentados é sinalizada para ajuste sumário pelo **Patcher** antes da entrega ao operador.
