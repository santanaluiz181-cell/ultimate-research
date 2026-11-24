# Workflow: Mode 11 - Multipolar Polyglot & Small-Web Excavation

Playbook operacional para investigar temas complexos fora da bolha anglofona de SEO, combinando **Isolamento Clean-Room**, **Garimpo Small Web** e **Busca Nativa em 15+ Jurisdicoes + Mundo Arabe + Sul Global**.

Referencia normativa: [`references/multipolar-polyglot-excavation.md`](../references/multipolar-polyglot-excavation.md)

---

## 1. Pre-Voo e Compilacao do Plano Clean-Room

1. **Auditoria de Conectores:**
   ```bash
   node scripts/env-check.mjs
   ```
2. **Bypass de Memoria (Clean-Room Isolation):**
   ```bash
   node scripts/vault.mjs search "<tema>" --clean-room
   ```
3. **Gerar Plano Estruturado (Etapa 0 + Estratos 1..6):**
   ```bash
   node scripts/orchestrate.mjs plan "<tema>" --mode MULTIPOLAR_EXCAVATION --clean-room
   ```
4. **Compilar Dorks Nativos + Small Web (TS ou Python):**
   ```bash
   node dist/cli.js excavate "<tema>" --clean-room --period-years 5 --json
   # ou em Python:
   python -m deslop_search excavate "<tema>" --clean-room --period-years 5 --json
   ```

---

## 2. Topologia de Enxame (`flash_lite`) por Estrato

Despache ate **5 subagentes `flash_lite` em paralelo por onda**, cada um isolado no seu estrato:
- **Scout 1 (Surface + Cui Bono):** Mapeia consenso mainstream, agencias e patrocinadores (`who_sustains` vs `who_profits`).
- **Scout 2 (Ciencia Forense):** Consulta Europe PMC / CrossRef / OpenAlex / PubMed + checagem de `retraction_status`, desenho amostral e financiamento.
- **Scout 3 (Comunidades + Garimpo Small Web):** Executa dorks em `profile: "all_community"` (Reddit/GitHub/HN) e `profile: "small_web"` (Tumblr, Blogger, Wayback Machine, Bearblog, Neocities).
- **Scout 4 (Multipolo Europa & Asia):** Busca nos idiomas originais em `DE, IT, FR, NO, DK, CN, JP, KR, SG`, registrando sempre **[Trecho Original + Traducao]**.
- **Scout 5 (Sul Global & Mundo Arabe):** Busca nos idiomas originais em `BR, MX, IN, TR, ARAB, GLOBAL_SOUTH`, documentando o que essas regioes acrescentam, questionam ou ignoram em relacao aos EUA.

---

## 3. Regras de Ingestao e Validacao Deterministica

1. Todo item na matriz deve classificar `ontological_type` (`FATO | INTERPRETACAO | RELATO`), `evidence_grade` (`A | B | C | D`), `excavation_stratum`, `jurisdiction` e `source_language`.
2. Para fontes em idioma diferente de `en`/`pt`/`pt-br`, `original_excerpt` e `translated_excerpt` sao obrigatorios.
3. Rode os auditores deterministicos antes da entrega:
   ```bash
   node scripts/validate-schemas.mjs evidence path/to/evidence-ledger.json
   node scripts/validate-schemas.mjs report-multipolar path/to/final-report.json
   ```

---

## 4. Estrutura Obrigatoria de Entrega (`ENTREGA`)

1. **Resposta Direta + Nivel de Confianca** (testando `H-DOM` vs `H-RIV-1` e `H-RIV-2`).
2. **Visao Dominante & Cui Bono** (quem sustenta e quem lucra).
3. **O Que Muda Fora dos EUA** (sintese multipolar, mundo arabe e Sul Global + por que).
4. **Convergencias, Divergencias e Lacunas** (`INSUFFICIENT EVIDENCE` onde faltar dado).
5. **Steelman da Posicao Minoritaria** (melhor argumento possivel da tese minoritaria) e **Insights Unicos**.
6. **Tabela Afirmacao / Tipo (`FATO | INTERPRETACAO | RELATO`) / Evidencia (`A-D`) / Fonte (`[F#]`).**
7. **Implicacoes Praticas & Perguntas em Aberto.**
8. **Lista Completa de Fontes** (`[F#]`, URL verificavel, data e trecho original + traducao quando aplicavel).
9. **Checagem Final:** sem fonte -> remova; vies americano -> corrija; personalizacao -> apague.
