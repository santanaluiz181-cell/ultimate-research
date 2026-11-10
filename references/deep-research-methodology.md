# Metodologia de Investigação e Pesquisa Profunda (`deep-research-methodology`)

**Versão da Metodologia:** v1.1 (Adaptada para Antigravity Multi-Agente)  
**Créditos Originais:** Ramit Mitra (MIT License)  
**Topologia de Execução:** Orquestrador Central Queen (`pro`) + Enxame Tático de Trabalhadores (`flash_lite` / `flash`)  

---

## 1. Prioridades Axiomáticas de Pesquisa

Toda decisão metodológica, resolução de conflito de dados ou arbitragem de evidências no Ultimate Research obedece estritamente à seguinte hierarquia invariante:

1. **Correto > Fluente:** Uma resposta árida, densa e 100% verdadeira tem precedência absoluta sobre uma prosa estilisticamente elegante com dados aproximados.
2. **Triangulado > Autoridade Única:** Duas fontes independentes de Tier 2 com métodos transparentes superam uma afirmação isolada de um figurão ou veículo de imprensa sem dados abertos (`[single-source]`).
3. **Disciplina de Busca > Volume de Busca:** Executar cinco consultas cirúrgicas com dorks bem calibrados é superior a disparar cinquenta buscas genéricas que inundam o contexto de ruído.
4. **Lacuna Honesta > Alucinação Criativa:** Declarar `INSUFFICIENT EVIDENCE` é um resultado de engenharia de alto valor; forçar uma conclusão sem respaldo empírico é falha grave.
5. **Tier Superior > Tier Inferior:** Evidência primária (Tier 1) revoga e invalida qualquer especulação, post de blog ou release secundário (Tier 3/4).

---

## 2. Arquitetura Controller-Worker no Antigravity

A execução de pesquisas exaustivas não pode sobrecarregar a sessão do orquestrador principal com milhares de linhas de HTML, Markdown de páginas web ou logs ruidosos. Adota-se a divisão estrita:

```
[Queen Orchestrator (pro)]
  │  - Mantém o plano global (UR-PLAN) e a matriz (UR-EVMAT).
  │  - Formula hipóteses e subquestões (SQ-01, SQ-02...).
  │  - Decompõe objetivos em submetas não sobrepostas.
  │
  ├──► invoke_subagent(TypeName: "research", Model: "flash_lite", Prompt: "Sub-Goal A")
  │      └── Trabalhador A: pesquisa, extrai spans literais, resume em JSON
  │
  ├──► invoke_subagent(TypeName: "research", Model: "flash_lite", Prompt: "Sub-Goal B")
  │      └── Trabalhador B: pesquisa contra-hipótese, mapeia dissent em JSON
  │
  ▼
[Ponto de Triangulação & Síntese]
  │  - Consolida JSONs recebidos.
  │  - Atualiza UR-EVMAT e calcula saturação.
  │  - Decide: convergir para relatório ou disparar próxima onda.
```

### 2.1 Diretrizes do Subagente de Pesquisa
- **Modelo:** `flash_lite` (ou `flash` para sínteses com extração multilíngue densa).
- **Submetas Não Sobrepostas:** Cada subagente recebe um escopo delimitado e um vetor exclusivo (ex: enquanto o Worker 1 busca a documentação oficial da API, o Worker 2 busca relatórios de bugs na comunidade).
- **Extração em Nível de Span (Span-Level Extraction):** O subagente NUNCA deve despejar o texto integral de páginas web na sessão principal. Ele deve ler o conteúdo em seu contexto isolado e retornar apenas o trecho comprobatório exato (span literal de 1 a 3 frases) com URL e metadados.

### 2.2 Contrato de Retorno JSON Estruturado
O trabalhador deve encerrar sua execução retornando exclusivamente o esquema:

