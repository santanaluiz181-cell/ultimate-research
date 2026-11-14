# Metodologia do Benchmark DRACO Deep Research (Score 77.7 - #1 Global)

**Referencia Oficial:** `hyperresearch.ai/benchmarks/draco`  
**Autor do Harness:** Jordan Gibbs (`jordan-gibbs/hyperresearch`)  
**Status no Ranking:** **1º Lugar Global** com pontuacao **77.7**, superando todas as solucoes comerciais proprietarias.

---

## 1. O Placar Comparativo do DRACO Benchmark

Avaliacao rigorosa em 10 tarefas investigativas complexas e multidisciplinares, submetidas ao mesmo juiz avaliador sob criterios cegos de completude, profundidade documental, precisao de citacoes e ausencia de alucinacao:

| Posicao | Sistema de Pesquisa Profunda | Pontuacao Global (DRACO) | Status / Arquitetura |
| :---: | :--- | :---: | :--- |
| **1º** | **Hyperresearch Deep (Harness V8)** | **77.7** | **Open Source / Local Vault / Ensemble Multi-Drafter** |
| 2º | Claude Research (Anthropic Opus) | 73.0 | Proprietario em Nuvem |
| 3º | Parallel Ultra | 61.5 | Nuvem Comercial |
| 4º | You.com Deep Research | 60.1 | Motor Web Comercial |
| 5º | Perplexity Deep Research | 57.8 | Nuvem Comercial Sonar |
| 6º | Valyu DeepResearch Heavy | 57.2 | Nuvem Comercial |
| 7º | ChatGPT Deep Research (OpenAI) | 55.2 | Proprietario em Nuvem |
| 8º | Gemini Deep Research (Google) | 54.7 | Proprietario em Nuvem |

---

## 2. Por Que o Hyperresearch Superou as Big Techs?

A disparidade entre o Hyperresearch (77.7) e os sistemas comerciais das grandes empresas de IA (54.7 a 73.0) decorre de 5 decisoes de arquitetura de software:

1. **Combate Estrutural a Compactacao de Contexto (V8 Multi-Skill Chain):**
   - Agentes de prompt unico de 2.000 linhas sofrem perda catastrofica de atencao apos a 4ª rodada.
   - O Hyperresearch V8 divide a investigacao em 16 procedimentos autocontidos lidos sob demanda, garantindo que o agente executor tenha 100% de clareza procedural no momento exato da redacao.

2. **Cofre Zettelkasten em Disco (`research/notes/`):**
   - Em vez de reter 200 artigos em um buffer de contexto instavel, cada fonte lida e salva como nota Markdown com metadados persistentes.
   - Os subagentes leem apenas os resumos executivos e trechos relevantes, evitando estouro de janela e alucinacao por saturacao.

3. **Ensemble de Minutas Triplas (Triple-Draft Ensemble):**
   - Tres subagentes redigem minutas independentes a partir do mesmo acervo;
   - Um agente sintetizador reconcilia os tres textos, extraindo os pontos mais densos e descartando passagens superficiais.

4. **Auditoria Deterministica de Citacoes (Cite-Check & Patcher):**
   - Nenhuma alegacao e publicada sem confirmacao de que a fonte citada existe no cofre e contem a frase que sustenta a tese.
   - Afirmacoes sem suporte sao reescritas com ressalva ou removidas automaticamente.

5. **Recuperacao de Texto Completo Aberto (OA Recovery):**
   - Conexao nativa com Europe PMC e Unpaywall para resgatar o PDF integral de pesquisas academicas quando o link comercial possui paywall.
