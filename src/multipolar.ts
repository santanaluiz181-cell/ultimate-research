import { TemporalDorkEngine, sanitizeRawQuery } from "./dorks.js";
import { loadRules } from "./rules.js";
import type {
  CompiledQuery,
  EvidenceGrade,
  EvidenceGradeInput,
  EvidenceGradeResult,
  ExcavationStratumPlan,
  MultipolarAuditSourceItem,
  MultipolarCoverageAuditInput,
  MultipolarCoverageAuditResult,
  MultipolarExcavationOptions,
  MultipolarExcavationPlan,
  MultipolarJurisdictionCode,
  MultipolarJurisdictionConfig,
  MultipolarJurisdictionQuery,
  SearchEngine
} from "./types.js";

const NON_FOREIGN_LANGUAGES = new Set(["en", "pt", "pt-br"]);
const US_JURISDICTION_ALIASES = new Set(["US", "USA", "UNITED STATES"]);

function resolveSelectedJurisdictions(
  allJurisdictions: readonly MultipolarJurisdictionConfig[],
  requested?: readonly MultipolarJurisdictionCode[]
): MultipolarJurisdictionConfig[] {
  const byCode = new Map<MultipolarJurisdictionCode, MultipolarJurisdictionConfig>();
  for (const entry of allJurisdictions) {
    byCode.set(entry.code, entry);
  }

  if (requested === undefined || requested.length === 0) {
    return [...allJurisdictions];
  }

  const resolved: MultipolarJurisdictionConfig[] = [];
  const seen = new Set<MultipolarJurisdictionCode>();
  for (const code of requested) {
    const normalized = String(code).trim().toUpperCase() as MultipolarJurisdictionCode;
    const found = byCode.get(normalized);
    if (found === undefined) {
      throw new RangeError(`Unknown multipolar jurisdiction code: "${code}".`);
    }
    if (!seen.has(normalized)) {
      seen.add(normalized);
      resolved.push(found);
    }
  }
  return resolved;
}

function resolveNativeTerms(
  cleanQuery: string,
  language: string,
  nativeTermsByLang?: Readonly<Record<string, string>>
): string {
  if (nativeTermsByLang === undefined) {
    return cleanQuery;
  }
  const direct = nativeTermsByLang[language];
  if (typeof direct === "string" && direct.trim().length > 0) {
    return sanitizeRawQuery(direct);
  }
  const primaryLang = language.split(/[-/]/)[0]?.toLowerCase() ?? "";
  if (primaryLang.length > 0) {
    for (const [k, v] of Object.entries(nativeTermsByLang)) {
      if (k.toLowerCase().split(/[-/]/)[0] === primaryLang && v.trim().length > 0) {
        return sanitizeRawQuery(v);
      }
    }
  }
  return cleanQuery;
}

/**
 * Compiles a full 6-stratum Clean-Room Multipolar Polyglot & Small-Web Deep Excavation Plan.
 */
