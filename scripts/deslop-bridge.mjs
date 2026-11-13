#!/usr/bin/env node
/**
 * Super Deslop Search Direct Runtime Bridge (Zero Duplication)
 * Connects Ultimate Research directly to the local `super-deslop-search` installation
 * without copying or rewriting its engine modules.
 */
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { resolve, join, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CANDIDATE_ROOTS = [
  process.env.SUPER_DESLOP_PATH,
  resolve(__dirname, ".."),
  resolve(process.cwd()),
  join(homedir(), "Downloads", "DESLOP SEARCH SKILL"),
  resolve(__dirname, "../../../../Downloads/DESLOP SEARCH SKILL")
].filter(Boolean);

export function resolveDeslopInstallation() {
  for (const root of CANDIDATE_ROOTS) {
    const absRoot = resolve(root);
    const entryJs = join(absRoot, "dist", "index.js");
    const cliJs = join(absRoot, "dist", "cli.js");
    const pkgJson = join(absRoot, "package.json");
    if (existsSync(entryJs) && existsSync(cliJs) && existsSync(pkgJson)) {
      return {
        available: true,
        rootDir: absRoot,
        entryJs,
        cliJs,
        entryUrl: pathToFileURL(entryJs).href
      };
    }
  }
  return {
    available: false,
    rootDir: null,
    entryJs: null,
    cliJs: null,
    entryUrl: null,
    reason: "Could not locate compiled super-deslop-search (dist/index.js). Set SUPER_DESLOP_PATH if moved."
  };
}

let cachedSdkPromise = null;

export async function loadDeslopSdk() {
  if (cachedSdkPromise) {
    return cachedSdkPromise;
  }
  const loc = resolveDeslopInstallation();
  if (!loc.available || !loc.entryUrl) {
    throw new Error(loc.reason || "super-deslop-search SDK unavailable");
  }
  cachedSdkPromise = import(loc.entryUrl).then((mod) => ({
    ...mod,
    __location: loc
  }));
  return cachedSdkPromise;
}

const PRIMARY_OR_OFFICIAL_DOMAIN_PATTERNS = [
  /\.gov(\.[a-z]{2})?$/i,
  /\.jus\.br$/i,
  /\.leg\.br$/i,
  /\.edu(\.[a-z]{2})?$/i,
  /\.mil(\.[a-z]{2})?$/i,
  /(^|\.)lexml\.gov\.br$/i,
  /(^|\.)scielo\.(br|org)$/i,
  /(^|\.)doi\.org$/i,
  /(^|\.)arxiv\.org$/i,
  /(^|\.)ietf\.org$/i,
  /(^|\.)rfc-editor\.org$/i,
  /(^|\.)w3\.org$/i,
  /(^|\.)nodejs\.org$/i,
  /(^|\.)react\.dev$/i,
  /(^|\.)reactjs\.org$/i,
  /(^|\.)python\.org$/i,
  /(^|\.)developer\.mozilla\.org$/i,
  /(^|\.)github\.com$/i
];

export function isPrimaryOrOfficialUrl(urlStr) {
  if (!urlStr || typeof urlStr !== "string") return false;
  try {
    const u = new URL(urlStr);
    return PRIMARY_OR_OFFICIAL_DOMAIN_PATTERNS.some((re) => re.test(u.hostname));
  } catch {
    return false;
  }
}

/**
 * Classifies content using Super Deslop's SlopClassifier while enforcing the
 * Ultimate Research epistemic guardrail: heuristic slop signals NEVER auto-discard
 * primary documents, official portals, legislation, or canonical docs.
 */
export async function classifyWithEpistemicGuardrail(input, options = {}) {
  if (!input || typeof input.text !== "string") {
    throw new Error("classifyWithEpistemicGuardrail requires { text: string, title?: string, url?: string }");
  }
  const sdk = await loadDeslopSdk();
  const deslop = new sdk.DeslopSearch();
  const rawClassification = deslop.classifyText({
    text: input.text,
    ...(input.title ? { title: input.title } : {}),
    ...(input.url ? { url: input.url } : {})
  });

  const isPrimary =
    options.forcePrimary === true ||
    options.sourceTier === "TIER_1" ||
    isPrimaryOrOfficialUrl(input.url);

  const shouldPreserveDespiteSignals =
    isPrimary && (rawClassification.verdict === "SLOP" || rawClassification.verdict === "SUSPICIOUS");

  let triageDisposition = "KEEP";
  if (rawClassification.verdict === "SLOP") {
    triageDisposition = shouldPreserveDespiteSignals ? "KEEP_PRIMARY_FOR_HUMAN_OR_AGENT_REVIEW" : "DEMOTE_TO_LOW_PRIORITY_TRIAGE";
  } else if (rawClassification.verdict === "SUSPICIOUS") {
    triageDisposition = "REVIEW_CONTEXTUALLY";
  }

  return {
    classification: rawClassification,
    epistemicGuardrail: {
      isPrimaryOrOfficial: isPrimary,
      primarySourcePreserved: shouldPreserveDespiteSignals,
      triageDisposition,
      epistemicNote:
        "Heuristic linguistic signals indicate triage priority only; they never prove falsehood, AI authorship, or unreliability."
    }
  };
}

/**
 * Runs Super Deslop CLI directly via Node subprocess for deterministic parity checks.
 */
export function invokeDeslopCli(args = [], timeoutMs = 15000) {
  const loc = resolveDeslopInstallation();
  if (!loc.available || !loc.cliJs) {
    return {
      ok: false,
      exitCode: 127,
      stdout: "",
      stderr: loc.reason || "super-deslop-search CLI unavailable"
    };
  }
  const proc = spawnSync(process.execPath, [loc.cliJs, ...args], {
    cwd: loc.rootDir,
    encoding: "utf-8",
    timeout: timeoutMs
  });
  return {
    ok: proc.status === 0,
    exitCode: proc.status ?? 1,
    stdout: proc.stdout ?? "",
    stderr: proc.stderr ?? ""
  };
}

export const BRIDGE_EXTENDED_TOOLS = [
  "deslop_classify_slop",
  "deslop_route_channels",
  "deslop_get_metadata",
  "deslop_verify_citations"
];

export function applyEpistemicCitationGuardrails(cert, arg2 = {}, arg3 = [], arg4 = {}) {
  if (!cert || !Array.isArray(cert.audits)) return cert;

  const options = (typeof arg2 === "object" && !Array.isArray(arg2) && arg2 !== null && !("audits" in arg2))
    ? arg2
    : (typeof arg4 === "object" && arg4 !== null ? arg4 : {});

  for (const audit of cert.audits) {
    const claimLower = String(audit.evidence?.claimText || "").toLowerCase();

    // 1. Guardrail for CNJ: structural Modulo 97 checksum != documentary existence in court/DJEN
    if (audit.evidence?.type === "judicial_cnj") {
      if (audit.officialSource === "CNJ Base Estrutural") {
        const isSevereAllegation = /pris[aã]o|prender|condenou|crime|fraude/i.test(claimLower);
        if (isSevereAllegation) {
          audit.verdict = "ALUCINAÇÃO DETECTADA";
          audit.exists = false;
          audit.semanticAlignmentScore = 0.0;
          audit.divergenceReason =
            "Alegação processual gravosa atribuída a processo inexistente ou não catalogado no DJEN/ComunicaAPI";
          audit.details =
            "Número CNJ possui dígito verificador matematicamente regular, porém inexiste qualquer registro de publicação judicial nos cadastros públicos.";
        } else {
          audit.verdict = "NÃO COMPROVADA";
          audit.exists = false;
          audit.semanticAlignmentScore = 0.1;
          audit.divergenceReason =
            "Validade estrutural Modulo 97 confirmada, porém sem registro de publicação ativa no DJEN/ComunicaAPI";
          audit.details =
            "O número atende à fórmula da Resolução CNJ 65/2008, mas não há comprovação documental de ajuizamento real.";
        }
      }
    }

    // 2. Guardrail for ISBN: parity checksum != cataloged bibliographic existence
    if (audit.evidence?.type === "academic_isbn") {
      if (audit.officialSource === "ISBN International Standard" && audit.verdict === "VERIFICADA") {
        audit.verdict = "NÃO COMPROVADA";
        audit.exists = false;
        audit.semanticAlignmentScore = 0.1;
        audit.divergenceReason =
          "Validade de checksum matemático confirmada, porém pendente confirmação em base bibliográfica catalogada.";
        audit.details =
          "Código ISBN possui dígito verificador matematicamente válido, porém pendente confirmação em base bibliográfica catalogada.";
      }
    }
  }

  const verifiedCount = cert.audits.filter((a) => a.verdict === "VERIFICADA").length;
  const divergenceCount = cert.audits.filter((a) => a.verdict === "DIVERGÊNCIA DE TESE").length;
  const hallucinationCount = cert.audits.filter((a) => a.verdict === "ALUCINAÇÃO DETECTADA").length;
  const unconfirmedCount = cert.audits.filter((a) => a.verdict === "NÃO COMPROVADA").length;

  cert.summary = {
    total: cert.audits.length,
    verifiedCount,
    divergenceCount,
    hallucinationCount,
    unconfirmedCount
  };
  cert.approved = hallucinationCount === 0 && divergenceCount === 0 && unconfirmedCount === 0;

  return cert;
}

/**
 * End-to-end epistemic audit for arbitrary text, applying both structural verification
 * and adversarial guardrails against unrecorded or synthetic citations.
 */
export async function auditEpistemicEvidence(rawText, options = {}) {
  const sdk = await loadDeslopSdk();
  const verifier = new sdk.CitationVerifier();

  const rawCert = await verifier.verifyText(rawText);
  const guardedCert = applyEpistemicCitationGuardrails(rawCert, rawText, [], {
    requireRecordedJudicialFiling: true,
    requireBibliographicCatalog: true,
    ...options
  });

  if (guardedCert.audits && guardedCert.audits.length > 0) {
    const hasHallucination = guardedCert.audits.some((a) => a.verdict === "ALUCINAÇÃO DETECTADA");
    const hasUnconfirmed = guardedCert.audits.some((a) => a.verdict === "NÃO COMPROVADA");
    const hasDivergence = guardedCert.audits.some((a) => a.verdict === "DIVERGÊNCIA DE TESE");
    const hasUnavailable = guardedCert.audits.some((a) => a.verdict === "FONTE INDISPONÍVEL");
    const hasUnlocated = guardedCert.audits.some((a) => a.verdict === "NÃO LOCALIZADO");
    const allVerified = guardedCert.audits.every((a) => a.verdict === "VERIFICADA");

    let stamp = "[VERIFICADA]";
    let score = 1.0;
    if (hasHallucination) {
      stamp = "[ALUCINAÇÃO DETECTADA]";
      score = 0.0;
    } else if (hasDivergence) {
      stamp = "[DIVERGÊNCIA DE TESE]";
      score = 0.3;
    } else if (hasUnavailable) {
      stamp = "[FONTE INDISPONÍVEL]";
      score = 0.5;
    } else if (hasUnlocated) {
      stamp = "[NÃO LOCALIZADO]";
      score = 0.2;
    } else if (hasUnconfirmed) {
      stamp = "[NÃO COMPROVADA]";
      score = 0.1;
    }

    return {
      stamp,
      score,
      cert: guardedCert,
      audits: guardedCert.audits
    };
  }

  // Text contains no formal identifiers; unbacked assertion
  return {
    stamp: "[FONTE NÃO IDENTIFICADA]",
    score: 0.1,
    cert: guardedCert,
    audits: []
  };
}

/**
 * Executes any Super Deslop MCP tool (native 4 DESLOP_AGENT_TOOLS + 4 SDK-backed aliases/extensions)
 * directly via the local super-deslop-search SDK without duplicating engine logic.
 */
export async function executeDeslopMcpTool(toolName, args = {}) {
  if (!toolName || typeof toolName !== "string") {
    throw new Error("executeDeslopMcpTool requires a non-empty toolName string");
  }
  const sdk = await loadDeslopSdk();
  const deslop = new sdk.DeslopSearch();

  if (toolName === "deslop_classify_slop") {
    return classifyWithEpistemicGuardrail(
      {
        text: String(args.text ?? ""),
        ...(args.title ? { title: String(args.title) } : {}),
        ...(args.url ? { url: String(args.url) } : {})
      },
      {
        forcePrimary: Boolean(args.forcePrimary),
        ...(args.sourceTier ? { sourceTier: String(args.sourceTier) } : {})
      }
    );
  }

  if (toolName === "deslop_route_channels") {
    const query = String(args.query ?? "").trim();
    if (!query) {
      throw new Error("deslop_route_channels requires { query: string }");
    }
    const rules = sdk.loadRules();
    const validChannels = new Set(Object.keys(rules.sources?.channels || {}));
    const aliasMap = {
      hn: "hackernews",
      so: "stackoverflow",
      gh: "github",
      forums: "indie_forums",
      blogs: "engineering_blogs"
    };
    let normalizedChannels;
    if (Array.isArray(args.channels) && args.channels.length > 0) {
      normalizedChannels = args.channels
        .map((c) => {
          const lower = String(c).trim().toLowerCase();
          return aliasMap[lower] || lower;
        })
        .filter((c) => validChannels.has(c));
    }
    return deslop.buildRoutes(query, {
      ...(normalizedChannels && normalizedChannels.length > 0 ? { channels: normalizedChannels } : {}),
      ...(args.before ? { before: String(args.before) } : {}),
      ...(args.after ? { after: String(args.after) } : {}),
      ...(args.engine ? { engine: String(args.engine) } : {})
    });
  }

  if (toolName === "deslop_get_metadata") {
    const rules = sdk.loadRules();
    return {
      blockedDomainsCount: Array.isArray(rules.allBlockedDomains) ? rules.allBlockedDomains.length : 0,
      trustedDomainsCount: Array.isArray(rules.allTrustedDomains) ? rules.allTrustedDomains.length : 0,
      channelCategories: rules.sources ? Object.keys(rules.sources) : [],
      blocklistCategories: rules.blocklist ? Object.keys(rules.blocklist) : [],
      slopLexiconKeys: rules.slopLexicon ? Object.keys(rules.slopLexicon) : [],
      nativeMcpTools: (sdk.DESLOP_AGENT_TOOLS || []).map((t) => t.name),
      bridgeExtendedTools: BRIDGE_EXTENDED_TOOLS
    };
  }

  if (toolName === "deslop_verify_citations") {
    let rawCert;
    if (args.filePath) {
      rawCert = await deslop.verifyFile(String(args.filePath), { strict: Boolean(args.strict) });
    } else {
      const text = String(args.text ?? "");
      rawCert = await deslop.verifyCitations(text, { strict: Boolean(args.strict) });
    }
    return applyEpistemicCitationGuardrails(rawCert, {
      requireBibliographicCatalog: Boolean(args.requireBibliographicCatalog)
    });
  }

  if (typeof sdk.executeDeslopToolAsync !== "function") {
    throw new Error("executeDeslopToolAsync not exported by super-deslop-search");
  }
  return sdk.executeDeslopToolAsync(toolName, args);
}

// CLI entrypoint when executed directly
const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]).toLowerCase() === resolve(fileURLToPath(import.meta.url)).toLowerCase();

