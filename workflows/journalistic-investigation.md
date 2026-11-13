# Workflow: Journalistic Investigation (Mode 4)

Conduct high-integrity public-interest reporting, public policy audits (federal, state, and municipal, including Tocantins/DOE-TO/TCE-TO/Portal da Transparência), and corporate accountability investigations with forensic document verification and mandatory right of reply (*contraditório*).

---

## 1. Editorial Principles & Epistemic Boundaries

- **The Four-Tier Epistemic Separation:**
  1. **Observed Fact:** Grounded in primary official documents (contracts, bank transfers, court sentences, gazette publications).
  2. **Attributed Allegation:** Sworn testimony, whistleblower claims, prosecution allegations, or defense statements (always explicitly attributed to named individuals/orgs).
  3. **Expert Opinion:** Methodological critiques or domain assessments by accredited, non-partisan specialists.
  4. **Working Hypothesis:** Open investigative vectors requiring further evidentiary substantiation.
- **HARD RULE: Press Release Skepticism:**
  - Never treat institutional press releases (*releases oficiais*) as independent proof of efficacy, compliance, or impact.
  - Press releases count only as official statements of position, not empirical verification.
- **Mandatory Right of Reply (*Contraditório*):**
  - No investigative dossier or report is complete without actively seeking, documenting, and integrating the position, explanations, or documented refutations of accused parties or public authorities.
- **Reference Dependencies:**
  - Evidence standards: [../references/source-credibility.md](../references/source-credibility.md)
  - Report templates: [../templates/final-report.md](../templates/final-report.md)

---

## 2. Step-by-Step Execution Protocol

```
[Investigative Lead / Public Policy Query]
                 ↓
[Step 1: Hypothesis & Actor Scoping] (Public interest framing, stakeholder matrix, legal bounds)
                 ↓
[Step 2: Primary Document & Public Registry Forensics] (Diário Oficial, Transparência, TCE/TCU, eproc)
                 ↓
[Step 3: Chronology & Corporate Graph Analysis] (Event date vs Publication date, CNPJ / QSA tracing)
                 ↓
[Step 4: Discrepancy & Anomaly Detection] (Budget allocation vs Execution, amendments, audit notes)
                 ↓
[Step 5: Mandatory Adversarial Audit & Contraditório] (Documenting defense, official positions, rebuttals)
                 ↓
[Step 6: Dossier Compilation & Source Archiving] (Citations to exact pages, edicts, and public records)
```

### Step 1: Hypothesis & Actor Scoping
1. Articulate the specific public interest question:
   - Identify the alleged irregularity, systemic policy failure, conflict of interest, or deviation of public funds.
2. Build the Initial Stakeholder Matrix:
   - Regulating agencies, contracting bodies, private contractors, beneficial owners, and affected citizens.
3. Establish regulatory benchmarks (e.g., Lei de Licitações 14.133/2021, Lei de Acesso à Informação 12.527/2011, Lei de Responsabilidade Fiscal LC 101/2000).

### Step 2: Primary Document & Public Registry Forensics
Bypass intermediary news articles and search directly within primary public databases using `search_web` and targeted domain queries:

- **Official Gazettes:**
  - Federal: `site:in.gov.br "termo de contrato" OR "dispensa de licitação"`
  - State (Tocantins): `site:diariooficial.to.gov.br` / DOE-TO records.
  - Municipal: Official municipal gazettes or AMM/FAMUP aggregators.
- **Transparency & Budget Portals:**
  - `site:transparencia.to.gov.br` or `site:portaldatransparencia.gov.br`
  - Compras.gov.br, PNCP (Portal Nacional de Contratações Públicas).
- **Courts of Accounts & Judiciary:**
  - State Audit Court: `site:tce.to.gov.br` (Acórdãos, Relatórios de Auditoria, Decisões Singulares).
  - Federal Audit Court: `site:tcu.gov.br`.
  - Judicial Filings: eproc TJTO (`site:tjto.jus.br`), TRF1, STJ, STF.

For portals requiring interactive session retrieval or PDF extraction, use `playwright` MCP tools (`browser_navigate`, `browser_screenshot`) to locate and inspect documents.

### Step 3: Chronology & Corporate Graph Analysis
1. **Temporal Disentanglement:**
   - Explicitly decouple **Event Date** (date transaction occurred or service was rendered) from **Publication Date** (date published in the Official Gazette). Retroactive publications (*efeitos retroativos*) must be highlighted.
2. **Corporate & Ownership Tracing:**
   - Extract Corporate Tax IDs (CNPJ).
   - Trace corporate board membership (*Quadro de Sócios e Administradores - QSA*) via Receita Federal public records to detect cross-ownership, shell companies, or kinship with public decision-makers.

### Step 4: Discrepancy & Anomaly Detection
Cross-tabulate collected records into an analytical audit matrix:
- **Contractual Inflation:** Compare initial bidding edict value vs final contract value including contractual amendments (*termos aditivos*).
- **Execution vs Liquidation:** Cross-reference commitment notes (*notas de empenho*), liquidation notes (*liquidação*), and actual bank payment orders (*ordens bancárias*).
- **Audit Findings:** Extract non-compliance findings from internal comptroller (CGE/CGU) and audit court (TCE/TCU) technical reports.

### Step 5: Mandatory Adversarial Audit (*Contraditório*)
1. Formulate specific, factual inquiries to all implicated institutions or individuals.
2. Search and integrate all documented public explanations, official notes, or judicial defenses presented by the targets.
3. Assess the defense against empirical evidence:
   - Does the defense produce receipts, delivery attestations (*atestos de recebimento*), or legal justifications?
   - Or does it rely on generic institutional deflections?
4. Allocate prominent and proportional space in the report to the defense arguments.

### Step 6: Dossier Compilation & Source Archiving
Synthesize into a structured investigative report:
- **Lead & Executive Finding:** Single-sentence summary of verified core fact.
- **Chronological Timeline Table:** Exact date, event description, document reference.
- **Contractual & Financial Dissection:** Numbers, CNPJs, amounts, and amendments.
- **Right of Reply & Position of Implicated Parties:** Proportional summary of responses.
- **Documentary Appendix:** Exact gazette issue numbers, page numbers, and direct permanent links.

---

## 3. Checkable Completion Criteria

- [ ] Four-tier epistemic separation strictly applied in all prose.
- [ ] ZERO reliance on press releases as empirical proof.
- [ ] Official gazettes, audit court rulings, and transparency portals examined directly.
- [ ] Chronology distinguishes event date from gazette publication date.
- [ ] Corporate ownership (CNPJ/QSA) verified on official registries.
- [ ] Right of reply (*contraditório*) actively incorporated.
- [ ] Every assertion anchored to an official page, act number, or court record.
