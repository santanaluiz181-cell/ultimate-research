from __future__ import annotations

import datetime as dt
from typing import Any

from .dorks import TemporalDorkEngine, sanitize_raw_query
from .models import (
    CompiledQuery,
    DorkOptions,
    EvidenceGrade,
    EvidenceGradeInput,
    EvidenceGradeResult,
    ExcavationStratumPlan,
    MultipolarCoverageAuditInput,
    MultipolarCoverageAuditResult,
    MultipolarExcavationOptions,
    MultipolarExcavationPlan,
    MultipolarJurisdictionCode,
    MultipolarJurisdictionQuery,
)
from .rules import load_rules

_NON_FOREIGN_LANGUAGES = frozenset({"en", "pt", "pt-br"})
_US_JURISDICTION_ALIASES = frozenset({"US", "USA", "UNITED STATES"})


def _resolve_selected_jurisdictions(
    all_jurisdictions: list[dict[str, Any]],
    requested: tuple[MultipolarJurisdictionCode, ...] | list[MultipolarJurisdictionCode],
) -> list[dict[str, Any]]:
    by_code: dict[str, dict[str, Any]] = {
        str(entry["code"]).upper(): entry for entry in all_jurisdictions
    }
    if not requested:
        return list(all_jurisdictions)

    resolved: list[dict[str, Any]] = []
    seen: set[str] = set()
    for code in requested:
        norm = str(code).strip().upper()
        if norm not in by_code:
            raise ValueError(f'Unknown multipolar jurisdiction code: "{code}".')
        if norm not in seen:
            seen.add(norm)
            resolved.append(by_code[norm])
    return resolved


def _resolve_native_terms(
    clean_query: str, language: str, native_terms_by_lang: dict[str, str]
) -> str:
    if not native_terms_by_lang:
        return clean_query
    direct = native_terms_by_lang.get(language)
    if isinstance(direct, str) and direct.strip():
        return sanitize_raw_query(direct)
    primary = language.split("-")[0].split("/")[0].lower()
    if primary:
        for key, val in native_terms_by_lang.items():
            key_primary = key.lower().split("-")[0].split("/")[0]
            if key_primary == primary and isinstance(val, str) and val.strip():
                return sanitize_raw_query(val)
    return clean_query