```json
{
  "sub_goal": "Identificador unívoco da subquestão (ex: SQ-01)",
  "claims": [
    {
      "claim": "Afirmação factual específica",
      "nature": "Fato Observado | Alegação Atribuída | Opinião | Hipótese | Projeção",
      "evidence_span": "Citação literal do trecho comprobatório da fonte",
      "source_url": "URL canônica do documento",
      "author_org": "Autor ou instituição responsável",
      "publish_date": "AAAA-MM-DD",
      "tier": 1,
      "origin_fingerprint": "Entidade geradora original (anti-eco)"
    }
  ],
  "gaps": [
    "Pontos específicos que a busca não conseguiu comprovar ou localizar"
  ],
  "leads": [
    "Pistas encontradas (novas URLs, nomes de arquivos, identificadores de normas)"
  ]
}
```

---

## 3. Execução em Ondas e Replanejamento Pós-Onda

A pesquisa não ocorre em um único disparo cego. Ela evolui em ondas sucessivas de investigação:

### Onda 1: Reconhecimento e Mapeamento de Taxonomia
- Mapeia o estado da arte, terminologia canônica, atores principais e documentação primária.
- Inicia o preenchimento da Matriz de Evidências.
- Identifica divergências óbvias e áreas de silêncio de dados.

### Ponto de Controle Intermediário
- A Queen avalia os campos `gaps` e `leads` retornados pelos trabalhadores da Onda 1.
- Ajusta as hipóteses do `UR-PLAN` e elimina subquestões já respondidas satisfatoriamente em Tier 1.

### Onda 2: Aprofundamento Cirúrgico e Dissent
- Foca exclusivamente nas lacunas abertas e na busca deliberada de contra-exemplos (falsificação).
- Investiga os `leads` de alta relevância que exigem extração detalhada.

---

## 4. Regras de Disciplina de Busca

1. **Consultas Vinculadas a Hipóteses (Hypothesis-Bound Queries):** Cada consulta formulada no motor de busca deve ter como meta testar ou falsear uma hipótese explícita do plano. Consultas vagas de "leitura geral" são proibidas.
2. **Descarte por Colisão (Top Hits Collision Drop):** Se três variações de uma query retornarem os mesmos 5 links principais nos primeiros resultados, interrompa novas variações dessa mesma linha temática. O índice está saturado.
3. **Corte por Tier Primário (Stop Descending Tiers):** Uma vez que um fato foi provado de forma conclusiva através de uma fonte Tier 1 (ex: Diário Oficial ou repositório oficial da linguagem), cesse imediatamente buscas em fontes de Tier inferior (Tier 3 ou 4) para aquela mesma afirmação.
4. **Filtro de Utilidade Marginal (Marginal Utility Gate):** Se uma onda de buscas demandar mais de 3 chamadas sem adicionar nenhuma evidência nova à matriz, interrompa imediatamente a exploração dessa ramificação.

---

## 5. Controle de Convergência e Declaração de Lacuna

A pesquisa deve convergir de forma determinística, evitando loops infinitos de busca:

### 5.1 Critério Quantitativo: Decaimento de Novidade
$$\text{Taxa de Novidade} = \frac{\text{Novas Alegações Relevantes na Onda}}{\text{Total de Alegações Catalogadas}} \times 100$$
- Se a Taxa de Novidade for **inferior a 15% por duas ondas consecutivas**, a fase de busca é declarada saturada.
- **Piso de Independência:** Todas as alegações críticas devem possuir no mínimo duas origens com `origin_fingerprint` independentes, ou serem explicitamente rotuladas como `[single-source]`.

### 5.2 Critério Qualitativo: Avaliação de Lacunas e Divergências
- Conflitos aparentes foram desfeitos por versionamento ou escopo?
- Há contradição frontal insolúvel? Se houver, ambas as correntes devem ser registradas com seus respectivos Tiers.
- Se a evidência primária for inacessível ou inexistente após a Onda 2, o orquestrador encerra a busca e documenta no relatório final a etiqueta **`INSUFFICIENT EVIDENCE`**, garantindo total honestidade epistêmica.
