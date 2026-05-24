# Plano de Desenvolvimento - ControleGastos

## Visão Geral

Sistema web de controle de gastos pessoais que replica e expande as funcionalidades de uma planilha Excel. Frontend em React, Backend em FastAPI (Python) e Banco de dados Supabase (PostgreSQL).

**Objetivo MVP**: Replicar 100% das funcionalidades da planilha, com estrutura preparada para multi-user no futuro.

---

## 1. ARQUITETURA GERAL

### Fluxo de Dados

```
Cliente (Browser/React)
  ↓↑ (HTTP/CORS)
FastAPI Backend (Python)
  ↓↑ (SQL)
Supabase (PostgreSQL)
```

### Stack Recomendada

- **Frontend**: React + TypeScript + Vite + Axios/Fetch
- **Backend**: Python 3.11 + FastAPI + SQLAlchemy + Pydantic
- **Banco de Dados**: Supabase (PostgreSQL gerenciado + Autenticação incluída)
- **Gráficos**: Recharts (React) - recomendado para React, mas Chart.js também é viável
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend) - sujeito a mudanças conforme aprendizado

**Nota**: As dependências e tecnologias são recomendações iniciais e podem ser ajustadas durante o desenvolvimento conforme sua necessidade de aprendizado. Cada escolha será explicada com seu propósito.

---

## 2. MODELO DE DADOS (DATABASE)

### Diagrama de Conexões

```
┌─────────────────────────────────────────────────────────────┐
│                         SUPABASE (PostgreSQL)               │
└─────────────────────────────────────────────────────────────┘

users (um usuário fixo no MVP, preparado para multi-user)
  ↓
  └─→ months (período de controle)
       ↓
       ├─→ income (receitas)
       │
       ├─→ deductions (dízimo + investimento - configurados manualmente)
       │
       ├─→ expenses (despesas normais)
       │   ├─→ expense_categories (categorias)
       │   └─→ [is_necessary flag]
       │
       └─→ notes (anotações)

Fluxo:
- Usuário fixo (sem login agora, preparado para multi-user depois)
- Cada MÊS pode ter múltiplas RECEITAS, DEDUÇÕES, DESPESAS
- Dízimo e investimento são CONFIGURADOS MANUALMENTE pelo usuário
- Sistema calcula os valores com base na configuração
- Carry-over é automático
```

### Tabelas Principais

#### `users` (Usuários - preparado para multi-user)

```sql
- id (UUID, PK)
- email (String, unique)
- created_at (Timestamp)

MVP: Um usuário fixo com email padrão (ex: "user@local")
Futuro: Múltiplos usuários com autenticação
```

#### `months` (Períodos de controle)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- month (Date) - primeiro dia do mês (ex: 2024-01-01)
- created_at (Timestamp)
```

MVP: user_id é sempre o mesmo (usuário fixo)  
Futuro: Múltiplos user_ids conforme usuários fazem login

#### `income` (Receitas)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- month_id (UUID, FK → months)
- description (String) - ex: "Salário", "Freelance"
- amount (Decimal)
- is_carried_over (Boolean) - TRUE se é "restante do mês passado"
- created_at (Timestamp)
```

#### `expense_categories` (Categorias de despesa)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- name (String) - ex: "Alimentação", "Transporte"
- color (String) - ex: "#FF5733" para gráficos
- created_at (Timestamp)
```

#### `expenses` (Despesas)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- month_id (UUID, FK → months)
- category_id (UUID, FK → expense_categories)
- description (String)
- amount (Decimal)
- is_necessary (Boolean) - TRUE: necessária, FALSE: não-necessária
- created_at (Timestamp)
```

