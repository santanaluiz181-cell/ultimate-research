# Sistema Avançado de Pesquisa Temporal e Resolução de Anacronismos (`temporal-research`)

**Versão da Arquitetura:** Sistema de 3 Trilhas Temporais (3-Lane Temporal Research Framework)  
**Objetivo:** Eliminação de anacronismos, conciliação de versões de software, controle de vigência normativa e cálculo de corte dinâmico  

---

## 1. O Sistema de 3 Trilhas Temporais (3-Lane Temporal System)

Toda investigação de alto nível envolve documentos originados em momentos temporais distintos. Tratar todo o acervo indexado da internet como um plano contínuo e homogêneo gera alucinações anacrônicas. O Ultimate Research particiona a investigação em três trilhas com finalidades epistêmicas complementares:

```
┌────────────────────────────────────────────────────────────────────────┐
│ LANE A: HISTÓRICO & CANÔNICO (Fundamentos e Princípios Perenes)        │
│ Janela: Origem conceitual até a véspera da ruptura ou versão anterior  │
│ Foco: RFCs, artigos fundamentais de algoritmos, teses doutrinárias     │
│ clássicas, jurisprudência histórica consolidada, arquitetura base.     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Confronto & Transição
┌───────────────────────────────────▼────────────────────────────────────┐
│ LANE B: CONTEMPORÂNEO & VIGENTE (O Estado da Arte Imediato)            │
│ Janela: Da data de corte dinâmico até o presente imediato               │
│ Foco: Versões correntes de código, pull requests recentes, acórdãos    │
│ do último biênio, regulamentações ativas, breaking changes.            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Verificação de Eficácia
┌───────────────────────────────────▼────────────────────────────────────┐
│ LANE C: VALIDAÇÃO OFICIAL & DIÁRIO OFICIAL (Segurança Jurídica)        │
│ Janela: Publicação em órgãos oficiais e repositórios de homologação    │
│ Foco: Diário Oficial da União (DOU), Diário de Justiça (DJEN / DOE),   │
│ branches de release tag e erratas formais do comitê mantenedor.        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. A Regra do Marco Temporal Dinâmico (Dynamic Cutoff Rule)

> **PROIBIÇÃO MANDATÓRIA:** É estritamente vedado aplicar filtros temporais genéricos ou arbitrários pré-concebidos (como `before:2023` ou `last year`) sem uma justificativa técnica vinculada à dinâmica de evolução do objeto pesquisado.

### 2.1 Critérios para Fixação da Data de Corte Dinâmico
A data de corte (`Cutoff Date`) deve ser calculada a partir de eventos objetivos de ruptura no domínio investigado:

1. **Ruptura Tecnológica / Versão Maior (Major Release):**  
   *Exemplo:* No ecossistema React, a liberação da versão 19 em dezembro de 2024 torna grande parte da documentação sobre hooks legados obsoleta. O marco temporal dinâmico da Lane B deve ser fixado em `2024-12-05`.
2. **Reforma Legislativa ou Precedente Vinculante:**  
   *Exemplo:* No Direito Administrativo brasileiro, a Nova Lei de Licitações (Lei 14.133/2021) encerrou o período de transição da Lei 8.666/1993 em `2023-12-30`. Qualquer pesquisa sobre contratação direta hoje deve fixar o corte em `2023-12-30` com justificativa expressa.
3. **Fatos de Mercado ou Geopolíticos:**  
   *Exemplo:* Fusão de empresas, sanções econômicas ou desabastecimento de infraestrutura global (corte na data do fato gerador).

### 2.2 Requisito de Justificativa Documentada
No `UR-PLAN` e no `UR-REPORT`, a seção de Temporalidade deve conter obrigatoriamente:
- **Data de Corte Exata:** `AAAA-MM-DD`
- **Evento Fático Motivador:** O acontecimento histórico, release ou provimento que determinou a escolha.
- **Risco de Anacronismo Identificado:** Quais práticas anteriores se tornaram incorretas após esse marco.

---

## 3. Matriz de Conflito Diferencial e Resolução de Anacronismos

Quando a literatura recuperada contiver alegações divergentes entre Lane A e Lane B, o orquestrador deve aplicar a seguinte matriz de classificação e resolução:

| Tipo de Deslocamento Temporal | Sintoma no Documento | Diagnóstico Epistêmico | Resolução Mandatória no Relatório |
|---|---|---|---|
| **Mudança de Versão (Version Shift)** | O método `oldFunction()` foi removido ou gera warning na v3.x | Depreciação ou quebra de retrocompatibilidade | Documentar a transição: Lane A como histórica, Lane B como a implementação correta atual. |
| **Revogação Normativa (Regulatory Shift)** | Dispositivo de provimento ou lei foi expressamente revogado | Perda de vigência jurídica | Registrar a revogação; vedado aplicar a norma anterior a fatos ocorridos pós-vigência. |
| **Atualização Fática de Dados (Factual Update)** | Censo anterior indicava 100k habitantes; novo censo indica 130k | Superação temporal de métrica | Prevalece o dado estatístico mais recente do órgão primário oficial (IBGE). |
| **Anacronismo Invertido** | Documento recente cita doutrina antiga como se fosse nova | Confusão de linhagem temporal | Restabelecer a cronologia correta: o conceito nasceu na Lane A, o autor recente apenas o reaplicou. |
| **Fundamento Perene vs. Conselho Obsoleto** | O princípio ACID de banco de dados vs. ajuste de flag do MySQL 5.5 | Dissociação entre teoria e implementação prática | Preservar o princípio conceitual; expurgar o comando de configuração defasado. |

---

## 4. Dorks Cirúrgicos por Trilha Temporal

### 4.1 Dorks para a Lane A (Histórico / Fundamentos)
- Mapeamento de RFCs originais:  
  `site:ietf.org rfc "HTTP/2" "framing layer" before:2018`
- Jurisprudência de uniformização originária:  
  `site:stj.jus.br "recurso repetitivo" "tema" "acórdão" 2012..2018`

### 4.2 Dorks para a Lane B (Contemporâneo / Vigente)
- Documentação de release oficial e breaking changes:  
  `site:github.com "release notes" "breaking changes" after:2024-06-01`
- Precedentes judiciais do biênio recente:  
  `site:tjto.jus.br "acórdão" "câmara cível" after:2024-01-01`

### 4.3 Dorks para a Lane C (Validação Oficial / Eficácia)
- Atos normativos e decretos executivos:  
  `site:in.gov.br "diário oficial da união" "resolução" after:2025-01-01`
- Diário de Justiça Eletrônico do Tocantins:  
  `site:tjto.jus.br "diário da justiça" "portaria" "presidência" after:2025-01-01`

---

## 5. Protocolo de Bloqueio de Anacronismos no Relatório Final

Antes da emissão do relatório de síntese, o orquestrador submete o texto às três verificações de segurança temporal:
1. **O teste da contemporaneidade do código:** Os snippets fornecidos rodam na versão estável atual sem avisos de depreciação?
2. **O teste da vigência da norma:** A lei, artigo ou resolução citada ainda está em vigor, ou foi alterada/revogada por diploma superveniente?
3. **O teste do estado de fato:** Se uma pessoa foi identificada com um cargo institucional (ex: "o atual Presidente do Tribunal"), a nomeação permanece válida na data da pesquisa?