def build_multipolar_excavation_plan(
    raw_query: str,
    options: MultipolarExcavationOptions | None = None,
    dork_engine: TemporalDorkEngine | None = None,
) -> MultipolarExcavationPlan:
    """Compile a 6-stratum Clean-Room Multipolar Polyglot & Small-Web Excavation Plan."""
    clean_query = sanitize_raw_query(raw_query)
    if not clean_query:
        raise ValueError("Query must not be empty or whitespace-only.")

    opts = options or MultipolarExcavationOptions()
    engine_inst = dork_engine or TemporalDorkEngine()
    rules = load_rules()

    clean_room = opts.clean_room
    raw_period = opts.period_years if opts.period_years is not None else 5
    period_years = min(max(int(raw_period), 1), 50) if raw_period > 0 else 5
    use_case = (
        opts.use_case.strip()
        if isinstance(opts.use_case, str) and opts.use_case.strip()
        else "Investigacao independente sem vies"
    )
    engine = opts.engine

    current_year = dt.datetime.now(dt.timezone.utc).year
    after_year = str(max(1995, current_year - period_years))

    all_jurisdictions: list[dict[str, Any]] = list(rules.multipolar.get("jurisdictions", []))
    selected = _resolve_selected_jurisdictions(all_jurisdictions, opts.jurisdictions)

    sub_questions = [
        f'SQ-01 (Surface + Cui Bono): Qual e a visao dominante na midia/fontes oficiais sobre "{clean_query}", quem a sustenta e quem lucra com ela?',
        f'SQ-02 (Ciencia Forense): Quais estudos, white papers, amostras, replicacoes, conflitos de interesse, financiadores e retratacoes existem sobre "{clean_query}"?',
        f'SQ-03 (Comunidades Independentes): Que padroes praticos, falhas ou contestacoes emergem no Reddit, GitHub, Hacker News e foruns tecnicos sobre "{clean_query}"?',
        f'SQ-04 (Garimpo Small Web): Que relatos de primeira mao e vozes dissidentes aparecem no Tumblr, Blogger, Wayback Machine, Bearblog e canais esquecidos sobre "{clean_query}"?',
        f'SQ-05 (Multipolo & Sul Global): O que fontes locais em idiomas originais (Alemanha, Italia, Franca, China, Japao, Coreia, Singapura, India, Mexico, Brasil, Turquia, Noruega, Dinamarca, mundo arabe e Sul Global) acrescentam ou questionam na narrativa anglofona sobre "{clean_query}"?',
    ]

    dominant_hypothesis = f'H-DOM: O consenso predominante em lingua inglesa descreve adequadamente os mecanismos, riscos e resultados de "{clean_query}" sem omissoes materiais relevantes.'
    rival_hypotheses = (
        f'H-RIV-1: O consenso dominante sobre "{clean_query}" reflete incentivos institucionais, financiamento seletivo ou vies regulatorio norte-americano que ignora evidencias contrarias.',
        f'H-RIV-2: Evidencias em idiomas locais, no Sul Global ou em arquivos da Small Web revelam falhas empiricas, efeitos colaterais ou alternativas ausentes na literatura anglofona sobre "{clean_query}".',
    )

    surface_mainstream = engine_inst.compile(
        clean_query, DorkOptions(era="none", after=after_year, engine=engine)
    )
    surface_cui_bono = engine_inst.compile(
        f'{clean_query} ("conflict of interest" OR funding OR sponsor OR criticism)',
        DorkOptions(era="none", after=after_year, engine=engine),
    )

    science_papers = engine_inst.compile(
        clean_query,
        DorkOptions(
            era="none",
            after=after_year,
            include_sites=(
                "pubmed.ncbi.nlm.nih.gov",
                "arxiv.org",
                "scholar.google.com",
                "europepmc.org",
            ),
            engine=engine,
        ),
    )
    science_forensics = engine_inst.compile(
        f'{clean_query} (retraction OR corrigendum OR "expression of concern" OR "conflict of interest" OR funding)',
        DorkOptions(
            era="none",
            include_sites=(
                "retractionwatch.com",
                "pubpeer.com",
                "crossref.org",
                "pubmed.ncbi.nlm.nih.gov",
            ),
            engine=engine,
        ),
    )

    communities_dork = engine_inst.compile(
        clean_query,
        DorkOptions(era="none", after=after_year, profile="all_community", engine=engine),
    )

    small_web_historic = engine_inst.compile(
        clean_query,
        DorkOptions(era="human-classic", profile="small_web", engine=engine),
    )
    small_web_wayback = engine_inst.compile(
        clean_query,
        DorkOptions(
            era="none",
            include_sites=("web.archive.org", "blogspot.com", "tumblr.com"),
            engine=engine,
        ),
    )

    multipolar_dorks: list[CompiledQuery] = []
    multipolar_queries: list[MultipolarJurisdictionQuery] = []

    for jur in selected:
        code = str(jur["code"])  # type: ignore[assignment]
        country = str(jur["countryOrRegion"])
        language = str(jur["language"])
        is_global_south = bool(jur.get("isGlobalSouth", False))
        site_hints = tuple(str(s) for s in jur.get("siteHints", []))
        native_terms = _resolve_native_terms(clean_query, language, opts.native_terms_by_lang)
        compiled = engine_inst.compile(
            native_terms,
            DorkOptions(era="none", after=after_year, include_sites=site_hints, engine=engine),
        )
        multipolar_dorks.append(compiled)
        multipolar_queries.append(
            MultipolarJurisdictionQuery(
                code=code,  # type: ignore[arg-type]
                country_or_region=country,
                language=language,
                is_global_south=is_global_south,
                native_terms_used=native_terms,
                compiled_query=compiled.compiled_query,
                search_url=compiled.search_url,
                translation_required=True,
                us_delta_prompt=f"Para {country} ({language}): extraia [trecho original + traducao], identifique o que acrescenta, questiona ou ignora em relacao a visao dominante dos EUA e explique o porquê.",
            )
        )

    strata = [
        ExcavationStratumPlan(
            stratum="surface_dominant",
            order=1,
            title="Estrato 1: Visao Dominante na Surface Web + Cui Bono",
            objective="Mapear o consenso oficial/midiatico inicial, quem o sustenta e quem lucra com ele.",
            queries=[surface_mainstream, surface_cui_bono],
            audit_checks=[
                "Listar fontes oficiais e midiaticas predominantes com data.",
                "Registrar explicitamente quem financia/sustenta a tese e quem se beneficia (Cui Bono).",
            ],
        ),
        ExcavationStratumPlan(
            stratum="science_forensic",
            order=2,
            title="Estrato 2: Ciencia, White Papers, Retratacoes e Financiamento",
            objective="Avaliar desenho do estudo, tamanho amostral, replicacao independente, conflitos de interesse e retratacoes.",
            queries=[science_papers, science_forensics],
            audit_checks=[
                "Separar estudos replicados de pre-prints ou white papers corporativos.",
                "Checar Retraction Watch / PubPeer / CrossRef para retratacoes e expressoes de preocupacao.",
            ],
        ),
        ExcavationStratumPlan(
            stratum="communities",
            order=3,
            title="Estrato 3: Comunidades Independentes (Reddit, GitHub, HN, Foruns)",
            objective="Detectar padroes recorrentes, falhas praticas e contraexemplos independentes.",
            queries=[communities_dork],
            audit_checks=[
                "Diferenciar relato empirico reproduzivel de opiniao especulativa.",
                "Evitar amplificar brigading ou astroturfing corporativo.",
            ],
        ),
        ExcavationStratumPlan(
            stratum="small_web_archaeology",
            order=4,
            title="Estrato 4: Garimpo Arqueologico (Tumblr, Blogger, Wayback Machine, Canais Esquecidos)",
            objective="Resgatar relatos de primeira mao, dissidencias historicas e acervos fora da bolha de SEO.",
            queries=[small_web_historic, small_web_wayback],
            audit_checks=[
                "Registrar relatos de primeira mao preservando o contexto historico e a URL arquivada.",
                "Classificar relatos individuais estritamente como RELATO (teto de grau C), nunca como FATO comprovado.",
            ],
        ),
        ExcavationStratumPlan(
            stratum="multipolar_local",
            order=5,
            title="Estrato 5: Multipolo Poliglota (15+ Jurisdicoes, Mundo Arabe e Sul Global)",
            objective="Quebrar o vies anglofono buscando fontes locais no idioma original e comparando com a narrativa dos EUA.",
            queries=multipolar_dorks,
            audit_checks=[
                "Toda citacao estrangeira exige [trecho no idioma original + traducao fiel].",
                "Explicitar o que o eixo nao-EUA e o Sul Global acrescentam, questionam ou ignoram frente ao consenso americano.",
            ],
        ),
        ExcavationStratumPlan(
            stratum="cross_synthesis",
            order=6,
            title="Estrato 6: Cruzamento Tripartido (FATO | INTERPRETACAO | RELATO), Graus A-D e Steelman",
            objective="Cruzar estratos, atribuir graus A-D, testar H-DOM vs H-RIV-1/H-RIV-2 e construir o melhor argumento minoritario.",
            queries=[],
            audit_checks=[
                "Tripartir cada item em FATO, INTERPRETACAO ou RELATO.",
                "Atribuir Grau A (solida) ate D (boato/marketing/retratada).",
                "Apresentar Steelman rigoroso da posicao minoritaria antes da resposta final.",
            ],
        ),
    ]

    isolation_directive = (
        "CLEAN-ROOM ISOLATION ACTIVE: Ignore memoria previa, perfil do usuario, conversas anteriores e notas antigas do vault (`--clean-room`). Baseie a coleta estritamente em fontes web externas datadas e verificaveis."
        if clean_room
        else "CLEAN-ROOM ISOLATION OFF: Vault local pode ser consultado, mantendo rastreabilidade integral de fontes externas."
    )

    return MultipolarExcavationPlan(
        protocol_version="2.3.0",
        clean_room_isolation=clean_room,
        isolation_directive=isolation_directive,
        mission={
            "question": clean_query,
            "useCase": use_case,
            "periodYears": period_years,
        },
        sub_questions=sub_questions,
        dominant_hypothesis=dominant_hypothesis,
        rival_hypotheses=rival_hypotheses,
        strata=strata,
        multipolar_queries=multipolar_queries,
        epistemic_gates=[
            "Cada afirmacao exige identificador de fonte [F#], URL verificavel e data (ou 'nao encontrado').",
            "Fonte estrangeira exige trecho literal no idioma original + traducao.",
            "Conflitos de interesse, financiadores e eventuais retratacoes devem ser declarados.",
            "Separacao obrigatoria FATO | INTERPRETACAO | RELATO com Grau A..D.",
        ],
        pre_ship_checklist=[
            "Sem fonte verificavel -> remova a afirmacao.",
            "Vies americano/anglofono -> corrija com fontes nativas e Sul Global.",
            "Personalizacao ou vazamento de memoria -> apague (Clean-Room Isolation).",
        ],
    )


