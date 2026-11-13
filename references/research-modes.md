# Manual Operacional dos 8 Modos Canônicos de Pesquisa (`research-modes`)

**Versão:** v3.5  
**Estrutura Epistêmica:** Catálogo Operacional de Modos de Pesquisa Especializados  
**Governança:** Queen Orchestrator & Contratos de Alocação de Subagentes  

---

## 1. Tabela Comparativa de Decisão e Alocação de Recursos

| Modo de Pesquisa | Orçamento de Subagentes | Trilhas Temporais | Fontes Prioritárias | Auditoria ARS | Regra Anti-Overengineering |
|---|---|---|---|---|---|
| **MODE 1: QUICK** | 0 a 1 (`flash_lite`, 1 onda) | Lane B direta | Documentação primária, status pages, repositórios | Heurística leve | Proibido decomposição complexa ou subagentes paralelos; resposta em 1 turno. |
| **MODE 2: DEEP** | 2 a 4 (`flash_lite`/`flash`, 2-3 ondas) | Lanes A, B e C | Literatura técnica, papers, RFCs, GitHub, órgãos reguladores | Completa (`--strict`) | Suspender buscas assim que saturação atingir <15% de novidade; não buscar além da resposta. |
| **MODE 3: ACADEMIC** | 2 a 3 (`flash_lite`, 2 ondas) | Lanes A e B | Periódicos revisados por pares, CrossRef, OpenAlex, arXiv | Rigorosa (DOIs e autores) | Focar em evidências metodológicas; proibir citação de pré-prints sem aviso de não revisão. |
| **MODE 4: JOURNALISTIC** | 2 a 4 (`flash_lite`, 2 ondas) | Lane B e C | Investigação autoral, atas, contratos públicos, fontes primárias | Completa (Anti-Eco) | Banir agregação de fofoca; releases corporativos exigem contraponto de dados brutos. |
| **MODE 5: TECHNICAL** | 1 a 3 (`flash_lite`, 1-2 ondas) | Lane B e A | Código-fonte, commits, issues com repro, documentação oficial | Técnica (Código/Flags) | Proibido tutoriais genéricos; foco em símbolos literais, stacktraces e benchmarks. |
| **MODE 6: MARKET / CI** | 2 a 3 (`flash_lite`, 2 ondas) | Lane B contemporânea | Demonstrações contábeis (CVM/SEC), relatórios setoriais, dados de tráfego | Verificação de Dados | Separar projeções de consultoria de faturamento real auditado; evitar hype de vendas. |
| **MODE 7: LEGAL** | 2 a 4 (`flash_lite`, 2 ondas) | Lanes B, C e A | Diários Oficiais, eproc, LexML, acórdãos dos tribunais (STF/STJ/TJTO) | Rigorosa (CNJ Mod 97) | Restrição estrita a domínios `*.jus.br`, `*.gov.br` e `lexml.gov.br`; banir artigos de blog. |
| **MODE 8: FACT-CHECKING** | 2 a 3 (`flash_lite`, 2 ondas) | Lane C e B | Registros civis, bases estatísticas oficiais, vídeos brutos, declarações | Exaustiva (Entailment) | Emitir estritamente um dos 6 vereditos canônicos; nunca confundir ausência de prova com mentira. |

---

## 2. Contratos Operacionais dos Modos de Pesquisa

### MODE 1: QUICK (Triagem Rápida e Factual)
- **Gatilho:** Consultas pontuais sobre sintaxe de comando, versão de pacote, localização de arquivo ou significado de código de erro.
- **Topologia:** Execução síncrona pela Queen ou no máximo 1 subagente `flash_lite`.
- **Artefatos:** Dispensa `UR-PLAN` formal completo; gera resposta direta estruturada com citação imediata de URL.
- **Regra de Ouro:** Se a resposta puder ser resolvida em uma única consulta com dork cirúrgico, encerre o ciclo.

### MODE 2: DEEP (Investigação Exaustiva Multilateral)
- **Gatilho:** Problemas de alta complexidade técnica, arquitetura de sistemas corporativos, trade-offs de engenharia sem solução óbvia ou investigações históricas profundas.
- **Topologia:** Orquestrador Queen + 2 a 4 subagentes leves disparados em ondas sucessivas de busca.
- **Artefatos:** Obrigatoriedade de `UR-PLAN`, `UR-EVMAT`, `UR-ARS` e `UR-REPORT`.
- **Regra de Ouro:** Nenhuma hipótese central pode ser considerada validada sem que tenha sido ativamente testada contra um vetor de falsificação ou dissent.

