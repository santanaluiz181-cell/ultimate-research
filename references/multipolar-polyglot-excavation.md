# Camada 8: Escavacao Multipolar Poliglota, Small Web e Isolamento Clean-Room (`multipolar-polyglot-excavation`)

**Versao:** v2.3.0 (SUPERUPGRADE)
**Modo Correspondente:** `MODE 11: MULTIPOLAR EXCAVATION` (`MULTIPOLAR_EXCAVATION`)
**Motor Deterministico:** `src/multipolar.ts` / `python/deslop_search/multipolar.py` + `data/multipolar-jurisdictions.json`

---

## 1. Problema Epistemico Resolvido
Buscadores e assistentes convencionais operam sobre uma bolha estreita ("os 3% da internet que conversam consigo mesmos"): SEO anglofono comercial, releases corporativos reciclados e consenso norte-americano sem contraditorio. Alem disso, sessoes personalizadas contaminam a coleta com vies de historico e preferencias previas do operador.

A **Camada 8** elimina esses dois vetores de erro com **Isolamento Clean-Room**, **Escavacao em 6 Estratos**, **Multipolo Poliglota em 15+ Jurisdicoes (com Sul Global e Mundo Arabe)** e **Triparticao Ontologica com Steelman Minoritario**.

---

## 2. Protocolo Clean-Room (`ISOLAMENTO`)
Antes de iniciar qualquer busca no Modo 11:
1. **Zerar Ancoragem Pessoal:** Ignore memoria previa, perfil do usuario, conversas antigas e notas de sessoes anteriores durante a fase de coleta bruta.
2. **Flag de Cofre:** Execute `node scripts/vault.mjs search "<query>" --clean-room` (retorna vazio deterministico sem leitura de notas antigas) e `node scripts/orchestrate.mjs plan "<query>" --mode MULTIPOLAR_EXCAVATION --clean-room`.
3. **Regra de Fronteira:** Toda afirmacao no relatorio final deve apontar para fonte web externa com identificador `[F#]`, URL verificavel e data (ou consignar explicitamente `"nao encontrado"`).

---

## 3. Etapa 0: Plano Estruturado (`MISSION | Use | Period`)
Defina antes de rodar a primeira query:
- **MISSAO:** `[Pergunta central]` | **Uso:** `[Objetivo pratico da decisao]` | **Periodo:** `[Janela de X anos]`
- **Subperguntas:** 3 a 5 subperguntas operacionais.
- **Matriz de Hipoteses:** exatamente **1 Hipotese Dominante (`H-DOM`)** + **2 Hipoteses Rivais (`H-RIV-1`, `H-RIV-2`)**.
- **Lexico Poliglota Nativo:** termos de busca no idioma nativo de cada jurisdicao-alvo (evitar traducao literal cega que perde jargao tecnico local).

---

## 4. Os 6 Estratos Obrigatorios de Escavacao

| Ordem | Estrato | Alvo Primario | Auditoria Obrigatoria |
| :--- | :--- | :--- | :--- |
| **1** | **Visao Dominante + Cui Bono** | Surface Web, midia mainstream e documentos oficiais | Mapear o consenso inicial, **quem o sustenta** e **quem lucra** com ele (`Cui Bono`). |
| **2** | **Ciencia Forense & White Papers** | PubMed, Europe PMC, CrossRef, OpenAlex, arXiv, Retraction Watch, PubPeer | Avaliar desenho do estudo, amostra, replicacao, **financiamento**, **conflitos de interesse** e **retratacoes**. |
| **3** | **Comunidades Independentes** | Reddit, GitHub, Hacker News, Stack Exchange, Lobste.rs, LWN | Extrair padroes recorrentes de relatos praticos, issues com repro e contestacoes independentes. |
| **4** | **Garimpo Arqueologico (Small Web)** | Tumblr (`tumblr.com`), Blogger (`blogspot.com`), Wayback Machine (`web.archive.org`), Neocities, Bearblog, canais pequenos | Resgatar dissidencias, relatos humanos de primeira mao e acervos pre-SEO comercial. |
| **5** | **Multipolo Poliglota (15+ Jurisdicoes + Sul Global)** | Alemanha (`de`), Italia (`it`), Franca (`fr`), China (`zh`), Japao (`ja`), Coreia do Sul (`ko`), Singapura (`en/zh/ms`), India (`hi/en`), Mexico (`es-MX`), Brasil (`pt-BR`), Turquia (`tr`), Noruega (`no`), Dinamarca (`da`), Mundo Arabe (`ar`) e Sul Global (`GLOBAL_SOUTH`) | Buscar **nos idiomas originais**, citar sempre **[Trecho no Idioma Original + Traducao Fiel]** e documentar **o que muda fora dos EUA e por que**. |
| **6** | **Cruzamento Tripartido & Steelman** | Toda a base coletada | Separar `FATO | INTERPRETACAO | RELATO`, atribuir Grau `A` a `D`, testar `H-DOM` vs `H-RIV-1/2` e formular o **Steelman da Posicao Minoritaria**. |

---

## 5. Taxonomia Tripartida (`FATO | INTERPRETACAO | RELATO`) e Graus `A..D`

### 5.1 Natureza Ontologica
- **`FATO`:** Dado empirico mensurado, documento normativo, codigo-fonte, registro publico ou parametro replicado.
- **`INTERPRETACAO`:** Tese analitica, inferencia causal ou explicacao teorica construida sobre dados.
- **`RELATO`:** Testemunho individual, experiencia vivida em comunidade ou depoimento em Small Web.

### 5.2 Regra Deterministica de Graduacao (`gradeEvidenceClaim`)
- **Grau `A` (Solida):** Reservado exclusivamente a `FATO` com `>= 2` origens independentes (`origin_fingerprint` distintos), `entailment_checked: true`, sem conflito de interesse nao mitigado e sem falha de replicacao.
- **Grau `B` (Moderada/Consistente):** `FATO` com 1 origem independente verificada ou `INTERPRETACAO` com `>= 2` origens independentes sem conflito nao mitigado (teto de `INTERPRETACAO` = `B`).
- **Grau `C` (Preliminar/Relato):** `RELATO` documentado em primeira mao (teto de `RELATO` = `C`), `INTERPRETACAO` de fonte unica, ou `FATO` com conflito de interesse nao mitigado sem replicacao independente.
- **Grau `D` (Fraca/Descartavel):** Fonte **retratada (`RETRACTED`)**, material promocional/marketing, boato nao verificado, ou `RELATO` sem verificacao de entailment.

---

## 6. Checklist Pre-Entrega (3 Portoes Inviolaveis)
1. **Sem fonte -> remova:** Qualquer afirmacao sem `[F#]`, URL e data sai do texto.
2. **Vies americano -> corrija:** Se a resposta so reflete EUA/midia em ingles, reexecute o Estrato 5 (incluindo Sul Global e mundo arabe) e reescreva o delta.
3. **Personalizacao -> apague:** Remova qualquer mencao a conversas anteriores, perfil do usuario ou preferencias nao presentes no prompt da missao.