def grade_evidence_claim(inp: EvidenceGradeInput) -> EvidenceGradeResult:
    """Deterministically grade a claim under Layer 8 / Mode 11 epistemic rules (A..D)."""
    downgrade_reasons: list[str] = []

    if inp.retracted:
        downgrade_reasons.append("Source retracted or invalidated.")
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="D",
            rationale="Source retracted or invalidated; cannot support factual or analytical conclusions.",
            downgrade_reasons=downgrade_reasons,
        )

    if inp.marketing_or_rumor:
        downgrade_reasons.append("Identified as marketing material, promotional copy, or unverified rumor.")
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="D",
            rationale="Marketing claim or unverified rumor automatically downgraded to Grade D.",
            downgrade_reasons=downgrade_reasons,
        )

    if inp.ontological_type == "RELATO":
        downgrade_reasons.append(
            "First-hand or anecdotal account (RELATO) cannot exceed Grade C without independent primary corroboration."
        )
        if inp.independent_origins >= 1 and inp.entailment_checked:
            return EvidenceGradeResult(
                ontological_type=inp.ontological_type,
                grade="C",
                rationale="Documented first-hand account with entailment checked; capped at Grade C due to anecdotal ontology.",
                downgrade_reasons=downgrade_reasons,
            )
        downgrade_reasons.append("Missing independent origin or entailment verification.")
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="D",
            rationale="Unverified anecdotal account lacking entailment or independent provenance.",
            downgrade_reasons=downgrade_reasons,
        )

    if inp.ontological_type == "INTERPRETACAO":
        downgrade_reasons.append(
            "Analytical interpretation (INTERPRETACAO) capped at Grade B because it infers beyond raw observed data."
        )
        if (
            inp.independent_origins >= 2
            and inp.entailment_checked
            and not inp.has_unmitigated_conflict_of_interest
        ):
            return EvidenceGradeResult(
                ontological_type=inp.ontological_type,
                grade="B",
                rationale="Well-grounded analytical interpretation supported by >=2 independent origins without unmitigated conflict.",
                downgrade_reasons=downgrade_reasons,
            )
        if inp.independent_origins < 2:
            downgrade_reasons.append("Fewer than 2 independent origins supporting the interpretation.")
        if not inp.entailment_checked:
            downgrade_reasons.append("Entailment has not been verified.")
        if inp.has_unmitigated_conflict_of_interest:
            downgrade_reasons.append("Unmitigated conflict of interest present.")
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="C",
            rationale="Interpretation with limited triangulation, missing entailment, or conflict of interest.",
            downgrade_reasons=downgrade_reasons,
        )

    # FATO path
    if inp.has_unmitigated_conflict_of_interest and inp.replicated is not True:
        downgrade_reasons.append(
            "Unmitigated conflict of interest without independent replication caps FATO at Grade C."
        )
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="C",
            rationale="Factual claim has an unmitigated conflict of interest and lacks independent replication.",
            downgrade_reasons=downgrade_reasons,
        )

    if (
        inp.independent_origins >= 2
        and inp.entailment_checked
        and not inp.has_unmitigated_conflict_of_interest
        and inp.replicated is not False
    ):
        grade: EvidenceGrade = "A"
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade=grade,
            rationale="Solid empirical fact corroborated across >=2 independent origins with entailment verified.",
            downgrade_reasons=downgrade_reasons,
        )

    if inp.independent_origins >= 1 and inp.entailment_checked:
        if inp.independent_origins < 2:
            downgrade_reasons.append("Single independent origin; requires >=2 for Grade A.")
        if inp.replicated is False:
            downgrade_reasons.append("Not independently replicated.")
        if inp.has_unmitigated_conflict_of_interest:
            downgrade_reasons.append("Conflict of interest noted alongside replication.")
        return EvidenceGradeResult(
            ontological_type=inp.ontological_type,
            grade="B",
            rationale="Verified factual claim with partial triangulation or replication caveats.",
            downgrade_reasons=downgrade_reasons,
        )

    if not inp.entailment_checked:
        downgrade_reasons.append("Entailment not checked.")
    if inp.independent_origins < 1:
        downgrade_reasons.append("No independent origin recorded.")
    return EvidenceGradeResult(
        ontological_type=inp.ontological_type,
        grade="C",
        rationale="Preliminary factual assertion pending entailment or independent origin confirmation.",
        downgrade_reasons=downgrade_reasons,
    )


