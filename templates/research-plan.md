# Plano de Pesquisa Epistêmica (`UR-PLAN`)

**Identificador do Plano:** `UR-PLAN-[DATA]-[ID_CURTO]`  
**Data de Criação:** `[AAAA-MM-DD]`  
**Orquestrador:** Queen Orchestrator (Antigravity Runtime)  
**Modo Operacional Ativo:** `[MODE 1: QUICK | MODE 2: DEEP | MODE 3: ACADEMIC | MODE 4: JOURNALISTIC | MODE 5: TECHNICAL | MODE 6: MARKET / CI | MODE 7: LEGAL | MODE 8: FACT-CHECKING]`  
**Orçamento de Subagentes:** `[Ex: 3 subagentes flash_lite em 2 ondas]`  
**Status do Plano:** `[RASCUNHO | APROVADO | EM_EXECUCAO | CONCLUIDO]`

---

## 1. Enquadramento de Intenção e Escopo (Fases 1 e 2)

### 1.1 Objetivo Central e Questão Diretriz
- **Pergunta Central Declarativa:** `[Formulação cirúrgica da questão central sem ambiguidade]`
- **Objetivo Pragmático:** `[Resultado final concreto exigido: decisão técnica, minuta jurídica, diagnóstico, etc.]`
- **Público-Alvo e Tom:** `[Ex: Engenharia Sênior / Gabinete Judiciário TJTO / Redação Editorial / Diretoria Técnica]`

### 1.2 Fronteiras Operacionais
- **No Escopo (In-Scope):**
  - `[Subproblema ou dimensão analítica 1]`
  - `[Subproblema ou dimensão analítica 2]`
  - `[Subproblema ou dimensão analítica 3]`
- **Fora do Escopo (Out-of-Scope):**
  - `[Elemento explicitamente excluído para prevenir deriva contextual]`
  - `[Tópico periférico não essencial]`
- **Escopo Geográfico e Jurisdicional:** `[Global | Brasil Federal | TJTO Estadual | Região Específica]`
- **Profundidade Alvo:** `[Superficial / Triagem | Padrão Analítico | Exaustivo Multilateral]`
- **Tipos de Evidência Exigidos:** `[Normas primárias | Código-fonte | Artigos revisados por pares | Demonstrações financeiras | Precedentes judiciais]`

---

## 2. Estratégia Temporal Dinâmica (Fase 3)

> **Regra Mandatória:** Proibido fixar limites temporais genéricos cegos (ex: `before:2023`). A data de corte deve ser explicitamente calculada e justificada conforme o ciclo de vida do domínio investigado.

### 2.1 Configuração de Trilhas Temporais (Lanes A / B / C)
| Trilha Temporal | Status | Janela Temporal Alvo | Propósito Epistêmico |
|---|---|---|---|
| **Lane A: Histórico / Canônico** | `[ATIVADA | DESATIVADA]` | `[Ex: 2018 - 2023]` | Fundamentos teóricos, RFCs, jurisprudência consolidada, baseline arquitetural. |
| **Lane B: Contemporâneo / Vigente** | `[ATIVADA | DESATIVADA]` | `[Ex: 2024 - PRESENTE]` | Versões ativas de software, decisões recentes, conjuntura de mercado. |
| **Lane C: Validação Oficial** | `[ATIVADA | DESATIVADA]` | `[Ex: Vigência imediata]` | Diário de Justiça, DOU, repositórios oficiais, erratas, atos revogatórios. |

### 2.2 Data de Corte e Justificativa de Marco Temporal
- **Data de Corte Específica:** `[AAAA-MM-DD]`
- **Justificativa Técnica do Corte:** `[Ex: Publicação da Lei Federal 14.XXX/202X, liberação do Next.js 15, decisão vinculante do STF Tema XXX]`
- **Vetor de Falsificação Temporal:** `[O que mudou desde a data de corte que pode invalidar a literatura prévia?]`

---

## 3. Hipóteses Iniciais e Critérios de Falsificação

| ID | Hipótese Provisória | Critério Objetivo de Falsificação | Risco de Viés de Confirmação |
|---|---|---|---|
| **H-01** | `[Hipótese central 1]` | `[Evidência empírica ou normativa que invalida H-01]` | `[Viés de seleção / viés de autoridade]` |
| **H-02** | `[Hipótese alternativa 2]` | `[Evidência empírica ou normativa que invalida H-02]` | `[Anacronismo / documentação defasada]` |
| **H-03** | `[Hipótese contra-intuitiva]` | `[Evidência necessária para sustentá-la]` | `[Suposição não testada de mercado]` |

---

## 4. Decomposição em Subquestões e Dorks Cirúrgicos

