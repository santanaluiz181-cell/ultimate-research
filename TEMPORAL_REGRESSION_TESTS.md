# TEMPORAL REGRESSION TESTS: RESULTADOS E CASOS DE TESTE DO MOTOR DE ATUALIZAÇÃO TEMPORAL
**Skill:** `ultimate-research` v1.1.0  
**Suíte Automatizada:** `tests/temporal-legal.test.mjs`  
**Runner:** Node.js v24.14.1 (`node --test`)  
**Data:** 04 de Novembro de 2026  
**Auditor:** NEXUS OMEGA  

---

## 1. Escopo da Suíte Temporal

A suíte foi concebida para auditar a capacidade do motor de situar normas jurídicas, atos regulatórios e precedentes judiciais no tempo, impedindo que diplomas revogados, suspensos ou superados sejam atestados como vigentes sem as devidas ressalvas.

Cada teste foi estruturado com os 6 campos obrigatórios:
1. **Norma Original**
2. **Redação Considerada**
3. **Data de Referência da Pesquisa**
4. **Alterações Posteriores Relevantes**
5. **Situação Jurídica Identificada**
6. **Fonte Oficial Utilizada**

---

## 2. Detalhamento dos 20 Casos de Teste Executados

| # | Categoria | Declaração Testada | Data de Referência | Situação Jurídica Identificada | Fonte Oficial | Veredito |
| :--- | :--- | :--- | :---: | :--- | :--- | :---: |
| **01** | `LEI_ALTERADA` | Lei nº 14.790/2023 alterada pela MP 1.394/2026 | Nov/2026 | Parcialmente suspensa e modificada pelo regime da MP 1.394 | Diário Oficial da União | **PASSOU** |
| **02** | `MP_VIGENTE` | MP nº 1.394/2026 proibindo bets no país | Nov/2026 | Em vigor com força de lei (art. 62 da CF) | DOU / Presidência da República | **PASSOU** |
| **03** | `DECRETO_REGULAMENTADOR` | Decreto nº 13.128/2026 criando Comitê Interinstitucional | Nov/2026 | Vigente e em execução administrativa | DOU / Presidência da República | **PASSOU** |
| **04** | `REGIME_TRANSITORIO` | MP nº 1.394/2026 prevendo prazo para resgate de saldos | Nov/2026 | Efeitos transitórios vinculantes em curso | DOU / Caixa Econômica Federal | **PASSOU** |
| **05** | `DECISAO_MODULADA` | Cautelar na ADI 7721 modulada em despacho de dez/2025 | Nov/2026 | Cautelar vigente com modulação de execução de contas | STF / DJe | **PASSOU** |
| **06** | `PORTARIA_ORIGINARIA` | Portaria SPA/MF nº 615/2024 proibindo cartão de crédito | Nov/2026 | Vigente no regime regulatório da Fazenda | DOU / Ministério da Fazenda | **PASSOU** |
| **07** | `PORTARIA_PROCEDIMENTO`| Portaria SPA/MF nº 827/2024 fixando outorga de R$ 30 mi | Nov/2026 | Norma regulatória de habilitação anterior à MP | DOU / Ministério da Fazenda | **PASSOU** |
| **08** | `PRECEDENTE_STF_ATIVO` | ADI 7721 em tramitação perante o Ministro Luiz Fux | Nov/2026 | Ação constitucional em tramitação; mérito pendente | STF / Sistema Processual | **PASSOU** |
| **09** | `REFERENDO_PLENARIO` | Referendo unânime da liminar pelo Plenário do STF | Nov/2026 | Acórdão cautelar unânime vinculante | STF / Ata de Sessão Virtual | **PASSOU** |
| **10** | `NOVA_ADI_CONTRA_MP` | ADI 8027 ajuizada contra a MP 1.394/2026 no STF | Nov/2026 | Ação distribuída por prevenção a Fux; sem liminar | STF / Sistema Processual | **PASSOU** |
| **11** | `VIGENCIA_HISTORICA` | Redação original do art. 8º da Lei 14.790 em 2023 | Dez/2023 | Norma válida à época; posteriormente impactada | DOU de 30/12/2023 | **PASSOU** |
| **12** | `NORMA_TRIBUTARIA` | Art. 30 da Lei 14.790 estipulando 12% sobre GGR | Nov/2026 | Alíquota positiva federal do marco legal | DOU / Lei 14.790 | **PASSOU** |
| **13** | `RETENCAO_IRPF` | Art. 31 da Lei 14.790 prevendo 15% de IRPF anual | Nov/2026 | Dispositivo legal de incidência tributária pessoal | DOU / Lei 14.790 | **PASSOU** |
| **14** | `AUTORREGULAMENTACAO` | Anexo X do Conar impondo identificação "18+" | Nov/2026 | Código ético voluntário privado; sem força cogente | Conar / Acervo Ético | **PASSOU** |
| **15** | `ADI_PARTIDO_POLITICO`| ADI 7723 ajuizada pelo Partido Solidariedade no STF | Nov/2026 | Ação em trâmite conjunto com a ADI 7721 | STF / DJe | **PASSOU** |
| **16** | `VACATIO_LEGIS` | Prazo de transição da Lei 14.790 até 31/12/2024 | Jan/2025 | Período de transição pretérito já exaurido | DOU / Portaria 1.475 | **PASSOU** |
| **17** | `MODULACAO_CAUTELAR` | Despacho na ADI nº 7.721/DF suspendendo encerramentos | Dez/2025 | Ato judicial interlocutório modulador vigente | STF / DJe | **PASSOU** |
| **18** | `LEI_ANACRONICA` | Lei nº 99.999/2099 extinguindo o Poder Judiciário | Ano 2099 | Inexistente; anacronismo e numeração forjada | Falso Documento | **PASSOU** |
| **19** | `PRECEDENTE_FORJADO` | ADI 99999 declarando nulidade de todas as leis | Indefinido | Inexistente; ausente dos acervos dos tribunais | Não Localizado / Inexistente | **PASSOU** |
| **20** | `MP_FORJADA` | Medida Provisória nº 99.999/2099 doando reservas | Ano 2099 | Inexistente; numeração e data anacrônicas forjadas | Falso Documento | **PASSOU** |

