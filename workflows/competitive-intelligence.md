# Workflow: Competitive Intelligence (Recurring Space)

Execute systematic, repeatable competitive intelligence cycles across markets, SaaS ecosystems, and disruptive startups. Built on a structured 4-stage analytical cadence with longitudinal delta-tracking across recurring monitoring intervals.

---

## 1. Operating Cadence & The Delta-Tracking Architecture

- **Execution Cadence:** Recurring interval (Weekly, Bi-weekly, Monthly, or Event-Triggered).
- **Longitudinal Delta-Tracking ($T_0 \to T_1$):**
  - Unlike one-off research, Competitive Intelligence tracks state deltas over time.
  - Every run records a snapshot date anchor (`YYYY-MM-DD`).
  - Highlights what changed since the last checkpoint ($T_0$): new features launched, pricing revisions, key executive hires, funding rounds, or litigation.
- **Reference Dependencies:**
  - Market research baseline: [market-research.md](market-research.md)
  - Tool matrix: [../references/mcp-connectors-registry.md](../references/mcp-connectors-registry.md)
  - Report templates: [../templates/final-report.md](../templates/final-report.md)

---

## 2. The Fixed 4-Stage Analytical Cadence

```
[Target Competitor / Sector Perimeter]
                    ↓
[Stage 1: Estado Atual Verificado] (Financials, headcount, core product offerings, ownership)
                    ↓
[Stage 2: Posicionamento & Matriz Competitiva] (Features, pricing tiers, moat mechanics, ICP)
                    ↓
[Stage 3: Ameaças Emergentes & Movimentos Recentes] (Changelogs, hiring, filings, marketing pivots)
                    ↓
[Stage 4: Implicações Estratégicas Rastreáveis] (Vulnerabilities, counter-measures, watchpoints)
                    ↓
[Delta Ledger Archiving] (Updating the historical checkpoint for next cycle)
```

---

## 3. Step-by-Step Execution Protocol

### Stage 1: Estado Atual Verificado (Baseline State Audit)
Establish verified empirical baseline data for each monitored player:
1. **Corporate & Capitalization Profile:**
   - Ownership structure (Private, VC-backed, Publicly Traded).
   - Total funding, latest round valuation, and lead investors (Crunchbase, PitchBook, SEC Form D).
   - Estimated headcount and trailing 6-month growth rate (LinkedIn Talent Insights / public disclosures).
2. **Current Core Offering:**
   - High-level value proposition and primary product modules.
   - Core technology stack (infrastructure, proprietary models, cloud dependencies).

### Stage 2: Posicionamento e Matriz Competitiva
Construct the head-to-head structural comparison:
1. **Granular Feature & Capability Grid:**
   - Benchmark table assessing feature depth across competitors:
     - Full Native Support (`●`)
     - Partial / Add-on Support (`◐`)
     - Missing / Unsupported (`○`)
2. **Pricing & Monetization Architecture:**
   - Transparent vs Contact-Sales pricing.
   - Packaging model: per-seat, consumption/metered, platform fee, or hybrid.
   - Audit pricing pages via `playwright` MCP or `search_web` to capture recent modifications.
3. **Moat Durability Assessment:**
   - Categorize defensive moats: Proprietary data assets, switching costs, brand equity, or distribution partnerships.

### Stage 3: Ameaças Emergentes e Movimentos Recentes
Mine primary operational breadcrumbs to detect strategic shifts:
1. **Product Changelogs & Release Feeds:**
   - Scrape and inspect public product updates:
     `site:<competitor.com>/changelog OR site:<competitor.com>/releases`
   - Classify updates: Minor polish vs foundational architectural pivots.
2. **Key Personnel Moves & Hiring Footprint:**
   - Analyze open job postings to predict upcoming initiatives:
     `site:boards.greenhouse.io/<competitor> OR site:lever.co/<competitor>`
   - Spikes in compliance hires indicate enterprise push; spikes in compiler engineers signal performance rebuilds.
3. **Regulatory, Legal & IP Filings:**
   - Search USPTO/EPO patent filings and trademark applications.
   - Check litigation dockets for intellectual property or trade secret disputes.

### Stage 4: Implicações Estratégicas Rastreáveis
Synthesize data into defensible, executive-level recommendations:
1. **Identified Competitor Vulnerabilities:**
   - Where is the competitor lagging? (e.g., poor API ergonomics, customer friction with pricing changes, delayed compliance features).
2. **Strategic Counter-Measures:**
   - Specific roadmap adjustments, marketing positioning adjustments, or commercial battlecard talking points.
3. **Trigger Watchpoints for Next Cycle:**
   - Explicit thresholds that would trigger an immediate off-cycle review (e.g., Competitor launches Enterprise Tier, raises Series C, or opens an EU data center).

---

## 4. Longitudinal Delta Ledger Format

At the conclusion of each intelligence run, output the Delta Ledger:

```markdown
# Caderno de Inteligência Competitiva: [Setor / Concorrente]
**Data do Ciclo Atual ($T_1$):** YYYY-MM-DD  
**Ciclo Anterior ($T_0$):** YYYY-MM-DD  

## 1. Resumo dos Movimentos Críticos (Delta $T_0 \to T_1$)
- **Produto & Changelog:** [Resumo das novas features ou deprecations identificadas].
- **Preços & Planos:** [Detecção de alterações em tiers, limites ou termos de uso].
- **Pessoas & Vagas:** [Sinais extraídos de novas posições estratégicas abertas].
- **Parcerias & Mercado:** [Novos clientes-âncora, M&As ou acordos de distribuição].

## 2. Matriz Competitiva Atualizada
| Concorrente | Modelo de Preço | ICP Principal | Fortaleza Principal | Vulnerabilidade Crítica |
| :--- | :--- | :--- | :--- | :--- |
| **Player A** | Per seat + add-on | Enterprise (>1000) | Distribuição legada | Lentidão de inovação UI |
| **Player B** | Usage-based puro | Dev-First / Startups | Latência baixa e DX | Falta de compliance SOC2 |

## 3. Próximos Gatilhos de Alerta ($T_2$)
- [ ] Monitorar anúncio de nova precificação na conferência anual em [Mês/Ano].
- [ ] Verificar aprovação de patente pendente no INPI/USPTO.
```

---

## 5. Checkable Completion Criteria

- [ ] Baseline corporate capitalization and headcount verified on official filings.
- [ ] Competitive feature and pricing matrix populated with current data.
- [ ] Primary changelogs and job posting boards inspected for leading indicators.
- [ ] Delta-tracking section explicitly isolates differences between $T_0$ and $T_1$.
- [ ] Actionable counter-measures and next-cycle alert triggers clearly specified.
