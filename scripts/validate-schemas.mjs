#!/usr/bin/env node
/**
 * Ultimate Research - Deterministic Schema, Epistemic Integrity & Skill Structure Validator
 * Zero external dependencies. Enforces JSON schemas, anti-echo-chamber origin deduplication,
 * entailment-before-verified rule, convergence math, and SKILL.md pointer integrity.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMAS_DIR = resolve(__dirname, "../schemas");

export function validateJsonAgainstSchema(data, schema, path = "$") {
  const errors = [];
  if (!schema || typeof schema !== "object") return errors;

  if (schema.type) {
    const actualType = Array.isArray(data) ? "array" : data === null ? "null" : typeof data;
    if (schema.type === "integer") {
      if (typeof data !== "number" || !Number.isInteger(data)) {
        errors.push(`${path}: expected integer, got ${actualType}`);
        return errors;
      }
    } else if (actualType !== schema.type) {
      errors.push(`${path}: expected ${schema.type}, got ${actualType}`);
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(data)) {
    errors.push(`${path}: value "${String(data)}" not in enum [${schema.enum.join(", ")}]`);
  }

  if (typeof data === "string") {
    if (typeof schema.minLength === "number" && data.length < schema.minLength) {
      errors.push(`${path}: string length ${data.length} < minLength ${schema.minLength}`);
    }
    if (typeof schema.pattern === "string") {
      const re = new RegExp(schema.pattern);
      if (!re.test(data)) {
        errors.push(`${path}: "${data}" does not match pattern ${schema.pattern}`);
      }
    }
  }

  if (typeof data === "number") {
    if (typeof schema.minimum === "number" && data < schema.minimum) {
      errors.push(`${path}: ${data} < minimum ${schema.minimum}`);
    }
    if (typeof schema.maximum === "number" && data > schema.maximum) {
      errors.push(`${path}: ${data} > maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(data)) {
    if (typeof schema.minItems === "number" && data.length < schema.minItems) {
      errors.push(`${path}: array length ${data.length} < minItems ${schema.minItems}`);
    }
    if (schema.uniqueItems) {
      const set = new Set(data.map((x) => JSON.stringify(x)));
      if (set.size !== data.length) {
        errors.push(`${path}: duplicate items violate uniqueItems`);
      }
    }
    if (schema.items) {
      data.forEach((item, idx) => {
        errors.push(...validateJsonAgainstSchema(item, schema.items, `${path}[${idx}]`));
      });
    }
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (Array.isArray(schema.required)) {
      for (const reqKey of schema.required) {
        if (!(reqKey in data) || data[reqKey] === undefined) {
          errors.push(`${path}: missing required property "${reqKey}"`);
        }
      }
    }
    if (schema.properties) {
      for (const [k, v] of Object.entries(data)) {
        if (k in schema.properties) {
          errors.push(...validateJsonAgainstSchema(v, schema.properties[k], `${path}.${k}`));
        } else if (schema.additionalProperties === false) {
          errors.push(`${path}: unexpected property "${k}"`);
        }
      }
    }
  }

  return errors;
}

export function loadNamedSchema(name) {
  const filename = name.endsWith(".schema.json") ? name : `${name}.schema.json`;
  const fullPath = join(SCHEMAS_DIR, filename);
  return JSON.parse(readFileSync(fullPath, "utf-8"));
}

/**
 * Audits an Evidence Ledger for epistemic rules beyond structural schema:
 * 1. Cannot stamp VERIFICADA unless entailment_checked === true.
 * 2. Deduplicates syndicated/press-release origins via origin_fingerprint & hostname.
 */
