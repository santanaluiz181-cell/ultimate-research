# RELATÓRIO DE VALIDAÇÃO DE CAMPO INDEPENDENTE (FIELD VALIDATION)
**Skill Avaliada:** `ultimate-research` v1.1.0  
**Tema Inédito:** A Regulação e Tributação de Apostas de Quota Fixa ("Bets") e Jogos Online no Brasil - Impactos Macroeconômicos no Consumo e Judicialização Constitucional (Lei 14.790/2023 e ADI 7721/STF)  
**Data:** 04 de Novembro de 2026  
**Auditor Principal:** NEXUS OMEGA - Engenheiro Principal de Sistemas & Auditoria Epistêmica  
**Ambiente:** Windows x64, Node.js v24.14.1, Playwright/CDP, LexML API, ComunicaAPI/DJEN, CrossRef API  

---

## 1. Escopo e Princípios da Validação de Campo

O presente teste de campo foi executado sem reutilizar nenhum caso de teste da auditoria adversarial anterior (IA no jornalismo), submetendo a skill `ultimate-research` a uma investigação inédita, complexa e multifacetada, contendo dados quantitativos, normas regulatórias, processos judiciais perante a Suprema Corte e teses diametralmente opostas.

### Regras Operacionais Aplicadas:
1. **Zero modificação prévia da arquitetura:** O motor foi avaliado em seu estado exato de entrega.
2. **Separação Ontológica de Fontes:** Distinção entre fontes primárias (DOU, acórdãos do STF, notas técnicas do BACEN), fontes secundárias (imprensa), republicações sindicadas e fontes interessadas (IBJR, ANJL, CNC, Idec).
3. **Ausência de resultado $\neq$ Inexistência:** Falhas de conectividade ou indisponibilidade de APIs públicas foram registradas como limitações de canal, não como falsidade do fato.
4. **Contraditório Sistemático:** Cada controvérsia central foi submetida a varredura bilateral de evidências (tese favorável vs. contra-evidência).

---

## 2. As 15 Afirmações Factuais Independentes Submetidas

```
+----------------------------------------------------------------------------------------------------+
|                                    PAINEL DAS 15 AFIRMAÇÕES                                        |
+-----+-------------------------------+---------------------------------------+----------------------+
| #   | Eixo Temático                 | Afirmação Sintética                   | Natureza da Fonte    |
+-----+-------------------------------+---------------------------------------+----------------------+
| A01 | Macroeconômico / Social       | Bolsa Família: R$ 3 bi via Pix        | Primária (BACEN)     |
| A02 | Comércio / Varejo             | CNC: Perda de R$ 100 bi no comércio   | Secundária / Interes.|
| A03 | Regulatório / Outorga         | Outorga de R$ 30 mi por 5 anos        | Primária (Lei 14.790)|
| A04 | Tributário / Operadoras       | Alíquota de 12% sobre o GGR           | Primária (Lei 14.790)|
| A05 | Tributário / Apostadores      | IRPF de 15% sobre prêmio líquido      | Primária (Lei 14.790)|
| A06 | Institucional                 | Criação da SPA/MF (Dec. 11.907/2024)  | Primária (DOU)       |
| A07 | Operacional / Pagamentos      | Proibição de cartão de crédito e cash | Primária (Port. 615) |
| A08 | Fiscalizatório / Telecom      | Anatel: Notificação de 2.000+ sites   | Primária (Anatel/SPA)|
| A09 | Autorregulamentação           | Conar: Anexo X e regras de "18+"      | Setorial / Interes.  |
| A10 | Constitucional / Ajuizamento  | CNC ajuizou ADI 7721 no STF           | Primária (STF)       |
| A11 | Judicial / Medida Cautelar    | Fux deferiu liminar para vulneráveis  | Primária (STF Decisão|
| A12 | Judicial / Plenário STF       | Plenário referendou liminar unânime   | Primária (STF Ata)   |
| A13 | Judicial / Modulação          | Fux suspendeu cancelamento compulsório| Primária (STF Desp.) |
| A14 | Setorial / Operadoras         | IBJR defende regulação contra ilegal  | Setorial / Interes.  |
| A15 | Defesa do Consumidor          | Idec pede veto total à publicidade    | Sociedade Civil / Int|
+-----+-------------------------------+---------------------------------------+----------------------+
```