export function buildMultipolarExcavationPlan(
  rawQuery: string,
  options: MultipolarExcavationOptions = {},
  dorkEngine = new TemporalDorkEngine()
): MultipolarExcavationPlan {
  const cleanQuery = sanitizeRawQuery(rawQuery);
  if (cleanQuery.length === 0) {
    throw new RangeError("Query must not be empty or whitespace-only.");
  }

  const rules = loadRules();
  const cleanRoom = options.cleanRoom ?? true;
  const rawPeriod = options.periodYears ?? 5;
  const periodYears = Number.isFinite(rawPeriod) && rawPeriod > 0 ? Math.min(Math.round(rawPeriod), 50) : 5;
  const useCase =
    options.useCase !== undefined && options.useCase.trim().length > 0
      ? options.useCase.trim()
      : "Investigacao independente sem vies";
  const engine: SearchEngine = options.engine ?? "google";

  const currentYear = new Date().getUTCFullYear();
  const afterYear = String(Math.max(1995, currentYear - periodYears));
  const selectedJurisdictions = resolveSelectedJurisdictions(
    rules.multipolar.jurisdictions,
    options.jurisdictions
  );

  const subQuestions = [
    `SQ-01 (Surface + Cui Bono): Qual e a visao dominante na midia/fontes oficiais sobre "${cleanQuery}", quem a sustenta e quem lucra com ela?`,
    `SQ-02 (Ciencia Forense): Quais estudos, white papers, amostras, replicacoes, conflitos de interesse, financiadores e retratacoes existem sobre "${cleanQuery}"?`,
    `SQ-03 (Comunidades Independentes): Que padroes praticos, falhas ou contestacoes emergem no Reddit, GitHub, Hacker News e foruns tecnicos sobre "${cleanQuery}"?`,
    `SQ-04 (Garimpo Small Web): Que relatos de primeira mao e vozes dissidentes aparecem no Tumblr, Blogger, Wayback Machine, Bearblog e canais esquecidos sobre "${cleanQuery}"?`,
    `SQ-05 (Multipolo & Sul Global): O que fontes locais em idiomas originais (Alemanha, Italia, Franca, China, Japao, Coreia, Singapura, India, Mexico, Brasil, Turquia, Noruega, Dinamarca, mundo arabe e Sul Global) acrescentam ou questionam na narrativa anglofona sobre "${cleanQuery}"?`
  ];

  const dominantHypothesis = `H-DOM: O consenso predominante em lingua inglesa descreve adequadamente os mecanismos, riscos e resultados de "${cleanQuery}" sem omissoes materiais relevantes.`;
  const rivalHypotheses: [string, string] = [
    `H-RIV-1: O consenso dominante sobre "${cleanQuery}" reflete incentivos institucionais, financiamento seletivo ou vies regulatorio norte-americano que ignora evidencias contrarias.`,
    `H-RIV-2: Evidencias em idiomas locais, no Sul Global ou em arquivos da Small Web revelam falhas empiricas, efeitos colaterais ou alternativas ausentes na literatura anglofona sobre "${cleanQuery}".`
  ];

  // Stratum 1: Surface Dominant + Cui Bono
  const surfaceMainstream = dorkEngine.compile(cleanQuery, {
    era: "none",
    after: afterYear,
    engine
  });
  const surfaceCuiBono = dorkEngine.compile(
    `${cleanQuery} ("conflict of interest" OR funding OR sponsor OR criticism)`,
    { era: "none", after: afterYear, engine }
  );

  // Stratum 2: Science & White Papers + Retractions / Funding
  const sciencePapers = dorkEngine.compile(cleanQuery, {
    era: "none",
    after: afterYear,
    includeSites: ["pubmed.ncbi.nlm.nih.gov", "arxiv.org", "scholar.google.com", "europepmc.org"],
    engine
  });
  const scienceForensics = dorkEngine.compile(
    `${cleanQuery} (retraction OR corrigendum OR "expression of concern" OR "conflict of interest" OR funding)`,
    {
      era: "none",
      includeSites: ["retractionwatch.com", "pubpeer.com", "crossref.org", "pubmed.ncbi.nlm.nih.gov"],
      engine
    }
  );

  // Stratum 3: Communities (Reddit, GitHub, HN, Forums)
  const communitiesDork = dorkEngine.compile(cleanQuery, {
    era: "none",
    after: afterYear,
    profile: "all_community",
    engine
  });

  // Stratum 4: Garimpo / Small-Web Archaeology (Tumblr, Blogger, Wayback, Bearblog, Neocities)
  const smallWebHistoric = dorkEngine.compile(cleanQuery, {
    era: "human-classic",
    profile: "small_web",
    engine
  });
  const smallWebWayback = dorkEngine.compile(cleanQuery, {
    era: "none",
    includeSites: ["web.archive.org", "blogspot.com", "tumblr.com"],
    engine
  });

  // Stratum 5: Multipolar Native-Language Queries
  const multipolarDorks: CompiledQuery[] = [];
  const multipolarQueries: MultipolarJurisdictionQuery[] = [];

  for (const jurisdiction of selectedJurisdictions) {
    const nativeTermsUsed = resolveNativeTerms(
      cleanQuery,
      jurisdiction.language,
      options.nativeTermsByLang
    );
    const compiled = dorkEngine.compile(nativeTermsUsed, {
      era: "none",
      after: afterYear,
      includeSites: jurisdiction.siteHints,
      engine
    });
    multipolarDorks.push(compiled);
    multipolarQueries.push({
      code: jurisdiction.code,
      countryOrRegion: jurisdiction.countryOrRegion,
      language: jurisdiction.language,
      isGlobalSouth: jurisdiction.isGlobalSouth,
      nativeTermsUsed,
      compiledQuery: compiled.compiledQuery,
      searchUrl: compiled.searchUrl,
      translationRequired: true,
      usDeltaPrompt: `Para ${jurisdiction.countryOrRegion} (${jurisdiction.language}): extraia [trecho original + traducao], identifique o que acrescenta, questiona ou ignora em relacao a visao dominante dos EUA e explique o porquê.`
    });
  }

  const strata: ExcavationStratumPlan[] = [
    {
      stratum: "surface_dominant",
      order: 1,
      title: "Estrato 1: Visao Dominante na Surface Web + Cui Bono",
      objective: "Mapear o consenso oficial/midiatico inicial, quem o sustenta e quem lucra com ele.",
      queries: [surfaceMainstream, surfaceCuiBono],
      auditChecks: [
        "Listar fontes oficiais e midiaticas predominantes com data.",
        "Registrar explicitamente quem financia/sustenta a tese e quem se beneficia (Cui Bono)."
      ]
    },
    {
      stratum: "science_forensic",
      order: 2,
      title: "Estrato 2: Ciencia, White Papers, Retratacoes e Financiamento",
      objective: "Avaliar desenho do estudo, tamanho amostral, replicacao independente, conflitos de interesse e retratacoes.",
      queries: [sciencePapers, scienceForensics],
      auditChecks: [
        "Separar estudos replicados de pre-prints ou white papers corporativos.",
        "Checar Retraction Watch / PubPeer / CrossRef para retratacoes e expressoes de preocupacao."
      ]
    },
    {
      stratum: "communities",
      order: 3,
      title: "Estrato 3: Comunidades Independentes (Reddit, GitHub, HN, Foruns)",
      objective: "Detectar padroes recorrentes, falhas praticas e contraexemplos independentes.",
      queries: [communitiesDork],
      auditChecks: [
        "Diferenciar relato empirico reproduzivel de opiniao especulativa.",
        "Evitar amplificar brigading ou astroturfing corporativo."
      ]
    },
    {
      stratum: "small_web_archaeology",
      order: 4,
      title: "Estrato 4: Garimpo Arqueologico (Tumblr, Blogger, Wayback Machine, Canais Esquecidos)",
      objective: "Resgatar relatos de primeira mao, dissidencias historicas e acervos fora da bolha de SEO.",
      queries: [smallWebHistoric, smallWebWayback],
      auditChecks: [
        "Registrar relatos de primeira mao preservando o contexto historico e a URL arquivada.",
        "Classificar relatos individuais estritamente como RELATO (teto de grau C), nunca como FATO comprovado."
      ]
    },
    {
      stratum: "multipolar_local",
      order: 5,
      title: "Estrato 5: Multipolo Poliglota (15+ Jurisdicoes, Mundo Arabe e Sul Global)",
      objective: "Quebrar o vies anglofono buscando fontes locais no idioma original e comparando com a narrativa dos EUA.",
      queries: multipolarDorks,
      auditChecks: [
        "Toda citacao estrangeira exige [trecho no idioma original + traducao fiel].",
        "Explicitar o que o eixo nao-EUA e o Sul Global acrescentam, questionam ou ignoram frente ao consenso americano."
      ]
    },
    {
      stratum: "cross_synthesis",
      order: 6,
      title: "Estrato 6: Cruzamento Tripartido (FATO | INTERPRETACAO | RELATO), Graus A-D e Steelman",
      objective: "Cruzar estratos, atribuir graus A-D, testar H-DOM vs H-RIV-1/H-RIV-2 e construir o melhor argumento minoritario.",
      queries: [],
      auditChecks: [
        "Tripartir cada item em FATO, INTERPRETACAO ou RELATO.",
        "Atribuir Grau A (solida) ate D (boato/marketing/retratada).",
        "Apresentar Steelman rigoroso da posicao minoritaria antes da resposta final."
      ]
    }
  ];

  const isolationDirective = cleanRoom
    ? "CLEAN-ROOM ISOLATION ACTIVE: Ignore memoria previa, perfil do usuario, conversas anteriores e notas antigas do vault (`--clean-room`). Baseie a coleta estritamente em fontes web externas datadas e verificaveis."
    : "CLEAN-ROOM ISOLATION OFF: Vault local pode ser consultado, mantendo rastreabilidade integral de fontes externas.";

  return {
    protocolVersion: "2.3.0",
    cleanRoomIsolation: cleanRoom,
    isolationDirective,
    mission: {
      question: cleanQuery,
      useCase,
      periodYears
    },
    subQuestions,
    dominantHypothesis,
    rivalHypotheses,
    strata,
    multipolarQueries,
    epistemicGates: [
      "Cada afirmacao exige identificador de fonte [F#], URL verificavel e data (ou 'nao encontrado').",
      "Fonte estrangeira exige trecho literal no idioma original + traducao.",
      "Conflitos de interesse, financiadores e eventuais retratacoes devem ser declarados.",
      "Separacao obrigatoria FATO | INTERPRETACAO | RELATO com Grau A..D."
    ],
    preShipChecklist: [
      "Sem fonte verificavel -> remova a afirmacao.",
      "Vies americano/anglofono -> corrija com fontes nativas e Sul Global.",
      "Personalizacao ou vazamento de memoria -> apague (Clean-Room Isolation)."
    ]
  };
}

