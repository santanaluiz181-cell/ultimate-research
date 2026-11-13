# Arquitetura Elephant-Goldfish (`elephant-goldfish-architecture`)

**Fase Operacional:** Fase 8 / Fase 9 - Auditoria Adversarial Cega de Entailment e Estresse de Premissas  
**Origem Metodológica:** Google Open Source (`google/elephant-goldfish-model`)  
**Padrão de Integridade:** Expurgo Radical de Viés de Confirmação (Zero Context Handoff)

---

## 1. O Problema da Auto-Aprovação em Modelos de Linguagem
Quando um mesmo modelo de IA redige um documento, plano ou código e é questionado em seguida se o material possui falhas, ele tende a defender suas próprias premissas devido ao viés de coerência induzido pelo histórico de contexto da conversa.

O modelo **Elephant-Goldfish** resolve essa cegueira dividindo a cognição em dois papéis assimétricos e isolados:

```
[Contexto / Demanda / Autos do Processo]
                  │
                  ▼
┌───────────────────────────────────────────────┐
│              AGENTE ELEFANTE                  │  Memória Total (Contexto 100%)
│         (Queen Orchestrator / Pro)            │  Gera Plano, Código ou Minuta
└───────────────────────┬───────────────────────┘
                        │
                        ▼ [Corte Sanitário de Contexto: Extrai APENAS o produto nu]
┌───────────────────────────────────────────────┐
│               CARDUME GOLDFISH                │  Contexto Zero (Fresh Eyes / flash_lite)
│      (3 a 5 Subagentes Leves Descartáveis)    │  Atuam como Auditores / Desafiantes
└───────────────────────┬───────────────────────┘
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
[Goldfish 1:       [Goldfish 2:     [Goldfish 3:
 Riscos e Bordas]   Nulidades/Leis]  Inimigo da Ideia]
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             SCORECARD ADVERSARIAL             │  Só avança para entrega se passar
│             DO CARDUME GOLDFISH               │  ileso pela banca cega
└───────────────────────────────────────────────┘
```

---

## 2. Protocolo de Handoff Cego (Sanitização)

1. **Geração pelo Elefante (Queen):** O orquestrador sintetiza os dados das fontes primárias e redige a minuta ou artefato.
2. **Isolamento Estrito:** O orquestrador purga 100% dos logs de busca, transcrições e conversas anteriores, extraindo unicamente o texto ou código final.
3. **Invocação dos Goldfish:** Despacha 3 subagentes leves (`invoke_subagent` com `Model: "flash_lite"`):
   - **Goldfish 1 (Bordas e Nulos):** Busca furos de edge cases, divisões por zero, parâmetros vazios e inconsistências cronológicas.
   - **Goldfish 2 (Nulidades e Leis):** Checa se as normas invocadas estão revogadas, se a decisão judicial citada foi modulada ou se há precedente vinculante em sentido oposto.
   - **Goldfish 3 (Inimigo da Tese):** Ataca as premissas de negócio ou jornalísticas, buscando a contra-evidência mais forte.
4. **Comando de Ativação do Goldfish:**
   > *"Você não conhece o autor e não viu o chat. Aponte 3 falhas fatais, 2 brechas de segurança/nulidade e 1 premissa arbitrária neste documento. Proibido elogiar."*

---

## 3. Critério de Convergência do Cardume
- **Aprovado:** Zero falhas críticas apontadas pelos 3 Goldfish $\rightarrow$ Segue para entrega final ou assinatura.
- **Reprovado com Apontamentos:** O orquestrador Elefante recebe o relatório de furos, corrige as premissas e reenvia para novo ciclo rápido de teste cego.
