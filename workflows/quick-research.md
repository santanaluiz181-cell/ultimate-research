# Workflow: Quick Research (Mode 1)

Operate as an inline surgical factual researcher for single-point questions, current stable library/runtime versions, official release dates, API signature validations, and rapid verification checks.

---

## 1. Operating Envelope & Constraints

- **Execution Model:** 100% Inline (Main Agent Turn).
- **Subagent Policy:** **STRICT ZERO-SUBAGENT RULE**. Never spawn `invoke_subagent` for Quick Research. Every query must be resolved directly to prevent context bloat and turn latency.
- **Latency Target:** 1 to 2 turns total.
- **Reference Dependencies:**
  - Deslop heuristics: [../references/deslop-methodology.md](../references/deslop-methodology.md)
  - Tool mappings: [../references/mcp-connectors-registry.md](../references/mcp-connectors-registry.md)

---

## 2. Step-by-Step Execution Protocol

```
[Intent Input]
      ↓
[Step 1: Surgical Query Formulation] (Explicit Year, Primary Domain Anchors, NO before:2023)
      ↓
[Step 2: Direct Primary Search] (search_web targeting official repos/docs/registries)
      ↓
[Step 3: Source & Chronology Audit] (Release tags, commit dates, changelog timestamps)
      ↓
[Step 4: Synthesized Factual Response] (Exact version/date, primary canonical URL, zero fluff)
```

### Step 1: Surgical Query Formulation
Formulate 1 to 2 targeted queries using operator syntax. Avoid natural language chatter and few-shot bloat.

- **Temporal Pinning:** Always append the explicit target year (e.g., `2025` or `2026`) when searching for versions, support lifecycles, or roadmaps.
- **Domain Whitelisting:** Restrict searches to primary sources:
  - GitHub releases/tags: `site:github.com/<org>/<repo>/releases`
  - Documentation portals: `site:docs.<framework>.org` or `site:nodejs.org`
  - Package registries: `site:npmjs.com/package/<pkg>` or `site:pypi.org/project/<pkg>`
- **Forbidden Patterns:**
  - DO NOT use legacy search hacks like `before:2023`.
  - DO NOT query SEO scrapers, Medium re-posts, GeeksforGeeks, or aggregated spam blogs.

### Step 2: Direct Primary Search Execution
Execute using `search_web` with exact tokens:

```json
{
  "query": "site:github.com/facebook/react/releases latest release 2025"
}
```

If the primary page is a Single Page Application (SPA) requiring client-side JS evaluation or dynamic shadow-DOM inspection:
- Dispatch `call_mcp_tool` for `playwright` -> `browser_navigate` to load the exact URL.
- Evaluate the DOM element via `browser_evaluate` to extract the exact text node.

### Step 3: Source & Chronology Audit
Before outputting any claim:
1. **Timestamp Check:** Verify the date of publication against the current system date. Distinguish between *announcement date* and *effective general availability (GA) date*.
2. **Channel Authenticity:** Verify that the domain belongs to the official maintainer, core team, or recognized standards body (e.g., RFC, W3C, ISO).
3. **Deprecation Check:** Check if the answer references an archived branch, beta pre-release, or deprecated alias.

### Step 4: Concise Cited Response
Output the result using Caveman-compatible precision:

```markdown
**Item:** <Entity / Library / Standard>  
**Verified State:** <Version / Status / Exact Fact>  
**Effective Date:** <YYYY-MM-DD>  
**Primary Source:** [<Domain/Title>](<Canonical_URL>)  

<Optional: 1-2 line technical detail if breaking change or migration constraint applies>
```

---

## 3. Checkable Completion Criteria

- [ ] 0 subagents spawned.
- [ ] Query explicitly anchored to primary domain and calendar year.
- [ ] Slop/aggregator sites discarded.
- [ ] GA date verified against git tag, changelog, or package registry metadata.
- [ ] Response contains direct canonical URL.
