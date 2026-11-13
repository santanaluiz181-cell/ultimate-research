# REPRODUCIBILITY REPORT: TESTE DE CONSISTÊNCIA EM AMBIENTE LIMPO
**Skill:** `ultimate-research` v1.1.0  
**Tema:** Regulação de Bets, Lei 14.790/2023 e ADI 7721/STF  
**Data:** 04 de Novembro de 2026  
**Auditor Principal:** NEXUS OMEGA  

---

## 1. Metodologia do Teste de Reprodutibilidade

Para verificar se a ferramenta produz resultados consistentes ou se depende de estados residuais de memória e cache, foi realizada uma **segunda execução integral e independente** em um processo Node.js limpo (`fresh process`), com esvaziamento de variáveis de ambiente temporárias e sem compartilhamento de instâncias prévias.

### Parâmetros de Comparação entre a Execução 1 e a Execução 2:
1. **Afirmações Extraídas:** Conjunto das 15 afirmações factuais do tema.
2. **Fontes Primárias e Secundárias Mapeadas:** Correspondência documental dos links e atos do DOU.
3. **Classificação das Evidências:** Veredito atribuído (`CONFIRMADA`, `PARCIALMENTE CONFIRMADA`, `NÃO CONFIRMADA`, `CONTRADITA`).
4. **Resolução das Contradições:** Identificação da divergência metodológica no Bolsa Família (BACEN) e da hipérbole da CNC.
5. **Divergências Observadas:** Registro estrito de qualquer discrepância de saída.

---

## 2. Comparativo Detalhado Execução 1 vs. Execução 2

| Afirmação | Veredito (Execução 1) | Veredito (Execução 2) | Concordância de Fontes | Status de Reprodutibilidade |
| :--- | :---: | :---: | :--- | :---: |
| **A01: Bolsa Família R$ 3 bi Pix** | CONFIRMADA (c/ ressalva) | CONFIRMADA (c/ ressalva) | Idêntica (Nota Técnica 513/2024 BACEN) | **100% IDÊNTICA** |
| **A02: CNC Perda R$ 100 bi Varejo** | PARCIALMENTE CONFIRMADA | PARCIALMENTE CONFIRMADA | Idêntica (Estudo Divisão Econômica CNC) | **100% IDÊNTICA** |
| **A03: Outorga R$ 30 mi (Lei 14.790)** | CONFIRMADA | CONFIRMADA | Idêntica (Art. 8º da Lei nº 14.790/2023) | **100% IDÊNTICA** |
| **A04: Alíquota 12% GGR** | CONFIRMADA | CONFIRMADA | Idêntica (Art. 30 da Lei nº 14.790/2023) | **100% IDÊNTICA** |
| **A05: IRPF 15% sobre Prêmio Líquido**| CONFIRMADA | CONFIRMADA | Idêntica (Art. 31 da Lei nº 14.790/2023) | **100% IDÊNTICA** |
| **A06: Criação da SPA (Dec. 11.907)** | CONFIRMADA | CONFIRMADA | Idêntica (Decreto Presidencial nº 11.907) | **100% IDÊNTICA** |
| **A07: Proibição de Cartão de Crédito**| CONFIRMADA | CONFIRMADA | Idêntica (Portaria SPA/MF nº 615/2024) | **100% IDÊNTICA** |
| **A08: Anatel Notificou 2.000+ Sites**| CONFIRMADA | CONFIRMADA | Idêntica (Ofícios SPA/MF e Anatel) | **100% IDÊNTICA** |
| **A09: Conar Anexo X ("18+")** | CONFIRMADA | CONFIRMADA | Idêntica (Anexo X Código Conar) | **100% IDÊNTICA** |
| **A10: Ajuizamento da ADI 7721 (CNC)**| CONFIRMADA | CONFIRMADA | Idêntica (STF Sistema Processual) | **100% IDÊNTICA** |
| **A11: Liminar Fux para Vulneráveis** | CONFIRMADA | CONFIRMADA | Idêntica (Decisão Monocrática 13/11/2024) | **100% IDÊNTICA** |
| **A12: Referendo Plenário STF** | CONFIRMADA | CONFIRMADA | Idêntica (Ata da Sessão Virtual 14/11/2024) | **100% IDÊNTICA** |
| **A13: Modulação de Contas (Dez/2025)**| CONFIRMADA | CONFIRMADA | Idêntica (Despacho Interlocutório Fux) | **100% IDÊNTICA** |
| **A14: Defesa Setorial IBJR / ANJL** | CONFIRMADA (Advocacy) | CONFIRMADA (Advocacy) | Idêntica (Manifestações como Amicus) | **100% IDÊNTICA** |
| **A15: Idec Veto Total Publicidade** | CONFIRMADA (Sociedade) | CONFIRMADA (Sociedade) | Idêntica (Nota Técnica Idec) | **100% IDÊNTICA** |

---

## 3. Análise de Divergências Técnicas no Motor

Embora as conclusões factuais e as fontes primárias tenham sido 100% reprodutíveis na síntese orientada a evidências, a **camada de verificação automatizada via CLI / scripts** apresentou divergências estruturais relevantes quando executada sem intervenção humana:

### Divergência Observada 1: Sensibilidade Sintática de Expressão Regular
* **Na Execução 1:** A entrada `"No julgamento da ADI 7721 perante o STF..."` (sem a partícula ordinal `nº`) não ativou a regex de precedentes judiciais do `EvidenceParser`. O motor considerou a citação como texto livre não formal e emitiu `[FONTE NÃO IDENTIFICADA]`.
* **Na Execução 2:** A entrada `"No julgamento da ADI nº 7721 perante o STF..."` (com a partícula `nº`) foi capturada pelo parser como `type: "judicial_precedent"`.
* **Diagnóstico:** O motor apresenta fragilidade de extração sintática ao exigir pontuação ceremonial rígida para identificar processos de cortes constitucionais.

### Divergência Observada 2: Dependência Crítica de API de Terceiros (LexML)
* **Comportamento na Execução 2:** Uma vez capturada a citação `ADI nº 7721`, o motor despachou uma requisição OpenSearch ao endpoint `lexml.gov.br`. Como o LexML não indexou a distribuição recente dessa ação em JSON com resumo compatível, a função retornou `{ exists: false }`.
* **Efeito no Motor Automatizado:** O motor carimbou a decisão real do STF como `[ALUCINAÇÃO DETECTADA]`.
* **Diagnóstico de Engenharia:** Em uma esteira de produção totalmente autônoma, essa falha provocaria o descarte indevido de fatos jurídicos verdadeiros e comprovados por certidões do STF, evidenciando que a ferramenta não pode operar em ambiente produtivo sem um canal redundante de consulta direta aos tribunais superiores.

---

## 4. Conclusão do Teste de Reprodutibilidade

1. **Reprodutibilidade Semântica e Lógica:** **100% APROVADA.** Os fatos apurados, os números quantitativos, as ressalvas metodológicas e a resolução do contraditório mantiveram-se absolutamente estáveis entre as execuções.
2. **Reprodutibilidade do Parser e Adaptadores:** **COM RESSALVAS.** A ferramenta é vulnerável a variações pontuais de formatação de citações judiciais e a indisponibilidades do LexML Brasil.
