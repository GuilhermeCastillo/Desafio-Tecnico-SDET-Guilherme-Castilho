# RELATÓRIO DE EXECUÇÃO - Festival dos Pássaros

## Desafio Técnico SDET: Guilherme Castilho

---

### 1. RESUMO EXECUTIVO

| Métrica                   | Resultado |
| -------------------------- | --------- |
| Total de testes executados | 20        |
| Testes bem-sucedidos       | 17        |
| Testes com falha           | 3         |
| Taxa de sucesso            | 0,85      |

**Status Geral:** ✅ **SUCESSO PARCIAL**

### 2. RESULTADOS DETALHADOS POR CATEGORIA

#### Buffs Temporários (6 testes)

##### attack-test.spec.js

**Objetivo:** Validar a aplicação correta do buff temporário de +10 em Attack durante o início do festival.

**Cenário Testado:**

- Pokemon criado com stats base
- Festival iniciado via API
- Verificação do aumento de Attack

**Fluxo do Teste:**

1. Criar pokémon com Attack conhecido
2. Registrar valor original do Attack
3. Executar operação de start do festival
4. Validar que Attack aumentou exatamente +10

**Critério de Sucesso:**

- Attack final = Attack original + 10

##### attack-removal-test.spec.jsstamina-test.spec.js

**Objetivo:** Validar a remoção correta do buff temporário de Attack após o encerramento do festival.

**Cenário Testado:**

- Ciclo completo: estado original → festival ativo → festival encerrado
- Verificação da remoção do buff de +10 em Attack

**Fluxo do Teste:**

1. Criar pokémon com Attack conhecido
2. Iniciar festival (aplica buff +10)
3. Encerrar festival (deve remover buff)
4. Validar que Attack retornou ao valor original

**Critério de Sucesso:**

- Attack final = Attack original (buff completamente removido)

##### defense-test.spec.js

**Objetivo:** Validar a aplicação correta do buff temporário de +10 em Defense durante o início do festival.

**Cenário Testado:**

- Pokemon criado com stats base
- Festival iniciado via API
- Verificação do aumento de Defense

**Fluxo do Teste:**

1. Criar pokémon com Defense conhecido
2. Registrar valor original da Defense
3. Executar operação de start do festival
4. Validar que Defense aumentou exatamente +10

**Critério de Sucesso:**

- Defense final = Defense original + 10

##### defense-removal-test.spec.js

**Objetivo:** Validar a remoção correta do buff temporário de Defense após o encerramento do festival.

**Cenário Testado:**

- Ciclo completo do festival com foco na Defense
- Verificação da remoção do buff de +10

**Fluxo do Teste:**

1. Criar pokémon com Defense conhecido
2. Executar ciclo completo do festival (start → end)
3. Validar que Defense retornou ao valor original

**Critério de Sucesso:**

- Defense final = Defense original

##### stamina-test.spec.js

**Objetivo:** Validar a aplicação correta do buff temporário de +10 em Stamina durante o início do festival.

**Cenário Testado:**

- Pokemon criado com stats base
- Festival iniciado via API
- Verificação do aumento de Stamina

**Fluxo do Teste:**

1. Criar pokémon com Stamina conhecido
2. Registrar valor original da Stamina
3. Executar operação de start do festival
4. Validar que Stamina aumentou exatamente +10

**Critério de Sucesso:**

- Stamina final = Stamina original + 10

##### stamina-removal-test.spec.js

**Objetivo:** Validar a remoção correta do buff temporário de Stamina após o encerramento do festival.

**Cenário Testado:**

- Ciclo completo do festival com foco na Stamina
- Verificação da remoção do buff de +10

**Fluxo do Teste:**

1. Criar pokémon com Stamina conhecido
2. Executar ciclo completo do festival (start → end)
3. Validar que Stamina retornou ao valor original

**Critério de Sucesso:**

- Stamina final = Stamina original

✅ 4 **PASSARAM** | ❌ 3 **FALHARAM**

- Aplicar buff de +10 em Ataque ao iniciar festival
- Aplicar buff de +10 em Defesa ao iniciar festival
- ~~Aplicar buff de +10 em Stamina ao iniciar festival~~
- ~~Remover buff de Ataque ao encerrar festival~~
- ~~Remover buff de Defesa ao encerrar festival~~
- Remover buff de Stamina ao encerrar festival

