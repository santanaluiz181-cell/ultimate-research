# Metodologia de Filtragem de Ruído e Qualidade de Informação (`deslop-methodology`)

**Versão do Sistema:** Super Deslop Search v1.1.0 (MIT License)  
**Mecanismo de Execução Local:** `c:/Users/tharcio/Downloads/DESLOP SEARCH SKILL/dist/cli.js`  
**Bridge de Integração:** `scripts/deslop-bridge.mjs`  
**Papel Operacional:** Higienização de consultas de busca, expurgo de SEO parasita e detecção estatística de conteúdo de baixa densidade  

---

## 1. Arquitetura de Integração e Ferramentas Disponíveis

O ecossistema Ultimate Research integra diretamente o motor do Super Deslop Search através de duas interfaces determinísticas: CLI e MCP Tools.

### 1.1 As 6 Ferramentas MCP Registradas
1. `deslop_build_query`: Constrói strings de busca aplicando dorks anti-slop, blocos de exclusão de domínios e parâmetros cirúrgicos.
2. `deslop_split_horizon`: Divide a busca em janelas temporais de horizontes divididos (ex: histórico canônico vs. contemporâneo).
3. `deslop_classify_slop`: Executa classificação estatística $O(N)$ em textos para mensuração de densidade e padrões sintéticos.
4. `deslop_filter_results`: Filtra arrays de resultados brutos de busca descartando domínios da blacklist e snippets ruidosos.
5. `deslop_route_channels`: Roteia termos para canais comunitários especializados (GitHub, Reddit, StackOverflow, HN).
6. `deslop_get_metadata`: Extrai metadados estruturados de artigos e páginas para auditoria de proveniência.

### 1.2 Comandos Oficiais da CLI do Super Deslop
Executáveis via Node.js local no caminho canônico:
`node "c:/Users/tharcio/Downloads/DESLOP SEARCH SKILL/dist/cli.js" [COMANDO]`

- `query`: Gera dorks otimizados com base em palavras-chave e modo ativo.
- `live`: Dispara busca ao vivo aplicando filtros em tempo real.
- `split`: Calcula e divide faixas temporais com base na data de corte informada.
- `routes`: Exibe ou seleciona os canais comunitários configurados.
- `classify`: Avalia arquivo ou string retornando score numérico de slop e quebras métricas.
- `filter`: Aplica lista de bloqueio e critérios heurísticos em lista de URLs ou JSON de resultados.
- `verify`: Executa auditoria automatizada de citações em arquivo markdown (`ARS Engine`).

---

## 2. O Motor de Dorks e Limites de Operadores (Dork Engine)

Os motores de busca modernos degradam silenciosamente ou truncam consultas quando limites de operadores booleanos são excedidos. O Deslop gerencia esses limites rigorosamente:

### 2.1 Limites Físicos de Operadores por Provedor
- **Google Search:** Teto rígido de **32 operadores/termos**. O Deslop prioriza exclusões de maior peso e aplica `udm=14` (modo Web puro, removendo snippets de IA e carrosséis comerciais patrocinados).
- **DuckDuckGo:** Teto de **24 operadores**.
- **Brave Search:** Teto de **28 operadores**.
- **Bing Search:** Teto de **25 operadores**.

### 2.2 Gerenciamento de Listas de Bloqueio (`blocklist.json`)
A blacklist do Deslop é estratificada por categorias de ruído:
- `seo_farms`: Fazendas de conteúdo que geram artigos superficiais para monetização programática.
- `ai_aggregators`: Portais que indexam resumos gerados por LLM sem curadoria humana.
- `marketing_spam`: Domínios corporativos focados em conversão de vendas, não em documentação técnica.
- `scraper_mirrors`: Clones automáticos do GitHub ou StackOverflow que adicionam anúncios e quebram a navegação.

---

## 3. Roteador Comunitário (`sources.json`)

Para evitar o filtro de SEO da web aberta, o Deslop inclui rotas diretas para acervos onde a densidade técnica e a verificação entre pares são historicamente superiores:

