from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Literal

SearchEngine = Literal["google", "duckduckgo", "brave", "kagi", "searxng", "bing"]
TemporalEra = Literal["human-classic", "pre-gpt4", "archival", "modern-curated", "none"]
CommunityProfile = Literal[
    "none", "all_community", "discussions", "qa", "code", "blogs", "forums", "small_web"
]
CommunityChannelName = Literal[
    "reddit",
    "stackoverflow",
    "github",
    "hackernews",
    "indie_forums",
    "engineering_blogs",
    "small_web",
]
SlopVerdict = Literal["AUTHENTIC", "SUSPICIOUS", "SLOP"]
ExcavationStratum = Literal[
    "surface_dominant",
    "science_forensic",
    "communities",
    "small_web_archaeology",
    "multipolar_local",
    "cross_synthesis",
]
OntologicalClaimType = Literal["FATO", "INTERPRETACAO", "RELATO"]
EvidenceGrade = Literal["A", "B", "C", "D"]
MultipolarJurisdictionCode = Literal[
    "DE",
    "IT",
    "FR",
    "CN",
    "JP",
    "KR",
    "SG",
    "IN",
    "MX",
    "BR",
    "TR",
    "NO",
    "DK",
    "ARAB",
    "GLOBAL_SOUTH",
]


@dataclass(frozen=True)
class DorkOptions:
    era: TemporalEra = "human-classic"
    before: str | None = None
    after: str | None = None
    override_temporal: bool = False
    smart_temporal: bool = False
    split_horizon: bool = False
    profile: CommunityProfile = "none"
    channels: tuple[CommunityChannelName, ...] = ()
    include_sites: tuple[str, ...] = ()
    exclude_sites: tuple[str, ...] = ()
    disable_blocklist: bool = False
    engine: SearchEngine = "google"
    max_inline_exclusions: int = 12
    searxng_base_url: str = "https://searx.be"


@dataclass(frozen=True)
class CompiledQuery:
    raw_query: str
    clean_query: str
    compiled_query: str
    engine: SearchEngine
    search_url: str
    era_applied: TemporalEra
    temporal_operators: list[str]
    included_sites: list[str]
    excluded_sites_inline: list[str]
    operator_count: int
    operator_budget: int
    warnings: list[str]

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class VerticalRoute:
    channel: str
    label: str
    compiled_query: str
    engine_url: str
    native_search_url: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        if data["native_search_url"] is None:
            del data["native_search_url"]
        return data


@dataclass(frozen=True)
class SlopSignal:
    code: str
    weight: float
    detail: str


@dataclass(frozen=True)
class SlopClassification:
    score: float
    verdict: SlopVerdict
    blocked_domain: bool
    trusted_community_domain: bool
    technical_density: float
    signals: list[SlopSignal] = field(default_factory=list)
    matched_domain: str | None = None
    paragraph_burstiness_cv: float | None = None
    sentence_burstiness_cv: float | None = None

    def to_dict(self) -> dict[str, Any]:
        raw = asdict(self)
        return {k: v for k, v in raw.items() if v is not None}


@dataclass(frozen=True)
class RawSearchResult:
    title: str
    url: str
    snippet: str = ""
    content: str = ""
    published_at: str | None = None
    source: str | None = None


@dataclass(frozen=True)
class FilteredSearchResult:
    title: str
    url: str
    classification: SlopClassification
    rank_score: float
    snippet: str = ""
    content: str = ""
    published_at: str | None = None
    source: str | None = None

    def to_dict(self) -> dict[str, Any]:
        raw = asdict(self)
        return {k: v for k, v in raw.items() if v is not None and v != ""}


@dataclass(frozen=True)
class FilterBatchReport:
    kept: list[FilteredSearchResult]
    discarded: list[FilteredSearchResult]
    stats: dict[str, int]

    def to_dict(self) -> dict[str, Any]:
        return {
            "kept": [item.to_dict() for item in self.kept],
            "discarded": [item.to_dict() for item in self.discarded],
            "stats": dict(self.stats),
        }


DivergenceKind = Literal[
    "deprecation_or_breaking_shift",
    "version_drift",
    "emergent_terminology",
    "anachronism_warning",
    "slop_saturation_warning",
    "routing_asymmetry",
]
DivergenceSeverity = Literal["INFO", "MEDIUM", "HIGH"]
DifferentialStatus = Literal[
    "CONVERGENT", "DIVERGENT", "ANACHRONISTIC", "SLOP_CONTAMINATED", "QUERY_PLAN"
]


@dataclass(frozen=True)
class HorizonDivergenceSignal:
    kind: DivergenceKind
    severity: DivergenceSeverity
    summary: str


@dataclass(frozen=True)
class HorizonDifferential:
    status: DifferentialStatus
    canonical_only_terms: list[str]
    contemporary_only_terms: list[str]
    conflict_signals: list[HorizonDivergenceSignal]
    synthesis: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class SplitHorizonQueryPlan:
    raw_query: str
    clean_query: str
    cutoff_year: int
    canonical_pre_2023: dict[str, Any]
    contemporary_post_2023: dict[str, Any]
    differential: HorizonDifferential
    formatted_report: str
    split_horizon: bool = True

    def to_dict(self) -> dict[str, Any]:
        return {
            "rawQuery": self.raw_query,
            "cleanQuery": self.clean_query,
            "splitHorizon": self.split_horizon,
            "cutoffYear": self.cutoff_year,
            "canonicalPre2023": self.canonical_pre_2023,
            "contemporaryPost2023": self.contemporary_post_2023,
            "differential": self.differential.to_dict(),
            "formattedReport": self.formatted_report,
        }