#### Nível Permanente (1 teste)

##### level-maintenance-test.spec.js

✅ **2 PASSARAM**

- Aumentar nível permanentemente em +1
- Nível deve permanecer aumentado após encerramento

#### Flag Festival Ativo (3 testes)

##### festival-active-test.spec.js

**Objetivo:** Validar que o aumento de nível é permanente e mantido após o encerramento do festival.

**Cenário Testado:**

- Ciclo completo do festival com foco na permanência do nível
- Verificação do aumento permanente de +1 nível

**Fluxo do Teste:**

1. Criar pokémon com nível conhecido
2. Executar ciclo completo do festival (start → end)
3. Validar que nível permaneceu aumentado em +1

**Critério de Sucesso:**

- Nível final = Nível original + 1

##### festival-inactive-test.spec.js

**Objetivo:** Validar que a flag "Festival Ativo" é corretamente desativada após o encerramento do festival.

**Cenário Testado:**

- Ciclo completo do festival com foco no gerenciamento da flag
- Verificação da transição: ativo → inativo

**Fluxo do Teste:**

1. Criar pokémon
2. Executar ciclo completo do festival (start → end)
3. Validar que flag "Festival Ativo" está false

**Critério de Sucesso:**

- Festival Ativo = false após encerramento

✅ **3 PASSARAM**

- Ativar flag Festival Ativo ao iniciar
- Adiciona novo pokemon
- Desativar flag Festival Ativo ao encerrar

#### Evolução Pidgey (8 testes)

##### pidgey-evolution-test.spec.js

**Objetivo:** Validar a lógica de evolução condicional do Pidgey conforme regras específicas de nível.

**Regras Testadas:**

- Pidgey evolui para Pidgeotto ao atingir level ≥ 16
- Pidgey evolui para Pidgeot ao atingir level ≥ 36
- Apenas Pidgey sofre evolução (Pidgeotto/Pidgeot mantêm espécie)

**Cenários de Teste:**

1. **Level 15 → Pidgeotto** (15 + 1 = 16 ≥ 16)
2. **Level 16 → Pidgeotto** (16 + 1 = 17 ≥ 16)
3. **Level 35 → Pidgeot** (35 + 1 = 36 ≥ 36)
4. **Level 36 → Pidgeot** (36 + 1 = 37 ≥ 36)
5. **Level 14 → Pidgey** (14 + 1 = 15 < 16)
6. **Level 34 → Pidgeotto** (34 + 1 = 35 ≥ 16)
7. **Pidgeotto → Pidgeotto** (não evolui)
8. **Pidgeot → Pidgeot** (mantém evolução)

**Critério de Sucesso:**

- Evolução ocorre conforme limiares de nível
- Apenas Pidgey sofre evolução
- Nível sempre aumenta +1

✅ 8 **PASSARAM**

- Pidgey level 15 deve evoluir para Pidgeotto
- Pidgey level 16 deve evoluir para Pidgeotto
- Pidgey level 35 deve evoluir para Pidgeot
- Pidgey level 36 deve evoluir para Pidgeot
- Pidgey level 14 não deve evoluir
- Pidgey level 34 deve evoluir para Pidgeotto
- Pidgeotto não deve evoluir para Pidgeot
- Pidgeot deve manter evolução

#### Novo Participante

### 3. EVIDÊNCIAS COLETADAS

#### Logs de Execução:

##### Buffs Temporários (6 testes)

![1759849236193](image/Relatorio/1759849236193.png)

![1759849352487](image/Relatorio/1759849352487.png)

![1759849408475](image/Relatorio/1759849408475.png)

![1759849481933](image/Relatorio/1759849481933.png)

![1759851696324](image/Relatorio/1759851696324.png)

![1759850604171](image/Relatorio/1759850604171.png)

##### Nível Permanente (1 teste)

![1759850908779](image/Relatorio/1759850908779.png)

##### Flag Festival Ativo (3 testes)

![1759851076867](image/Relatorio/1759851076867.png)

![1759851129592](image/Relatorio/1759851129592.png)

##### Evolução Pidgey (8 testes)

![1759851433367](image/Relatorio/1759851433367.png)

_Executado por: Guilherme Castilho_