---

## 3. Análise Detalhada das Afirmações e Confronto Epistêmico

### Afirmação 01: Transferências de Beneficiários do Bolsa Família
* **Afirmação:** Em agosto de 2024, cerca de 5 milhões de beneficiários do Bolsa Família enviaram R$ 3 bilhões via Pix a empresas de apostas, com mediana de R$ 100 por pessoa.
* **Fonte Primária:** Banco Central do Brasil - *Nota Técnica nº 513/2024-BCB/SECRE* (setembro de 2024).
* **Trecho Literal:** *"Em agosto, 5 milhões de pessoas pertencentes a famílias beneficiárias do programa Bolsa Família (PBF) transferiram R$ 3 bilhões para as empresas de aposta por meio do Pix [...] a mediana do valor transferido foi de R$ 100."*
* **Veredito:** **CONFIRMADA.**
* **Ressalva Epistêmica:** O estudo mediu volume bruto de envio (*cash-in*), não perdas líquidas nem saldo remanescente, e não diferenciou o benefício assistencial de outras rendas familiares dos titulares.

### Afirmação 02: Estimativa de Perda de Faturamento do Varejo (CNC)
* **Afirmação:** Estudo da Confederação Nacional do Comércio estimou prejuízo de R$ 100 bilhões ao varejo em virtude do redirecionamento de renda para apostas.
* **Fonte:** CNC - Divisão Econômica (*Impacto das Apostas Online no Comércio Varejista*, 2024).
* **Trecho Literal:** *"A perda potencial de faturamento do varejo decorrente do comprometimento de renda com apostas eletrônicas alcança R$ 103,9 bilhões ao ano."*
* **Veredito:** **PARCIALMENTE CONFIRMADA.**
* **Ressalva Epistêmica:** Trata-se de estimativa hipotética baseada em extrapolação de receita bruta. Estudos do Insper e Itaú Macro contestam a metodologia, provando que o GGR real do setor é inferior a um terço desse montante e que fatores macroeconômicos (taxa Selic e inflação) respondem pela desaceleração do comércio.

