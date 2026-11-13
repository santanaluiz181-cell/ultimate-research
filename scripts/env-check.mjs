#!/usr/bin/env node
/**
 * Ultimate Research - Empirical Environment & Tool Availability Auditor
 * Inspects local Antigravity MCP servers, Super Deslop Search installation,
 * runtime versions, and active fallbacks WITHOUT exposing any credentials or faking tools.
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolveDeslopInstallation, loadDeslopSdk, BRIDGE_EXTENDED_TOOLS } from "./deslop-bridge.mjs";

export async function auditToolAvailability(options = {}) {
  const home = options.homeDir || homedir();
  const mcpConfigPaths = [
    join(home, ".gemini", "config", "mcp_config.json"),
    join(home, ".gemini", "antigravity", "mcp_config.json"),
    join(home, ".gemini", "config", "plugins", "super-antigravity-tjto", "mcp_config.json")
  ];

  const discoveredMcpServers = new Set();
  const auditedMcpFiles = [];

  for (const cfgPath of mcpConfigPaths) {
    if (existsSync(cfgPath)) {
      try {
        const raw = readFileSync(cfgPath, "utf-8").trim();
        if (raw.length > 0) {
          const parsed = JSON.parse(raw);
          const serversObj = parsed.mcpServers || parsed.servers || {};
          const names = Object.keys(serversObj);
          names.forEach((n) => discoveredMcpServers.add(n));
          auditedMcpFiles.push({ path: cfgPath, serverCount: names.length, servers: names });
        } else {
          auditedMcpFiles.push({ path: cfgPath, serverCount: 0, servers: [] });
        }
      } catch (err) {
        auditedMcpFiles.push({ path: cfgPath, error: err instanceof Error ? err.message : String(err) });
      }
    }
  }

  const serverList = [...discoveredMcpServers].sort();
  const hasServer = (needle) => serverList.some((s) => s.toLowerCase().includes(needle));
  const perplexityMcpAvailable = hasServer("perplexity");
  const firecrawlMcpAvailable = hasServer("firecrawl");
  const posthogMcpAvailable = hasServer("posthog");
  const playwrightMcpAvailable = hasServer("playwright");
  const composioMcpAvailable = hasServer("composio");
  const deslopMcpConfigured = hasServer("deslop");

  // Check Super Deslop local installation
  const deslopLoc = resolveDeslopInstallation();
  let deslopSdkStatus = { loaded: false, mcpToolsCount: 0, arsVerifierReady: false };
  if (deslopLoc.available) {
    try {
      const sdk = await loadDeslopSdk();
      const nativeToolNames = Array.isArray(sdk.DESLOP_AGENT_TOOLS) ? sdk.DESLOP_AGENT_TOOLS.map((t) => t.name) : [];
      const allToolNames = [...new Set([...nativeToolNames, ...BRIDGE_EXTENDED_TOOLS])];
      deslopSdkStatus = {
        loaded: true,
        mcpToolsCount: allToolNames.length,
        mcpToolNames: allToolNames,
        nativeMcpToolNames: nativeToolNames,
        bridgeExtendedToolNames: BRIDGE_EXTENDED_TOOLS,
        arsVerifierReady: typeof sdk.CitationVerifier === "function" && typeof sdk.validateCnjNumber === "function"
      };
    } catch (err) {
      deslopSdkStatus.error = err instanceof Error ? err.message : String(err);
    }
  }

  // Check Python availability
  let pythonVersion = null;
  try {
    const py = spawnSync("python", ["--version"], { encoding: "utf-8", timeout: 4000 });
    if (py.status === 0) {
      pythonVersion = (py.stdout || py.stderr || "").trim();
    }
  } catch {
    pythonVersion = null;
  }

  return {
    auditedAt: new Date().toISOString(),
    runtimes: {
      node: process.version,
      platform: process.platform,
      python: pythonVersion
    },
    mcp: {
      perplexityMcpAvailable,
      firecrawlMcpAvailable,
      posthogMcpAvailable,
      playwrightMcpAvailable,
      composioMcpAvailable,
      deslopMcpConfigured,
      discoveredServerNames: serverList,
      auditedConfigFiles: auditedMcpFiles
    },
    superDeslop: {
      installed: deslopLoc.available,
      rootDir: deslopLoc.rootDir,
      cliPath: deslopLoc.cliJs,
      ...deslopSdkStatus
    },
    nativeAntigravityCapabilities: {
      searchWebNative: true,
      subagentsNative: true,
      playwrightHeadlessMcp: playwrightMcpAvailable
    },
    routingFallbacks: {
      searchIntelligenceMode: perplexityMcpAvailable
        ? "PERPLEXITY_MCP_NATIVE"
        : "ANTIGRAVITY_NATIVE_FALLBACK (search_web + Super Deslop Dorks/Live + Official REST APIs)",
      epistemicVerificationMode: deslopSdkStatus.arsVerifierReady
        ? "SUPER_DESLOP_ARS_ACTIVE (CrossRef + OpenAlex + LexML + DJEN + CNJ Mod 97)"
        : "DEGRADED_MANUAL_FETCH",
      honestyRule:
        perplexityMcpAvailable
          ? "Perplexity MCP detected; select between perplexity_search, perplexity_ask, perplexity_research, and perplexity_reason."
          : "Perplexity MCP is NOT installed. NEVER simulate Perplexity MCP calls or claim a search ran via Perplexity.",
      fiveConnectorsRouting: {
        perplexity: perplexityMcpAvailable ? "MCP_ACTIVE" : "FALLBACK_SEARCH_WEB_AND_DESLOP",
        firecrawl: firecrawlMcpAvailable ? "MCP_ACTIVE" : "FALLBACK_PLAYWRIGHT_OR_HTTP_FETCH",
        posthog: posthogMcpAvailable ? "MCP_ACTIVE" : "FALLBACK_LOCAL_METRICS_AND_LOGS",
        playwright: playwrightMcpAvailable ? "MCP_ACTIVE" : "FALLBACK_BROWSER_SUBAGENT",
        composio: composioMcpAvailable ? "MCP_ACTIVE" : "FALLBACK_NATIVE_WORKSPACE_TOOLS"
      }
    }
  };
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]).toLowerCase() === resolve(fileURLToPath(import.meta.url)).toLowerCase();

if (invokedDirectly) {
  const report = await auditToolAvailability();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
