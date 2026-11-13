# Workflow: Legal Research (Mode 7)

Conduct high-precision legal, regulatory, and jurisprudential research across Brazilian and international legal frameworks (including Federal, State of Tocantins, STF, STJ, TST, TRF1, TJTO, CNJ, and Courts of Accounts) with strict normative hierarchy tracking and automated CNJ identifier verification.

---

## 1. The 9-Tier Legal Epistemic Hierarchy

Every referenced legal act, precedent, or opinion must be classified into one of nine distinct categories:

1. **Legislation in Force (*Vigente*):** Active, unrepealed statutes, constitutional provisions, complementary laws, and provisional measures (*Medidas Provisórias*).
2. **Revoked Legislation (*Revogada*):** Explicitly or tacitly repealed statutes, historical legal texts. Must never be cited as governing law unless analyzing retroactivity or acquired rights (*direito adquirido*).
3. **Bills in Transit (*Projetos de Lei*):** Proposed statutory changes pending in the Chamber of Deputies, Federal Senate, or State Assemblies (ALET-TO). Zero normative force.
4. **Proposed Regulations & Public Consultations:** Draft administrative rules, regulatory agency proposals (ANVISA, ANATEL, ANEEL).
5. **Consolidated Jurisprudence (*Jurisprudência Pacificada*):** Precedents reiterated uniformly by collegiate judicial bodies (Órgão Especial, Seções, Turmas).
6. **Monocratic / Individual Decisions (*Decisões Monocráticas*):** Preliminary injunctions or individual rulings by a single judge or minister. Non-binding on collegiate bodies.
7. **Binding Precedents & Leading Cases:**
   - *Súmulas Vinculantes* (STF).
   - *Temas de Repercussão Geral* (STF).
   - *Recursos Especiais Repetitivos* (STJ).
   - *Incidente de Resolução de Demandas Repetitivas (IRDR)* (TJTO/TRFs).
8. **Administrative Rulings:** Binding normative instructions and decisions from CNJ, CNMP, TCU, and TCE-TO.
9. **Doctrinal Commentary (*Doutrina*):** Scholarly commentary, legal treatises, and academic journal articles. Purely persuasive authority.

---

## 2. Domain Whitelist & Blacklist Enforcement

- **Mandatory Whitelist Domains:**
  - Federal Government & Presidency: `planalto.gov.br`
  - Legislative Branches: `camara.leg.br`, `senado.leg.br`, `al.to.leg.br`, `lexml.gov.br`
  - Superior Courts & Councils: `stf.jus.br`, `stj.jus.br`, `tst.jus.br`, `cnj.jus.br`, `cnmp.jus.br`
  - Regional & State Courts: `trf1.jus.br`, `tjto.jus.br`, `eproc.tjto.jus.br`
  - Courts of Accounts: `tcu.gov.br`, `tce.to.gov.br`
  - Official Gazette: `in.gov.br`, `diariooficial.to.gov.br`
- **STRICT BLACKLIST:**
  - `jusbrasil.com.br/artigos` (Prohibited: Unreviewed SEO content and amateur opinion posts).
  - Commercial legal aggregators, unverified student summaries, and blog opinions.
  - *Exception:* Direct transcriptions of official court jurisprudence indexed on Jusbrasil may only be used as search pointers to locate the canonical `*.jus.br` court docket.

---

## 3. CNJ Standard Numbering & ARS Validation

All Brazilian judicial proceedings must conform to the unified standard defined by CNJ Resolução 65/2008:
$$\text{NNNNNNN-DD.AAAA.J.TR.OOOO}$$
- $\text{NNNNNNN}$: Sequential process number within the origin unit.
- $\text{DD}$: Modulo 97-10 check digits (mathematically verifiable).
- $\text{AAAA}$: Year of filing.
- $\text{J}$: Segment of the Judiciary (1=STF, 2=CNJ, 3=STJ, 4=Federal/TRF, 5=Labor/TST, 8=State/TJ).
- $\text{TR}$: Tribunal or Court Region (e.g., 27 for TJTO, 01 for TRF1).
- $\text{OOOO}$: Origin court unit / registry office (*vara / comarca*).

**Verification Command:**
```bash
node scripts/deslop-bridge.mjs verify --file legal-draft.md --strict
```
The ARS script validates Modulo 97-10 check digits, LexML URN syntax, and active electronic court gazette (DJEN) alignment.

---

## 4. Step-by-Step Execution Protocol

