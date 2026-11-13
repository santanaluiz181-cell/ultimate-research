# Padrões Epistêmicos de Síntese e Redação de Relatórios (`report-standards`)

**Fase do Pipeline:** Fase 10 - Síntese e Redação Final de Relatórios (`UR-REPORT`)  
**Padrão Redacional:** Engenharia Pragmática, Rigor Judiciário e Densidade de Informação  
**Diretiva Central:** Fidelidade Epistêmica, Rastreabilidade Total de Afirmações e Proibição de Prosa Genérica de IA  

---

## 1. A Tipologia Epistêmica Quinquipartite de Afirmações

Todo relatório produzido pelo Ultimate Research deve classificar e tratar formalmente cada afirmação textual conforme uma das cinco categorias epistemológicas abaixo. É expressamente proibido mesclar fato empírico com opinião doutrinária ou suposição indutiva.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. FATO OBSERVADO                                                      │
│ Definição: Evento mensurável, telemetria de log, texto de lei vigente, │
│ transação em blockchain, resultado de teste empírico ou registro de DJ.│
│ Redação: Direta e denotativa ("O teste acusou 350ms de latência").     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ 2. ALEGAÇÃO ATRIBUÍDA                                                  │
│ Definição: Declaração de terceiro, porta-voz, réu, assessoria ou post. │
│ Redação: Exige atribuição explícita ("Conforme declarado pelo Diretor  │
│ de TI em entrevista à Revista X, o sistema foi restabelecido às 14h"). │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ 3. OPINIÃO TÉCNICA OU JURÍDICA                                         │
│ Definição: Juízo de valor de especialista, parecer doutrinário, artigo │
│ de análise conjuntural ou tese acadêmica isolada.                      │
│ Redação: Registrada como interpretação ("Segundo a doutrina de Y, a    │
│ responsabilidade civil nesse cenário possui natureza objetiva").       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ 4. HIPÓTESE TÉCNICA                                                    │
│ Definição: Suposição com base indutiva formulada para explicar uma     │
│ falha ou comportamento anômalo, pendente de teste de bancada.          │
│ Redação: Condicional ("A hipótese mais provável para o crash é o esgo- │
│ tamento do pool de conexões do PostgreSQL durante a janela de pico").  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ 5. PROJEÇÃO DE MERCADO OU CENÁRIO                                      │
│ Definição: Estimativa probabilística futura, modelagem econométrica ou │
│ previsão de crescimento de tráfego/vendas.                             │
│ Redação: Delimitada por premissas ("Sob a premissa de taxa SELIC a 10%,│
│ o modelo prospectivo estima aumento de 12% nos custos operacionais").  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Rastreabilidade Estrita e Citações Inline

Nenhuma afirmação factual substancial pode figurar no relatório sem sua devida âncora de rastreabilidade:

### 2.1 Padrão de Vínculo Duplo
Cada alegação fática deve carregar:
1. Uma **nota de rodapé numérica sequencial** `[^N]` remetendo à lista formal de referências bibliográficas do final do relatório.
2. Uma **etiqueta de evidência** `[EV-XXX]` vinculando a frase diretamente à ficha técnica da Matriz de Evidências (`UR-EVMAT`).

*Exemplo de Aplicação Prática:*
> "A jurisprudência da 1ª Câmara Cível do TJTO firmou a inexigibilidade da tarifa de cadastro em contratos celebrados após a publicação da Resolução CMN nº 3.919/2010 `[^1]` `[EV-001]`. Em contrapartida, levantamento empírico aponta que 34% das contestações de 2024 ainda foram julgadas procedentes em sede monocrática `[^2]` `[EV-002]` `[single-source]`."

### 2.2 Tratamento Obrigatório de Fontes Únicas (`[single-source]`)
Se uma afirmação repousar sobre um único documento ou informante, a etiqueta `[single-source]` deve constar ao lado da citação. Isso adverte o leitor de que a informação não pôde ser triangulada com fontes externas independentes.

---

## 3. Preservação de Dissidências e Contradições (Dissent Preservation)

Modelos generativos convencionais sofrem da falha de "harmonia forçada", na qual tentam conciliar opiniões irreconciliáveis ou suavizar acórdãos divergentes para entregar uma conclusão artificialmente pacífica.

O Ultimate Research adota a **Preservação de Dissidência**:
- Se houver divergência entre duas fontes respeitáveis de Tier 1 ou 2, o relatório DEVE conter uma seção explícita dedicada às **Perspectivas Conflitantes**.
- As duas correntes devem ser apresentadas com suas respectivas fundamentações, nomes dos autores, bases normativas e limites de aplicação.
- É vedado ao agente escolher arbitrariamente uma corrente e ocultar a outra.

---

## 4. O Princípio das Conclusões Proporcionais

A força das recomendações ou conclusões de um relatório deve ser estritamente proporcional à solidez e ao Tier da evidência documental disponível:

| Nível de Respaldo Comprovado | Força Máxima da Proposição Permitida no Relatório |
|---|---|
| **Tier 1 Triangulado (2+ bases independentes)** | Conclusão assertiva definitiva ("Fato comprovado; recomenda-se a aplicação imediata"). |
| **Tier 1 de Fonte Única (`[single-source]`)** | Conclusão assertiva qualificada com ressalva de origem institucional. |
| **Tier 2 (Periódicos ou Doutrina Consagrada)** | Conclusão fundamentada com margem para correntes alternativas. |
| **Tier 3 (Relatos Comunitários / Issues)** | Recomendação condicional ou diagnóstico operacional preventivo. |
| **Tier 4 ou Dados Insuficientes** | Declaração expressa de **`INSUFFICIENT EVIDENCE`**; proibição de tomar decisão com base nesses dados. |

---

## 5. Os 6 Vereditos Canônicos no Modo Fact-Checking

Quando o relatório estiver operando sob o **MODE 8: FACT-CHECKING**, o orquestrador é terminantemente proibido de utilizar classificações informais ou adjetivos coloquiais (ex: "meia verdade", "fake news grosseira", "mentira deslavada"). Apenas os 6 vereditos canônicos são aceitos:

1. **`CONFIRMADO`**: A alegação é factual, precisa, completa e comprovada documentalmente por fontes primárias de Tier 1.
2. **`PARCIALMENTE CONFIRMADO`**: O cerne da afirmação é verdadeiro, porém detalhes periféricos (valores, datas exatas ou escopo geográfico) apresentam discrepâncias menores que não anulam a tese principal.
3. **`ENGANOSO`**: Dados verdadeiros foram pinçados fora de contexto temporal ou estrutural para induzir o interlocutor a uma conclusão distorcida da realidade.
4. **`FALSO`**: A alegação contradiz diretamente os registros oficiais consolidados, as leis da física, os documentos originais arquivados ou inventa um fato que comprovadamente não ocorreu.
5. **`NÃO COMPROVADO`**: Não existem registros públicos, dados abertos ou provas materiais suficientes para atestar se a alegação é verdadeira ou falsa.  
   > *Regra Epistêmica Vital:* **Ausência de evidência não é evidência de ausência.** Nunca classifique uma alegação como `FALSO` simplesmente porque você não encontrou a fonte. O rótulo correto é `NÃO COMPROVADO`.
6. **`INCONCLUSIVO`**: Existem dados primários oficiais ou estudos acadêmicos rigorosos que apontam em direções frontalmente opostas com metodologias igualmente válidas, impossibilitando um veredito definitivo.

---

## 6. Higiene Redacional Anti-Slop

O relatório final é um artefato de trabalho para engenheiros seniores, magistrados e analistas de inteligência. A redação deve obedecer às seguintes diretrizes de estilo:
- **Zero Jargão Oco de IA:** Proibido o uso de clichês como "na era digital", "tapeçaria rica de nuances", "é importante destacar", "aprofundar a reflexão", "uma jornada transformadora", "em última análise".
- **Frases Curtas e Assertivas:** Priorizar orações na ordem direta (Sujeito - Verbo - Complemento).
- **Dados Numéricos Precisos:** Sempre acompanhar percentuais dos valores absolutos de referência (ex: "redução de 15% (de 1.200 para 1.020 requisições)").
- **Identificadores Literais Invioláveis:** Códigos de erro, classes, comandos de terminal, números de leis e URLs canônicas NUNCA devem ser alterados ou resumidos.
