# Matriz de Triangulação de Evidências (`UR-EVMAT`)

**Identificador do Registro:** `UR-EVMAT-[DATA]-[ID_CURTO]`  
**Plano Vinculado:** `[UR-PLAN-YYYYMMDD-XXXX]`  
**Fase do Pipeline:** Fase 7 - Triangulação e Síntese de Evidências  
**Total de Evidências Catalogadas:** `[N]`  
**Evidências Confirmadas por Triangulação Independente:** `[N]`  
**Evidências Críticas de Fonte Única `[single-source]`:** `[N]`  

---

## 1. Tabela Panorâmica de Evidências

| ID | Natureza da Afirmação | Resumo da Alegação | Tier | Origin Fingerprint | Triangulação | Confiança | Status Entailment |
|---|---|---|---|---|---|---|---|
| **EV-001** | `[Fato Observado]` | `[Descrição sucinta da alegação fática]` | Tier 1 | `[dominio-primario.org]` | `[Triangulada / 2 fontes]` | Alta | `[VERIFICADA]` |
| **EV-002** | `[Alegação Atribuída]` | `[Declaração atribuída a porta-voz ou réu]` | Tier 2 | `[portal-jornalistico.com]` | `[single-source]` | Média | `[VERIFICADA]` |
| **EV-003** | `[Opinião]` | `[Parecer doutrinário ou análise de mercado]` | Tier 2 | `[instituto-pesquisa.org]` | `[Convergente com EV-004]` | Média | `[VERIFICADA]` |
| **EV-004** | `[Hipótese]` | `[Causa provável de falha de concorrência]` | Tier 3 | `[github.com/org/repo]` | `[Em validação]` | Baixa | `[EXISTÊNCIA CONFIRMADA SEM ENTAILMENT]` |
| **EV-005** | `[Projeção]` | `[Estimativa de redução de custos em 2027]` | Tier 4 | `[relatorio-consultoria.com]` | `[single-source]` | Baixa | `[NÃO COMPROVADA]` |

---

## 2. Fichas Analíticas de Evidência (Block Cards)

### Ficha de Evidência: `EV-001`
- **ID da Evidência:** `EV-001`
- **Alegação Literal / Objeto:** `[Texto preciso e inequívoco da alegação analisada]`
- **Natureza Epistêmica:** `[Fato Observado | Alegação Atribuída | Opinião | Hipótese | Projeção]`
  - *Fato Observado:* Dado empírico mensurado, documento expedido, norma publicada, registro de log.
  - *Alegação Atribuída:* Declaração de terceiro ("o diretor afirmou que..."), exigindo atribuição exata.
  - *Opinião:* Interpretação subjetiva, juízo de valor, tese doutrinária isolada.
  - *Hipótese:* Suposição técnica ou teórica com base indutiva, sujeita a falsificação.
  - *Projeção:* Estimativa futura, modelagem probabilística ou prospectiva mercadológica.
- **Fonte Primária / Veículo:** `[Nome formal da publicação ou acervo]`
- **URL Canônica / Identificador Permanente:** `[https://... | DOI: 10.xxxx/... | Numeração CNJ]`
- **Autoria Individual / Institucional:** `[Nome do autor individual ou órgão/instituição emissora]`
- **Data de Publicação:** `[AAAA-MM-DD]`
- **Data do Acontecimento (quando distinta):** `[AAAA-MM-DD]`
- **Categoria da Fonte:** `[Normativa Oficial | Artigo Revisado por Pares | Repositório Técnico | Reportagem Investigativa | Fórum Técnico]`
- **Nível de Proveniência (Tier 1 a 4):**
  - `[TIER 1]` Documento original, base de dados pública oficial, código-fonte versionado, norma legal.
  - `[TIER 2]` Instituição científica de prestígio, periódico indexado, jornalismo investigativo editorial com checagem.
  - `[TIER 3]` Comunidade técnica qualificada, issues públicas com reprodução, engenharia reversa documentada.
  - `[TIER 4]` Blog comercial, portal agregador de SEO, assessoria de imprensa corporativa.
- **Trecho / Dado Comprobatório Literal:**
  > `"Trecho exato extraído do documento original contendo o dado, artigo ou conclusão citada."`