### MODE 3: ACADEMIC (Rigor Científico e Bibliográfico)
- **Gatilho:** Revisões de literatura, validação de teorias biomoleculares, análise de modelos de IA, estatística e matemática pura.
- **Topologia:** Subagentes direcionados a APIs de repositórios científicos (CrossRef, OpenAlex, Semantic Scholar, arXiv, Europe PMC).
- **Validação de Referências:** 100% dos papers citados devem ter seu DOI verificado programaticamente, confirmando primeiro autor, periódico e ano.
- **Regra de Ouro:** Pre-prints devem ser explicitamente rotulados com a ressalva "Aguardando revisão por pares".

### MODE 4: JOURNALISTIC (Investigação e Apuração Editorial)
- **Gatilho:** Pautas do ecossistema Meu Amigo Jornalista, verificação de denúncias, apuração de contratos públicos ou cobertura de eventos com impacto cívico.
- **Topologia:** Subagentes vasculhando portais de transparência, diários oficiais, bases da Receita Federal e arquivos históricos.
- **Anti-Câmara de Eco:** Desduplicação estrita de releases de agências de notícias via `origin_fingerprint`. Se dez jornais replicaram a mesma nota de assessoria, a informação é tratada como fonte única `[single-source]`.
- **Regra de Ouro:** Separação rígida entre o fato apurado e a declaração do porta-voz.

### MODE 5: TECHNICAL (Engenharia de Software e Sistemas)
- **Gatilho:** Depuração de memory leaks, deadlocks, concorrência, engenharia reversa de protocolos, otimização de queries de banco de dados e testes de compatibilidade.
- **Topologia:** Subagentes consultando código-fonte em repositórios abertos, changelogs, issues de bug tracking e documentações de engenharia de baixo nível.
- **Regra de Ouro:** Se a issue do GitHub tiver reprodução de código (`repro`) confirmada e o documento oficial afirmar que o recurso funciona normalmente, reporte a falha empírica real.

### MODE 6: MARKET / COMPETITIVE INTELLIGENCE (Inteligência Competitiva e Negócios)
- **Gatilho:** Mapeamento de concorrentes, análise de pricing de SaaS, estimativas de market-share, due diligence e levantamento de tendências de tecnologia.
- **Sub-Modo Competitive Intelligence (CI):** Foco em desmontagem da stack tecnológica de concorrentes via engenharia reversa de headers, bundles JS e contratos de API abertos.
- **Regra de Ouro:** Proibido aceitar números de mercado divulgados pelo marketing da própria empresa avaliada sem confronto com relatórios fiscais auditados (CVM, SEC 10-K) ou métricas de tráfego de terceiros.

### MODE 7: LEGAL (Direito Público e Poder Judiciário - TJTO / CNJ / STJ / STF)
- **Gatilho:** Elaboração de minutas de sentenças, pareceres de gabinetes judiciários, análise de recursos, conformidade com a Lei de Licitações e atos do eproc.
- **Topologia:** Subagentes com restrição estrita a domínios governamentais e judiciários oficiais: `*.jus.br`, `*.gov.br`, `lexml.gov.br`.
- **Validação Específica:**
  - Numeração processual validada pelo algoritmo ISO 7064 Módulo 97-10 (Resolução CNJ 65/2008).
  - Consulta ao Diário da Justiça Eletrônico do Tocantins (DOE-TJTO) e Sistema eproc.
  - Bloqueio sumário de artigos opinativos do Jusbrasil.
- **Regra de Ouro:** Jamais aplicar artigo de lei revogado tacitamente ou expressamente; sempre verificar se o STF ou STJ firmou tese vinculante em tema de repercussão geral ou repetitivo.

### MODE 8: FACT-CHECKING (Checagem Rigorosa de Fatos)
- **Gatilho:** Validação de discursos políticos, boatos virais de redes sociais, alegações estatísticas controvertidas ou peças de desinformação.
- **Topologia:** Busca regressiva até o documento primário originador da informação (certidão civil, boletim de ocorrência, microdados do IBGE, áudio integral da fala).
- **Os 6 Vereditos Canônicos Invariantes:**
  1. **CONFIRMADO:** A afirmação é 100% verdadeira, exata e sustentada por documentos primários de Tier 1.
  2. **PARCIALMENTE CONFIRMADO:** A premissa central é verdadeira, mas há imprecisões em números secundários ou datas.
  3. **ENGANOSO:** A informação usa dados verdadeiros fora de contexto histórico ou estatístico para induzir a uma conclusão distorcida.
  4. **FALSO:** A afirmação contradiz frontalmente os dados primários verificados ou decorre de documento forjado.
  5. **NÃO COMPROVADO:** Não há base documental nem registros públicos que atestem ou infirmem a alegação.
  6. **INCONCLUSIVO:** As fontes de Tier 1 e Tier 2 apresentam dados metodologicamente contraditórios e inconciliáveis.
- **Regra Epistêmica Suprema:** Ausência de prova de uma afirmação jamais pode ser classificada como "FALSO". Se não há registros, o veredito obrigatório é "NÃO COMPROVADO".