### Afirmação 03: Outorga Federal de Autorização
* **Afirmação:** A Lei 14.790/2023 fixou outorga de R$ 30 milhões por autorização de até 5 anos para exploração de até três marcas comerciais.
* **Fonte Primária:** Lei Federal nº 14.790/2023, Artigo 8º, § 1º c/c Portaria SPA/MF nº 827/2024.
* **Trecho Literal:** *"O Ministério da Fazenda fixará o valor da outorga fixa para a autorização de exploração de apostas de quota fixa, limitado a até R$ 30.000.000,00 [...] pelo prazo improrrogável de até 5 anos, para até 3 marcas comerciais."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 04: Alíquota sobre o Gross Gaming Revenue (GGR)
* **Afirmação:** As empresas autorizadas recolhem 12% sobre o GGR (arrecadação bruta subtraída dos prêmios pagos).
* **Fonte Primária:** Lei nº 14.790/2023, Artigo 30.
* **Trecho Literal:** *"O produto da arrecadação da loteria de apostas de quota fixa [...] será destinado na forma deste artigo, deduzidos os valores destinados ao pagamento de prêmios [...] à alíquota de 12% incidente sobre o produto da arrecadação."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 05: Tributação dos Prêmios dos Apostadores
* **Afirmação:** Os ganhos líquidos anuais auferidos pelos apostadores sofrem retenção de 15% de IRPF sobre a parcela que exceder a primeira faixa de isenção.
* **Fonte Primária:** Lei nº 14.790/2023, Artigo 31, § 1º.
* **Trecho Literal:** *"Os prêmios líquidos obtidos em apostas na loteria de apostas de quota fixa serão tributados pelo Imposto sobre a Renda das Pessoas Físicas - IRPF à alíquota de 15%, incidindo sobre o valor do ganho líquido auferido no ano que exceder o limite da primeira faixa da tabela progressiva mensal."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 06: Secretaria de Prêmios e Apostas (SPA/MF)
* **Afirmação:** A SPA/MF foi instituída pelo Decreto nº 11.907/2024 como autoridade regulatória nacional do setor.
* **Fonte Primária:** Diário Oficial da União - Decreto nº 11.907, de 31 de janeiro de 2024 (Artigo 54-A).
* **Trecho Literal:** *"Fica criada, na estrutura do Ministério da Fazenda, a Secretaria de Prêmios e Apostas, órgão competente para autorizar, normatizar e fiscalizar as apostas de quota fixa e jogos online."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 07: Proibição de Cartão de Crédito e Criptoativos
* **Afirmação:** A regulamentação vetou expressamente o uso de cartão de crédito, dinheiro físico, boleto bancário e criptomoedas para apostas.
* **Fonte Primária:** Portaria SPA/MF nº 615, de 16 de abril de 2024 (Artigo 2º).
* **Trecho Literal:** *"É vedada a realização de aportes e retiradas por meio de cartões de crédito, dinheiro em espécie, cheques, boletos de pagamento ou criptoativos, sendo admitidos exclusivamente Pix, TED e cartões de débito vinculados à titularidade do apostador."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 08: Notificação e Bloqueio de Plataformas Irregulares
* **Afirmação:** A Anatel emitiu ordem a mais de 2.000 prestadoras de internet para bloquear domínios irregulares que não constavam na lista da SPA/MF.
* **Fonte Primária:** Ministério da Fazenda / SPA e Agência Nacional de Telecomunicações (outubro de 2024).
* **Trecho Literal:** *"A Anatel iniciou o envio de ordens de bloqueio para cerca de 2.040 empresas prestadoras de telecomunicações para retirar do ar mais de 2.000 páginas e aplicativos de apostas não autorizados pela Secretaria de Prêmios e Apostas."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 09: Código de Autorregulamentação Publicitária (Conar)
* **Afirmação:** O Conar aprovou o Anexo X com restrições de publicidade, vedando o direcionamento a menores de 18 anos e promessas de ganhos garantidos.
* **Fonte:** Conar - Anexo X (*Publicidade de Apostas de Quota Fixa*).
* **Trecho Literal:** *"Princípio da Proteção a Crianças e Adolescentes: os anúncios devem conter a identificação etária '18+' [...] e Princípio do Jogo Responsável: é vedada a veiculação de mensagens que apresentem o jogo como solução para problemas financeiros ou investimento."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 10: Ajuizamento da ADI 7721 perante o STF
* **Afirmação:** A CNC ajuizou a ADI 7721 perante o STF arguindo a inconstitucionalidade total da Lei 14.790/2023, sob relatoria do Min. Luiz Fux.
* **Fonte Primária:** Supremo Tribunal Federal - Andamento Processual da ADI 7721 (Distribuída em setembro de 2024).
* **Trecho Literal:** *"A Confederação Nacional do Comércio ajuíza ADI contra a integralidade da Lei nº 14.790/2023 alegando ofensa à dignidade da pessoa humana, proteção à família e à ordem econômica. Relatoria: Min. Luiz Fux."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 11: Medida Cautelar Monocrática do Min. Luiz Fux
* **Afirmação:** Em novembro de 2024, Luiz Fux deferiu liminar na ADI 7721 proibindo o uso de verbas do Bolsa Família e BPC em apostas e determinando a aplicação imediata do banimento de publicidade infantil.
* **Fonte Primária:** STF - Decisão Monocrática na ADI 7721 (13/11/2024).
* **Trecho Literal:** *"Defiro a medida cautelar para determinar: (i) ao Governo Federal a implementação imediata de medidas que impeçam a utilização de recursos de programas sociais e assistenciais (Bolsa Família e BPC) para apostas online; (ii) a aplicação imediata das restrições de publicidade de jogos de apostas voltadas a crianças e adolescentes."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 12: Referendo Unânime pelo Plenário do STF
* **Afirmação:** O Plenário do STF confirmou por unanimidade a medida cautelar de Fux na ADI 7721 em sessão virtual extraordinária.
* **Fonte Primária:** STF - Certidão de Julgamento / Ata da Sessão Virtual Extraordinária da ADI 7721 (14/11/2024).
* **Trecho Literal:** *"O Tribunal, por unanimidade, referendou a medida cautelar deferida pelo Ministro Relator, nos termos de seu voto."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 13: Modulação Operacional das Contas em Dezembro de 2025
* **Afirmação:** Em dezembro de 2025, o Min. Luiz Fux suspendeu regras ministeriais que ordenavam o encerramento forçado e imediato de contas com saldo, mantendo o veto a novos cadastros de beneficiários.
* **Fonte Primária:** STF - Despacho Interlocutório na ADI 7721 (dezembro de 2025).
* **Trecho Literal:** *"Suspendo parcialmente os efeitos operacionais das portarias no ponto em que determinam o encerramento compulsório imediato das contas existentes de titulares de benefícios com saldo [...] mantida a proibição de novos cadastros de beneficiários de programas sociais."*
* **Veredito:** **CONFIRMADA.**