| ID | Subquestão Declarativa | Prioridade | Perspectiva | Dork / Query Cirúrgica Otimizada | Fontes Alvo (Tier) |
|---|---|---|---|---|---|
| **SQ-01** | `[Ex: Qual a taxa de memory leak do buffer?]` | Tier 1 | Baseline Técnica | `site:github.com "[package]" "memory leak" "buffer"` | Tier 1 / Tier 3 |
| **SQ-02** | `[Ex: Há precedente divergente na 1ª Câmara?]` | Tier 1 | Adversa / Dissent | `site:tjto.jus.br "acórdão" "divergência" "[termo]"` | Tier 1 Oficial |
| **SQ-03** | `[Ex: Qual o custo de migração reportado?]` | Tier 2 | Empírica Prática | `"[framework]" migration postmortem benchmark -marketing` | Tier 2 / Tier 3 |
| **SQ-04** | `[Ex: Há brecha de segurança corrigida no patch?]` | Tier 1 | Borda / Adversária | `site:nvd.nist.gov CVE "[software]" "remote code"` | Tier 1 Oficial |

---

## 5. Critérios Epistêmicos de Inclusão e Exclusão

### 5.1 Critérios de Inclusão
1. Documentos primários e repositórios oficiais com proveniência comprovável (Tier 1).
2. Artigos revisados por pares ou relatórios técnicos emitidos por especialistas nomeados com afiliação confirmada (Tier 2).
3. Relatórios empíricos de engenharia com telemetria reproduzível ou código-fonte verificável (Tier 3).
4. Evidência com rastreabilidade direta via DOI, ISBN, URL canônica ou numeração processual válida.

### 5.2 Critérios de Exclusão
1. Agregadores de conteúdo SEO, portais de scraping e artigos sem autoria identificada (Tier 4 / Slop).
2. Materiais de assessoria de imprensa corporativa não corroborados por métricas de terceiros ou dados brutos.
3. Conteúdo indexado com discrepância temporal gritante frente à janela da Lane B.
4. Fontes com dependência mútua de agência de notícias (evitar efeito câmara de eco / single-source camuflado).

---

## 6. Riscos Epistêmicos, Gaps Antecipados e Regras de Parada

### 6.1 Gaps Antecipados
- **Lacuna Prevista 1:** `[Ex: Falta de benchmarks independentes em produção para hardware ARM]`
- **Lacuna Prevista 2:** `[Ex: Ausência de súmula consolidada no TJTO sobre a matéria X]`
- **Estratégia de Tratamento de Lacuna:** Inclusão declarada de `INSUFFICIENT EVIDENCE` no relatório final se não houver fonte Tier 1/2 disponível.

### 6.2 Regras de Parada (Convergence Gates)
- **Gate 1 (Saturação de Novidade):** Menos de 15% de alegações novas obtidas em duas ondas de busca consecutivas.
- **Gate 2 (Piso de Independência):** Pelo menos 2 fontes com `origin_fingerprint` independentes para cada alegação crítica.
- **Gate 3 (Utilidade Marginal):** Interromper busca em subdomínio quando as consultas apenas confirmarem fatos já atestados em Tier 1.
- **Gate 4 (Declaração Honesta):** Se a busca exaustiva não localizar evidência primária, documentar a lacuna explicitamente em vez de forçar conclusões.

---

## 7. Topologia de Execução de Subagentes

```
[Queen Orchestrator (pro)]
        │
        ├── Wave 1: Reconhecimento Amplo (Mapeamento de Taxonomia)
        │     ├── Subagente 1 (flash_lite): Mapeamento de Fontes Oficiais e Primárias (Tier 1)
        │     └── Subagente 2 (flash_lite): Varredura Técnica / Comunidades / Dissent (Tier 2/3)
        │
        ├── Ponto de Controle: Consolidação de Gaps & Triagem Deslop
        │
        └── Wave 2: Aprofundamento Cirúrgico & Resolução de Conflitos
              └── Subagente 3 (flash_lite): Extração de Spans e Falsificação Direta de H-01..H-03
```

- **Contrato de Retorno do Subagente:** Cada worker deve retornar estritamente o payload estruturado:
  ```json
  {
    "sub_goal": "Identificador da subquestão analisada",
    "claims": [
      {
        "claim": "Texto exato da alegação",
        "evidence_span": "Trecho literal extraído da fonte",
        "source_url": "URL canônica ou identificador permanente",
        "tier": 1,
        "origin_fingerprint": "Domínio base ou entidade editorial primária"
      }
    ],
    "gaps": ["Lacunas remanescentes não comprovadas"],
    "leads": ["Pistas cirúrgicas para a próxima onda"]
  }
  ```
- **Teto Orçamentário:** Máximo de `[X]` turnos de subagente e `[Y]` tokens de contexto antes da síntese final.
