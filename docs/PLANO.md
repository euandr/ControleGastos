# Plano de Desenvolvimento - ControleGastos

## Visão Geral

Sistema web de controle de gastos pessoais que replica e expande as funcionalidades de uma planilha Excel. Frontend em React, Backend em FastAPI (Python) e Banco de dados PostgreSQL gerenciado via Supabase.

**Objetivo MVP**: Replicar 100% das funcionalidades da planilha, com estrutura preparada para multi-user no futuro.

---

## 1. ARQUITETURA GERAL

### Fluxo de Dados

```
Cliente (Browser/React)
  ↓↑ (HTTP/CORS)
FastAPI Backend (Python)
  ↓↑ (SQL)
Supabase (PostgreSQL gerenciado)
```

### Stack Recomendada

- **Frontend**: React + TypeScript + Vite + Axios/Fetch
- **Backend**: Python 3.11 + FastAPI + SQLAlchemy + Pydantic
- **Banco de Dados**: PostgreSQL gerenciado via Supabase
- **Serviços nativos da plataforma**: autenticação, storage, realtime e APIs prontas
- **Gráficos**: Recharts (React) - recomendado para React, mas Chart.js também é viável
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend) - sujeito a mudanças conforme aprendizado

**Nota**: As dependências e tecnologias são recomendações iniciais e podem ser ajustadas durante o desenvolvimento conforme sua necessidade de aprendizado. Cada escolha será explicada com seu propósito.

---

## 2. MODELO DE DADOS (DATABASE)

### Diagrama de Conexões

```
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE (PostgreSQL gerenciado)            │
└─────────────────────────────────────────────────────────────┘

usuarios
  ↓
  ├─→ transacoes
  │    ├─→ transacoes_categorias → categorias
  │    └─→ transacoes_tags → tags
  │
  └─→ anotacoes

Fluxo:
- O núcleo do sistema é `transacoes`
- O tipo da transação define se ela é receita, despesa ou investimento
- `natureza` e `necessidade` refinam a análise financeira
- Categorias e tags são opcionais e podem ser múltiplas por transação
- O mês é representado por `mes_ref` (`YYYY-MM`), sem tabela de meses
```

### Tabelas Principais

#### `usuarios`

```sql
- id (UUID, PK)
- email (String, unique)
- nome (String)
- senha_hash (Text)
- criado_em (Timestamp)
```

#### `transacoes` (núcleo do sistema)

```sql
- id (UUID, PK)
- usuario_id (UUID, FK → usuarios)
- descricao (Text)
- valor (Decimal)
- tipo (String: 'receita', 'despesa', 'investimento')
- natureza (String: 'fixo', 'variavel')
- necessidade (Boolean)
- metodo_pagamento (String: 'debito', 'dinheiro', 'pix', 'cartao')
- data (Date)
- mes_ref (Char(7), ex: '2026-01')
- criado_em (Timestamp)
```

#### `categorias`

```sql
- id (UUID, PK)
- usuario_id (UUID, FK → usuarios)
- nome (String)
- cor (String, ex: '#3498db')
- criado_em (Timestamp)
```

#### `transacoes_categorias` (N:N)

```sql
- transacao_id (UUID, FK → transacoes)
- categoria_id (UUID, FK → categorias)
```

#### `tags`

```sql
- id (UUID, PK)
- usuario_id (UUID, FK → usuarios)
- nome (String)
```

#### `transacoes_tags` (N:N)

```sql
- transacao_id (UUID, FK → transacoes)
- tag_id (UUID, FK → tags)
```

#### `anotacoes`

