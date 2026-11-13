#!/usr/bin/env node
/**
 * Ultimate Research - Adaptive Intent Analyzer, Mode Router & Query Plan Compiler
 * Implements Phases 1, 2, and 3 of the Universal Investigation Pipeline.
 */
import { parseArgs } from "node:util";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadDeslopSdk } from "./deslop-bridge.mjs";

const SEO_NOISE_PATTERNS = [
  /\b(melhor forma de|como aprender rapido|guia completo para iniciantes|tudo sobre|top \d+|best way to|ultimate guide to|for beginners)\b/gi
];

export function stripSeoFluff(raw) {
  let cleaned = String(raw || "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
  for (const re of SEO_NOISE_PATTERNS) {
    cleaned = cleaned.replace(re, " ");
  }
  return cleaned.replace(/\s+/g, " ").trim();
}

function normalizeText(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const JUDICIAL_TRIGGERS = [
  "tjto", "eproc", "cnj", "stf", "stj", "trf", "tst", "tre", "acordao", "sumula",
  "jurisprudencia", "legislacao", "lei federal", "lei complementar", "decreto",
  "alvara", "intimacao", "magistratura", "processo judicial", "pje", "projudi",
  "siscondj", "bnmp", "constitucionalidade", "cpc", "cpp", "clt", "cdc", "lexml"
];

const ACADEMIC_TRIGGERS = [
  "revisao de literatura", "revisao sistematica", "artigos cientificos", "peer-reviewed",
  "periodicos", "bibliografica", "scielo", "openalex", "crossref", "pubmed", "arxiv",
  "doi", "isbn", "estado da arte academico", "meta-analise", "academic literature", "systematic review"
];

const FACT_CHECK_TRIGGERS = [
  "verifique a alegacao", "cheque a afirmacao", "fact-check", "fact checking",
  "e verdade que", "boato", "fake news", "comprove se", "procede a informacao",
  "verificar afirmacao", "alegacao de que", "verify the claim"
];

const JOURNALISTIC_TRIGGERS = [
  "politica publica", "apuracao jornalistica", "reportagem", "declaracoes",
  "controversias", "contraditorio", "portal da transparencia", "licitacao",
  "diario oficial", "prestacao de contas", "investigacao jornalistica",
  "denuncia", "envolvidos", "cronologia dos fatos", "notas oficiais"
];

const TECHNICAL_TRIGGERS = [
  "react", "node.js", "nodejs", "typescript", "python", "rust", "golang", "kubernetes",
  "docker", "postgres", "graphql", "api", "apis", "sdk", "framework", "biblioteca", "arquitetura",
  "breaking changes", "deprecacao", "changelog", "rfc", "github", "pull request",
  "worker_threads", "wasm", "compilador", "latencia", "memoria"
];

const MARKET_TRIGGERS = [
  "tam", "sam", "som", "precificacao", "pricing", "concorrentes diretos",
  "modelos de negocio", "posicionamento de mercado", "barreiras de entrada",
  "market share", "analise de mercado", "competidores", "benchmark comercial",
  "inteligencia competitiva", "competitive intelligence", "go-to-market"
];

const QUICK_QUESTION_STARTERS = [
  /^(qual|quais|quando|quem|onde|quanto|what|which|when|who|where)\b/i
];

function matchesTerm(norm, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i").test(norm);
}

export function detectResearchMode(rawPrompt, explicitMode) {
  if (explicitMode) {
    return { mode: explicitMode, workflowVariant: explicitMode.toLowerCase().replace(/_/g, "-") };
  }

  const norm = normalizeText(rawPrompt);
  const wordCount = norm.split(/\s+/).filter(Boolean).length;

  const hasFactCheck = FACT_CHECK_TRIGGERS.some((t) => matchesTerm(norm, t));
  if (hasFactCheck) {
    return { mode: "FACT_CHECKING", workflowVariant: "fact-checking" };
  }

  const legalHits = JUDICIAL_TRIGGERS.filter((t) => matchesTerm(norm, t)).length;
  if (legalHits >= 1 && !norm.includes("politica publica")) {
    return { mode: "LEGAL_RESEARCH", workflowVariant: "legal-research" };
  }

  const academicHits = ACADEMIC_TRIGGERS.filter((t) => matchesTerm(norm, t)).length;
  if (academicHits >= 1) {
    return { mode: "ACADEMIC_RESEARCH", workflowVariant: "academic-research" };
  }

  const journalisticHits = JOURNALISTIC_TRIGGERS.filter((t) => matchesTerm(norm, t)).length;
  if (journalisticHits >= 2 || (norm.includes("politica publica") && (norm.includes("controversia") || norm.includes("declarac") || norm.includes("documento")))) {
    return { mode: "JOURNALISTIC_INVESTIGATION", workflowVariant: "journalistic-investigation" };
  }

  const techHits = TECHNICAL_TRIGGERS.filter((t) => matchesTerm(norm, t)).length;
  const isQuickLookup =
    QUICK_QUESTION_STARTERS.some((re) => re.test(norm)) &&
    wordCount <= 24 &&
    !norm.includes("investigue") &&
    !norm.includes("entre versoes antigas e atuais") &&
    !norm.includes("comparando");

  if (isQuickLookup) {
    return { mode: "QUICK_RESEARCH", workflowVariant: "quick-research" };
  }

  if (
    techHits >= 1 &&
    (norm.includes("arquitetura") ||
      matchesTerm(norm, "api") ||
      matchesTerm(norm, "apis") ||
      norm.includes("versoes antigas") ||
      norm.includes("breaking") ||
      norm.includes("migrac") ||
      matchesTerm(norm, "rfc") ||
      matchesTerm(norm, "bug"))
  ) {
    return { mode: "TECHNICAL_RESEARCH", workflowVariant: "technical-research" };
  }

  const marketHits = MARKET_TRIGGERS.filter((t) => matchesTerm(norm, t)).length;
  const isCompetitiveIntel = norm.includes("inteligencia competitiva") || norm.includes("competitive intelligence");
  if (marketHits >= 2 || isCompetitiveIntel) {
    return {
      mode: "MARKET_RESEARCH",
      workflowVariant: isCompetitiveIntel ? "competitive-intelligence" : "market-research"
    };
  }

  const isDeepTrigger =
    norm.includes("investigue") ||
    norm.includes("investigacao profunda") ||
    norm.includes("panorama completo") ||
    norm.includes("mapeie") ||
    wordCount > 18;

  if (isDeepTrigger) {
    return { mode: "DEEP_RESEARCH", workflowVariant: "deep-research" };
  }

  if (norm.includes("mercado") || norm.includes("saas") || norm.includes("concorrente")) {
    return { mode: "MARKET_RESEARCH", workflowVariant: "market-research" };
  }

  if (techHits >= 1) {
    return { mode: "TECHNICAL_RESEARCH", workflowVariant: "technical-research" };
  }

  return { mode: "QUICK_RESEARCH", workflowVariant: "quick-research" };
}

export function computeTemporalStrategy(rawPrompt, mode) {
  const norm = normalizeText(rawPrompt);
  const currentYear = new Date().getUTCFullYear();

  const asksHistoricalVsCurrent =
    norm.includes("antigas e atuais") ||
    norm.includes("historico") ||
    norm.includes("evolucao") ||
    norm.includes("mudancas de arquitetura") ||
    norm.includes("migracao") ||
    norm.includes("breaking changes") ||
    norm.includes("antes e depois");

  const asksStrictlyCurrent =
    norm.includes("atual") ||
    norm.includes("atuais") ||
    norm.includes("recente") ||
    norm.includes("recentes") ||
    norm.includes("vigente");

  if (mode === "QUICK_RESEARCH") {
    return {
      lanes_enabled: ["LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: false,
      cutoff_justification: `Consulta pontual sobre estado corrente (${currentYear}); impor corte before:2023 ocultaria versões estáveis e notas de lançamento atuais.`
    };
  }

  if (mode === "TECHNICAL_RESEARCH" && asksHistoricalVsCurrent) {
    return {
      lanes_enabled: ["LANE_A_HISTORICAL", "LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: true,
      cutoff_date: "2023-01-01",
      cutoff_justification:
        "Comparação arquitetural entre gerações exige Split-Horizon triplo: Lane A (pré-2023 canônico sem ruído de IA), Lane B (pós-2023 auditado) e Lane C (documentação oficial corrente)."
    };
  }

  if (mode === "TECHNICAL_RESEARCH") {
    return {
      lanes_enabled: ["LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: true,
      cutoff_date: `${currentYear - 2}-01-01`,
      cutoff_justification: `Pesquisa técnica contemporânea ancorada após ${currentYear - 2}-01-01 com validação direta na documentação oficial para evitar APIs depreciadas.`
    };
  }

  if (mode === "LEGAL_RESEARCH") {
    return {
      lanes_enabled: asksHistoricalVsCurrent
        ? ["LANE_A_HISTORICAL", "LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"]
        : ["LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: false,
      cutoff_justification:
        "Pesquisa jurídica prioriza vigência normativa atual (Lane C: Planalto/LexML/CNJ/TJTO) sem descartar leis ou súmulas anteriores ainda plenamente vigentes."
    };
  }

  if (mode === "JOURNALISTIC_INVESTIGATION") {
    const recentCutoff = `${currentYear - 2}-01-01`;
    return {
      lanes_enabled: ["LANE_A_HISTORICAL", "LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: asksStrictlyCurrent,
      ...(asksStrictlyCurrent ? { cutoff_date: recentCutoff } : {}),
      cutoff_justification: asksStrictlyCurrent
        ? `Apuração de fato/política recente delimitada prioritariamente a partir de ${recentCutoff} (Lane B/C), mantendo Lane A apenas para linha de base histórica e orçamentária.`
        : "Apuração jornalística combina linha cronológica histórica (Lane A), fatos recentes (Lane B) e registros públicos oficiais (Lane C)."
    };
  }

  if (mode === "ACADEMIC_RESEARCH") {
    return {
      lanes_enabled: ["LANE_A_HISTORICAL", "LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: false,
      cutoff_justification:
        "Revisão bibliográfica articula artigos seminais clássicos (Lane A) com literatura recente revisada por pares (Lane B) e validação de metadados DOI/ISBN (Lane C)."
    };
  }

  if (mode === "FACT_CHECKING") {
    return {
      lanes_enabled: ["LANE_A_HISTORICAL", "LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
      cutoff_applied: false,
      cutoff_justification:
        "Checagem factual exige rastrear a data exata de origem da alegação (Lane A) e confrontá-la com bases primárias atualizadas (Lane B/C) para evitar anacronismo."
    };
  }

  return {
    lanes_enabled: ["LANE_B_CONTEMPORARY", "LANE_C_OFFICIAL_VALIDATION"],
    cutoff_applied: true,
    cutoff_date: `${currentYear - 3}-01-01`,
    cutoff_justification: `Mapeamento estrutural e mercadológico ancorado na janela ${currentYear - 3}..${currentYear} para capturar players ativos, preços correntes e adoção pós-LLM.`
  };
}

function detectGeographicScope(norm) {
  if (norm.includes("tocantins") || norm.includes("tjto") || norm.includes("palmas")) return "Brasil - Estado do Tocantins (TO)";
  if (norm.includes("brasil") || norm.includes("brasileir") || norm.includes("stf") || norm.includes("cnj")) return "Brasil (Nacional)";
  return "Global";
}

function buildSubQuestions(cleanTopic, mode, geoScope, currentYear, temporalStrategy = { lanes_enabled: [] }) {
  const hasHistoricalLane = Array.isArray(temporalStrategy.lanes_enabled) &&
    temporalStrategy.lanes_enabled.includes("LANE_A_HISTORICAL");
  switch (mode) {
    case "QUICK_RESEARCH":
      return [
        {
          id: "SQ-01",
          question: `Qual é o estado oficial e canônico atual referente a: ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} official release documentation ${currentYear}`, channel: "official_docs" },
            { query: `${cleanTopic} changelog release notes ${currentYear - 1}..${currentYear}`, channel: "github_releases" }
          ]
        }
      ];

    case "TECHNICAL_RESEARCH":
      return [
        {
          id: "SQ-01",
          question: hasHistoricalLane
            ? `Quais eram os padrões arquiteturais e APIs canônicas históricas de ${cleanTopic}?`
            : `Qual é a arquitetura canônica e especificação oficial de ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "baseline",
          queries: [
            hasHistoricalLane
              ? { query: `${cleanTopic} architecture API design before:2023`, channel: "canonical_docs_and_community" }
              : { query: `${cleanTopic} official architecture specification reference`, channel: "official_docs" }
          ]
        },
        {
          id: "SQ-02",
          question: `Quais mudanças de API, breaking changes e depreciações ocorreram nas versões atuais (${currentYear - 2}..${currentYear})?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} breaking changes migration guide changelog ${currentYear - 2}..${currentYear}`, channel: "official_docs" },
            { query: `${cleanTopic} RFC pull request deprecation site:github.com`, channel: "github" }
          ]
        },
        {
          id: "SQ-03",
          question: `Quais problemas reais de produção, regressões ou trade-offs a comunidade de engenharia relata?`,
          priority_tier: "TIER_3",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} regression caveats migration issues`, channel: "hackernews_stackoverflow_reddit" }
          ]
        }
      ];

    case "LEGAL_RESEARCH":
      return [
        {
          id: "SQ-01",
          question: `Qual a legislação vigente (e eventual norma revogada ou PL em tramitação) aplicável a: ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} lei vigente decreto site:planalto.gov.br OR site:lexml.gov.br`, channel: "legislation" }
          ]
        },
        {
          id: "SQ-02",
          question: `Qual a jurisprudência vinculante, súmulas e resoluções do CNJ/Tribunais Superiores sobre ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} sumula resolucao acordao site:cnj.jus.br OR site:stf.jus.br OR site:stj.jus.br`, channel: "superior_courts" }
          ]
        },
        {
          id: "SQ-03",
          question: `Existem atos normativos locais (ex.: TJTO/eproc) ou divergências jurisprudenciais relevantes?`,
          priority_tier: "TIER_1",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} provimento instrucao normativa divergencia site:jus.br -site:jusbrasil.com.br/artigos`, channel: "state_and_regional_courts" }
          ]
        }
      ];

    case "ACADEMIC_RESEARCH":
      return [
        {
          id: "SQ-01",
          question: `Quais são os estudos originais e artigos seminais revisados por pares sobre ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "academic",
          queries: [
            { query: `${cleanTopic} peer-reviewed study methodology DOI`, channel: "crossref_openalex" },
            { query: `${cleanTopic} artigo original site:scielo.br OR site:arxiv.org`, channel: "scielo_arxiv" }
          ]
        },
        {
          id: "SQ-02",
          question: `Quais são as descobertas empíricas recentes (${currentYear - 3}..${currentYear}) e meta-análises disponíveis?`,
          priority_tier: "TIER_2",
          perspective: "academic",
          queries: [
            { query: `${cleanTopic} systematic review empirical findings ${currentYear - 3}..${currentYear}`, channel: "academic_indexes" }
          ]
        },
        {
          id: "SQ-03",
          question: `Existem falhas de replicação, limitações metodológicas ou resultados contraditórios na literatura?`,
          priority_tier: "TIER_2",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} limitations replication critique contradictory results`, channel: "academic_dissent" }
          ]
        }
      ];

    case "JOURNALISTIC_INVESTIGATION":
      return [
        {
          id: "SQ-01",
          question: `Quais documentos oficiais, atos no Diário Oficial, contratos ou bases públicas delimitam factualmente: ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} diario oficial portaria decreto contrato site:gov.br OR site:jus.br`, channel: "official_gazettes" }
          ]
        },
        {
          id: "SQ-02",
          question: `Quais indicadores quantitativos independentes (orçamento, execução física, órgãos de controle TCE/TCU/MP/IBGE) auditam os resultados?`,
          priority_tier: "TIER_1",
          perspective: "baseline",
          queries: [
            { query: `${cleanTopic} relatorio auditoria dados execucao orcamentaria TCE MP transparencia`, channel: "oversight_data" }
          ]
        },
        {
          id: "SQ-03",
          question: `Quem são os atores envolvidos e quais declarações oficiais atribuídas foram registradas em ordem cronológica?`,
          priority_tier: "TIER_2",
          perspective: "baseline",
          queries: [
            { query: `${cleanTopic} declaracao entrevista cronologia imprensa`, channel: "editorial_press" }
          ]
        },
        {
          id: "SQ-04",
          question: `Quais críticas, ações judiciais, controvérsias e posições do contraditório existem fora dos releases oficiais?`,
          priority_tier: "TIER_2",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} critica controversia questionamento ministerio publico oposicao`, channel: "adversarial_check" }
          ]
        }
      ];

    case "FACT_CHECKING":
      return [
        {
          id: "SQ-01",
          question: `Qual é a origem primária exata, data e autoria inicial da alegação: "${cleanTopic}"?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} documento original fonte primaria data publicacao`, channel: "origin_trace" }
          ]
        },
        {
          id: "SQ-02",
          question: `Existem dados primários e evidências independentes que confirmem total ou parcialmente a alegação?`,
          priority_tier: "TIER_1",
          perspective: "baseline",
          queries: [
            { query: `${cleanTopic} dados oficiais estatistica estudo confirmacao`, channel: "corroboration" }
          ]
        },
        {
          id: "SQ-03",
          question: `Existem evidências contrárias, omissões de contexto temporal ou desmentidos documentais?`,
          priority_tier: "TIER_1",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} contestacao erro metodologico contexto omitido dados contrarios`, channel: "refutation_check" }
          ]
        }
      ];

    case "MARKET_RESEARCH":
      return [
        {
          id: "SQ-01",
          question: `Qual a delimitação do mercado, público-alvo e dados observados vs projeções em: ${cleanTopic}?`,
          priority_tier: "TIER_1",
          perspective: "baseline",
          queries: [
            { query: `${cleanTopic} market size report adoption data ${currentYear - 2}..${currentYear}`, channel: "market_filings" }
          ]
        },
        {
          id: "SQ-02",
          question: `Quem são os concorrentes diretos e indiretos, seus modelos de negócio, posicionamento e precificação pública?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} plataformas concorrentes planos precos pricing features`, channel: "vendor_primary" }
          ]
        },
        {
          id: "SQ-03",
          question: `Quais são as barreiras de entrada, riscos regulatórios/técnicos e reclamações reais de clientes?`,
          priority_tier: "TIER_3",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} riscos limitacoes churn criticas usuarios`, channel: "independent_reviews" }
          ]
        }
      ];

    case "DEEP_RESEARCH":
    default:
      return [
        {
          id: "SQ-01",
          question: `Qual a delimitação estrutural, definições operacionais e fontes primárias/institucionais de ${cleanTopic} (${geoScope})?`,
          priority_tier: "TIER_1",
          perspective: "primary_official",
          queries: [
            { query: `${cleanTopic} relatorio institucional dados oficiais ${currentYear - 3}..${currentYear}`, channel: "institutional_primary" }
          ]
        },
        {
          id: "SQ-02",
          question: `Quais são os principais atores, plataformas/soluções existentes, modelos operacionais e evidências empíricas documentadas?`,
          priority_tier: "TIER_1",
          perspective: "baseline",
          queries: [
            { query: `${cleanTopic} plataformas empresas casos reais implementacao ${currentYear - 2}..${currentYear}`, channel: "ecosystem_mapping" }
          ]
        },
        {
          id: "SQ-03",
          question: `O que a literatura acadêmica e estudos independentes apontam sobre eficácia, arquitetura e métricas de adoção?`,
          priority_tier: "TIER_2",
          perspective: "academic",
          queries: [
            { query: `${cleanTopic} estudo academico pesquisa empirica DOI ${currentYear - 3}..${currentYear}`, channel: "academic_literature" }
          ]
        },
        {
          id: "SQ-04",
          question: `Quais são as controvérsias, gargalos econômicos/éticos, falhas reportadas e visões críticas sobre ${cleanTopic}?`,
          priority_tier: "TIER_2",
          perspective: "adversarial_dissent",
          queries: [
            { query: `${cleanTopic} riscos falhas criticas desafios limitacoes`, channel: "adversarial_dissent" }
          ]
        }
      ];
  }
}

