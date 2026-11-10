# Manual de Busca e Engenharia de Prompt para Motores de Pesquisa (`perplexity-prompting`)

**Versão do Protocolo:** v3.5  
**Origem Metodológica:** Joel Helbling & Nate B. Jones (MIT License) + Extensões de Especialidade Judiciária TJTO  
**Finalidade:** Governança determinística de consultas para motores de busca agêntica e interfaces RAG de alta fidelidade  

---

## 1. Epistemologia RAG Voltada para Fora vs. Pesos Internos da LLM

Modelos de linguagem treinados em pesos estáticos sofrem de ilusão de completude: tentam responder a partir de correlações probabilísticas internas, resultando em anacronismos, alucinação de dados numéricos e viés de complacência.

A arquitetura do Ultimate Research adota a **Epistemologia RAG Voltada para Fora (Outward-Focused Epistemology)**:
- Os pesos da LLM servem exclusivamente como **processador de raciocínio, sintaxe e extração estruturada**.
- O repositório canônico da verdade reside na **camada externa de evidências** (artigos primários, códigos-fonte, acórdãos e diários oficiais).
- Se um fato não puder ser ancorado em um trecho comprovável recuperado da busca externa, ele não deve ser inferido.

---

## 2. Otimização de Consultas Pré-Busca (Pre-Search Query Optimization)

### 2.1 Regra do Contexto de Domínio Cirúrgico (2 a 3 Palavras)
Motores de busca não interpretam prosa conversacional com a mesma fidelidade de uma LLM. Consultas formuladas como perguntas humanas completas disparam algoritmos de SEO semântico que priorizam artigos comerciais superficiais.
- **Incorreto (Prosa Ruidosa):** `"gostaria de saber como eu faço para debugar um memory leak no nodejs quando estou usando buffers"`
- **Correto (Cirúrgico):** `"nodejs buffer memory leak debug heapdump"`

### 2.2 Eliminação de Gordura de SEO (SEO Fat Stripping)
Remover ativamente stop-words e termos indutores de spam promocional:
- Banir: `melhores práticas`, `guia definitivo`, `como fazer fácil`, `tutorial para iniciantes`, `top 10`, `overview`, `vantagens e desvantagens`.
- Injetar âncoras técnicas duras: nomes literais de flags (`--max-old-space-size`), identificadores de classes (`ByteBuf`, `WorkerPool`), status codes (`HTTP 502`), ou números de artigos legais (`art. 537 CPC`).

### 2.3 Proibição Estrita de Exemplos Few-Shot dentro da Query (Semantic Narrowing Trap)
> **ALERTA CRÍTICO:** É terminantemente proibido incluir exemplos few-shot ou trechos de respostas esperadas dentro da string de busca.
- **O Fenômeno do Estreitamento Semântico (Semantic Narrowing Trap):** Quando a query contém um exemplo artificial, o motor de busca restringe a recuperação aos documentos que contêm exatamente aquele exemplo irrelevante, ignorando a literatura mais ampla ou achados contrários. A query deve ser puramente denotativa.

---

## 3. Âncoras Temporais Numéricas Explícitas

Termos como `"recente"`, `"últimas notícias"`, `"atualizado"`, `"moderno"` ou `"hoje"` são desprovidos de valor semântico para crawlers de busca, pois índices web consideram páginas de 2017 atualizadas se o timestamp de cache tiver mudado ontem.

Substitua adjetivos por delimitadores temporais estritos:
- Operadores de Janela: `after:2024-01-01`, `before:2026-03-01`, `since 2025-10`.
- Faixas Numéricas: `2024..2026`, `v4..v5`.
- Marco Histórico: `pós-Resolução CNJ 65/2008`, `React 19 release notes`.

---

## 4. Dispersão de Consultas Multiperspectiva e Aprofundamento Progressivo

### 4.1 Abordagem Multiperspectiva (Query Fan-Out)
Toda investigação complexa exige a emissão de no mínimo três vetores simultâneos de busca:
1. **Vetor Baseline / Padrão:** Mapeamento da tese hegemônica ou implementação de referência.  
   *Ex:* `"vllm pagedattention architecture throughput benchmark"`
2. **Vetor de Falsificação / Dissent:** Busca de falhas, vulnerabilidades, contra-argumentos ou bugs conhecidos.  
   *Ex:* `"vllm pagedattention memory fragmentation crash issue github"`
3. **Vetor de Borda / Concorrência:** Comportamento sob condições anômalas ou comparação com alternativas.  
   *Ex:* `"vllm vs sglang memory footprint real world latency"`

### 4.2 Aprofundamento Progressivo (Progressive Deepening)
- **Etapa 1 (Taxonomia Ampla):** Varredura de alto nível para identificar os símbolos, autores e órgãos reguladores relevantes.
- **Etapa 2 (Drill-Down em Ramificações):** Identificados os módulos centrais ou temas controversos, as consultas subsequentes miram diretamente repositórios git, artigos de lei ou issues específicas.

---

## 5. Restrições Anti-Alucinação na Saída da Busca