def audit_multipolar_coverage(inp: MultipolarCoverageAuditInput) -> MultipolarCoverageAuditResult:
    """Audit multipolar coverage, Clean-Room isolation, foreign excerpts, Cui Bono, and Steelman."""
    rules = load_rules()
    global_south_codes = {
        str(j["code"]).upper()
        for j in rules.multipolar.get("jurisdictions", [])
        if j.get("isGlobalSouth")
    }

    violations: list[str] = []
    if not inp.clean_room_isolation:
        violations.append("Clean-Room Isolation must be active (clean_room_isolation=True).")

    non_us_jurisdictions: set[str] = set()
    global_south_included = False
    arabic_included = False

    for index, src in enumerate(inp.sources):
        jur = src.jurisdiction.strip().upper()
        lang = src.language.strip().lower()

        if jur and jur not in _US_JURISDICTION_ALIASES:
            non_us_jurisdictions.add(jur)
        if jur in global_south_codes or jur == "GLOBAL_SOUTH":
            global_south_included = True
        if jur == "ARAB" or lang == "ar" or lang.startswith("ar-"):
            arabic_included = True

        if lang not in _NON_FOREIGN_LANGUAGES:
            has_orig = bool(src.original_excerpt.strip())
            has_trans = bool(src.translated_excerpt.strip())
            if not has_orig or not has_trans:
                violations.append(
                    f"Source[{index}] ({jur or 'UNKNOWN'}/{lang or 'UNKNOWN'}): foreign-language source requires both original_excerpt and translated_excerpt."
                )

    if len(non_us_jurisdictions) < 3:
        violations.append(
            f"Insufficient multipolar diversity: expected at least 3 distinct non-US jurisdictions, found {len(non_us_jurisdictions)}."
        )

    if len(inp.what_changes_outside_us.strip()) < 20:
        violations.append("Missing substantive 'what_changes_outside_us' synthesis (>= 20 chars).")

    if len(inp.minority_steelman.strip()) < 20:
        violations.append("Missing substantive 'minority_steelman' argument (>= 20 chars).")

    if not inp.cui_bono_audited:
        violations.append("Cui Bono audit (who sustains and who profits) must be completed.")

    if inp.rival_hypotheses_tested < 2:
        violations.append(
            f"Expected at least 2 rival hypotheses tested alongside dominant hypothesis; got {inp.rival_hypotheses_tested}."
        )

    return MultipolarCoverageAuditResult(
        valid=len(violations) == 0,
        violations=violations,
        non_us_jurisdictions_count=len(non_us_jurisdictions),
        global_south_included=global_south_included,
        arabic_included=arabic_included,
    )