/**
 * Deterministically grades a claim under Layer 8 / Mode 11 epistemic rules (Grades A to D).
 */
export function gradeEvidenceClaim(input: EvidenceGradeInput): EvidenceGradeResult {
  const downgradeReasons: string[] = [];

  if (input.retracted === true) {
    downgradeReasons.push("Source retracted or invalidated.");
    return {
      ontologicalType: input.ontologicalType,
      grade: "D",
      rationale: "Source retracted or invalidated; cannot support factual or analytical conclusions.",
      downgradeReasons
    };
  }

  if (input.marketingOrRumor === true) {
    downgradeReasons.push("Identified as marketing material, promotional copy, or unverified rumor.");
    return {
      ontologicalType: input.ontologicalType,
      grade: "D",
      rationale: "Marketing claim or unverified rumor automatically downgraded to Grade D.",
      downgradeReasons
    };
  }

  if (input.ontologicalType === "RELATO") {
    downgradeReasons.push("First-hand or anecdotal account (RELATO) cannot exceed Grade C without independent primary corroboration.");
    if (input.independentOrigins >= 1 && input.entailmentChecked) {
      return {
        ontologicalType: input.ontologicalType,
        grade: "C",
        rationale: "Documented first-hand account with entailment checked; capped at Grade C due to anecdotal ontology.",
        downgradeReasons
      };
    }
    downgradeReasons.push("Missing independent origin or entailment verification.");
    return {
      ontologicalType: input.ontologicalType,
      grade: "D",
      rationale: "Unverified anecdotal account lacking entailment or independent provenance.",
      downgradeReasons
    };
  }

  if (input.ontologicalType === "INTERPRETACAO") {
    downgradeReasons.push("Analytical interpretation (INTERPRETACAO) capped at Grade B because it infers beyond raw observed data.");
    if (
      input.independentOrigins >= 2 &&
      input.entailmentChecked &&
      input.hasUnmitigatedConflictOfInterest !== true
    ) {
      return {
        ontologicalType: input.ontologicalType,
        grade: "B",
        rationale: "Well-grounded analytical interpretation supported by >=2 independent origins without unmitigated conflict.",
        downgradeReasons
      };
    }
    if (input.independentOrigins < 2) {
      downgradeReasons.push("Fewer than 2 independent origins supporting the interpretation.");
    }
    if (!input.entailmentChecked) {
      downgradeReasons.push("Entailment has not been verified.");
    }
    if (input.hasUnmitigatedConflictOfInterest === true) {
      downgradeReasons.push("Unmitigated conflict of interest present.");
    }
    return {
      ontologicalType: input.ontologicalType,
      grade: "C",
      rationale: "Interpretation with limited triangulation, missing entailment, or conflict of interest.",
      downgradeReasons
    };
  }

  // FATO path
  if (input.hasUnmitigatedConflictOfInterest === true && input.replicated !== true) {
    downgradeReasons.push("Unmitigated conflict of interest without independent replication caps FATO at Grade C.");
    return {
      ontologicalType: input.ontologicalType,
      grade: "C",
      rationale: "Factual claim has an unmitigated conflict of interest and lacks independent replication.",
      downgradeReasons
    };
  }

  if (
    input.independentOrigins >= 2 &&
    input.entailmentChecked &&
    input.hasUnmitigatedConflictOfInterest !== true &&
    input.replicated !== false
  ) {
    const grade: EvidenceGrade = "A";
    return {
      ontologicalType: input.ontologicalType,
      grade,
      rationale: "Solid empirical fact corroborated across >=2 independent origins with entailment verified.",
      downgradeReasons
    };
  }

  if (input.independentOrigins >= 1 && input.entailmentChecked) {
    if (input.independentOrigins < 2) {
      downgradeReasons.push("Single independent origin; requires >=2 for Grade A.");
    }
    if (input.replicated === false) {
      downgradeReasons.push("Not independently replicated.");
    }
    if (input.hasUnmitigatedConflictOfInterest === true) {
      downgradeReasons.push("Conflict of interest noted alongside replication.");
    }
    return {
      ontologicalType: input.ontologicalType,
      grade: "B",
      rationale: "Verified factual claim with partial triangulation or replication caveats.",
      downgradeReasons
    };
  }

  if (!input.entailmentChecked) {
    downgradeReasons.push("Entailment not checked.");
  }
  if (input.independentOrigins < 1) {
    downgradeReasons.push("No independent origin recorded.");
  }
  return {
    ontologicalType: input.ontologicalType,
    grade: "C",
    rationale: "Preliminary factual assertion pending entailment or independent origin confirmation.",
    downgradeReasons
  };
}