Ao orientar a recuperação agêntica ou formatar instruções para o motor de busca:
- Exigir identificação obrigatória de **URL canônica**, **seção/capítulo**, **número do artigo** ou **linha de código**.
- Proibir paráfrases desprovidas de citação direta.
- Caso a consulta não retorne resultados exatos, a instrução deve ser: "Reportar ausência de dados empíricos" em vez de tentar interpolar.

---

## 6. Seleção Condicional de Ferramentas: Perplexity MCP vs. Fallback Nativo

```
                  ┌────────────────────────────────────────┐
                  │    Perplexity MCP está disponível?     │
                  └──────────────────┬─────────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │ SIM                           │ NÃO
                     ▼                               ▼
       ┌───────────────────────────┐   ┌───────────────────────────┐
       │ Seleção de Ferramenta MCP │   │  Fallback Nativo Antigrav │
       │                           │   │                           │
       │ - perplexity_search (raw) │   │ 1. search_web (Google API)│
       │ - perplexity_ask (pro)    │   │ 2. playwright MCP (CDP)   │
       │ - perplexity_research     │   │ 3. super-deslop-search CLI│
       │ - perplexity_reason (CoT) │   │ 4. REST APIs Oficiais     │
       └───────────────────────────┘   └───────────────────────────┘
```

### 6.1 Regras de Roteamento Perplexity MCP (Quando Presente)
- `perplexity_search`: Para recuperação de listas brutas de URLs indexadas e metadados rápidos sem síntese de LLM.
- `perplexity_ask`: Consultas factuais simples de resposta direta (modelo Sonar-Pro).
- `perplexity_research`: Investigações exaustivas de múltiplos passos que exigem rastreamento profundo de fontes (Sonar-Deep-Research).
- `perplexity_reason`: Trade-offs arquiteturais, análises lógicas complexas ou conciliação de teses divergentes (Sonar-Reasoning-Pro com Chain-of-Thought).

### 6.2 Fallback Obrigatório Nativo do Antigravity (Quando Perplexity MCP Ausente)
> **REGRA INVIOLÁVEL:** Jamais simule ou emule chamadas de ferramentas MCP inexistentes. Se o MCP do Perplexity não estiver registrado no ambiente, execute o fallback nativo com ferramentas reais:
1. `search_web`: Executar dorks cirúrgicos diretamente no motor nativo.
2. `playwright MCP`: Acessar páginas canônicas, renderizar JavaScript e extrair o DOM com fidelidade visual.
3. `super-deslop-search CLI`: Executar `node "c:/Users/tharcio/Downloads/DESLOP SEARCH SKILL/dist/cli.js" query ...` para aplicação de dorks anti-slop e roteamento comunitário.
4. `REST APIs Oficiais`: Consumir diretamente CrossRef, OpenAlex, LexML, DJEN ou GitHub API.

---

## 7. Roteador Dinâmico de Modos: Universal vs. Especialista Judiciário TJTO

### 7.1 Modo Universal (Engenharia, Computação e Ciências)
- **Foco:** Documentação oficial, repositórios de código aberto (GitHub, GitLab), RFCs, Whitepapers, preprints e papers revisados por pares.
- **Filtro Anti-Ruído:** Bloqueio de portais de tutoriais superficiais agregadores (ex: GeeksforGeeks, Medium sem código, w3schools desatualizado).
- **Dorks Típicos:** `site:github.com`, `site:arxiv.org`, `site:developer.mozilla.org`, `filetype:pdf`.

### 7.2 Modo Especialista Judiciário (Gatilho TJTO / Direito Público)
Ativado automaticamente na presença de termos como: `TJTO`, `eproc`, `tribunal`, `CNJ`, `alvará`, `processo`, `mandado de segurança`, `precatório`, `CPC`, `CPP`.

- **Restrição de Domínios Mandatória:**
  - `*.jus.br` (Tribunais de Justiça, STF, STJ, TST, CNJ)
  - `*.gov.br` (Legislação Federal, DOU, Ministério da Justiça)
  - `lexml.gov.br` (Rede de Informação Legislativa e Jurídica)
- **Blacklist Estrita:**
  - Bloqueio sumário de `jusbrasil.com.br/artigos` (artigos opinativos de marketing de advogados).
  - Bloqueio de blogs advocatícios comerciais de captação de clientes.
  - *Exceção:* Jurisprudência pura em `jusbrasil.com.br/jurisprudencia` só é aceita para obtenção do número do processo para posterior conferência no tribunal de origem.
- **Os 3 Vetores Normativos Oficiais:**
  1. *Vetor Superior / CNJ:* Resoluções do CNJ, súmulas vinculantes do STF e recursos repetitivos do STJ.
  2. *Vetor Estadual / DOE:* Atos da Presidência do TJTO, Corregedoria-Geral da Justiça e Diário da Justiça Eletrônico do Tocantins.
  3. *Vetor de Infraestrutura Judiciária:* Manuais técnicos do eproc, normas do ICP-Brasil, Banco Nacional de Medidas Penais (BNMP) e Plataforma Digital do Poder Judiciário (PDPJ-Br).