| Canal Comunitário | Modificadores / Dorks Aplicados | Finalidade de Pesquisa |
|---|---|---|
| **GitHub Issues / PRs** | `site:github.com inurl:issues OR inurl:pull` | Bugs não documentados, discussões de design, regressões de versão. |
| **StackOverflow** | `site:stackoverflow.com -site:meta.stackoverflow.com` | Soluções pontuais de erro, snippets de código validados por votos. |
| **Hacker News (YCombinator)** | `site:news.ycombinator.com` | Análises de viabilidade arquitetural, debates de mercado e post-mortems. |
| **Reddit Técnico** | `site:reddit.com/r/[subreddit_tecnico]` | Experiências empíricas de operadores em produção e relatos de hardware. |
| **Engineering Blogs** | Acervo de domínios corporativos de engenharia (ex: Netflix, Uber, Cloudflare, Meta) | Padrões de arquitetura de alta escala e lições aprendidas. |
| **Indie Forums / Listas** | Comunidades independentes e listas de discussão (LWN, Lobste.rs) | Discussões de baixo nível, kernel, segurança ofensiva e padrões web. |

---

## 4. Classificador Estatístico de Slop $O(N)$ (`SlopClassifier`)

Diferente de detectores opacos de IA baseados em modelos neurais pesados (que sofrem de altas taxas de falsos positivos em textos técnicos), o `SlopClassifier` utiliza análise estatística e léxica determinística em complexidade $O(N)$:

### 4.1 Métricas de Variabilidade Estrutural
- **Coeficiente de Variação do Tamanho de Parágrafo (CV Parágrafo):**
  $$CV = \frac{\sigma}{\mu}$$
  Textos gerados por LLMs padrão tendem a uma uniformidade mecânica monótona. Um $CV < 0.18$ indica forte indício de padronização sintética.
- **Coeficiente de Variação do Comprimento de Sentenças (CV Sentença):**
  Sentenças humanas alternam períodos curtos e longos organicamente. Um $CV < 0.24$ atua como alerta de estrutura rítmica artificial.
- **Detecção de Listas com Negrito e Dois-Pontos (Bold-Colon Listicles):**
  Identificação frequente do padrão `**Termo:** Explicação genérica...` repetido sucessivamente em 5 ou mais itens.
- **Bônus de Densidade Técnica:**
  A presença de símbolos literais de código, identificadores em snake_case/camelCase, caminhos de arquivo (`/usr/bin`, `C:\...`), flags CLI (`--config`) e números de artigos de lei concede um **bônus negativo de até -0.22 no score final de slop**, blindando o texto técnico contra falsos positivos.

---

## 5. Guarda-Costas Epistêmico Obrigatório (`classifyWithEpistemicGuardrail`)

> **REGRA DE SEGURANÇA MÁXIMA:** A classificação de slop é estritamente um **sinal heurístico de triagem**, NUNCA uma prova cabal de falsidade fática ou de autoria por IA.

### 5.1 O Princípio da Imunidade Documental Primária
Documentos primários oficiais, dispositivos legais, acórdãos judiciais, RFCs e especificações de engenharia frequentemente exibem:
- Vocabulário repetitivo e fórmulas canônicas sacramentadas pelo direito ou pela norma técnica.
- Coeficiente de variação de parágrafos baixo devido à estrutura regimental (artigos, incisos e alíneas).
- Listas estruturadas com termos em destaque.

### 5.2 Implementação do Override
Se uma fonte for identificada como **Tier 1 (Base Oficial / Norma Primária / Repositório Canônico)**, a função `classifyWithEpistemicGuardrail` DEVE forçar o descarte sumário de qualquer alerta de slop linguístico:

```javascript
// Contrato Lógico do Guarda-Costas Epistêmico
function classifyWithEpistemicGuardrail(document, tier) {
  if (tier === 1 || isOfficialGovernmentOrJudicialDomain(document.url)) {
    return {
      slopScore: 0.0,
      classification: "CLEAN_PRIMARY_OVERRIDE",
      action: "PRESERVE_UNCONDITIONALLY",
      reason: "Documento oficial/primário imune a descarte por heurística de estilo."
    };
  }
  return standardSlopClassification(document);
}
```

Nenhum diário oficial, acórdão do TJTO ou commit em branch master pode ser descartado da matriz de evidências sob pretexto de "estilo sintético". A verdade do fato precede o estilo da redação.
