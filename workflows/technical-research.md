# Workflow: Technical Research (Mode 5)

Execute deep technical investigations across software engineering ecosystems, runtime architectures, language specifications, API contracts, RFC standards, debugging anomalies, and system migrations with 3-Lane Split-Horizon verification.

---

## 1. Operating Scope & High-Integrity Technical Sources

- **Primary Technical Authorities:**
  - **Official Documentation & Specs:** Vendor docs, language specs (ECMA, Python PEPs, Rust RFCs, Go proposals), IETF/W3C RFCs.
  - **Source Code Repositories:** GitHub / GitLab source trees, commit histories, PR discussions, release tags, and test suites.
  - **Issue Trackers & Bug Reports:** Open/closed issues with verifiable repro steps and maintainer responses.
  - **Technical Discussion & Post-Mortems:** Lobste.rs, Hacker News, specialized Reddit (r/rust, r/golang, etc.), Stack Overflow (audited for recency).
- **The Threat of Technical Slop:**
  - AI-generated coding blogs and SEO aggregators frequently publish obsolete syntax, hallucinated API flags, or deprecated patterns presented as current best practices.
  - Technical research mandates live source or type-definition verification.
- **Reference Dependencies:**
  - Tool mappings: [../references/mcp-connectors-registry.md](../references/mcp-connectors-registry.md)
  - Anti-slop heuristics: [../references/deslop-methodology.md](../references/deslop-methodology.md)

---

## 2. The 3-Lane Split-Horizon Methodology

Whenever researching technical topics subject to version drift, architectural deprecations, or breaking changes, invoke the 3-Lane Split-Horizon protocol:

```
                  [Technical Topic / Query]
                              ↓
        node scripts/deslop-bridge.mjs split "<topic>"
                              ↓
  ┌───────────────────────────┼───────────────────────────┐
  ↓                           ↓                           ↓
[Lane A: Historical]        [Lane B: Contemporary]      [Lane C: Live Official]
Pre-cutoff canonical docs   Post-cutoff ecosystem state  Live GitHub / Docs
Foundational concepts       Audited via SlopClassifier   Active tags & types
```

- **Command:** `node scripts/deslop-bridge.mjs split "<topic>"`
- **Lane A (Historical / Canonical):** Establishes foundational design decisions, RFC specifications, and baseline architecture established before a major breaking release.
- **Lane B (Contemporary Ecosystem):** Examines post-cutoff community adoption, blog patterns, and migration experiences, scrubbed of AI slop through `SlopClassifier`.
- **Lane C (Live Official Validation):** Direct inspection of current GitHub release tags, active documentation branches, and compiler/type definitions to determine ground truth.
- **Temporal Cutoff Rule:** The cutoff date must be explicitly justified based on the exact release date of the breaking version (e.g., Python 2→3, React 18→19, Vue 2→3, Next.js Pages→App Router).

---

## 3. Step-by-Step Execution Protocol

```
[Technical Problem / Migration Inquiry]
                   ↓
[Step 1: Scoping & Version Horizon Definition] (Identify exact runtime, library, target versions)
                   ↓
[Step 2: 3-Lane Split-Horizon Execution] (node scripts/deslop-bridge.mjs split "<topic>")
                   ↓
[Step 3: Source Code & Type Signature Verification] (GitHub files, types, PR diffs)
                   ↓
[Step 4: Failure Mode & Issue Tracker Forensics] (Open/closed issues, workarounds, edge cases)
                   ↓
[Step 5: Synthesized Technical Runbook & Migration Guide] (Working code, verified commands, warnings)
```

### Step 1: Scoping & Version Horizon Definition
1. Pin the exact technological boundary:
   - Language/Runtime: Exact versions (e.g., Node.js v22.x, Python 3.12, Go 1.23).
   - Core Libraries / Frameworks: Semantic versioning constraints (e.g., `^19.0.0` vs `~18.2.0`).
   - Operating Environment: OS, architecture (x86_64, arm64), container runtime.
2. Establish the breaking change cutoff point and document the version delta.

### Step 2: 3-Lane Split-Horizon Triangulation
Execute `node scripts/deslop-bridge.mjs split "<topic>"` and populate the 3 lanes:
- **Lane A:** Query foundational specifications via `search_web`:
  `site:ietf.org/rfc "<keyword>"` or `site:github.com/rust-lang/rfcs "<keyword>"`
- **Lane B:** Query contemporary ecosystem discussions, filtering out auto-generated scrapers:
  `site:lobste.rs "<topic>" OR site:news.ycombinator.com "<topic>"`
- **Lane C:** Query the active documentation portal and GitHub releases:
  `site:github.com/<owner>/<repo>/releases "v<major>"`

### Step 3: Source Code & Type Signature Verification
Verify APIs at the implementation level:
1. **GitHub Source Check:** Inspect `package.json`, `Cargo.toml`, `go.mod`, or `.d.ts` type declarations directly on the repository's `main` branch or tag.
2. **Signature Extraction:** Extract exact method signatures, parameter types, return types, and exceptions/error types.
3. **Deprecation Attributes:** Check for `@deprecated` docstrings, compiler warnings, or removal notices in release notes.

### Step 4: Failure Mode & Issue Tracker Forensics
Investigate real-world edge cases:
- Query GitHub issues for active regressions:
  `site:github.com/<owner>/<repo>/issues "is:issue" "<error_message>"`
- Check for race conditions, memory leaks, unhandled edge cases, or platform-specific quirks (Windows vs Linux paths, signal handling).
- Verify workarounds: Confirm whether a workaround proposed in a thread has been superseded by an upstream patch.

### Step 5: Synthesized Technical Runbook
Compile the technical findings into a direct, implementation-ready deliverable:
- **Architecture Overview:** Concise diagram or breakdown of the system mechanism.
- **Verified Code Artifacts:** Functional, self-contained, typed code snippets reflecting current version standards.
- **Breaking Changes & Migration Matrix:** Table of Old API vs New API with required transformation steps.
- **Edge Cases & Gotchas:** Known limitations, concurrency caveats, and performance profiles.
- **Reference Registry:** Links to GitHub PRs, documentation pages, and RFCs.

---

## 4. Checkable Completion Criteria

- [ ] Target runtime and framework versions explicitly pinned.
- [ ] 3-Lane Split-Horizon executed (`node scripts/deslop-bridge.mjs split`) with cutoff justified.
- [ ] Code examples verified against live official types or GitHub source tags (Lane C).
- [ ] Slop/scraper blog patterns purged via `SlopClassifier` (Lane B).
- [ ] Issue tracker and failure modes audited on repository trackers.
- [ ] Objective code quality gates checked when evaluating agent diffs: test coverage, dependency DAG acyclicity, cyclomatic complexity, module size bounds, and mutation testing ([uncle-bob-verification-gates.md](../references/uncle-bob-verification-gates.md)).
- [ ] Code snippets complete, typed, and free of placeholder pseudo-code.