```
[Legal Inquiry / Case Law Query]
                 ↓
[Step 1: Normative Scoping & Hierarchy Tree] (Constitutional, Statutory, Regulatory, Precedential)
                 ↓
[Step 2: Statutory Discovery & Vigência Check] (Planalto, LexML, Portal da Legislação)
                 ↓
[Step 3: Precedent & Jurisprudence Search] (STF, STJ, TJTO Jurisprudência Unificada)
                 ↓
[Step 4: Binding Force & Distinguishing Audit] (Súmula Vinculante vs Mera Súmula, Overruling, Distinguishing)
                 ↓
[Step 5: Mandatory ARS & CNJ Modulo 97-10 Audit] (node scripts/deslop-bridge.mjs verify --strict)
                 ↓
[Step 6: Structured Legal Memorandum] (Relatório, Fundamentação, Dispositivo / Parecer)
```

### Step 1: Normative Scoping & Hierarchy Tree
Map the legal question against the pyramid of norms:
- Is there a direct constitutional provision (CF/88)?
- Are there complementary laws (LC) or ordinary laws (Lei Ordinária) governing the matter?
- Has the administrative body (CNJ, Receita Federal, State Secretary) issued normative instructions?
- Are there local statutes (e.g., Lei Estadual nº 1.818/2007 - Estatuto dos Servidores do TO)?

### Step 2: Statutory Discovery & *Vigência* Check
1. Search official sources using `search_web`:
   ```json
   {
     "query": "site:planalto.gov.br/ccivil_03 \"Lei nº\" \"<topic>\""
   }
   ```
2. Verify *vigência* (whether currently in force):
   - Check Planalto compiled text (*texto compilado*) for strike-through text (*riscado*) indicating express repeal.
   - Cross-check against pending Supreme Court constitutionality actions (ADI, ADC, ADPF).

### Step 3: Precedent & Jurisprudence Search
Target specialized court databases directly:
- **STF / STJ:** Search themes and leading cases:
  `site:stf.jus.br/jurisprudencia "Tema de Repercussão Geral"`
  `site:stj.jus.br/jurisprudencia "Tema Repetitivo"`
- **TJTO / TRF1:** Search collegiate jurisprudence:
  `site:tjto.jus.br/jurisprudencia "Acórdão" "<descriptor>"`
- Ensure each quoted judgment includes: Court, Collegiate Body, Rapporteur (*Relator/a*), Process Number, and Date of Judgment / Publication.

### Step 4: Binding Force & Distinguishing Audit
Analyze whether the precedent applies to the target scenario:
- **Binding vs Persuasive:** Distinguish clearly between binding mechanisms (CPC/2015, art. 927) and persuasive precedents.
- **Distinguishing Check:** Identify if factual particularities differentiate the present case from the leading case.
- **Overruling Check:** Verify if the court has revised its thesis (*superação de entendimento*).

### Step 5: Mandatory ARS Strict Audit
Run the automated reference validation:
```bash
node scripts/deslop-bridge.mjs verify --file legal-memo.md --strict
```
Ensure all CNJ process numbers pass Modulo 97-10 check digit math, and all quoted legislative articles link directly to Planalto or LexML.

### Step 6: Structured Legal Memorandum Assembly
Deliver the legal assessment in standard juridical format:
- **Ementa / Síntese Jurídica:** Concise headnote defining topic and thesis.
- **Dispositivos Legais Aplicáveis:** Normative hierarchy of statutes currently in force.
- **Quadro Jurisprudencial:** Comparative table of leading precedents (Court, Theme, Rapporteur, Polarity).
- **Análise Técnico-Jurídica:** Application of norms to facts, distinguishing, and potential litigation risks.
- **Conclusão / Recomendações:** Pragmatic course of action grounded in positive law.

---

## 5. Checkable Completion Criteria

- [ ] Every norm assigned to one of the 9 epistemic tiers.
- [ ] 100% adherence to domain whitelist (`*.jus.br`, `*.gov.br`, `lexml.gov.br`); `jusbrasil.com.br/artigos` purged.
- [ ] Statutory text checked for repeal (*revogação expressa/tácita*) on Planalto.
- [ ] Judicial precedents include full CNJ numbering with verified Modulo 97-10 check digits.
- [ ] Distinction between binding (art. 927 CPC) and persuasive precedents preserved.
- [ ] `node scripts/deslop-bridge.mjs verify --strict` executed with zero errors.