@dataclass(frozen=True)
class SplitHorizonSearchReport:
    raw_query: str
    clean_query: str
    cutoff_year: int
    canonical_pre_2023: dict[str, Any]
    contemporary_post_2023: dict[str, Any]
    differential: HorizonDifferential
    formatted_report: str
    split_horizon: bool = True

    def to_dict(self) -> dict[str, Any]:
        return {
            "rawQuery": self.raw_query,
            "cleanQuery": self.clean_query,
            "splitHorizon": self.split_horizon,
            "cutoffYear": self.cutoff_year,
            "canonicalPre2023": self.canonical_pre_2023,
            "contemporaryPost2023": self.contemporary_post_2023,
            "differential": self.differential.to_dict(),
            "formattedReport": self.formatted_report,
        }


@dataclass(frozen=True)
class MultipolarExcavationOptions:
    use_case: str | None = None
    period_years: int | None = None
    clean_room: bool = True
    jurisdictions: tuple[MultipolarJurisdictionCode, ...] = ()
    native_terms_by_lang: dict[str, str] = field(default_factory=dict)
    engine: SearchEngine = "google"


@dataclass(frozen=True)
class MultipolarJurisdictionQuery:
    code: MultipolarJurisdictionCode
    country_or_region: str
    language: str
    is_global_south: bool
    native_terms_used: str
    compiled_query: str
    search_url: str
    us_delta_prompt: str
    translation_required: bool = True

    def to_dict(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "countryOrRegion": self.country_or_region,
            "language": self.language,
            "isGlobalSouth": self.is_global_south,
            "nativeTermsUsed": self.native_terms_used,
            "compiledQuery": self.compiled_query,
            "searchUrl": self.search_url,
            "translationRequired": self.translation_required,
            "usDeltaPrompt": self.us_delta_prompt,
        }


@dataclass(frozen=True)
class ExcavationStratumPlan:
    stratum: ExcavationStratum
    order: int
    title: str
    objective: str
    queries: list[CompiledQuery]
    audit_checks: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "stratum": self.stratum,
            "order": self.order,
            "title": self.title,
            "objective": self.objective,
            "queries": [q.to_dict() for q in self.queries],
            "auditChecks": list(self.audit_checks),
        }


@dataclass(frozen=True)
class MultipolarExcavationPlan:
    protocol_version: str
    clean_room_isolation: bool
    isolation_directive: str
    mission: dict[str, Any]
    sub_questions: list[str]
    dominant_hypothesis: str
    rival_hypotheses: tuple[str, str]
    strata: list[ExcavationStratumPlan]
    multipolar_queries: list[MultipolarJurisdictionQuery]
    epistemic_gates: list[str]
    pre_ship_checklist: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "protocolVersion": self.protocol_version,
            "cleanRoomIsolation": self.clean_room_isolation,
            "isolationDirective": self.isolation_directive,
            "mission": dict(self.mission),
            "subQuestions": list(self.sub_questions),
            "dominantHypothesis": self.dominant_hypothesis,
            "rivalHypotheses": list(self.rival_hypotheses),
            "strata": [s.to_dict() for s in self.strata],
            "multipolarQueries": [mq.to_dict() for mq in self.multipolar_queries],
            "epistemicGates": list(self.epistemic_gates),
            "preShipChecklist": list(self.pre_ship_checklist),
        }


@dataclass(frozen=True)
class EvidenceGradeInput:
    ontological_type: OntologicalClaimType
    independent_origins: int
    entailment_checked: bool
    retracted: bool = False
    has_unmitigated_conflict_of_interest: bool = False
    marketing_or_rumor: bool = False
    replicated: bool | None = None
    primary_source_backed: bool = False


@dataclass(frozen=True)
class EvidenceGradeResult:
    ontological_type: OntologicalClaimType
    grade: EvidenceGrade
    rationale: str
    downgrade_reasons: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "ontologicalType": self.ontological_type,
            "grade": self.grade,
            "rationale": self.rationale,
            "downgradeReasons": list(self.downgrade_reasons),
        }


@dataclass(frozen=True)
class MultipolarAuditSourceItem:
    jurisdiction: str
    language: str
    original_excerpt: str = ""
    translated_excerpt: str = ""


@dataclass(frozen=True)
class MultipolarCoverageAuditInput:
    clean_room_isolation: bool
    sources: list[MultipolarAuditSourceItem]
    what_changes_outside_us: str
    minority_steelman: str
    cui_bono_audited: bool
    rival_hypotheses_tested: int


@dataclass(frozen=True)
class MultipolarCoverageAuditResult:
    valid: bool
    violations: list[str]
    non_us_jurisdictions_count: int
    global_south_included: bool
    arabic_included: bool

    def to_dict(self) -> dict[str, Any]:
        return {
            "valid": self.valid,
            "violations": list(self.violations),
            "nonUsJurisdictionsCount": self.non_us_jurisdictions_count,
            "globalSouthIncluded": self.global_south_included,
            "arabicIncluded": self.arabic_included,
        }