---

## 3. Logs de Execução dos Testes Automatizados

```
▶ Fase 5: Teste do Motor de Atualização Temporal e Situação Jurídica (20 Casos)
  ✔ Caso #1 [LEI_ALTERADA]: deve processar status temporal corretamente (184.05ms)
  ✔ Caso #2 [MEDIDA_PROVISORIA_VIGENTE]: deve processar status temporal corretamente (9.97ms)
  ✔ Caso #3 [DECRETO_REGULAMENTADOR]: deve processar status temporal corretamente (1.77ms)
  ✔ Caso #4 [REGIME_TRANSITORIO]: deve processar status temporal corretamente (8.65ms)
  ✔ Caso #5 [DECISAO_POSTERIORMENTE_MODULADA]: deve processar status temporal corretamente (1.55ms)
  ✔ Caso #6 [PORTARIA_ORIGINARIA]: deve processar status temporal corretamente (6.72ms)
  ✔ Caso #7 [PORTARIA_PROCEDIMENTO]: deve processar status temporal corretamente (1.23ms)
  ✔ Caso #8 [PRECEDENTE_STF_ATIVO]: deve processar status temporal corretamente (1.32ms)
  ✔ Caso #9 [REFERENDO_PLENARIO_STF]: deve processar status temporal corretamente (1.02ms)
  ✔ Caso #10 [NOVA_ADI_CONTRA_MP]: deve processar status temporal corretamente (1.28ms)
  ✔ Caso #11 [VIGENCIA_HISTORICA]: deve processar status temporal corretamente (1.63ms)
  ✔ Caso #12 [NORMA_TRIBUTARIA]: deve processar status temporal corretamente (2.44ms)
  ✔ Caso #13 [RETENCAO_IRPF]: deve processar status temporal corretamente (0.65ms)
  ✔ Caso #14 [AUTORREGULAMENTACAO]: deve processar status temporal corretamente (0.17ms)
  ✔ Caso #15 [ADI_PARTIDO_POLITICO]: deve processar status temporal corretamente (0.75ms)
  ✔ Caso #16 [VACATIO_LEGIS]: deve processar status temporal corretamente (0.55ms)
  ✔ Caso #17 [MODULACAO_CAUTELAR]: deve processar status temporal corretamente (0.78ms)
  ✔ Caso #18 [LEI_ANACRONICA_FALSA]: deve processar status temporal corretamente (0.27ms)
  ✔ Caso #19 [PRECEDENTE_FORJADO_FALSO]: deve processar status temporal corretamente (431.77ms)
  ✔ Caso #20 [MP_FORJADA_FALSA]: deve processar status temporal corretamente (1.16ms)
✔ Fase 5: Teste do Motor de Atualização Temporal e Situação Jurídica (20 Casos) (661.66ms)
ℹ tests 20 | suites 1 | pass 20 | fail 0 | cancelled 0 | skipped 0 | todo 0
```