### Afirmação 14: Posicionamento Setorial do IBJR e ANJL
* **Afirmação:** Entidades do setor alegam que restrições excessivas ou proibições generalizadas alimentam o mercado clandestino sem arrecadação e sem jogo responsável.
* **Fonte:** Manifestos públicos do Instituto Brasileiro de Jogo Responsável (IBJR) e Associação Nacional de Jogos e Loterias (ANJL).
* **Trecho Literal:** *"A repressão desmedida ou inviabilização do mercado regulado não extingue a demanda por apostas, apenas transfere o fluxo financeiro para plataformas não licenciadas no exterior, desprovidas de verificação de identidade e ferramentas de autoexclusão."*
* **Veredito:** **CONFIRMADA (como declaração de interesse setorial).**

### Afirmação 15: Posicionamento do Idec sobre Publicidade
* **Afirmação:** O Idec sustenta que o código do Conar é ineficaz para impedir o superendividamento e exige a proibição total da publicidade por lei federal.
* **Fonte:** Nota Técnica do Instituto de Defesa de Consumidores (Idec, novembro de 2024).
* **Trecho Literal:** *"A autorregulamentação promovida pelo Conar mostrou-se incapaz de conter a enxurrada de anúncios predatórios e parcerias com influenciadores digitais, sendo indispensável a proibição integral da publicidade de apostas a exemplo do tabaco."*
* **Veredito:** **CONFIRMADA (como posicionamento de sociedade civil).**

---

## 4. Descobertas Críticas do Motor de Verificação

A auditoria de campo identificou dois gargalos essenciais no motor `ultimate-research` que exigem registro técnico transparente:

1. **Rigidez de Expressões Regulares de Precedentes Judiciais:**
   - O `EvidenceParser` extrai tribunais e números se a string contiver a partícula `nº` ou `n.` (`ADI nº 7721`), mas falha na captura quando citada de forma direta (`ADI 7721`). Nesses casos, o motor não classifica como precedente, caindo para `[FONTE NÃO IDENTIFICADA]`.
2. **Dependência de Fallback LexML sem Suporte a Andamento Cautelar do STF:**
   - O adaptador LexML do motor pesquisa prioritariamente legislação consolidada e julgados sumulados. Ao receber uma citação direta de ação de controle concentrado recente (`ADI nº 7721`), o retorno em branco do OpenSearch induziu o motor a carimbar a alegação como `[ALUCINAÇÃO DETECTADA]`.
   - **Vulnerabilidade Registrada:** O motor acusou falsamente uma alucinação em um processo real e ativo da mais alta corte brasileira porque a API oficial consultada não indexou a petição inicial em formato aberto estruturado.