export async function buildResearchPlan(rawPrompt, options = {}) {
  const cleanPrompt = stripSeoFluff(rawPrompt);
  if (!cleanPrompt || cleanPrompt.length < 3) {
    throw new Error("buildResearchPlan requires a non-empty research prompt (>= 3 chars).");
  }

  const norm = normalizeText(cleanPrompt);
  const { mode, workflowVariant } = detectResearchMode(cleanPrompt, options.mode);
  const temporalStrategy = computeTemporalStrategy(cleanPrompt, mode);
  const geoScope = options.geographicScope || detectGeographicScope(norm);
  const currentYear = new Date().getUTCFullYear();

  const subQuestions = buildSubQuestions(cleanPrompt, mode, geoScope, currentYear, temporalStrategy);

  try {
    const sdk = await loadDeslopSdk();
    const deslop = new sdk.DeslopSearch();
    for (const sq of subQuestions) {
      for (const qObj of sq.queries) {
        const era =
          temporalStrategy.lanes_enabled.includes("LANE_A_HISTORICAL") && qObj.query.includes("before:2023")
            ? "human-classic"
            : "none";
        const compiled = deslop.compileQuery(qObj.query, {
          era,
          overrideTemporal: era !== "human-classic"
        });
        qObj.dork_compiled = compiled.compiledQuery;
      }
    }
  } catch {
    // Graceful fallback if Super Deslop SDK is unavailable
  }

  const isMultiWave = mode === "DEEP_RESEARCH" || mode === "JOURNALISTIC_INVESTIGATION";
  const usesParallelAgents =
    mode === "DEEP_RESEARCH" ||
    mode === "JOURNALISTIC_INVESTIGATION" ||
    (mode !== "QUICK_RESEARCH" && subQuestions.length >= 3 && options.allowParallel !== false);

  const requiredEvidenceMap = {
    QUICK_RESEARCH: ["official_documentation", "primary_document"],
    DEEP_RESEARCH: ["primary_document", "peer_reviewed_study", "editorial_journalism", "market_filing"],
    ACADEMIC_RESEARCH: ["peer_reviewed_study", "primary_document"],
    JOURNALISTIC_INVESTIGATION: ["primary_document", "official_registry", "editorial_journalism"],
    TECHNICAL_RESEARCH: ["official_documentation", "source_code_or_rfc", "technical_community"],
    MARKET_RESEARCH: ["market_filing", "primary_document", "editorial_journalism"],
    LEGAL_RESEARCH: ["legislation", "jurisprudence", "official_registry"],
    FACT_CHECKING: ["primary_document", "official_registry", "peer_reviewed_study"]
  };

  const planId = `UR-PLAN-${Date.now().toString(36).toUpperCase()}`;

  return {
    plan_id: planId,
    created_at: new Date().toISOString(),
    mode,
    workflow_variant: workflowVariant,
    intent: {
      objective: `Responder com rastreabilidade empírica e verificação de fontes à solicitação em modo ${mode}.`,
      central_question: cleanPrompt,
      scope: mode === "QUICK_RESEARCH" ? "narrow_point" : isMultiWave ? "broad_survey" : "focused_analysis",
      audience: options.audience || "Profissional técnico / decisor informado",
      geographic_scope: geoScope,
      temporal_scope: temporalStrategy.cutoff_applied
        ? `Ancorado em ${temporalStrategy.cutoff_date}`
        : `Corrente / Integral (${currentYear})`,
      depth: mode === "QUICK_RESEARCH" ? "single_pass" : isMultiWave ? "multi_wave" : "multi_query",
      required_evidence_types: requiredEvidenceMap[mode] || ["primary_document"]
    },
    temporal_strategy: temporalStrategy,
    hypotheses: [
      `H1: Existem fontes primárias ou institucionais (Tier 1/2) capazes de responder diretamente a "${cleanPrompt}".`,
      "H2: Afirmações secundárias ou agregadores comerciais podem conter defasagem temporal, viés promocional ou reprodução em eco do mesmo comunicado."
    ],
    sub_questions: subQuestions,
    priority_sources:
      mode === "LEGAL_RESEARCH"
        ? ["planalto.gov.br", "lexml.gov.br", "cnj.jus.br", "stf.jus.br", "stj.jus.br", "tjto.jus.br"]
        : mode === "ACADEMIC_RESEARCH"
          ? ["api.crossref.org", "api.openalex.org", "scielo.br", "arxiv.org"]
          : ["Documentação Oficial Primária", "Repositórios Institucionais", "Bases Públicas Verificáveis"],
    inclusion_criteria: [
      "Fontes com autoria/instituição identificável, URL verificável e data explícita ou inferível por registro oficial.",
      "Corroboração por no mínimo 2 origens editoriais independentes para afirmações materiais (ou marcação explícita [single-source])."
    ],
    exclusion_criteria: [
      "Fazendas de conteúdo SEO e reescritas sintéticas sem dados primários (triadas pelo Super Deslop).",
      "Republicações de releases institucionais tratadas falsamente como confirmação independente.",
      "Citações sem URL, DOI/ISBN/CNJ inválido no ARS ou alegações sem verificação de entailment."
    ],
    bias_risks: [
      "Viés de confirmação em consultas unilaterais (mitigado por sub-questão adversarial obrigatória).",
      "Câmara de eco por sindicação da mesma agência/assessoria em múltiplos portais.",
      "Falso descarte de documento oficial mal formatado (mitigado pelo guardrail de preservação de fonte primária)."
    ],
    expected_gaps: [
      "Dados privados não auditados publicamente (ex.: faturamento fechado de empresas de capital fechado ou autos em segredo de justiça)."
    ],
    execution_topology: {
      use_parallel_agents: mode === "QUICK_RESEARCH" ? false : usesParallelAgents,
      max_agents_per_wave: mode === "QUICK_RESEARCH" ? 0 : Math.min(subQuestions.length, 5),
      max_waves: mode === "QUICK_RESEARCH" ? 1 : isMultiWave ? 3 : 2,
      use_ars_verifier: ["ACADEMIC_RESEARCH", "LEGAL_RESEARCH", "FACT_CHECKING", "DEEP_RESEARCH", "JOURNALISTIC_INVESTIGATION"].includes(mode),
      use_deslop_classifier: true
    }
  };
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]).toLowerCase() === resolve(fileURLToPath(import.meta.url)).toLowerCase();

