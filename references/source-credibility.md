# Sistema Contextual de Credibilidade e Proveniência de Fontes (`source-credibility`)

**Classificação:** Sistema Epistêmico de 4 Camadas (4-Tier Provenance Framework)  
**Objetivo:** Avaliação crítica, rastreamento de linhagem de dados e combate determinístico ao efeito câmara de eco  

---

## 1. O Sistema de Proveniência em 4 Camadas (4-Tier Framework)

A credibilidade de uma fonte não é uma propriedade mística de sua reputação de marca, mas sim da proximidade direta entre o documento e o fato observado.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TIER 1: EVIDÊNCIA PRIMÁRIA & REGISTROS OFICIAIS CANÔNICOS              │
│ - Leis, diários oficiais (DOU, DOE-TJTO), provimentos, acórdãos        │
│ - Código-fonte versionado em branch oficial, releases assinadas, RFCs  │
│ - Dados brutos de sensores, telemetria de produção, datasets públicos  │
│ - Contratos assinados, certidões públicas com fé de ofício             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Derivação / Análise
┌───────────────────────────────────▼────────────────────────────────────┐
│ TIER 2: INSTITUIÇÕES RECONHECIDAS, PEER-REVIEW & JORNALISMO EDITORIAL  │
│ - Artigos científicos revisados por pares (com DOI ativo)              │
│ - Relatórios de institutos de pesquisa consagrados (INPE, IBGE, IEEE)  │
│ - Jornalismo investigativo com linha editorial identificada e checagem │
│ - Pareceres e livros doutrinários de especialistas com afiliação clara │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Discussão / Prática
┌───────────────────────────────────▼────────────────────────────────────┐
│ TIER 3: COMUNIDADES TÉCNICAS QUALIFICADAS & RELATOS INDEPENDENTES      │
│ - Issues, PRs e discussões públicas no GitHub / GitLab com reprodução  │
│ - Fóruns de engenharia especializados (StackOverflow, Hacker News)     │
│ - Post-mortems de engenharia assinados por operadores de infraestrutura│
│ - Análises independentes de segurança e engenharia reversa empírica    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Agregação / Opinião
┌───────────────────────────────────▼────────────────────────────────────┐
│ TIER 4: PORTAIS COMERCIAIS, AGREGADORES E AUTORIA OPACA               │
│ - Posts de blogs corporativos focados em marketing e SEO               │
│ - Artigos de agregadores de notícias sem equipe editorial própria      │
│ - Tutoriais superficiais de conteúdo genérico e fóruns anônimos        │
│ - Releases de relações públicas corporativas distribuídos em massa     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Nuances Operacionais e Exceções Epistêmicas

Nenhum sistema hierárquico rígido pode substituir o discernimento crítico quanto à adequação da fonte à alegação concreta (`fitness-for-claim`). As seguintes regras de nuance são de cumprimento obrigatório:

### 2.1 A Ressalva do Release Institucional (Tier 1 vs. Autopromoção)
- Um release oficial da assessoria de imprensa de um órgão ou empresa pública tem proveniência Tier 1 para atestar o **fato institucional** de que a declaração foi emitida.
- **Entretanto:** Esse mesmo release **NUNCA** pode ser aceito como prova independente de impacto social, eficácia de programa ou ausência de falhas.  
  *Exemplo:* O release do órgão afirma que "o novo sistema judicial reduziu os prazos processuais em 70%". Isso é um Fato Atribuído da assessoria; não é prova científica do tempo médio sem auditoria externa de métricas do banco de dados (eproc).

### 2.2 A Antecipação Empírica do Tier 3 (Bugs de Produção e Realidade Prática)
- Uma issue no GitHub ou relato no fórum de discussão de desenvolvedores (Tier 3), contendo reprodução de código mínima (`repro`) e stacktrace, possui **maior valor epistêmico para atestar a existência de uma falha de software** do que a documentação oficial da biblioteca (Tier 1), que frequentemente omite o bug até a liberação do patch.
- A documentação de Tier 1 costuma apresentar o comportamento pretendido (`intended behavior`), enquanto o relato empírico de Tier 3 documenta o comportamento real em produção (`actual behavior`).

### 2.3 Proibição de Pontuações Numéricas Arbitrárias
- É estritamente vedado converter a avaliação de credibilidade em um número arbitrário fictício (ex: "esta fonte tem nota 8.7/10").
- A credibilidade deve ser justificada por argumentos objetivos: adequação metodológica, transparência de dados, ausência de conflito de interesses e comprovação da cadeia de custódia da informação.

---

## 3. Independência Editorial e Desduplicação Anti-Câmara de Eco (`origin_fingerprint`)

Um dos maiores indutores de erro em pesquisas automatizadas é a **falsa corroboração multilateral**, onde múltiplos sites repetem a exata mesma informação gerada por uma única fonte primária.

### 3.1 Identificação de Sindicância de Notícias (Wire Syndication)
Se dez portais de notícias publicam o mesmo despacho distribuído pela Reuters, Agência Brasil ou PR Newswire:
- Não existem 10 fontes independentes atestando o fato.
- Trata-se de **uma única fonte primária** replicada dez vezes por syndication.
- **Ação:** O sistema deve atribuir um único `origin_fingerprint` (ex: `wire:agenciabrasil`) e computar a informação como evento único.

### 3.2 O Marcador Obrigatório de Fonte Única (`[single-source]`)
Sempre que uma alegação crítica, valor financeiro, métrica de desempenho ou denúncia depender exclusivamente de um único documento, autor ou registro institucional:
1. O registro na Matriz de Evidências deve receber o marcador explícito `[single-source]`.
2. O Relatório Final deve destacar visualmente a condição de fonte única, impedindo que o leitor ou magistrado presuma que houve corroboração cruzada.
3. Se a fonte única for de Tier 3 ou 4, a alegação não pode ser apresentada como fato estabelecido, mas sim como alegação isolada pendente de confirmação.

---

## 4. Tabela de Arbitragem em Caso de Conflito de Fontes

| Cenário de Conflito | Fonte A | Fonte B | Resolução Epistêmica |
|---|---|---|---|
| **Norma Legal vs. Artigo de Blog** | Lei Federal / DOE (Tier 1) | Artigo no Jusbrasil (Tier 4) | Prevalece a Lei Federal. O artigo de blog é sumariamente desconsiderado. |
| **Comportamento Declarado vs. Falha Real** | Documentação Oficial da Lib (Tier 1) | Issue no GitHub com repro (Tier 3) | Documenta-se a discrepância: o software deveria funcionar como em A, mas falha empiricamente como em B. |
| **Release Corporativo vs. Artigo Científico** | Whitepaper da Empresa (Tier 4) | Paper Peer-Reviewed (Tier 2) | Prevalece o artigo revisado por pares em metodologia e conclusões de benchmark. |
| **Dois Acórdãos em Sentidos Opostos** | Acórdão TJTO (Tier 1) | Acórdão STJ (Tier 1) | Registra-se a divergência de tese; destaca-se a hierarquia recursal e a competência de uniformização do STJ. |