- **Origin Fingerprint (Anti-Eco e Independência Editorial):**
  - **Entidade Emissora Raiz:** `[Identificador do produtor original do dado]`
  - **Detecção de Agência de Notícias / Wire Syndication:** `[NÃO - Conteúdo autoral primário | SIM - Texto distribuído por Reuters/Agência Brasil/PR Newswire]`
  - **Fontes Dependentes Identificadas (Mesmo Fingerprint):** `[Lista de veículos secundários que apenas replicaram o release]`
- **Marcador de Fonte Única:** `[NENHUM - Corroborado por outras fontes independentes | FLAG: single-source]`
  > *Regra:* Caso uma alegação dependa de apenas um veículo ou documento, ela DEVE carregar o marcador `[single-source]` de forma visível no relatório final.
- **Triagem Deslop (Sinal vs. Override de Fonte Primária):**
  - **Score Heurístico de Slop:** `[Baixo (<0.35) | Moderado (0.35 - 0.65) | Alto (>0.65)]`
  - **Override de Fonte Primária:** `[APLICADO - Documento oficial ou técnico legítimo; score de slop descartado | NÃO APLICADO]`
  - *Guarda-costas Epistêmico:* Textos legais, certidões ou especificações técnicas com repetição de fórmulas estruturais não podem ser descartados por métricas de slop linguístico.
- **Limitações e Condicionantes da Evidência:**
  - `[Condição de contorno, ressalva metodológica ou limitação geográfica/temporal do dado]`
- **Nível de Confiança Final:** `[ALTA | MÉDIA | BAIXA]`
- **Status de Verificação Semântica (Entailment):**
  - `[VERIFICADA]` O texto da fonte acarreta estrita e diretamente a alegação feita (Direct Entailment comprovado).
  - `[DIVERGÊNCIA DE TESE]` A fonte discute o tópico, mas sustenta premissa ou conclusão contrária ao alegado.
  - `[ALUCINAÇÃO DETECTADA]` A citação é espúria, o trecho não existe ou contradiz frontalmente a fonte primária.
  - `[EXISTÊNCIA CONFIRMADA SEM ENTAILMENT]` O arquivo/link existe, porém o trecho citado não fundamenta o argumento.
  - `[NÃO COMPROVADA]` Não foi possível localizar base documental suficiente para atestar a veracidade da afirmação.

---

### Ficha de Evidência: `EV-002`
- **ID da Evidência:** `EV-002`
- **Alegação Literal / Objeto:** `[...]`
- **Natureza Epistêmica:** `[...]`
- **Fonte Primária / Veículo:** `[...]`
- **URL Canônica / Identificador Permanente:** `[...]`
- **Autoria Individual / Institucional:** `[...]`
- **Data de Publicação:** `[AAAA-MM-DD]`
- **Data do Acontecimento (quando distinta):** `[AAAA-MM-DD]`
- **Categoria da Fonte:** `[...]`
- **Nível de Proveniência:** `[TIER 1 | TIER 2 | TIER 3 | TIER 4]`
- **Trecho / Dado Comprobatório Literal:**
  > `"..."`
- **Origin Fingerprint:** `[...]`
- **Marcador de Fonte Única:** `[...]`
- **Triagem Deslop:** `[...]`
- **Limitações:** `[...]`
- **Nível de Confiança Final:** `[...]`
- **Status de Verificação Semântica:** `[...]`

---

## 3. Matriz de Triangulação Cruzada e Divergências

| Fato / Tese Investigada | Evidência Favorável (Tier) | Evidência Contrária / Dissent (Tier) | Conflito Aparente ou Real | Resolução Epistêmica |
|---|---|---|---|---|
| `[Tese A]` | `EV-001 (Tier 1)` | `EV-003 (Tier 2)` | Real (Divergência metodológica) | Prevalece o dado empírico de Tier 1; divergência de Tier 2 registrada como ressalva. |
| `[Tese B]` | `EV-002 (Tier 2)` | `EV-004 (Tier 3)` | Aparente (Diferença de versão) | EV-004 refere-se à versão 2.1, enquanto EV-002 reporta versão legada 1.8. |
| `[Tese C]` | `EV-005 (Tier 4)` | Nenhuma | Não triangulado (`[single-source]`) | Rebaixado para Hipótese não comprovada; proibido tratar como fato estabelecido. |
