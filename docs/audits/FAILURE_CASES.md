# FAILURE CASES & VULNERABILITY POST-MORTEM
**Skill:** `ultimate-research` v1.1.0  
**Data da Auditoria Adversarial:** 04 de Novembro de 2026  
**Tipo de Documento:** Relatório Técnico Pós-Morte de Vulnerabilidades Epistêmicas

---

## 1. Sumário Executivo de Falhas

A auditoria adversarial independente submeteu o mecanismo `ultimate-research` a testes de estresse epistêmico, heurísticas enganosas e cenários de contaminação informativa. O sistema revelou quatro modos de falha estruturais que contradizem a avaliação preliminar de 9,25/10:

```
+-----------------------------------------------------------------------------------------+
|                                MODOS DE FALHA DETECTADOS                                |
+------------------------------------+----------------------------------------------------+
| Falha 1: Viés de Confirmação       | Busca não-contraditória validou ausência de        |
|          na Síntese                | acordos, ignorando acordo Folha/OpenAI (mai/2026). |
+------------------------------------+----------------------------------------------------+
| Falha 2: Conflito Sintaxe vs.      | Validador Módulo 97 e ISBN-13 carimbou processos   |
|          Existência Documental     | e livros fictícios como [VERIFICADA].              |
+------------------------------------+----------------------------------------------------+
| Falha 3: Extrapolação Métrica      | Métrica global da Reuters (>60%) imputada          |
|          e Troca de Escopo         | incorretamente ao cenário específico brasileiro.   |
+------------------------------------+----------------------------------------------------+
| Falha 4: Desatualização de Estado  | Classificou PL 2338 como pendente no Senado quando |
|          Procedimental             | já estava aprovado e remetido à Câmara.            |
+------------------------------------+----------------------------------------------------+
```

---

## 2. Detalhamento Técnico das Vulnerabilidades

### Caso de Falha #1: Viés de Confirmação na Investigação de Acordos de Imprensa
* **Afirmação Afetada:** Afirmação 10 ("Inexistência de acordos comerciais de licenciamento com Big Techs no Brasil").
* **Comportamento Observado na Auditoria 1.0:** O motor pesquisou e compilou prioritariamente ações judiciais promovidas por ANJ e Folha de S.Paulo, concluindo que o ecossistema brasileiro rejeitava categoricamente acordos negociais em favor de litígios. A afirmação recebeu carimbo positivo.
* **Fato Documental Real:** Em **maio de 2026**, a **OpenAI e o Grupo Folha / UOL firmaram um acordo histórico de licenciamento de conteúdo e parceria tecnológica**, encerrando judicialmente a disputa perante a 3ª Vara Empresarial do TJSP e integrando matérias da Folha/UOL diretamente com links de citação no ChatGPT.
* **Causa Raiz de Engenharia:** As consultas da Onda 1 e Onda 2 foram geradas com vetor de busca assimétrico (*"ações judiciais IA jornalismo brasil"*, *"litígios ANJ OpenAI"*), sem disparar automaticamente uma consulta adversarial de polaridade invertida (*"OpenAI parceria acordo veículos imprensa brasil folha"*). O motor operou em câmara de eco de busca.
* **Severidade:** **ALTA (Falsidade Material em Análise de Mercado)**.

---

### Caso de Falha #2: Conflito entre Validação Algorítmica e Existência Documental (CNJ e ISBN)
* **Afirmação Afetada:** Testes de validação de citações jurídicas e acadêmicas.
* **Comportamento Observado na Auditoria 1.0:** O módulo `CitationVerifier` considerava uma citação como `[VERIFICADA]` assim que o algoritmo matemático de paridade (Módulo 97 da Resolução CNJ 65/2008 ou checksum ISBN-13) confirmava a regularidade dos dígitos verificadores.
* **Vulnerabilidade Provada no Teste Adversarial:**
  - Foi submetida uma alegação fictícia gravosa: *"O juiz de Palmas decretou a prisão preventiva de Sam Altman no processo CNJ 0999999-60.2026.8.27.0001"*.
  - O número CNJ possui dígitos válidos (`60`), mas o processo é completamente inexistente nos sistemas dos tribunais e no DJEN.
  - O motor original carimbou a evidência como `[VERIFICADA]`, autenticando uma prisão fictícia como fato processual válido.
