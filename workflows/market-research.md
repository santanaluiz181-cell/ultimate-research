# Workflow: Market Research (Mode 6)

Conduct structured market sizing, SaaS and tech ecosystem evaluations, product landscape analyses, and competitive business model audits with rigorous separation between empirical metrics and market projections.

---

## 1. Epistemic Standards & Analytical Boundaries

- **The Strict Epistemic Divide:**
  - **Observed Empirical Metrics:** Audited financial statements (SEC 10-K, 10-Q, 8-K), live published pricing pages, verified regulatory disclosures, audited headcount (LinkedIn Insights/tax filings), verified customer counts.
  - **Estimates & Projections:** Analyst forecasts (Gartner, IDC, Forrester, PitchBook), vendor-claimed addressable markets (TAM/SAM/SOM), growth compound annual growth rate (CAGR) projections, survey extrapolations.
- **Rule of Vendor Claim Triangulation:**
  - Never accept vendor marketing claims ("leader in enterprise AI", "99.999% retention") without corroboration from independent customer reviews, regulatory disclosures, or third-party usage data.
- **Reference Dependencies:**
  - Final report template: [../templates/final-report.md](../templates/final-report.md)
  - Evidence criteria: [../references/source-credibility.md](../references/source-credibility.md)

---

## 2. Step-by-Step Execution Protocol

```
[Market Inquiry / Product Sector]
                 ↓
[Step 1: Ecosystem & Perimeter Definition] (Value chain, target verticals, customer personas)
                 ↓
[Step 2: Empirical Baseline Collection] (10-K filings, published pricing tables, live metrics)
                 ↓
[Step 3: Forecast & TAM Model Audit] (Auditing analyst reports, calculating bottom-up TAM)
                 ↓
[Step 4: Competitive Landscape Matrix] (Features, pricing tiers, moat analysis)
                 ↓
[Step 5: Independent Triangulation] (G2, TrustRadius, developer forums, Glassdoor signals)
                 ↓
[Step 6: Strategic Synthesis & Risk Ledger] (Barriers to entry, unit economics, Moat durability)
```

### Step 1: Ecosystem & Perimeter Definition
1. Define the exact boundaries of the market or vertical:
   - Identify the value chain: Infrastructure -> Platform -> Application -> Services.
   - Specify target customer segments: SMB, Mid-Market, Enterprise, Public Sector.
   - Define geographic scope and regulatory constraints.

### Step 2: Empirical Baseline Collection
Gather hard, un-extrapolated numbers first:
- **Public Financial Disclosures:**
  - Query SEC EDGAR for public company financials:
    `site:sec.gov/edgar "10-K" "<Company Name>" "revenue"`
  - Extract Annual Recurring Revenue (ARR), Gross Margins, Net Revenue Retention (NRR), and Customer Acquisition Cost (CAC) trends where disclosed.
- **Direct Pricing Page Audits:**
  - Inspect live pricing tables using `search_web` or `playwright` MCP:
    `site:<vendor.com> "pricing" OR "plans"`
  - Document seat minimums, feature gates, usage-based consumption rates, and enterprise tier add-ons.

### Step 3: Forecast & TAM Model Audit
Evaluate market size projections with skeptical scrutiny:
1. **Top-Down vs Bottom-Up TAM:**
   - Dissect top-down figures from market reports. Identify the underlying assumptions.
   - Calculate an empirical **Bottom-Up TAM**:
     $$\text{TAM}_{\text{Bottom-Up}} = \text{Total Addressable Customers} \times \text{Average Contract Value (ACV)}$$
2. **Scenario Modeling:**
   - Present market sizing in three distinct bands: Bear, Base, and Bull cases.
   - Disclose methodology: Is growth driven by organic volume or inflationary price increases?

### Step 4: Competitive Landscape Matrix
Construct a granular competitive feature and pricing grid:
- **Product Capabilities:** Core functional features, enterprise requirements (SSO, RBAC, SOC 2, HIPAA, data residency).
- **Pricing Strategy:** Flat-rate, per-seat, usage-based, or hybrid models.
- **Economic Moat Assessment:** Network effects, high switching costs, proprietary data flywheel, or regulatory licensing moats.

### Step 5: Independent Triangulation & Sentiment Audit
Cross-check vendor positioning against user realities:
- **Software Review Platforms:**
  - Query verified review aggregators for recurring complaints and churn drivers:
    `site:g2.com "<Product>" "cons" OR "dislike"`
    `site:trustradius.com "<Product>" "limitations"`
- **Practitioner Discussions:**
  - Search Reddit, Hacker News, and specialized Slack/Discord community outputs for unvarnished operational feedback.
- **Organizational Health Signals:**
  - Cross-reference employee sentiment and turnover trends via Glassdoor / LinkedIn headcount growth data.

### Step 6: Strategic Synthesis & Risk Ledger
Format findings into an actionable executive market intelligence dossier:
- **Market State:** Fragmentation vs consolidation trends, M&A activity.
- **Comparative Grid:** Side-by-side competitor matrix.
- **Observed Metrics vs Projections Table:** Hard separation between historical revenue and speculative forecasts.
- **Barriers to Entry:** Capital intensity, regulatory friction, technical complexity.
- **Strategic Risks & Downside Scenarios:** Platform dependency risks, commoditization pressures, regulatory threats.

---

## 3. Checkable Completion Criteria

- [ ] Clear epistemic boundary maintained: Zero mixing of audited revenue with speculative TAM.
- [ ] Primary pricing pages and SEC filings directly referenced.
- [ ] Bottom-up market sizing calculated alongside top-down analyst quotes.
- [ ] Vendor self-descriptions cross-examined against verified reviews (G2/TrustRadius/HN).
- [ ] Competitive matrix maps pricing tiers, deployment models, and moat durability.
- [ ] Bear / Base / Bull scenario models documented with transparent assumptions.
