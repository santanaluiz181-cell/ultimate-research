# Workflow: Academic Research (Mode 3)

Conduct rigorous scientific literature reviews, empirical paper syntheses, and state-of-the-art bibliographic mapping across peer-reviewed and open-access scientific repositories with strict automated citation verification.

---

## 1. Operating Scope & Epistemic Standards

- **Core Repositories & APIs:**
  - CrossRef REST API: `https://api.crossref.org/works?query=`
  - OpenAlex API: `https://api.openalex.org/works?search=`
  - arXiv API / Search: `https://export.arxiv.org/api/query?search_query=`
  - Regional & Specialized Indexes: SciELO (`scielo.org`), PubMed / Europe PMC, Semantic Scholar, Institutional Repositories.
- **ZERO HALLUCINATION MANDATE:**
  - Absolute ban on fabricating authors, paper titles, publication years, journal names, volume/issue/pages, DOIs, or ISBNs.
  - Every cited work must have a resolvable digital object identifier (DOI) or validated persistent identifier (PURL / arXiv ID / handle).
- **Mandatory Verification Tool:**
  - `node scripts/deslop-bridge.mjs verify --file <draft.md> --strict`
- **Reference Dependencies:**
  - Evidence standards: [../references/source-credibility.md](../references/source-credibility.md)
  - Report templates: [../templates/final-report.md](../templates/final-report.md)

---

## 2. Step-by-Step Execution Protocol

```
[Research Question]
        ↓
[Step 1: Academic Query Formulation] (Keywords, MeSH terms, Boolean filters, year range)
        ↓
[Step 2: Multi-Repository Retrieval] (CrossRef, OpenAlex, arXiv, SciELO via search_web / curl)
        ↓
[Step 3: Bibliographic Metadata Extraction] (Authors, Title, Year, Journal, DOI, Abstract)
        ↓
[Step 4: Claim-to-Abstract Semantic Entailment] (Verification against actual study text)
        ↓
[Step 5: Mandatory ARS Strict Audit] (node scripts/deslop-bridge.mjs verify --strict)
        ↓
[Step 6: Literature Synthesis & Citation Registry] (Methodology, consensus vs dissent, gaps)
```

### Step 1: Academic Query Formulation
Translate natural language questions into structured academic search queries:
- Identify primary concepts and expand with canonical synonyms and Medical Subject Headings (MeSH) or ACM/IEEE taxonomy keywords.
- Construct Boolean expressions (`AND`, `OR`, `NOT`) with temporal filters (e.g., `2020..2026`).
- Define inclusion/exclusion criteria upfront (e.g., empirical trials only, meta-analyses prioritized, preprints marked distinctly from peer-reviewed works).

### Step 2: Multi-Repository Retrieval
Execute targeted searches using `search_web` targeting verified academic endpoints:

```bash
# Querying CrossRef for high-confidence metadata
curl -s "https://api.crossref.org/works?query=transformer+inference+quantization&rows=5&select=DOI,title,author,published,container-title"

# Querying OpenAlex API
curl -s "https://api.openalex.org/works?search=attention+mechanisms+efficiency&per-page=5"
```

For broader literature sweeps, use `search_web` targeting institutional index domains:
- `site:scielo.org "<topic>"`
- `site:arxiv.org/abs "<topic>"`
- `site:sciencedirect.com "<topic>"`

### Step 3: Bibliographic Metadata Extraction & Normalization
Extract and record every paper in a structured catalog:
- **Author List:** Complete surname and initials (e.g., Vaswani, A., et al.).
- **Canonical Title:** Full title as registered in CrossRef/OpenAlex.
- **Journal / Venue:** Canonical venue name, peer-review classification.
- **Publication Date:** Exact year and month.
- **DOI:** Clean resolvable format: `https://doi.org/10.xxxx/yyyy`.
- **ISBN:** For book citations, validate ISBN-10 or ISBN-13 checksum parity.

### Step 4: Semantic Entailment & Claim Alignment
Verify that paper claims align with the actual published findings:
1. **Abstract & Findings Inspection:** Inspect the abstract or conclusion text. Never infer conclusions based solely on paper titles.
2. **Methodological Rigor Check:** Note sample size ($N$), methodology (randomized controlled trial, observational cohort, theoretical proof, benchmark evaluation), and reported confidence intervals or $p$-values.
3. **Consensus vs. Controversy:** Differentiate established scientific consensus from isolated single-study findings.

### Step 5: Mandatory ARS Strict Audit
Prior to final delivery, compile all references into the draft markdown document and run:

```bash
node scripts/deslop-bridge.mjs verify --file literature-draft.md --strict
```

The ARS audit script validates:
- **DOI Live Resolution:** HTTP `HEAD` check verifying the DOI resolves to an active landing page.
- **Metadata Parity:** Author surname and publication year match the CrossRef/OpenAlex record.
- **ISBN Checksum:** Modulo-10 / Modulo-11 algorithmic verification on book ISBNs.
- **Semantic Entailment:** Flagging any claim whose polarity contradicts the referenced paper's abstract.

If any check fails, the workflow must abort and rectify the citation. No hallucinated citations may pass this gate.

### Step 6: Synthesis & Literature Map
Deliver the final synthesis structured with:
1. **State of the Art (SOTA) Overview:** Dominant paradigms and temporal evolution.
2. **Comparative Methodological Matrix:** Table comparing models, sample sizes, datasets, and key metrics.
3. **Contested Hypotheses & Divergent Results:** Conflicting findings across studies.
4. **Open Research Gaps:** Methodological limitations or unaddressed variables identified by authors.
5. **Verified Reference List:** Every entry formatted with active DOI links.

---

## 3. Checkable Completion Criteria

- [ ] Query formulated with Boolean operators and taxonomy keywords.
- [ ] Primary indexers queried (CrossRef, OpenAlex, arXiv, SciELO).
- [ ] ZERO unverified citations; 100% of DOIs and ISBNs mathematically validated.
- [ ] Claims verified against abstracts or paper bodies (semantic entailment verified).
- [ ] `node scripts/deslop-bridge.mjs verify --file <draft.md> --strict` executed with zero errors.
- [ ] Methodological matrix and consensus-vs-controversy analysis present.