export function auditEvidenceEpistemics(ledger) {
  const schema = loadNamedSchema("evidence");
  const schemaErrors = validateJsonAgainstSchema(ledger, schema);
  const epistemicViolations = [];

  const items = Array.isArray(ledger?.items) ? ledger.items : [];
  const seenOrigins = new Map();
  const distinctHosts = new Set();

  for (const item of items) {
    if (item.verification_status === "VERIFICADA" && item.entailment_checked !== true) {
      epistemicViolations.push(
        `${item.id}: cannot emit VERIFICADA without entailment_checked === true (use EXISTENCIA_CONFIRMADA_SEM_ENTAILMENT).`
      );
    }

    try {
      const host = new URL(item.url).hostname.replace(/^www\./i, "").toLowerCase();
      distinctHosts.add(host);
    } catch {
      // caught by schema URL regex
    }

    const fp = String(item.origin_fingerprint || "").trim().toLowerCase();
    if (fp) {
      if (seenOrigins.has(fp)) {
        const firstId = seenOrigins.get(fp);
        if (item.independent_from_peers === true) {
          epistemicViolations.push(
            `${item.id}: marked independent_from_peers=true, but shares origin_fingerprint "${fp}" with ${firstId} (syndicated/press-release echo).`
          );
        }
      } else {
        seenOrigins.set(fp, item.id);
      }
    }
  }

  const trueIndependentOriginsCount = seenOrigins.size;
  if (
    ledger?.triangulation_summary &&
    ledger.triangulation_summary.distinct_independent_origins > trueIndependentOriginsCount
  ) {
    epistemicViolations.push(
      `triangulation_summary.distinct_independent_origins (${ledger.triangulation_summary.distinct_independent_origins}) exceeds actual deduplicated origins (${trueIndependentOriginsCount}).`
    );
  }

  return {
    valid: schemaErrors.length === 0 && epistemicViolations.length === 0,
    schemaErrors,
    epistemicViolations,
    computedMetrics: {
      totalItems: items.length,
      distinctHosts: distinctHosts.size,
      distinctIndependentOrigins: trueIndependentOriginsCount
    }
  };
}

/**
 * Evaluates Phase 9 Convergence Criteria (Deep Research + Adaptive Scope).
 */
export function evaluateConvergence({
  mode = "DEEP_RESEARCH",
  distinctIndependentOrigins = 0,
  waveNoveltyRates = [],
  unansweredCriticalQuestions = 0,
  unresolvedContradictions = 0,
  wavesExecuted = 1,
  maxWaves = 4
}) {
  if (mode === "QUICK_RESEARCH") {
    const ok = distinctIndependentOrigins >= 1 && unansweredCriticalQuestions === 0;
    return {
      converged: ok,
      insufficientEvidence: !ok,
      action: ok ? "SYNTHESIZE_FINAL" : "DECLARE_LIMITATION_OR_REFINE_QUERY",
      reason: ok
        ? "Quick Research verified against primary/official source."
        : "Primary verification still incomplete."
    };
  }

  const minOriginsFloor = mode === "DEEP_RESEARCH" ? 10 : 4;
  const lastTwo = waveNoveltyRates.slice(-2);
  const noveltyStagnated =
    lastTwo.length === 2 && lastTwo[0] < 0.15 && lastTwo[1] < 0.15;

  if (
    distinctIndependentOrigins >= minOriginsFloor &&
    noveltyStagnated &&
    unansweredCriticalQuestions === 0 &&
    unresolvedContradictions === 0
  ) {
    return {
      converged: true,
      insufficientEvidence: false,
      action: "SYNTHESIZE_FINAL",
      reason: `Reached floor (${distinctIndependentOrigins} >= ${minOriginsFloor} independent origins), 0 critical contradictions unresolved, and marginal novelty decayed below 15% over 2 consecutive waves.`
    };
  }

  if (unresolvedContradictions > 0 && wavesExecuted < maxWaves) {
    return {
      converged: false,
      insufficientEvidence: false,
      action: "EXECUTE_NEXT_WAVE",
      reason: `Premature shutdown prevented: ${unresolvedContradictions} critical contradiction(s) require an adversarial adjudication wave despite marginal novelty decay.`
    };
  }

  if (wavesExecuted >= maxWaves) {
    return {
      converged: unansweredCriticalQuestions === 0 && distinctIndependentOrigins >= Math.ceil(minOriginsFloor / 2),
      insufficientEvidence: unansweredCriticalQuestions > 0 || distinctIndependentOrigins < Math.ceil(minOriginsFloor / 2),
      action: "STOP_AND_DECLARE_REMAINING_GAPS",
      reason: `Wave budget (${maxWaves}) reached; halt iteration and explicitly report any unresolved gaps as INSUFFICIENT EVIDENCE rather than speculating.`
    };
  }

  return {
    converged: false,
    insufficientEvidence: false,
    action: "EXECUTE_NEXT_WAVE",
    reason: `Continue investigation: independent origins=${distinctIndependentOrigins}/${minOriginsFloor}, unanswered critical questions=${unansweredCriticalQuestions}, unresolved contradictions=${unresolvedContradictions}.`
  };
}