if (invokedDirectly) {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      mode: { type: "string" },
      audience: { type: "string" },
      geo: { type: "string" },
      help: { type: "boolean", short: "h", default: false }
    }
  });

  if (values.help || positionals.length === 0) {
    process.stdout.write(
      "Usage: node scripts/orchestrate.mjs [plan|detect] \"<research prompt>\" [--mode QUICK_RESEARCH|DEEP_RESEARCH|...]\n"
    );
    process.exitCode = values.help ? 0 : 1;
  } else {
    const firstToken = positionals[0].toLowerCase();
    const isSubcmd = (firstToken === "plan" || firstToken === "detect") && positionals.length > 1;
    const rawPromptArg = isSubcmd ? positionals.slice(1).join(" ") : positionals.join(" ");
    if (isSubcmd && firstToken === "detect") {
      const detected = detectResearchMode(stripSeoFluff(rawPromptArg), values.mode);
      const temporal = computeTemporalStrategy(stripSeoFluff(rawPromptArg), detected.mode);
      process.stdout.write(`${JSON.stringify({ ...detected, temporal }, null, 2)}\n`);
    } else {
      const plan = await buildResearchPlan(rawPromptArg, {
        mode: values.mode,
        audience: values.audience,
        geographicScope: values.geo
      });
      process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
    }
  }
}
