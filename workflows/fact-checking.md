# Workflow: Fact-Checking (Mode 8)

Execute forensic verification of public claims, viral media assertions, statistical statements, historical attributions, and contested quotes using a mandatory 8-step investigative pipeline and a calibrated 6-level epistemic verdict scale.

---

## 1. The 6-Level Epistemic Verdict Scale

Every investigated claim must conclude with exactly one calibrated verdict:

| Verdict | Epistemic Definition | Evidentiary Standard |
| :--- | :--- | :--- |
| **Confirmado** | The claim is completely factual, accurate, and properly contextualized. | Backed by undisputed primary records, official data, or corroborated eyewitness accounts without omitted context. |
| **Parcialmente confirmado** | The core factual premise contains truth, but secondary details, dates, or magnitudes are imprecise. | Primary evidence confirms core assertion, but numbers or peripheral qualifiers deviate from reality. |
| **Enganoso** | Uses real facts, numbers, or genuine media, but frames them out of context, chronologically displaced, or with misleading causal leaps. | The underlying datum is real, but the attributed interpretation or conclusion is demonstrably distorted. |
| **Falso** | The assertion is completely contradicted by verified facts, fabricated, or based on altered/forged evidence. | Direct, incontrovertible primary evidence actively disproves the claim. |
| **Não comprovado** | No credible primary or secondary evidence exists to substantiate or definitively refute the claim. | **HARD RULE:** Absence of evidence is NOT evidence of falsehood. Do not declare `Falso` when the truth is simply unprovable. |
| **Inconclusivo** | High-credibility primary sources exist on both sides with irreconcilable empirical conflict, ongoing legal disputes, or divergent methodologies. | Two or more rigorous, independent primary sources contradict each other without resolution. |

---

## 2. The Mandatory 8-Step Verification Pipeline

```
[Target Assertion / Viral Statement]
                   ↓
[Step 1: Atomic Claim Extraction] (Isolate single falsifiable propositional statements)
                   ↓
[Step 2: Burden of Proof Definition] (Define exact empirical artifact needed to prove or refute)
                   ↓
[Step 3: Earliest Primary Origin Tracing] (Reverse search, original speaker, metadata, first upload)
                   ↓
[Step 4: Independent Corroborating Evidence] (Witnesses, logs, databases, gazettes, filings)
                   ↓
[Step 5: Active Adversarial / Refuting Search] (Hunting disproofs, debunks, retractions, counter-data)
                   ↓
[Step 6: Chronology, Magnitude & Context Audit] (Did this happen in 2026 or 2018? Are units altered?)
                   ↓
[Step 7: ARS Reference Audit] (node scripts/deslop-bridge.mjs verify --strict)
                   ↓
[Step 8: Proportional Epistemic Verdict] (Issuing one of the 6 standardized verdicts with proof)
```

### Step 1: Atomic Claim Extraction
Break down complex statements into isolated, falsifiable atomic claims:
- Eliminate rhetorical hyperbole and emotional framing.
- Format: `[Subject] [Predicate/Action] [Object] [Temporal/Spatial Constraint]`.
- Example: *"Company X was fined R$ 50 million by Ibama in Tocantins in 2024 for illegal deforestation."*

### Step 2: Burden of Proof Definition
Before initiating any search, state what specific empirical artifact would constitute definitive proof or refutation:
- What document would prove it? (e.g., Ibama auto de infração, Certidão da Dívida Ativa, publicação no DOU).
- What document would refute it? (e.g., Certidão negativa, cancellation acórdão, official agency denial).

### Step 3: Earliest Primary Origin Tracing
Trace the assertion to its initial broadcast or publication:
- Identify the first person, social handle, news agency, or PR release that uttered the claim.
- **Media Forensics:** If an image or video is attached, perform reverse image search and inspect EXIF metadata to determine the original creation date and location.
- Determine whether secondary outlets are merely repeating the original claim without independent verification.

### Step 4: Independent Corroborating Evidence
Search for independent corroboration (not syndicated echoes):
- Query primary registers: Official Gazettes (`site:in.gov.br`), open government portals (`dados.gov.br`), court repositories (`site:*.jus.br`).
- Interview records or unedited audio/video recordings of events.
- Never accept two news articles citing the same anonymous source as independent corroboration.

### Step 5: Active Adversarial & Refutation Search
Actively hunt for contradictory evidence. Do not engage in confirmation bias:
- Query specific negation terms:
  ```json
  {
    "query": "\"<Claim Keyword>\" AND (desmentido OR falso OR retificação OR errata OR contestação)"
  }
  ```
- Search official institutional clarification pages (e.g., Secom, Agência Lupa, Fato ou Boato / TSE, Boatos.org).
- Check court dockets for injunctions or retractions.

### Step 6: Chronology, Magnitude & Context Audit
Scrutinize the three most common manipulation vectors:
1. **Temporal Displacement (Anachronism):** Is an authentic 2016 event being presented as a 2026 development?
2. **Magnitude Distortion:** Were numbers altered, decimals shifted, or absolute figures used where per-capita rates are mandatory?
3. **Decontextualization:** Was an ironic remark, hypothetical scenario, or satirical headline cropped to appear as a factual assertion?

### Step 7: ARS Reference Audit
Compile all collected evidence links and verify them with the Automated Reference System:
```bash
node scripts/deslop-bridge.mjs verify --file fact-check-draft.md --strict
```
Ensure all reference links are active, non-circular, and directly anchor the empirical claims made in the rebuttal.

### Step 8: Proportional Verdict & Deliverable Formatting
Issue the verdict and present the findings using the standardized Fact-Check Card:

```markdown
# Checagem de Fatos: [Título Resumido da Alegação]

## Veredito: [ Confirmado | Parcialmente confirmado | Enganoso | Falso | Não comprovado | Inconclusivo ]

**Alegação Avaliada:** "[Frase exata analisada]"  
**Autor da Alegação:** [Nome do autor, cargo ou canal / data da publicação original]  
**Alcance / Contexto:** [Onde circulou e por que é relevante checar]  

---

### O que apuramos (Síntese das Evidências)
[1 a 2 parágrafos diretos explicando a verdade factual apurada em fontes primárias]

### Linha do Tempo e Evidências Primárias
- **Data do Fato Real:** DD/MM/AAAA.
- **Documento Primário:** [Nome do Documento / Registro Oficial](URL).
- **Contradição / Distorção Identificada:** [Explicação exata de onde reside a falha].

### Posição dos Envolvidos
[Resposta oficial do autor da alegação ou órgão citado, respeitando o contraditório].

### Referências Auditadas (ARS)
1. [Fonte Primária 1](URL) - Consultado em DD/MM/AAAA.
2. [Fonte Primária 2](URL) - Consultado em DD/MM/AAAA.
```

---

## 3. Checkable Completion Criteria

- [ ] Target claim decomposed into atomic propositional statements.
- [ ] Burden of proof explicitly defined before searching.
- [ ] Earliest origin and dissemination network traced.
- [ ] Active adversarial search executed for refutations and erratas.
- [ ] Chronological framing and numerical magnitudes audited.
- [ ] Verdict selected strictly from the 6 calibrated levels.
- [ ] HARD RULE respected: `Não comprovado` is never labeled as `Falso`.
- [ ] `node scripts/deslop-bridge.mjs verify --strict` executed with zero errors.