/**
 * Audits multipolar coverage, Clean-Room isolation, foreign quote/translation pairing, Cui Bono, and Steelman.
 */
export function auditMultipolarCoverage(
  input: MultipolarCoverageAuditInput
): MultipolarCoverageAuditResult {
  const rules = loadRules();
  const globalSouthCodes = new Set<string>(
    rules.multipolar.jurisdictions.filter((j) => j.isGlobalSouth).map((j) => j.code.toUpperCase())
  );

  const violations: string[] = [];
  if (input.cleanRoomIsolation !== true) {
    violations.push("Clean-Room Isolation must be active (cleanRoomIsolation=true).");
  }

  const nonUsJurisdictions = new Set<string>();
  let globalSouthIncluded = false;
  let arabicIncluded = false;

  input.sources.forEach((src: MultipolarAuditSourceItem, index: number) => {
    const jur = src.jurisdiction.trim().toUpperCase();
    const lang = src.language.trim().toLowerCase();

    if (jur.length > 0 && !US_JURISDICTION_ALIASES.has(jur)) {
      nonUsJurisdictions.add(jur);
    }
    if (globalSouthCodes.has(jur) || jur === "GLOBAL_SOUTH") {
      globalSouthIncluded = true;
    }
    if (jur === "ARAB" || lang === "ar" || lang.startsWith("ar-")) {
      arabicIncluded = true;
    }

    if (!NON_FOREIGN_LANGUAGES.has(lang)) {
      const hasOriginal = typeof src.originalExcerpt === "string" && src.originalExcerpt.trim().length > 0;
      const hasTranslation =
        typeof src.translatedExcerpt === "string" && src.translatedExcerpt.trim().length > 0;
      if (!hasOriginal || !hasTranslation) {
        violations.push(
          `Source[${index}] (${jur || "UNKNOWN"}/${lang || "UNKNOWN"}): foreign-language source requires both originalExcerpt and translatedExcerpt.`
        );
      }
    }
  });

  if (nonUsJurisdictions.size < 3) {
    violations.push(
      `Insufficient multipolar diversity: expected at least 3 distinct non-US jurisdictions, found ${nonUsJurisdictions.size}.`
    );
  }

  if (input.whatChangesOutsideUs.trim().length < 20) {
    violations.push("Missing substantive 'whatChangesOutsideUs' synthesis (>= 20 chars).");
  }

  if (input.minoritySteelman.trim().length < 20) {
    violations.push("Missing substantive 'minoritySteelman' argument (>= 20 chars).");
  }

  if (input.cuiBonoAudited !== true) {
    violations.push("Cui Bono audit (who sustains and who profits) must be completed.");
  }

  if (input.rivalHypothesesTested < 2) {
    violations.push(
      `Expected at least 2 rival hypotheses tested alongside dominant hypothesis; got ${input.rivalHypothesesTested}.`
    );
  }

  return {
    valid: violations.length === 0,
    violations,
    nonUsJurisdictionsCount: nonUsJurisdictions.size,
    globalSouthIncluded,
    arabicIncluded
  };
}

