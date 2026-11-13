# Changelog

All notable changes to `ultimate-research` (formerly `deslop-search`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-11-13

### Added
- **Empirical Pre-Flight Auditor (`scripts/env-check.mjs`)**: Inspects `.gemini` MCP configs, Node.js/Python runtimes, Super Deslop SDK exports, ARS readiness, and honest fallback routing without simulating absent MCP tools.
- **5 Strategic MCP Connectors Registry (`references/mcp-connectors-registry.md`)**: Documents Perplexity, Firecrawl, PostHog, Playwright, and Composio routing priorities, untrusted-data isolation, and tool-pruning heuristics.
- **Uncle Bob Objective Gates & Claim Mutation Testing (`references/uncle-bob-verification-gates.md`)**: Adds 5 deterministic code-quality gates and zero-context Goldfish Claim Mutation Testing (polarity inversion, numerical/temporal perturbation, causal inversion) prior to emitting `[VERIFICADA]`.
- **Advisor-Planner / Executor Tiering (`references/google-harness-loop.md`)**: Aligns Elephant (`pro`) planning with lightweight scout execution (`flash_lite`/`flash`) and machine-verifiable gates.
- **Structured JSON Schemas & Validator (`schemas/`, `scripts/validate-schemas.mjs`)**: Introduces `research-plan.schema.json`, `evidence.schema.json`, and `report.schema.json` alongside deterministic schema checks, `entailment_checked === true` enforcement, `origin_fingerprint` anti-echo deduplication, Phase 9 convergence evaluation, and `SKILL.md` link validation.
- **Mode Workflows & Operational Templates (`workflows/`, `templates/`, `scripts/orchestrate.mjs`, `scripts/deslop-bridge.mjs`)**: Adds 9 specialized workflow playbooks, structured report/audit templates, and the runtime intent/bridge scripts.

### Changed
- **Version Metadata Parity**: Unified `package.json`, `package-lock.json`, `pyproject.toml`, `skill.json`, `SKILL.md`, `README.md`, and `CHANGELOG.md` to `2.1.0`; removed unused `@modelcontextprotocol/sdk` phantom dependency from `package.json` so `npm ci` and `npm ls` resolve cleanly.
- **Repository Root Cleanup**: Moved all 26 historical audit `.md` reports into `docs/audits/`, keeping `organizer.md` gitignored outside version control, and repaired broken relative links in `README.md`, `docs/audits/`, and `workflows/`.
- **Unified Test & CI Pipeline**: Consolidated `test/verifier.test.ts` into `tests/ts/verifier.test.ts`, made `tests/negative-scenarios.test.mjs` and `scripts/deslop-bridge.mjs` path-portable for Linux CI, and integrated `node scripts/validate-schemas.mjs` and `node --test tests/negative-scenarios.test.mjs` into `npm run verify` and `.github/workflows/ci.yml`.
- **Line Endings & Text Hygiene**: Added `.gitattributes` enforcing LF across source, config, and Markdown files; removed artificial em-dashes in documentation, scripts, and templates while preserving detector patterns in `classifier.ts` / `classifier.py`.

---

## [2.0.0] - 2026-11-10

### Added
- **Unified Rebrand to `ultimate-research`**: Merged Perplexity Prompting, Deep Multi-Wave Research, Super Deslop Search, ARS Epistemic Verification, Elephant-Goldfish Dual Architecture, and Google Research Harness² into a single 10-phase orchestration skill.
- **ARS Epistemic Citation Verifier (`src/verifier.ts`, `src/cli.ts`)**: Implemented deterministic CNJ Modulo 97 checksum validation (Res. CNJ 65/2008), ISBN-10/13 parity checks, CrossRef/OpenAlex/LexML/DJEN adapters, semantic thesis entailment checks, `verify` CLI command, and Compliance Certificate emission.
- **Adversarial & Blind Evaluation Audits**: Added 10 adversarial negative scenarios (`tests/negative-scenarios.test.mjs`), 15 ARS verifier Vitest specs, and full historical audit documentation.

---

## [1.1.0] - 2026-10-30

### Added
- **Dual Temporal Split-Horizon Engine**:
  - Implemented parallel search across **Lane A (`[HORIZONTE CANÔNICO: PRÉ-2023]`)** and **Lane B (`[HORIZONTE CONTEMPORÂNEO: PÓS-2023]`)**.
  - Added deterministic differential analysis (`[DIFERENCIAL E CONFLITOS]`) highlighting deprecation shifts, breaking changes, CVEs, version drift, and slop saturation.
  - Added CLI flags `--split` and `--split-horizon` to `query` and `live` commands, plus shorthand `split` subcommand.
  - Added `split_horizon` boolean parameter to `skill.json`, `SKILL.md`, and MCP dispatchers (`executeDeslopTool`, `executeDeslopToolAsync`).
  - Added native `ThreadPoolExecutor` parallel execution in Python library and `Promise.all` in TypeScript SDK.
- **Visual Branding**:
  - Added custom dark-mode SVG hero banner in `assets/hero-banner.svg`.
  - Added GitHub community governance files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue & PR templates).

---

## [1.0.0] - 2026-10-30

### Added
- Initial public release of `deslop-search`.
- **Temporal Dork Engine**: Idempotent injection of `after:2010 before:2023`, operator budget capping (`32` Google, `24` DDG/Bing), Google `udm=14` clean Web mode, and post-2022 subject detection (`--smart`).
- **Community Source Router**: Curated routing profiles (`qa`, `discussions`, `code`, `blogs`, `forums`, `all_community`) pointing to Reddit, Stack Exchange, GitHub, HN, Lobste.rs, and high-density engineering blogs.
- **Heuristic Slop Classifier**: Deterministic linear-time $O(N)$ text classifier evaluating EN + PT-BR corporate jargon, bold-colon listicle symmetry, paragraph uniformity ($\text{CV} < 0.18$), sentence burstiness ($\text{CV} < 0.24$), fake translation markers, and technical density counterweights.
- **Cross-Platform CLI & SDK**: Full TypeScript ESM (`strict: true`) and Python 3.10+ (`PEP 561`) parity with zero external runtime dependencies in Python.
- **Live Pre-2023 Archive Search**: Zero-key query support across Hacker News (Algolia Unix timestamp), Stack Overflow, and GitHub Issues.
- **AI Agent & MCP Tooling**: Manifests and handlers for Claude Code, Antigravity, Cursor, Gemini, and MCP.