if (invokedDirectly) {
  const sub = process.argv[2] || "status";
  if (sub === "status") {
    const loc = resolveDeslopInstallation();
    if (!loc.available) {
      process.stdout.write(`${JSON.stringify(loc, null, 2)}\n`);
      process.exitCode = 1;
    } else {
      const sdk = await loadDeslopSdk();
      const nativeTools = (sdk.DESLOP_AGENT_TOOLS || []).map((t) => t.name);
      process.stdout.write(
        `${JSON.stringify(
          {
            ...loc,
            mcpToolsNative: nativeTools,
            mcpToolsBridgeExtended: BRIDGE_EXTENDED_TOOLS,
            mcpToolsExposed: [...new Set([...nativeTools, ...BRIDGE_EXTENDED_TOOLS])],
            exportsVerified: [
              "DeslopSearch",
              "CitationVerifier",
              "EvidenceParser",
              "validateCnjNumber",
              "validateIsbn",
              "DESLOP_AGENT_TOOLS",
              "executeDeslopToolAsync"
            ].every((k) => k in sdk)
          },
          null,
          2
        )}\n`
      );
    }
  } else if (sub === "mcp-tool") {
    const toolName = process.argv[3];
    const rawArgs = process.argv[4] ? JSON.parse(process.argv[4]) : {};
    const out = await executeDeslopMcpTool(toolName, rawArgs);
    process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
  } else {
    const res = invokeDeslopCli(process.argv.slice(2));
    if (res.stdout) process.stdout.write(res.stdout);
    if (res.stderr) process.stderr.write(res.stderr);
    process.exitCode = res.exitCode;
  }
}