/**
 * Formats a MultipolarExcavationPlan into a concise terminal-friendly summary.
 */
export function formatMultipolarPlanTerminal(plan: MultipolarExcavationPlan): string {
  const lines: string[] = [];
  lines.push(`=== ULTIMATE RESEARCH v${plan.protocolVersion} | MULTIPOLAR & SMALL-WEB EXCAVATION ===`);
  lines.push(`Mission       : ${plan.mission.question}`);
  lines.push(`Use Case      : ${plan.mission.useCase} | Window: ${plan.mission.periodYears}y`);
  lines.push(`Clean-Room    : ${plan.cleanRoomIsolation ? "ACTIVE (memory/profile isolated)" : "OFF"}`);
  lines.push(`Dominant Hyp. : ${plan.dominantHypothesis}`);
  lines.push(`Rival Hyp. 1  : ${plan.rivalHypotheses[0]}`);
  lines.push(`Rival Hyp. 2  : ${plan.rivalHypotheses[1]}`);
  lines.push("");
  lines.push("--- 6-STRATUM EXCAVATION PIPELINE ---");
  for (const s of plan.strata) {
    lines.push(`[${s.order}] ${s.title} (${s.queries.length} compiled queries)`);
    for (const q of s.queries.slice(0, 3)) {
      lines.push(`    -> ${q.compiledQuery}`);
    }
    if (s.queries.length > 3) {
      lines.push(`    ... +${s.queries.length - 3} more jurisdiction queries`);
    }
  }
  lines.push("");
  lines.push(`--- MULTIPOLAR JURISDICTIONS (${plan.multipolarQueries.length}) ---`);
  for (const mj of plan.multipolarQueries) {
    const southTag = mj.isGlobalSouth ? " [Global South]" : "";
    lines.push(`  [${mj.code}] ${mj.countryOrRegion} (${mj.language})${southTag}: ${mj.compiledQuery}`);
  }
  lines.push("");
  lines.push("--- PRE-SHIP GATES ---");
  for (const gate of plan.preShipChecklist) {
    lines.push(`  * ${gate}`);
  }
  return lines.join("\n");
}