#### `deductions` (Deduções: dízimo + investimento - configuradas manualmente)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- month_id (UUID, FK → months)
- type (String enum: 'tithe', 'investment') - dízimo ou investimento
- description (String) - ex: "Dízimo (10%)" ou "Investimento (20%)"
- percentage (Decimal) - porcentagem configurada pelo usuário
- amount (Decimal) - valor final calculado (receita × porcentagem)
- created_at (Timestamp)
```

**IMPORTANTE**: Dízimo e investimento são **CONFIGURADOS MANUALMENTE** pelo usuário ao criar um mês ou editar deduções. O sistema calcula o valor (amount) baseado na porcentagem e receitas.

#### `notes` (Anotações por mês)

```sql
- id (UUID, PK)
- user_id (UUID, FK → users)
- month_id (UUID, FK → months)
- content (Text)
- updated_at (Timestamp)
```

---

## 3. ESTRUTURA DE PASTAS

```
ControleGastos/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # App FastAPI principal
│   │   ├── config.py               # Configurações (DB, ENV)
│   │   ├── dependencies.py         # Dependências compartilhadas
│   │   │
│   │   ├── models/                 # Modelos SQLAlchemy
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── month.py
│   │   │   ├── income.py
│   │   │   ├── expense.py
│   │   │   ├── category.py
│   │   │   ├── deduction.py
│   │   │   └── note.py
│   │   │
│   │   ├── schemas/                # Schemas Pydantic (validação/serialização)
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── income.py
│   │   │   ├── expense.py
│   │   │   ├── category.py
│   │   │   └── month.py
│   │   │
│   │   ├── routes/                 # Endpoints organizados por domínio
│   │   │   ├── __init__.py
│   │   │   ├── income.py
│   │   │   ├── expenses.py
│   │   │   ├── categories.py
│   │   │   ├── fixed_entries.py
│   │   │   ├── months.py
│   │   │   ├── analytics.py        # Endpoints de análise/gráficos
│   │   │   └── notes.py
│   │   │
│   │   ├── services/               # Lógica de negócio
│   │   │   ├── __init__.py
│   │   │   ├── income_service.py
│   │   │   ├── expense_service.py
│   │   │   ├── analytics_service.py
│   │   │   └── calculations.py     # Cálculos: investimento, dízimo, restante
│   │   │
│   │   ├── database.py             # Configuração do BD (Supabase)
│   │   └── utils.py                # Funções auxiliares
│   │
│   ├── requirements.txt
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── Common/
│   │   │   │   ├── Loading.jsx
│   │   │   │   ├── Error.jsx
│   │   │   │   └── Button.jsx
│   │   │   └── Forms/
│   │   │       ├── IncomeForm.jsx
│   │   │       ├── ExpenseForm.jsx
│   │   │       └── CategoryForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Resumo/overview do mês
│   │   │   ├── IncomeEntry.jsx     # Página de entrada de receitas
│   │   │   ├── ExpenseEntry.jsx    # Página de entrada de despesas
│   │   │   ├── Categories.jsx      # Gerenciamento de categorias
│   │   │   ├── Analysis.jsx        # Gráficos e análises de meses
│   │   │   ├── Settings.jsx        # Configurações (% investimento, etc)
│   │   │   └── Notes.jsx           # Anotações do mês
│   │   │
│   │   ├── services/
│   │   │   ├── api.js              # Cliente HTTP (Axios)
│   │   │   ├── incomeService.js
│   │   │   ├── expenseService.js
│   │   │   └── analyticsService.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMonth.js         # Hook para mês atual
│   │   │   ├── useIncomes.js
│   │   │   └── useExpenses.js
│   │   │
│   │   ├── context/
│   │   │   └── MonthContext.jsx    # Contexto para mês selecionado
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── .gitignore (root)
└── README.md (root com instruções setup)
```

---

## 4. API ENDPOINTS (FastAPI)

### Income Routes

- `POST /api/income` - Criar receita
- `GET /api/income?month=2024-01` - Listar receitas do mês
- `PUT /api/income/{id}` - Editar receita
- `DELETE /api/income/{id}` - Deletar receita

### Expense Routes

- `POST /api/expenses` - Criar despesa
- `GET /api/expenses?month=2024-01` - Listar despesas do mês
- `PUT /api/expenses/{id}` - Editar despesa
- `DELETE /api/expenses/{id}` - Deletar despesa

### Category Routes

- `POST /api/categories` - Criar categoria
- `GET /api/categories` - Listar todas as categorias do usuário
- `PUT /api/categories/{id}` - Editar categoria
- `DELETE /api/categories/{id}` - Deletar categoria

### Deductions Routes (Dízimo + Investimento - configurados manualmente)

- `POST /api/deductions` - Criar dedução (dízimo ou investimento)
- `GET /api/deductions?month=2024-01` - Listar deduções do mês
- `PUT /api/deductions/{id}` - Editar dedução (ajustar porcentagem ou valor)
- `DELETE /api/deductions/{id}` - Deletar dedução

### Month Routes

- `GET /api/months` - Listar todos os meses com dados
- `GET /api/months/{month}/summary` - Resumo do mês (totais, cálculos)

### Analytics Routes

- `GET /api/analytics/month/{month}` - Dados para gráfico pizza (necessárias vs não-necessárias)
- `GET /api/analytics/comparison?month1=2024-01&month2=2024-02` - Comparação entre meses
- `GET /api/analytics/expense-breakdown` - Breakdown por categoria

### Notes Routes

- `POST /api/notes` - Criar/atualizar anotações do mês
- `GET /api/notes?month=2024-01` - Obter anotações do mês

### Settings Routes

- `GET /api/settings/user` - Obter configurações do usuário
- `PUT /api/settings/user` - Atualizar configurações (para templates futuros)

---

## 5. LÓGICA DE CÁLCULOS

### Fluxo de Cálculo (por mês)

1. **Receitas Totais** = Soma de todas as receitas normais (exceto carry-over)
2. **Dízimo (Dedução Manual)** = Configurado pelo usuário (geralmente 10% das receitas)
3. **Investimento (Dedução Manual)** = Configurado pelo usuário - pode ser:
   - Uma **porcentagem** das receitas (ex: 20%)
   - Um **valor fixo** (ex: R$ 500)
   - Uma **combinação** de ambos (porcentagem + valor fixo adicional)
4. **Despesas Totais** = Soma de todas as despesas normais
5. **Restante Disponível** = (Receitas Totais - Dízimo - Investimento - Despesas Totais)
6. **Próximo Mês - Carry-Over** = Restante Disponível é criado automaticamente como receita com `is_carried_over = true`

### Gráfico Pizza

- **Necessárias**: Soma das despesas com `is_necessary = true`
- **Não-Necessárias**: Soma das despesas com `is_necessary = false`
- **Percentual**: (Categoria / Total Despesas) × 100

---

## 6. FEATURES - MVP vs Futuro

### MVP (Priority 1)

- [x] Criar estrutura de pastas
- [ ] Setup Backend (FastAPI + BD Supabase)
- [ ] Criar models SQLAlchemy (incluindo users)
- [ ] Criar schemas Pydantic
- [ ] Implementar CRUD de Receitas
- [ ] Implementar CRUD de Despesas
- [ ] Implementar CRUD de Categorias
- [ ] Implementar CRUD de Deduções (dízimo + investimento configurados manualmente)
- [ ] Implementar lógica de cálculos de deduções
- [ ] Implementar carry-over automático
- [ ] Endpoint de resumo do mês
- [ ] Setup Frontend (React + Vite)
- [ ] Página Dashboard (resumo mês)
- [ ] Página Entrada de Receitas
- [ ] Página Entrada de Despesas
- [ ] Página Gerenciar Categorias
- [ ] Página Configurações (deduções manual)
- [ ] Gráfico Pizza (necessárias vs não-necessárias)
- [ ] Gráfico Barras por Categoria
- [ ] Gráfico Comparação (receitas vs despesas vs investimento vs restante)
- [ ] Anotações do mês

### Futuro (Priority 2+)

- [ ] Templates de configuração (ex: "Padrão", "Conservador", "Agressivo")
- [ ] Criação de templates personalizados pelo usuário
- [ ] Autenticação com JWT (multi-user)
- [ ] Análise comparativa entre meses
- [ ] Gráficos históricos (evolução de gastos)
- [ ] Exportar dados (CSV, PDF)
- [ ] Automação de receitas/despesas recorrentes
- [ ] Integração com APIs de bancos (open banking)
- [ ] App Mobile (React Native)
- [ ] Notificações de limite de gastos
- [ ] Dark mode
- [ ] Relatórios customizáveis

---

## 7. GUIA DE DESENVOLVIMENTO

### Fase 1: Setup e Estrutura

1. Inicializar backend (FastAPI + requirements)
2. Conectar ao Supabase
3. Criar models e schemas
4. Inicializar frontend (React + Vite)

### Fase 2: Backend CRUD

1. Implementar routes/services para Income
2. Implementar routes/services para Expenses
3. Implementar routes/services para Categories
4. Implementar routes/services para Deductions (configuradas manualmente)
5. Implementar lógica de cálculos
6. Implementar carry-over automático
7. Testar com Postman/Insomnia

### Fase 3: Frontend

1. Criar componentes de layout
2. Implementar página Dashboard
3. Implementar formulários de entrada
4. Conectar ao backend
5. Implementar gráficos

### Fase 4: Testes e Polish

1. Testes unitários (backend)
2. Testes de integração
3. Validações e tratamento de erros
4. Deployment (Vercel + Railway/Render)

---

## 8. CONSIDERAÇÕES IMPORTANTES

### Estrutura Multi-User (Preparada desde agora)

- Tabela `users` existe desde o MVP (mas com um usuário fixo)
- Todos os dados têm `user_id` (mas sempre o mesmo)
- **MVP**: Usuário fixo, sem login
- **Futuro**: Implementar autenticação com Supabase Auth é trivial (apenas adicionar login)

### Carry-Over Automático

- **Fluxo**: Ao fim do mês, sistema calcula restante
- **Ação**: Cria automaticamente uma receita no mês seguinte com `is_carried_over = true`
- **Regra**: Essa receita NOT recebe cálculos de dízimo/investimento
- **Implementação**: Pode ser via endpoint automático ou job agendado

### Dízimo e Investimento (Deduções Manuais)

- **Dízimo**: Configurado manualmente pelo usuário (geralmente 10%, mas pode variar)
- **Investimento**: Configurado manualmente com opções flexíveis:
  - **Porcentagem** das receitas (ex: 20%)
  - **Valor fixo** (ex: R$ 500)
  - **Ambos** (porcentagem + valor fixo adicional)
- **Cálculo**: O sistema calcula o `amount` final baseado na configuração do usuário
- **Armazenamento**: Ambas em `deductions` com `percentage` e `amount`
- **CRUD**: POST (criar), GET (listar), PUT (editar), DELETE (remover)
- **Dashboard**: Mostradas separadas de despesas normais

### Carry-Over do Restante

- No final do mês, calcular restante disponível
- No início do próximo mês, criar automaticamente income com `is_carried_over = true`
- Este valor não recebe % de investimento nem dízimo
- Implementação automática via backend

### Gráficos MVP

- **Gráfico Pizza**: Despesas necessárias vs não-necessárias
- **Gráfico Barras**: Gastos por categoria
- **Gráfico Comparação**: Receitas vs Despesas vs Investimento vs Restante
  - **Tipo recomendado**: Gráfico de Barras Agrupadas (grupo por tipo de dado)
  - **Alternativa**: Gráfico de Área ou Coluna
- **Implementação**: Recharts para React

### Categorias

- User pode criar/editar/deletar categorias
- Cores associadas para visualização em gráficos
- Exemplo padrão: "Alimentação", "Transporte", "Moradia", "Lazer", "Saúde"

### Documentação

- **Foco**: Boa documentação é prioridade (você está aprendendo)
- **Padrão**: Docstrings em todas as funções e classes
- **README**: Instrução de setup do BD, variáveis de ambiente, como rodar localmente
- **Comentários**: Explicar lógica complexa, especialmente cálculos

---

## 9. TECNOLOGIAS E DEPENDÊNCIAS

**Nota**: As seguintes são recomendações iniciais. Você pode mudar conforme aprendizado. Cada dependência terá explicação do seu propósito.

### Backend (Python 3.11)

```
fastapi==0.104.1         # Framework HTTP assíncrono e rápido - melhor para APIs
uvicorn==0.24.0          # Servidor ASGI para rodar FastAPI
sqlalchemy==2.0.23       # ORM para trabalhar com banco de dados (models)
psycopg2-binary==2.9.9   # Adaptador PostgreSQL para Python/SQLAlchemy
python-dotenv==1.0.0     # Carregar variáveis de ambiente (.env)
pydantic==2.5.0          # Validação de dados e schemas
```

**Explicação e Propósito**:

- **FastAPI**: Framework moderno, fácil de aprender, com documentação automática (Swagger)
- **Uvicorn**: Necessário para rodar FastAPI como servidor HTTP
- **SQLAlchemy**: Evita escrever SQL manualmente, trabalha com Python puro
- **Psycopg2**: Conecta ao Supabase (PostgreSQL)
- **Python-dotenv**: Protege credenciais (não commita tokens/senhas)
- **Pydantic**: Valida dados que chegam do frontend, rejeita inválidos

### Frontend (Node.js/React)

```
react                    # Framework UI
react-dom                # Renderização React no navegador
vite                     # Build tool rápido (3x mais rápido que webpack)
axios                    # HTTP client para chamar backend
recharts                 # Gráficos prontos para React (recomendado)
react-router-dom         # Navegação entre páginas
```

**Explicação e Propósito**:

- **React**: Componentes reutilizáveis, estado compartilhado, aprendizado progressivo
- **Vite**: Setup rápido, desenvolvimento local ágil, bundling otimizado
- **Axios**: Comunicação com backend (GET, POST, PUT, DELETE)
- **Recharts**: Gráficos bonitos, integrados com React, fácil de customizar
- **React Router**: Navegação entre Dashboard, Receitas, Despesas, etc

---

## 10. PRÓXIMAS AÇÕES

1. Validar com usuário esta arquitetura
2. Iniciar Fase 1: Setup Backend
3. Criar banco de dados no Supabase
4. Implementar models e schemas
