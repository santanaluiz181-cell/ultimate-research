#!/usr/bin/env node
/**
 * Ultimate Research - Persistent Searchable Wiki Vault (Hyperresearch Architecture)
 * Manages persistent knowledge base in research/notes/ so every session builds on the last.
 * Features: Note ingestion with YAML frontmatter, fast full-text search, provenance tracking,
 * open-access status indicators, and citation verification against stored note excerpts.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const VAULT_DIR = join(ROOT_DIR, "research", "notes");
const RUNS_DIR = join(ROOT_DIR, "research", "runs");
const INDEX_FILE = join(ROOT_DIR, "research", "vault-index.json");

export function slugify(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "note";
}

export function initVault() {
  if (!existsSync(VAULT_DIR)) mkdirSync(VAULT_DIR, { recursive: true });
  if (!existsSync(RUNS_DIR)) mkdirSync(RUNS_DIR, { recursive: true });
  if (!existsSync(INDEX_FILE)) {
    writeFileSync(INDEX_FILE, JSON.stringify({ version: "2.2.0", notes: [] }, null, 2), "utf-8");
  }
  return { vaultDir: VAULT_DIR, runsDir: RUNS_DIR, indexFile: INDEX_FILE };
}

export function loadIndex() {
  initVault();
  try {
    return JSON.parse(readFileSync(INDEX_FILE, "utf-8"));
  } catch {
    return { version: "2.2.0", notes: [] };
  }
}

export function saveIndex(idx) {
  writeFileSync(INDEX_FILE, JSON.stringify(idx, null, 2), "utf-8");
}

export function storeNote({
  title,
  url,
  content,
  doi = "",
  author = "",
  published = "",
  oaStatus = "unknown",
  originFingerprint = "",
  tags = []
}) {
  initVault();
  const slug = slugify(title || doi || url || "note");
  const id = `NOTE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const filename = `${slug}.md`;
  const filePath = join(VAULT_DIR, filename);

  const cleanTags = Array.isArray(tags) ? tags : String(tags || "").split(",").map((t) => t.trim()).filter(Boolean);

  const frontmatter = [
    "---",
    `id: "${id}"`,
    `title: "${(title || "").replace(/"/g, '\\"')}"`,
    `url: "${url || ""}"`,
    `doi: "${doi || ""}"`,
    `author: "${(author || "").replace(/"/g, '\\"')}"`,
    `published: "${published || ""}"`,
    `oa_status: "${oaStatus}"`,
    `origin_fingerprint: "${originFingerprint || ""}"`,
    `tags: [${cleanTags.map((t) => `"${t}"`).join(", ")}]`,
    `saved_at: "${new Date().toISOString()}"`,
    "---",
    "",
    `# ${title || "Untitled Note"}`,
    "",
    content ? content.trim() : "*(No content captured)*",
    ""
  ].join("\n");

  writeFileSync(filePath, frontmatter, "utf-8");

  const idx = loadIndex();
  const existingIdx = idx.notes.findIndex((n) => n.url === url || (doi && n.doi === doi));
  const record = {
    id,
    slug,
    title,
    url,
    doi,
    author,
    published,
    oaStatus,
    originFingerprint,
    tags: cleanTags,
    filename,
    charCount: content ? content.length : 0,
    savedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    idx.notes[existingIdx] = record;
  } else {
    idx.notes.push(record);
  }
  saveIndex(idx);

  return { success: true, id, filename, path: filePath, record };
}

export function searchVault(query) {
  initVault();
  const idx = loadIndex();
  const terms = String(query || "")
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  if (terms.length === 0) {
    return idx.notes;
  }

  const results = [];
  for (const n of idx.notes) {
    let score = 0;
    const titleLower = String(n.title || "").toLowerCase();
    const tagStr = Array.isArray(n.tags) ? n.tags.join(" ").toLowerCase() : "";
    const doiLower = String(n.doi || "").toLowerCase();

    let contentLower = "";
    const p = join(VAULT_DIR, n.filename);
    if (existsSync(p)) {
      try {
        contentLower = readFileSync(p, "utf-8").toLowerCase();
      } catch {
        contentLower = "";
      }
    }

    for (const term of terms) {
      if (titleLower.includes(term)) score += 5;
      if (tagStr.includes(term)) score += 3;
      if (doiLower.includes(term)) score += 4;
      if (contentLower.includes(term)) score += 1;
    }

    if (score > 0) {
      results.push({ ...n, searchScore: score });
    }
  }

  return results.sort((a, b) => b.searchScore - a.searchScore);
}

export function listVault() {
  const idx = loadIndex();
  return {
    totalNotes: idx.notes.length,
    notes: idx.notes
  };
}

export function citeCheckFile(filePath) {
  initVault();
  const absPath = resolve(filePath);
  if (!existsSync(absPath)) {
    throw new Error(`Target file not found at ${absPath}`);
  }
  const text = readFileSync(absPath, "utf-8");
  const idx = loadIndex();

  const urlRegex = /https?:\/\/[^\s)"]+/gi;
  const doiRegex = /\b10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+\b/gi;

  const foundUrls = [...new Set(text.match(urlRegex) || [])];
  const foundDois = [...new Set(text.match(doiRegex) || [])];

  const audits = [];
  for (const u of foundUrls) {
    const note = idx.notes.find((n) => n.url === u);
    audits.push({
      identifier: u,
      type: "url",
      inVault: Boolean(note),
      noteId: note?.id || null,
      title: note?.title || null
    });
  }

  for (const d of foundDois) {
    const note = idx.notes.find((n) => n.doi.toLowerCase() === d.toLowerCase());
    audits.push({
      identifier: d,
      type: "doi",
      inVault: Boolean(note),
      noteId: note?.id || null,
      title: note?.title || null,
      oaStatus: note?.oaStatus || "unknown"
    });
  }

  const supportedCount = audits.filter((a) => a.inVault).length;
  const missingCount = audits.length - supportedCount;

  return {
    file: absPath,
    totalCitationsFound: audits.length,
    supportedInVault: supportedCount,
    missingFromVault: missingCount,
    audits
  };
}

const invokedDirectly =
  process.argv[1] &&
  resolve(process.argv[1]).toLowerCase() === resolve(fileURLToPath(import.meta.url)).toLowerCase();

if (invokedDirectly) {
  const cmd = process.argv[2] || "list";
  if (cmd === "init") {
    const res = initVault();
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
  } else if (cmd === "list") {
    const res = listVault();
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
  } else if (cmd === "search") {
    const q = process.argv.slice(3).join(" ");
    const res = searchVault(q);
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
  } else if (cmd === "citecheck") {
    const f = process.argv[3];
    if (!f) {
      process.stderr.write("Usage: node scripts/vault.mjs citecheck <file.md>\n");
      process.exit(1);
    }
    const res = citeCheckFile(f);
    process.stdout.write(`${JSON.stringify(res, null, 2)}\n`);
  } else {
    process.stdout.write(`Vault commands: init, list, search <query>, citecheck <file.md>\n`);
  }
}
