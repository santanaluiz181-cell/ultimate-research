# Workflow: Deep Research (Mode 2)

Execute multi-causal, cross-domain investigations across technical, institutional, economic, and policy landscapes using iterative multi-agent swarm waves, strict evidence triangulation, and automated anti-slop audits.

---

## 1. Operating Envelope & Swarm Architecture

- **Orchestration Tool:** `node scripts/orchestrate.mjs "<prompt>" --mode DEEP_RESEARCH`
- **Subagent Topology:** Hierarchical Tactical Swarm.
  - **Queen Orchestrator:** Main agent (`pro` / default) maintains overall graph, convergence tracking, and report authoring.
  - **Worker Subagents:** Spawned via `invoke_subagent` with `TypeName: "research"` and `Model: "flash_lite"` (or `"flash"` for synthesis). Max 5 concurrent agents per wave.
- **Artifacts & Templates:**
  - Final Report Template: [../templates/final-report.md](../templates/final-report.md)
  - Anti-Slop Heuristics: [../references/deslop-methodology.md](../references/deslop-methodology.md)
  - Evidence Criteria: [../references/source-credibility.md](../references/source-credibility.md)

---

## 2. Execution Flow Diagram

```
[User Problem / Topic]
          ↓
[Step 1: Intent Framing & Plan Initialization]
          ↓
[Step 2: Sub-goal Decomposition] (4-8 non-overlapping declarative vectors)
          ↓
[Step 3: Wave 1 Swarm Dispatch] (Up to 5 flash_lite agents: Primary, Academic, Press, Adversarial, Gaps)
          ↓
[Step 4: Consolidation, Deslop Triage & Triangulation] (origin_fingerprint, [single-source] flag)
          ↓
[Step 5: Iteration / Convergence Gate]
   ├── Convergence NOT met → Replan Wave 2+ from gaps/leads
   └── Convergence MET (>=10 origins & <15% novel claims) OR Cap Reached
          ↓
[Step 6: ARS Audit & Final Report Assembly] (../templates/final-report.md)
```

---

## 3. Step-by-Step Execution Protocol

### Step 1: Intent Framing & Initialization
1. Execute the orchestrator script to initialize state:
   ```bash
   node scripts/orchestrate.mjs "<user_query>" --mode DEEP_RESEARCH
   ```
2. Parse the output graph and isolate the primary investigative core, boundaries, and required evidentiary depth.

### Step 2: Sub-Goal Decomposition
Decompose the investigation into 4 to 8 distinct, non-overlapping declarative vectors. Each vector must formulate:
- A falsifiable working hypothesis.
- Specific evidentiary standards required to substantiate or refute the vector.
- Targeted data types (e.g., technical benchmarks, financial filings, primary legislative acts).

### Step 3: Wave 1 Parallel Dispatch
Invoke up to 5 parallel research subagents using `invoke_subagent`. Assign strict epistemic roles:

1. **Agent Alpha (Primary & Official):** Laws, decrees, regulatory filings, official GitHub commits, press releases.
2. **Agent Beta (Academic & Technical):** Peer-reviewed literature, RFCs, technical architecture whitepapers, benchmarks.
3. **Agent Gamma (Market, Data & Historical Record):** Longitudinal pricing, market filings (10-K, 8-K), press archives, corporate registries.
4. **Agent Delta (Adversarial & Dissent):** Criticisms, known exploits, failure post-mortems, litigation filings, opposing technical camps.
5. **Agent Epsilon (Verification & Blindspots):** Verifying secondary claims, hunting for hidden biases, identifying circular syndication networks.

**Subagent Contract & Required Return Schema:**
Subagents must return raw data strictly structured as a JSON object:
```json
{
  "sub_goal": "<Assigned Vector>",
  "claims": [
    {
      "claim": "<Atomic Factual Statement>",
      "source_url": "<Canonical Primary URL>",
      "source_title": "<Document Name>",
      "publication_date": "YYYY-MM-DD",
      "extracted_span": "<Exact 1-2 sentence quote>",
      "confidence": "HIGH | MEDIUM | LOW"
    }
  ],
  "gaps": ["<Unanswered question 1>", "<Data unavailable 2>"],
  "leads": ["<Specific person/entity/document uncovered to investigate next>"]
}
```

### Step 4: Post-Wave Consolidation & Deslop Triangulation
1. Run Deslop Bridge to scrub AI slop and SEO spam:
   ```bash
   node scripts/deslop-bridge.mjs filter --input <subagent_output_json>
   ```
2. **Anti-Echo Origin Fingerprinting:**
   - Detect news syndication where multiple outlets repeat a single unverified wire service report.
   - Trace back to the primary originator.
   - If a claim has multiple citations that all trace to a single source, flag explicitly as `[single-source]`.
3. Consolidate facts into the central matrix. Eliminate redundant claims.

### Step 5: Wave Iteration & Convergence Gate
Evaluate stopping criteria before launching Wave 2:
- **Convergence Threshold:**
  - `Total Independent Origins >= 10`
  - AND `Novel Claims Added across last 2 waves < 15%`
- If threshold is NOT met:
  - Extract all `gaps` and `leads` from the previous wave.
  - Launch Wave 2 with focused queries targeting identified holes.
  - Maximum waves allowed: 3.
- If threshold cannot be met after 3 waves:
  - Mark unproven vectors explicitly as `INSUFFICIENT EVIDENCE`. Do not hallucinate or extrapolate beyond verified data.

### Step 6: ARS Audit & Final Report Assembly
1. Run the Automated Reference System (ARS) audit:
   ```bash
   node scripts/deslop-bridge.mjs verify --file report-draft.md --strict
   ```
2. Structure the final deliverable using [../templates/final-report.md](../templates/final-report.md):
   - **Executive Summary & Analytical Takeaways**
   - **Methodology & Swarm Convergence Telemetry**
   - **Core Findings by Vector (with explicit [single-source] flags)**
   - **Dissenting Views & Counter-Evidence Analysis**
   - **Identified Residual Blindspots**
   - **Complete Primary Citation Registry**

---

## 4. Checkable Completion Criteria

- [ ] Orchestrator initialized via `node scripts/orchestrate.mjs`.
- [ ] Sub-goals decomposed into 4-8 declarative vectors with hypotheses.
- [ ] Subagents invoked with `Model: "flash_lite"` and JSON envelope.
- [ ] Deslop filtering executed; circular syndication resolved to original sources.
- [ ] Claims backed by single sources marked with `[single-source]`.
- [ ] Convergence evaluated (`>=10` origins, `<15%` novel claims) or honest `INSUFFICIENT EVIDENCE` recorded.
- [ ] ARS strict audit passed.
- [ ] Final report formatted to `../templates/final-report.md`.
