# Protocolo Determinístico de Verificação de Citações e Auditoria ARS (`citation-verification`)

**Fase Operacional:** Fase 8 - Auditoria Epistêmica e Certificação ARS (Automated Reference Sanity)  
**Motor Determinístico:** Super Deslop ARS Engine (`node "c:/Users/tharcio/Downloads/DESLOP SEARCH SKILL/dist/cli.js" verify`)  
**Padrão de Integridade:** Tolerância Zero para Alucinações de Referência  

---

## 1. O Protocolo de Auditoria Epistêmica (Phase 8 Epistemic Audit)

A auditoria epistêmica é o portão de controle que impede que um relatório de pesquisa seja entregue com referências forjadas, truncadas, desatualizadas ou semanticamente desconexas da alegação.

O comando de execução local do ARS processa o documento diretamente:
```bash
node "c:/Users/tharcio/Downloads/DESLOP SEARCH SKILL/dist/cli.js" verify --file "relatorio.md" --strict --json
```

O analisador varre o texto extraindo todas as âncoras bibliográficas, links, DOIs, ISBNs e números de processo, submetendo cada elemento aos validadores determinísticos formais.

---

## 2. Validadores Determinísticos por Categoria

### 2.1 Identificadores de Objetos Digitais (DOIs)
A verificação de papers científicos segue uma rotina de duas camadas via APIs REST públicas:
1. **CrossRef REST API (Camada Primária):**
   - Requisição: `GET https://api.crossref.org/works/{doi}`
   - Extrai: `title`, `author[0].family`, `issued.date-parts[0][0]`, `container-title`.
   - Regra de Validação: O primeiro autor e o ano devem coincidir rigorosamente com a citação do relatório.
2. **OpenAlex API (Camada de Fallback):**
   - Requisição: `GET https://api.openalex.org/works/https://doi.org/{doi}`
   - Utilizada quando o registro CrossRef não contiver o abstract indexado ou apresentar atraso de indexação.
   - Extrai o resumo e confirma se os conceitos centrais da alegação estão presentes no texto.

### 2.2 Livros e Monografias (Padrão Internacional ISBN)
A integridade de um ISBN é aferida matematicamente através de seus algoritmos canônicos de soma ponderada:

- **ISBN-10 (Módulo 11):**
  $$\sum_{i=1}^{10} (11 - i) \times x_i \equiv 0 \pmod{11}$$
  Onde o décimo caractere $x_{10}$ pode ser um dígito de 0 a 9 ou a letra 'X' representando o valor 10.
- **ISBN-13 (Módulo 10):**
  $$\left( \sum_{i=1}^{12} x_i \times (1 \text{ se } i \text{ ímpar, } 3 \text{ se } i \text{ par}) + x_{13} \right) \equiv 0 \pmod{10}$$

Caso o cálculo do dígito verificador resulte em discrepância matemática, a citação é classificada imediatamente como erro estrutural.

### 2.3 Numeração Única de Processos Judiciais (Padrão CNJ - Resolução 65/2008)
Todo número processual no Poder Judiciário brasileiro possui 20 dígitos estruturados no formato:  
`NNNNNNN-DD.AAAA.J.TR.OOOO`
- `NNNNNNN`: Número sequencial anual por unidade de origem (7 dígitos)
- `DD`: Dígito verificador calculado via ISO 7064 Módulo 97-10 (2 dígitos)
- `AAAA`: Ano de ajuizamento do processo (4 dígitos)
- `J`: Órgão da Justiça (1 dígito; ex: `8` para Justiça Estadual)
- `TR`: Tribunal ou Região (2 dígitos; ex: `22` para o Tribunal de Justiça do Tocantins - TJTO)
- `OOOO`: Unidade de origem / comarca (4 dígitos)

**Cálculo Algorítmico do Dígito Verificador:**
1. Monta-se o bloco preliminar: $P = \text{NNNNNNN} \times 10^7 + \text{AAAA} \times 10^3 + \text{J} \times 10^2 + \text{TR}$
2. Calcula-se o resto da divisão de $P$ por 97: $R_1 = P \pmod{97}$
3. Monta-se o bloco final incorporando a unidade e dois zeros: $S = R_1 \times 10^6 + \text{OOOO} \times 10^2$
4. Calcula-se o resto final: $R_2 = S \pmod{97}$
5. O dígito verificador calculado é: $\text{DD} = 98 - R_2$

Se os dois dígitos verificadores do documento divergirem do valor calculado, o processo é flagged como inexistente ou forjado.