/**
 * Validates Antigravity SKILL.md frontmatter, progressive disclosure size,
 * zero-width characters, and all relative markdown links.
 */
export function validateSkillDirectory(skillRootDir) {
  const root = resolve(skillRootDir);
  const skillMdPath = join(root, "SKILL.md");
  const issues = [];

  if (!existsSync(skillMdPath)) {
    return { valid: false, issues: [`Missing SKILL.md at ${skillMdPath}`] };
  }

  const rawBuf = readFileSync(skillMdPath);
  if (rawBuf.length >= 3 && rawBuf[0] === 0xef && rawBuf[1] === 0xbb && rawBuf[2] === 0xbf) {
    issues.push("SKILL.md contains UTF-8 BOM; must be clean UTF-8 without BOM.");
  }

  const text = rawBuf.toString("utf-8");
  if (/[\u200B-\u200D\uFEFF]/.test(text)) {
    issues.push("SKILL.md contains hidden zero-width characters.");
  }

  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    issues.push("SKILL.md missing YAML frontmatter block.");
  } else {
    const fm = fmMatch[1];
    if (!/^name:\s*ultimate-research\s*$/m.test(fm)) {
      issues.push("Frontmatter missing exact `name: ultimate-research`.");
    }
    if (!/^description:\s*.+/m.test(fm)) {
      issues.push("Frontmatter missing `description`.");
    }
  }

  const lineCount = text.split(/\r?\n/).length;
  if (lineCount > 280) {
    issues.push(`SKILL.md too bloated (${lineCount} lines > 280 max); disclose bulky procedures into references/ or workflows/.`);
  }

  // Verify all relative markdown links [label](./path) or [label](references/...)
  const linkRegex = /\[[^\]]+\]\((?!https?:\/\/|mailto:|file:\/\/|#)([^)]+)\)/g;
  let match;
  const checkedLinks = [];
  while ((match = linkRegex.exec(text)) !== null) {
    const relTarget = match[1].split("#")[0].trim();
    if (!relTarget) continue;
    const absTarget = resolve(root, relTarget);
    checkedLinks.push(relTarget);
    if (!existsSync(absTarget)) {
      issues.push(`Broken relative link in SKILL.md: "${relTarget}" -> not found at ${absTarget}`);
    } else {
      const st = statSync(absTarget);
      if (st.isFile() && st.size === 0) {
        issues.push(`Empty target file referenced in SKILL.md: "${relTarget}"`);
      }
    }
  }

  return {
    valid: issues.length === 0,
    skillMdLines: lineCount,
    checkedLinksCount: checkedLinks.length,
    issues
  };
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]).toLowerCase() === resolve(fileURLToPath(import.meta.url)).toLowerCase();

if (invokedDirectly) {
  const cmd = process.argv[2] || "skill";
  if (cmd === "skill") {
    const targetDir = process.argv[3] || resolve(__dirname, "..");
    const res = validateSkillDirectory(targetDir);
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
    process.exitCode = res.valid ? 0 : 1;
  } else if (cmd === "plan" || cmd === "report") {
    const file = process.argv[3];
    const data = JSON.parse(readFileSync(resolve(file), "utf-8"));
    const schema = loadNamedSchema(cmd === "plan" ? "research-plan" : "report");
    const errs = validateJsonAgainstSchema(data, schema);
    process.stdout.write(`${JSON.stringify({ valid: errs.length === 0, errors: errs }, null, 2)}\n`);
    process.exitCode = errs.length === 0 ? 0 : 1;
  } else if (cmd === "evidence") {
    const file = process.argv[3];
    const data = JSON.parse(readFileSync(resolve(file), "utf-8"));
    const res = auditEvidenceEpistemics(data);
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
    process.exitCode = res.valid ? 0 : 1;
  }
}
