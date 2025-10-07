# TEST PLAN - Festival dos Pássaros

## Desafio Técnico SDET: Guilherme Castilho

---

### 1. OBJETIVO DO TESTE

Validar o funcionamento correto do sistema do Festival dos Pássaros, garantindo que todas as regras de negócio sejam aplicadas corretamente durante os ciclos de início e encerramento do festival.

### 2. ESCOPO DE TESTES

#### ✅ INCLUI:

- Operações de início e encerramento do festival
- Buffs temporários de atributos (Attack, Defense, Stamina)
- Evolução permanente de níveis
- Evolução condicional do Pidgey
- Ativação/desativação da flag "Festival Ativo"
- Adição de novos participantes

### 3. ESTRATÉGIA DE TESTE

**Abordagem Híbrida:**

- API Testing para operações do festival
- Notion API Testing para validação de dados
- Testes de integração entre sistemas

**Ferramentas:**

- Playwright com JavaScript
- API do Notion para manipulação de dados
- API do Festival para operações

### 4. CENÁRIOS DE TESTE CRÍTICOS

#### CENÁRIO 1: Ciclo Completo do Festival

**Objetivo:** Validar fluxo completo início → encerramento

- Buffs temporários aplicados e removidos
- Níveis permanecem aumentados
- Flag Festival Ativo gerenciada corretamente

#### CENÁRIO 2: Buffs Temporários

**Objetivo:** Validar aplicação e remoção de buffs

- +10 Attack/Defense/Stamina durante festival
- Stats retornam ao original após encerramento

#### CENÁRIO 3: Evolução de Nível

**Objetivo:** Validar aumento permanente de nível

- Todos pokémons ganham +1 nível
- Nível mantido após encerramento

#### CENÁRIO 4: Evolução do Pidgey

**Objetivo:** Validar evolução condicional

- Pidgey → Pidgeotto (level ≥ 16)
- Pidgey → Pidgeot (level ≥ 36)

#### CENÁRIO 5: Novo Participante

**Objetivo:** Validar adição de novo pokémon

- Novo pokémon adicionado ao iniciar festival
- Novo pokémon com Festival Ativo = true

### 5. CRITÉRIOS DE ACEITAÇÃO

- ✅ Todos os buffs temporários aplicados e removidos corretamente
- ✅ Aumentos de nível são permanentes
- ✅ Evoluções do Pidgey seguem regras de nível
- ✅ Flag "Festival Ativo" gerenciada corretamente
- ✅ Novo pokémon adicionado no início do festival
- ✅ Dados consistentes entre Notion e sistema

### 6. AMBIENTE DE TESTE

| Componente          | Configuração                                             |
| ------------------- | -------------------------------------------------------- |
| **URL Base**        | https://voidr-challenge-785568282479.us-central1.run.app |
| **API Token**       | .env                                                     |
| **Notion API Key**  | .env                                                     |
| **Notion Database** | .env                                                     |
| **Ferramenta**      | Playwright 1.40+                                         |

### 9. METAS DE QUALIDADE

- Cobertura de funcionalidades: 100%
- Taxa de sucesso: ≥ 95%
- Tempo de execução: < 5 minutos
- Total de testes: 35 cenários

---

_Responsável: Guilherme Castilho_