### 2.4 Validação de Legislação e Precedentes (LexML Brasil)
A conferência de diplomas legais, medidas provisórias e súmulas vinculantes consulta os nós XML da rede LexML:
- Validação da URN Canônica (ex: `urn:lex:br:federal:lei:2015-03-16;13105` para o CPC).
- Confronto de vigência temporal: confirmação se o dispositivo citado estava em vigor na data do fato narrado.

---

## 3. Matriz de Acarretamento Semântico e Detecção de Polaridade (Claim-to-Source Entailment)

A mera conferência da existência material de um documento não atesta a veracidade da citação. O Ultimate Research exige a verificação de **Acarretamento Semântico Direto (Direct Entailment)**.

```
                  ┌─────────────────────────────────────────┐
                  │    O documento / URL existe de fato?    │
                  └────────────────────┬────────────────────┘
                                       │
                       ┌───────────────┴───────────────┐
                       │ NÃO                           │ SIM
                       ▼                               ▼
       ┌───────────────────────────────┐ ┌───────────────────────────────┐
       │     [ALUCINAÇÃO DETECTADA]    │ │ O trecho sustenta a alegação? │
       │ Referência forjada / fantasma │ └───────────────┬───────────────┘
       └───────────────────────────────┘                 │
                                 ┌───────────────────────┴───────────────────────┐
                                 │ SIM                                           │ NÃO
                                 ▼                                               ▼
                 ┌───────────────────────────────┐               ┌───────────────────────────────┐
                 │         [VERIFICADA]          │               │ O trecho aborda a mesma tese? │
                 │ Entailment Direto Comprovado  │               └───────────────┬───────────────┘
                 └───────────────────────────────┘                               │
                                                   ┌─────────────────────────────┴─────────────────────────────┐
                                                   │ SIM (Sentido Oposto)                                      │ NÃO (Tema Distinto)
                                                   ▼                                                           ▼
                                   ┌───────────────────────────────┐                           ┌───────────────────────────────┐
                                   │     [DIVERGÊNCIA DE TESE]     │                           │     [EXISTÊNCIA CONFIRMADA    │
                                   │ Fonte sustenta corrente oposta│                           │        SEM ENTAILMENT]        │
                                   └───────────────────────────────┘                           └───────────────────────────────┘
```

### 3.1 Definições Operacionais dos 4 Status Canônicos

1. **`[VERIFICADA]`**
   - **Condição:** A fonte foi localizada, está íntegra e contém trecho literal que acarreta necessária e diretamente a premissa sustentada pelo relatório.
   - **Regra:** NUNCA emitir `[VERIFICADA]` se apenas a URL ou existência física do livro foi testada.

2. **`[DIVERGÊNCIA DE TESE]`**
   - **Condição:** A fonte citada existe e trata exatamente da matéria, porém o autor/tribunal conclui em sentido oposto ou restritivo à alegação feita no relatório.
   - **Ação:** O texto deve ser reformulado para expor a divergência doutrinária ou jurisprudencial.

3. **`[EXISTÊNCIA CONFIRMADA SEM ENTAILMENT]`**
   - **Condição:** O link é válido, a página carrega `200 OK`, ou o livro/artigo existe fisicamente na biblioteca, mas a passagem citada não aborda, nem direta nem indiretamente, o dado atribuído a ela.
   - **Ação:** Alerta amarelo. Proibido manter a citação como fundamentação do argumento.

4. **`[ALUCINAÇÃO DETECTADA]`**
   - **Condição:** O número de processo falha no teste Módulo 97, o DOI não existe no CrossRef/OpenAlex, a lei é inexistente no acervo da União/Estado, ou o trecho citado foi comprovadamente fabricado pelo modelo.
   - **Ação:** Bloqueio imediato do relatório. O arquivo não pode ser assinado ou entregue até o expurgo total da alucinação.

---

## 4. O Checklist Pré-Liberação ARS (Pre-Release Gate)

Antes de aprovar o `UR-REPORT` final:
- [ ] 100% das referências possuem identificador permanente canônico ou URL acessível.
- [ ] 0 referências marcadas como `[ALUCINAÇÃO DETECTADA]`.
- [ ] Todas as citações isoladas estão explicitamente marcadas com `[single-source]`.
- [ ] Divergências de tese estão documentadas na seção de Perspectivas Conflitantes.
- [ ] A taxa de acarretamento semântico (`Entailment Rate`) atende ao limite mínimo exigido pelo modo operacional ativo.
