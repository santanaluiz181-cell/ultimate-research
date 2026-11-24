import { describe, expect, it } from "vitest";
import {
  DeslopSearch,
  auditMultipolarCoverage,
  deslopExcavate,
  deslopQuery,
  executeDeslopTool,
  gradeEvidenceClaim
} from "../../src/index.js";
import type { MultipolarJurisdictionCode } from "../../src/index.js";

const EXPECTED_JURISDICTIONS: MultipolarJurisdictionCode[] = [
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
  "GLOBAL_SOUTH"
];

describe("Multipolar Polyglot & Small-Web Deep Excavation (v2.3 SUPERUPGRADE)", () => {
  it("compiles a Clean-Room 6-stratum excavation plan covering Small Web and all 15 multipolar jurisdictions", () => {
    const plan = deslopExcavate("ultra processed foods regulation", {
      useCase: "Regulatory benchmark",
      periodYears: 6,
      nativeTermsByLang: {
        de: "hochverarbeitete Lebensmittel Regulierung",
        ar: "الأغذية فائقة المعالجة"
      }
    });

    expect(plan.protocolVersion).toBe("2.3.0");
    expect(plan.cleanRoomIsolation).toBe(true);
    expect(plan.mission.useCase).toBe("Regulatory benchmark");
    expect(plan.mission.periodYears).toBe(6);
    expect(plan.subQuestions).toHaveLength(5);
    expect(plan.dominantHypothesis).toContain("H-DOM");
    expect(plan.rivalHypotheses).toHaveLength(2);

    const strataNames = plan.strata.map((s) => s.stratum);
    expect(strataNames).toEqual([
      "surface_dominant",
      "science_forensic",
      "communities",
      "small_web_archaeology",
      "multipolar_local",
      "cross_synthesis"
    ]);

    const smallWebStratum = plan.strata.find((s) => s.stratum === "small_web_archaeology");
    expect(smallWebStratum).toBeDefined();
    const combinedSmallWeb = smallWebStratum!.queries.map((q) => q.compiledQuery).join(" ");
    expect(combinedSmallWeb).toContain("tumblr.com");
    expect(combinedSmallWeb).toContain("blogspot.com");
    expect(combinedSmallWeb).toContain("web.archive.org");

    const codes = plan.multipolarQueries.map((mq) => mq.code);
    expect(codes).toEqual(EXPECTED_JURISDICTIONS);
    expect(plan.multipolarQueries.some((mq) => mq.isGlobalSouth)).toBe(true);
    expect(plan.multipolarQueries.some((mq) => mq.code === "ARAB" && mq.language === "ar")).toBe(true);

    const deQuery = plan.multipolarQueries.find((mq) => mq.code === "DE");
    expect(deQuery?.nativeTermsUsed).toBe("hochverarbeitete Lebensmittel Regulierung");
    expect(deQuery?.compiledQuery).toContain("site:.de");
    expect(deQuery?.translationRequired).toBe(true);

    const arQuery = plan.multipolarQueries.find((mq) => mq.code === "ARAB");
    expect(arQuery?.nativeTermsUsed).toBe("الأغذية فائقة المعالجة");

    for (const stratum of plan.strata) {
      for (const compiled of stratum.queries) {
        expect(compiled.operatorCount).toBeLessThanOrEqual(compiled.operatorBudget);
      }
    }
  });

  it("supports small_web profile, small_web vertical route, and deslop_multipolar_excavate MCP tool", () => {
    const compiled = deslopQuery("indie synth repair manual", { profile: "small_web" });
    expect(compiled.compiledQuery).toContain("site:tumblr.com");
    expect(compiled.compiledQuery).toContain("site:blogspot.com");

    const engine = new DeslopSearch();
    const routes = engine.buildRoutes("old thinkpad bios mod", { channels: ["small_web"] });
    expect(routes).toHaveLength(1);
    expect(routes[0]?.channel).toBe("small_web");
    expect(routes[0]?.nativeSearchUrl).toContain("web.archive.org/web/*/");

    const toolRes = executeDeslopTool("deslop_multipolar_excavate", {
      query: "battery thermal runaway grid storage",
      jurisdictions: ["DE", "BR", "ARAB"],
      clean_room: true,
      period_years: 4
    }) as { cleanRoomIsolation: boolean; multipolarQueries: Array<{ code: string }> };

    expect(toolRes.cleanRoomIsolation).toBe(true);
    expect(toolRes.multipolarQueries.map((m) => m.code)).toEqual(["DE", "BR", "ARAB"]);
  });

  it("rejects empty/zero-width-only queries and unknown jurisdiction codes", () => {
    expect(() => deslopExcavate("   \u200B\u200D  ")).toThrow(RangeError);
    expect(() =>
      deslopExcavate("energy grid", {
        jurisdictions: ["XX_INVALID" as MultipolarJurisdictionCode]
      })
    ).toThrow(RangeError);
  });

  it("enforces deterministic negative/mutation boundaries in gradeEvidenceClaim", () => {
    const retracted = gradeEvidenceClaim({
      ontologicalType: "FATO",
      independentOrigins: 5,
      entailmentChecked: true,
      replicated: true,
      retracted: true
    });
    expect(retracted.grade).toBe("D");

    const marketing = gradeEvidenceClaim({
      ontologicalType: "FATO",
      independentOrigins: 3,
      entailmentChecked: true,
      marketingOrRumor: true
    });
    expect(marketing.grade).toBe("D");

    const relato = gradeEvidenceClaim({
      ontologicalType: "RELATO",
      independentOrigins: 4,
      entailmentChecked: true,
      replicated: true
    });
    expect(relato.grade).toBe("C");

    const unverifiedRelato = gradeEvidenceClaim({
      ontologicalType: "RELATO",
      independentOrigins: 0,
      entailmentChecked: false
    });
    expect(unverifiedRelato.grade).toBe("D");

    const unmitigatedCoiFact = gradeEvidenceClaim({
      ontologicalType: "FATO",
      independentOrigins: 2,
      entailmentChecked: true,
      hasUnmitigatedConflictOfInterest: true,
      replicated: false
    });
    expect(unmitigatedCoiFact.grade).toBe("C");

    const interp = gradeEvidenceClaim({
      ontologicalType: "INTERPRETACAO",
      independentOrigins: 4,
      entailmentChecked: true,
      hasUnmitigatedConflictOfInterest: false
    });
    expect(interp.grade).toBe("B");

    const solidFact = gradeEvidenceClaim({
      ontologicalType: "FATO",
      independentOrigins: 2,
      entailmentChecked: true,
      replicated: true,
      hasUnmitigatedConflictOfInterest: false
    });
    expect(solidFact.grade).toBe("A");
  });

  it("flags clean-room bypass, missing foreign translations, insufficient non-US jurisdictions, and missing steelman", () => {
    const failed = auditMultipolarCoverage({
      cleanRoomIsolation: false,
      sources: [
        { jurisdiction: "US", language: "en" },
        { jurisdiction: "DE", language: "de", originalExcerpt: "Nur Deutsch", translatedExcerpt: "" }
      ],
      whatChangesOutsideUs: "short",
      minoritySteelman: "",
      cuiBonoAudited: false,
      rivalHypothesesTested: 1
    });

    expect(failed.valid).toBe(false);
    expect(failed.nonUsJurisdictionsCount).toBe(1);
    expect(failed.violations.length).toBeGreaterThanOrEqual(6);

    const passed = auditMultipolarCoverage({
      cleanRoomIsolation: true,
      sources: [
        {
          jurisdiction: "DE",
          language: "de",
          originalExcerpt: "Das Bundesamt dokumentierte Risiken.",
          translatedExcerpt: "The federal agency documented risks."
        },
        {
          jurisdiction: "BR",
          language: "pt-BR"
        },
        {
          jurisdiction: "ARAB",
          language: "ar",
          originalExcerpt: "أظهر التقرير تبايناً واضحاً في النتائج.",
          translatedExcerpt: "The report showed clear divergence in outcomes."
        }
      ],
      whatChangesOutsideUs:
        "European and Brazilian regulators impose stricter precautionary thresholds than US federal guidance.",
      minoritySteelman:
        "Independent small-sample practitioners argue longitudinal adherence drops sharply outside controlled trials.",
      cuiBonoAudited: true,
      rivalHypothesesTested: 2
    });

    expect(passed.valid).toBe(true);
    expect(passed.violations).toEqual([]);
    expect(passed.nonUsJurisdictionsCount).toBe(3);
    expect(passed.globalSouthIncluded).toBe(true);
    expect(passed.arabicIncluded).toBe(true);
  });
});
