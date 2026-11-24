from __future__ import annotations

import json
import sys
import threading
import time
import unittest
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR / "python"))

from deslop_search import (  # noqa: E402
    CANONICAL_HEADING,
    CONTEMPORARY_HEADING,
    DIFFERENTIAL_HEADING,
    DeslopSearch,
    DorkOptions,
    EvidenceGradeInput,
    MultipolarAuditSourceItem,
    MultipolarCoverageAuditInput,
    MultipolarExcavationOptions,
    RawSearchResult,
    audit_multipolar_coverage,
    classify_slop,
    deslop_excavate,
    deslop_query,
    deslop_split_horizon,
    filter_search_results,
    grade_evidence_claim,
)
from deslop_search.cli import build_parser  # noqa: E402


class TestDeslopPythonParity(unittest.TestCase):
    def test_default_dork_compilation(self) -> None:
        res = deslop_query("postgres vacuum wraparound")
        self.assertEqual(res.era_applied, "human-classic")
        self.assertIn("after:2010", res.compiled_query)
        self.assertIn("before:2023", res.compiled_query)
        self.assertIn("-site:copyprogramming.com", res.compiled_query)
        self.assertIn("udm=14", res.search_url)
        self.assertLessEqual(res.operator_count, res.operator_budget)

    def test_idempotence(self) -> None:
        first = deslop_query("linux epoll edge triggered")
        second = deslop_query(first.compiled_query)
        self.assertEqual(first.compiled_query, second.compiled_query)

    def test_zero_width_and_unclosed_quotes(self) -> None:
        res = deslop_query('  \u200b"segmentation fault\u200d core dumped  ')
        self.assertEqual(res.clean_query, '"segmentation fault core dumped"')

    def test_smart_temporal_shift(self) -> None:
        res = deslop_query(
            "Python 3.13 free-threaded GIL benchmark",
            DorkOptions(smart_temporal=True),
        )
        self.assertEqual(res.era_applied, "modern-curated")
        self.assertIn("after:2023", res.compiled_query)
        self.assertNotIn("before:2023", res.compiled_query)
        self.assertIn("reddit.com", res.included_sites)

    def test_community_routes(self) -> None:
        engine = DeslopSearch()
        routes = engine.build_routes(
            "zfs arc memory pressure",
            DorkOptions(channels=("hackernews", "stackoverflow")),
        )
        self.assertEqual(len(routes), 2)
        self.assertIn("dateEnd=1672531200", routes[0].native_search_url or "")

    def test_slop_classifier_detects_en_and_pt_slop(self) -> None:
        slop_body = """
In today's fast-paced digital landscape, Kubernetes is a game-changer. Let's dive deep into its rich tapestry.

1. **Seamless Integration:** Delving into pods unlocks the full potential.
2. **Robust Scalability:** Empowering developers to elevate your workflow.
3. **Paradigm Shift:** It is important to note that automation fosters innovation.

In conclusion, whether you are a novice or expert, these tips help.
        """
        en_res = classify_slop(
            text=slop_body,
            title="[Updated 2026] Ultimate Guide to Containers",
        )
        self.assertEqual(en_res.verdict, "SLOP")
        self.assertGreaterEqual(en_res.score, 0.6)

        pt_res = classify_slop(
            text="Na era digital de hoje, vamos mergulhar fundo nesta rica tapeçaria. Esta resposta foi traduzida automaticamente.",
            url="https://stackoom.com/question/999",
        )
        self.assertTrue(pt_res.blocked_domain)
        self.assertEqual(pt_res.verdict, "SLOP")

    def test_authentic_technical_text_preserved(self) -> None:
        tech_body = """
Caught SIGSEGV at 0x7ff812a0 during munmap() under --max-threads 8.
```bash
gdb --args ./worker --config /etc/worker/prod.conf
```
Check CVE-2021-4034 and RFC 9110 section 5.
        """
        res = classify_slop(
            text=tech_body,
            title="munmap SIGSEGV with worker pool",
            url="https://danluu.com/munmap-notes/",
        )
        self.assertEqual(res.verdict, "AUTHENTIC")
        self.assertTrue(res.trusted_community_domain)
        self.assertLess(res.score, 0.2)

    def test_large_html_linear_time(self) -> None:
        payload = "<p>" + ("token " * 20_000) + "</p>"
        t0 = time.perf_counter()
        res = classify_slop(text=payload)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        self.assertLess(elapsed_ms, 250)
        self.assertGreaterEqual(res.score, 0.0)

    def test_split_horizon_plan_and_cli_flags(self) -> None:
        plan = deslop_split_horizon("postgres logical replication after:2024")
        self.assertTrue(plan.split_horizon)
        q_a = plan.canonical_pre_2023["query"]["compiled_query"]
        q_b = plan.contemporary_post_2023["query"]["compiled_query"]
        self.assertIn("before:2023", q_a)
        self.assertNotIn("after:2024", q_a)
        self.assertIn("site:reddit.com", q_a)
        self.assertIn("after:2023", q_b)
        self.assertNotIn("before:2023", q_b)
        self.assertIn("-site:copyprogramming.com", q_b)
        self.assertIn(CANONICAL_HEADING, plan.formatted_report)
        self.assertIn(CONTEMPORARY_HEADING, plan.formatted_report)
        self.assertIn(DIFFERENTIAL_HEADING, plan.formatted_report)

        parser = build_parser()
        parsed_short = parser.parse_args(["query", "epoll", "--split"])
        parsed_long = parser.parse_args(["live", "epoll", "--split-horizon"])
        self.assertTrue(parsed_short.split_horizon)
        self.assertTrue(parsed_long.split_horizon)

    def test_split_horizon_parallel_execution_and_divergence(self) -> None:
        engine = DeslopSearch()
        # Deterministic concurrency barrier: sequential execution deadlocks and raises BrokenBarrierError
        barrier = threading.Barrier(2, timeout=1.5)

        def mock_lane_a(_q: str, _y: int) -> list[RawSearchResult]:
            barrier.wait()
            return [
                RawSearchResult(
                    title="TLS configuration in Python 3.9 with ssl.wrap_socket",
                    url="https://stackoverflow.com/questions/555/ssl-wrap-socket",
                    snippet="Use ssl_wrap_socket in Python 3.9 stdlib.",
                    source="stackoverflow",
                )
            ]

        def mock_lane_b(_q: str, _y: int) -> list[RawSearchResult]:
            barrier.wait()
            return [
                RawSearchResult(
                    title="[Updated 2026] Ultimate Guide to Python SSL",
                    url="https://copyprogramming.com/howto/python-ssl",
                    snippet="In today's fast-paced digital landscape, let's dive deep into SSL.",
                ),
                RawSearchResult(
                    title="ssl.wrap_socket removed in Python 3.12; use SSLContext.wrap_socket (CVE-2024-5678)",
                    url="https://github.com/python/cpython/issues/100000",
                    snippet="ssl.wrap_socket was deprecated and removed in Python 3.12; migrate to create_default_context for CVE-2024-5678.",
                    source="github",
                ),
            ]

        report = engine.live_split_horizon_search(
            "python ssl wrap_socket",
            lane_a_fetcher=mock_lane_a,
            lane_b_fetcher=mock_lane_b,
        )

        self.assertEqual(report.canonical_pre_2023["results"]["stats"]["keptCount"], 1)
        self.assertEqual(report.contemporary_post_2023["results"]["stats"]["keptCount"], 1)
        self.assertEqual(report.contemporary_post_2023["results"]["stats"]["discardedCount"], 1)
        self.assertEqual(report.differential.status, "DIVERGENT")
        self.assertIn("Python 3.9", report.differential.canonical_only_terms)
        self.assertIn("Python 3.12", report.differential.contemporary_only_terms)
        self.assertIn(CANONICAL_HEADING, report.formatted_report)
        self.assertIn(CONTEMPORARY_HEADING, report.formatted_report)
        self.assertIn(DIFFERENTIAL_HEADING, report.formatted_report)

    def test_filter_batch_and_bundled_data_sync(self) -> None:
        batch = filter_search_results(
            [
                RawSearchResult(
                    title="Scraped Answer",
                    url="https://codegrepper.com/code-examples/foo",
                    snippet="In today's digital landscape...",
                ),
                RawSearchResult(
                    title="Real SO Thread",
                    url="https://stackoverflow.com/questions/42/foo",
                    snippet="Pass `--no-ff` to `git merge`.",
                ),
            ]
        )
        self.assertEqual(batch.stats["keptCount"], 1)
        self.assertEqual(batch.stats["discardedCount"], 1)

        bundled_dir = ROOT_DIR / "python" / "deslop_search" / "data"
        root_data_dir = ROOT_DIR / "data"
        for filename in (
            "blocklist.json",
            "sources.json",
            "slop-lexicon.json",
            "multipolar-jurisdictions.json",
        ):
            self.assertEqual(
                json.loads((root_data_dir / filename).read_text(encoding="utf-8")),
                json.loads((bundled_dir / filename).read_text(encoding="utf-8")),
            )

    def test_multipolar_excavation_small_web_and_grading_parity(self) -> None:
        plan = deslop_excavate(
            "ultra processed foods regulation",
            MultipolarExcavationOptions(
                use_case="Policy audit",
                period_years=6,
                native_terms_by_lang={"de": "hochverarbeitete Lebensmittel"},
            ),
        )
        self.assertEqual(plan.protocol_version, "2.3.0")
        self.assertTrue(plan.clean_room_isolation)
        self.assertEqual(len(plan.strata), 6)
        self.assertEqual(len(plan.multipolar_queries), 15)
        self.assertTrue(any(mq.code == "ARAB" and mq.language == "ar" for mq in plan.multipolar_queries))
        self.assertTrue(any(mq.is_global_south for mq in plan.multipolar_queries))

        small_web_stratum = next(s for s in plan.strata if s.stratum == "small_web_archaeology")
        combined_sw = " ".join(q.compiled_query for q in small_web_stratum.queries)
        self.assertIn("tumblr.com", combined_sw)
        self.assertIn("blogspot.com", combined_sw)
        self.assertIn("web.archive.org", combined_sw)

        for stratum in plan.strata:
            for q in stratum.queries:
                self.assertLessEqual(q.operator_count, q.operator_budget)

        with self.assertRaises(ValueError):
            deslop_excavate("   \u200b  ")

        # Grading negative/mutation parity
        self.assertEqual(
            grade_evidence_claim(
                EvidenceGradeInput(
                    ontological_type="FATO",
                    independent_origins=5,
                    entailment_checked=True,
                    replicated=True,
                    retracted=True,
                )
            ).grade,
            "D",
        )
        self.assertEqual(
            grade_evidence_claim(
                EvidenceGradeInput(
                    ontological_type="RELATO",
                    independent_origins=4,
                    entailment_checked=True,
                    replicated=True,
                )
            ).grade,
            "C",
        )
        self.assertEqual(
            grade_evidence_claim(
                EvidenceGradeInput(
                    ontological_type="FATO",
                    independent_origins=2,
                    entailment_checked=True,
                    has_unmitigated_conflict_of_interest=True,
                    replicated=False,
                )
            ).grade,
            "C",
        )
        self.assertEqual(
            grade_evidence_claim(
                EvidenceGradeInput(
                    ontological_type="FATO",
                    independent_origins=2,
                    entailment_checked=True,
                    replicated=True,
                )
            ).grade,
            "A",
        )

        bad_audit = audit_multipolar_coverage(
            MultipolarCoverageAuditInput(
                clean_room_isolation=False,
                sources=[MultipolarAuditSourceItem(jurisdiction="DE", language="de")],
                what_changes_outside_us="",
                minority_steelman="",
                cui_bono_audited=False,
                rival_hypotheses_tested=0,
            )
        )
        self.assertFalse(bad_audit.valid)

        good_audit = audit_multipolar_coverage(
            MultipolarCoverageAuditInput(
                clean_room_isolation=True,
                sources=[
                    MultipolarAuditSourceItem(
                        jurisdiction="DE",
                        language="de",
                        original_excerpt="Bundesamt Bericht",
                        translated_excerpt="Federal agency report",
                    ),
                    MultipolarAuditSourceItem(jurisdiction="BR", language="pt-BR"),
                    MultipolarAuditSourceItem(
                        jurisdiction="ARAB",
                        language="ar",
                        original_excerpt="تقرير رسمي",
                        translated_excerpt="Official report",
                    ),
                ],
                what_changes_outside_us="European and Global South rules diverge sharply from US defaults.",
                minority_steelman="Minority researchers present strong longitudinal confounding objections.",
                cui_bono_audited=True,
                rival_hypotheses_tested=2,
            )
        )
        self.assertTrue(good_audit.valid)
        self.assertTrue(good_audit.global_south_included)
        self.assertTrue(good_audit.arabic_included)

        parser = build_parser()
        parsed_exc = parser.parse_args(
            ["excavate", "grid", "storage", "--jurisdictions", "DE,BR", "--no-clean-room", "--json"]
        )
        self.assertEqual(parsed_exc.subcommand, "excavate")
        self.assertFalse(parsed_exc.clean_room)
        self.assertEqual(parsed_exc.jurisdictions, "DE,BR")


if __name__ == "__main__":
    unittest.main()
