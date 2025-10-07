## Configuração do Ambiente

### Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** ou **yarn**
- Conta no **Notion** com acesso à base de dados
- Credenciais da API do Festival

### 1. Clone o repositório

**bash**

```
git clone https://github.com/GuilhermeCastillo/Desafio-Tecnico-SDET-Guilherme-Castilho.git
cd festival_tests_js
```

### 2. Instale as dependências

**bash**

```
npm install
```

### 3. Configure as variáveis de ambiente

**⚠️ IMPORTANTE: Crie o arquivo `.env` na raiz do projeto:**

**env**

```
NOTION_KEY=""
DATABASE_ID=""
FESTIVAL_URL=https://voidr-challenge-785568282479.us-central1.run.app
FESTIVAL_TOKEN=""
```

### 4. Estrutura do arquivo `.env`

| Variável         | Descrição                         | Obrigatório |
| ---------------- | --------------------------------- | ----------- |
| `NOTION_KEY`     | Chave de API do Notion            | ✅          |
| `DATABASE_ID`    | ID da base de dados do Notion     | ✅          |
| `FESTIVAL_URL`   | URL da API do Festival            | ✅          |
| `FESTIVAL_TOKEN` | Token de autenticação do Festival | ✅          |

## Executando os Testes

### Executar testes específicos

**bash**

```
# Testes de Attack
npx playwright test attack-test.spec.js
npx playwright test attack-removal-test.spec.js

# Testes de Defense
npx playwright test defense-test.spec.js
npx playwright test defense-removal-test.spec.js

# Testes de Stamina
npx playwright test stamina-test.spec.js
npx playwright test stamina-removal-test.spec.js

# Testes de Evolução
npx playwright test pidgey-evolution-test.spec.js

# Testes de Controle do Festival
npx playwright test festival-active-test.spec.js
npx playwright test festival-inactive-test.spec.js

# Teste de Nível
npx playwright test level-maintenance-test.spec.js
```