```sql
- id (UUID, PK)
- usuario_id (UUID, FK → usuarios)
- conteudo (Text)
- mes_ref (Char(7))
- criado_em (Timestamp)
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
│   │   │   ├── transaction.py
│   │   │   ├── category.py
│   │   │   ├── tag.py
│   │   │   └── note.py
│   │   │
│   │   ├── schemas/                # Schemas Pydantic (validação/serialização)
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   ├── category.py
│   │   │   ├── tag.py
│   │   │   └── note.py
│   │   │
│   │   ├── routes/                 # Endpoints organizados por domínio
│   │   │   ├── __init__.py
│   │   │   ├── transacoes.py
│   │   │   ├── categories.py
│   │   │   ├── tags.py
│   │   │   ├── anotacoes.py
│   │   │   ├── analytics.py        # Endpoints de análise/gráficos
│   │   │
│   │   ├── services/               # Lógica de negócio
│   │   │   ├── __init__.py
│   │   │   ├── transacoes_service.py
│   │   │   ├── categories_service.py
│   │   │   ├── tags_service.py
│   │   │   ├── notes_service.py
│   │   │   ├── analytics_service.py
│   │   │   └── calculations.py     # Cálculos: resumo mensal e agregações
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
│   │   │   ├── Transactions.jsx    # Página de transações
│   │   │   ├── Categories.jsx      # Gerenciamento de categorias
│   │   │   ├── Tags.jsx            # Gerenciamento de tags
│   │   │   ├── Analysis.jsx        # Gráficos e análises de meses
│   │   │   ├── Notes.jsx           # Anotações do mês
│   │   │   └── Settings.jsx        # Configurações gerais
│   │   │
│   │   ├── services/
│   │   │   ├── api.js              # Cliente HTTP (Axios)
│   │   │   ├── transactionsService.js
│   │   │   ├── categoriesService.js
│   │   │   ├── tagsService.js
│   │   │   ├── notesService.js
│   │   │   └── analyticsService.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMesRef.js        # Hook para período atual
│   │   │   └── useTransactions.js
│   │   │
│   │   ├── context/
│   │   │   └── TransactionContext.jsx    # Contexto para período/filtros
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

### Transaction Routes

- `POST /api/transacoes` - Criar transação
- `GET /api/transacoes?mes_ref=2026-01` - Listar transações do mês
- `PUT /api/transacoes/{id}` - Editar transação
- `DELETE /api/transacoes/{id}` - Deletar transação

### Classification Routes

- `POST /api/categorias` - Criar categoria
- `GET /api/categorias` - Listar categorias do usuário
- `POST /api/tags` - Criar tag
- `GET /api/tags` - Listar tags do usuário

### Notes Routes

- `POST /api/anotacoes` - Criar ou atualizar anotação
- `GET /api/anotacoes?mes_ref=2026-01` - Obter anotação do mês

### Summary Routes

- `GET /api/resumo?mes_ref=2026-01` - Resumo mensal consolidado
- `GET /api/analytics/por-tipo?mes_ref=2026-01` - Dados agregados por tipo
- `GET /api/analytics/por-categoria?mes_ref=2026-01` - Dados agregados por categoria
- `GET /api/analytics/por-tag?mes_ref=2026-01` - Dados agregados por tag

---

## 5. LÓGICA DE CÁLCULOS

### Fluxo de Cálculo (por `mes_ref`)

1. **Receitas Totais** = Soma de `transacoes.valor` onde `tipo = 'receita'`
2. **Despesas Totais** = Soma de `transacoes.valor` onde `tipo = 'despesa'`
3. **Investimentos Totais** = Soma de `transacoes.valor` onde `tipo = 'investimento'`
4. **Saldo Final** = Receitas Totais - Despesas Totais - Investimentos Totais
5. **Despesas Necessárias** = Soma das despesas com `necessidade = true`
6. **Despesas Variáveis/Não Necessárias** = Soma das despesas com `necessidade = false`

### Gráfico Pizza

- **Necessárias**: Soma das despesas com `necessidade = true`
- **Não-Necessárias**: Soma das despesas com `necessidade = false`
- **Percentual**: (Grupo / Total de despesas) × 100

---

## 6. FEATURES - MVP vs Futuro

### MVP (Priority 1)

- [x] Criar estrutura de pastas
- [ ] Setup Backend (FastAPI + BD Supabase)
- [ ] Criar models SQLAlchemy (incluindo usuarios)
- [ ] Criar schemas Pydantic
- [ ] Implementar CRUD de Transações
- [ ] Implementar CRUD de Categorias
- [ ] Implementar CRUD de Tags
- [ ] Implementar CRUD de Anotações
- [ ] Implementar lógica de resumo por `mes_ref`
- [ ] Endpoint de dashboard/resumo mensal
- [ ] Setup Frontend (React + Vite)
- [ ] Página Dashboard (resumo mensal)
- [ ] Página de entrada/edição de transações
- [ ] Página Gerenciar Categorias
- [ ] Página Gerenciar Tags
- [ ] Página Anotações
- [ ] Gráfico Pizza (necessárias vs não-necessárias)
- [ ] Gráfico Barras por Categoria
- [ ] Gráfico Comparação (receitas vs despesas vs investimentos)

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

1. Implementar routes/services para Transações
2. Implementar routes/services para Categorias
3. Implementar routes/services para Tags
4. Implementar routes/services para Anotações
5. Implementar lógica de resumo por `mes_ref`
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

- Tabela `usuarios` existe desde o MVP
- Todos os dados principais têm `usuario_id`
- **MVP**: autenticação pode ser adiada, mas o modelo já está pronto para múltiplos usuários
- **Futuro**: integrar login com Supabase Auth ou JWT sem mudar o esquema central

### Transações como Núcleo

- Receita, despesa e investimento usam a mesma tabela
- `tipo` decide a natureza financeira do lançamento
- `necessidade` permite separar despesas essenciais das opcionais
- `natureza` permite distinguir fluxo fixo e variável
- Tags e categorias são complementares e podem coexistir na mesma transação

### Gráficos MVP

- **Gráfico Pizza**: Transações necessárias vs não necessárias
- **Gráfico Barras**: Gastos por categoria
- **Gráfico Comparação**: Receitas vs Despesas vs Investimentos vs Saldo
  - **Tipo recomendado**: Gráfico de Barras Agrupadas
  - **Alternativa**: Gráfico de Área ou Coluna
- **Implementação**: Recharts para React

### Categorias e Tags

- O usuário pode criar, editar e remover categorias
- O usuário pode criar, editar e remover tags
- Cores associadas às categorias ajudam na visualização dos gráficos
- Tags servem para filtros livres e organização adicional

### Documentação

- **Foco**: Boa documentação é prioridade (você está aprendendo)
- **Padrão**: Docstrings em todas as funções e classes
- **README**: Instrução de setup do BD, variáveis de ambiente, como rodar localmente
- **Comentários**: Explicar lógica complexa, especialmente agregações por `mes_ref`

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