* **Causa Raiz de Engenharia:** Confusão arquitetural entre **validade sintática** (o identificador é bem formado) e **autenticidade documental** (o processo realmente foi ajuizado e existe no mundo jurídico).
* **Severidade:** **CRÍTICA (Risco de Invenção e Autenticação de Falsos Precedentes)**.
* **Mitigação Implementada:** Adicionado o middleware `applyEpistemicCitationGuardrails` em `scripts/deslop-bridge.mjs`. Agora, números CNJ que não possuem certidão de publicação ativa na API oficial do DJEN/ComunicaAPI são sumariamente rebaixados para `[ALUCINAÇÃO DETECTADA]` (quando contêm alegações gravosas) ou `[NÃO COMPROVADA]`. O mesmo para ISBNs sem registro bibliográfico catalogado.

---

### Caso de Falha #3: Extrapolação Métrica por Troca de Escopo (Reuters DNR)
* **Afirmação Afetada:** Afirmação 08 ("Mais de 60% dos leitores brasileiros desconfiam de notícias geradas por IA").
* **Comportamento Observado na Auditoria 1.0:** O relatório inicial apresentou o dado de 60% de desconfiança como um índice oficial e absoluto da população brasileira.
* **Fato Documental Real:** O *Reuters Digital News Report* aponta que o desconforto de 60% com notícias sobre temas sensíveis (política e finanças) refere-se especificamente a mercados como Reino Unido e Estados Unidos. O capítulo brasileiro mediu uma taxa de 47% de evitação ativa de notícias e apreensão com deepfakes eleitorais.
* **Causa Raiz de Engenharia:** Na fase de síntese dos subagentes, o agente condensou métricas de *hard news* internacionais contidas no sumário executivo global e aplicou-as indevidamente à seção regional do Brasil, gerando um indicador hiperbólico.
* **Severidade:** **MÉDIA (Alucinação Quantitativa Parcial)**.

---

### Caso de Falha #4: Amnésia de Vigência Procedimental / Desatualização de Tramitação
* **Afirmação Afetada:** Afirmação 09 (PL 2338/2023) e Afirmação 05 (Folha vs OpenAI).
* **Comportamento Observado na Auditoria 1.0:** O motor relatou que o PL 2338/2023 estava em fase de debates e votação iminente na CTIA (Comissão Temporária sobre Inteligência Artificial) do Senado Federal.
* **Fato Documental Real:** O projeto teve seu relatório aprovado no plenário do Senado Federal em dezembro de 2024 e foi formalmente remetido à Câmara dos Deputados, onde tramita com nova numeração e regime de urgência.
* **Causa Raiz de Engenharia:** O sistema recuperou trechos de debates históricos de 2023/2024 no portal do Senado e não efetuou a consulta de tramitação ativa contemporânea no portal da Câmara dos Deputados e LexML para verificar a fase legislativa atualizada.
* **Severidade:** **MÉDIA (Anacronismo Institucional)**.

---

## 3. Matriz de Correções e Testes de Regressão

| Falha Identificada | Patch Arquitetural Aplicado | Teste de Regressão Criado | Status da Validação |
| :--- | :--- | :--- | :--- |
| **CNJ/ISBN Falsos Validados** | `applyEpistemicCitationGuardrails` bloqueia certificação sem consulta primária ao DJEN/Catálogo. | `hallucination-resistance.test.mjs` (20 casos falsos plausíveis) | **PASSOU (20/20)** |
| **Viés de Busca Confirmadora** | Protocolo obrigatório de busca de polaridade invertida no plano de pesquisa e `evaluateEntailment`. | `entailment-20-pairs.test.mjs` (Caso #10 e Caso #12) | **PASSOU (20/20)** |
| **Repetição de Press-Releases** | Deduplicação por `origin_fingerprint` agrupando comunicados idênticos de múltiplos domínios. | `independence.test.mjs` (5 cenários de independência) | **PASSOU (5/5)** |
| **Desatualização de Órgão/Data** | Checagem de vigência temporal com penalização de desatualização procedural. | `entailment-20-pairs.test.mjs` (Caso #5 e Caso #19) | **PASSOU (20/20)** |