def format_multipolar_plan_terminal(plan: MultipolarExcavationPlan) -> str:
    """Format a MultipolarExcavationPlan into a readable terminal summary."""
    lines: list[str] = [
        f"=== ULTIMATE RESEARCH v{plan.protocol_version} | MULTIPOLAR & SMALL-WEB EXCAVATION ===",
        f"Mission       : {plan.mission['question']}",
        f"Use Case      : {plan.mission['useCase']} | Window: {plan.mission['periodYears']}y",
        f"Clean-Room    : {'ACTIVE (memory/profile isolated)' if plan.clean_room_isolation else 'OFF'}",
        f"Dominant Hyp. : {plan.dominant_hypothesis}",
        f"Rival Hyp. 1  : {plan.rival_hypotheses[0]}",
        f"Rival Hyp. 2  : {plan.rival_hypotheses[1]}",
        "",
        "--- 6-STRATUM EXCAVATION PIPELINE ---",
    ]
    for s in plan.strata:
        lines.append(f"[{s.order}] {s.title} ({len(s.queries)} compiled queries)")
        for q in s.queries[:3]:
            lines.append(f"    -> {q.compiled_query}")
        if len(s.queries) > 3:
            lines.append(f"    ... +{len(s.queries) - 3} more jurisdiction queries")
    lines.append("")
    lines.append(f"--- MULTIPOLAR JURISDICTIONS ({len(plan.multipolar_queries)}) ---")
    for mq in plan.multipolar_queries:
        south_tag = " [Global South]" if mq.is_global_south else ""
        lines.append(f"  [{mq.code}] {mq.country_or_region} ({mq.language}){south_tag}: {mq.compiled_query}")
    lines.append("")
    lines.append("--- PRE-SHIP GATES ---")
    for gate in plan.pre_ship_checklist:
        lines.append(f"  * {gate}")
    return "\n".join(lines)
