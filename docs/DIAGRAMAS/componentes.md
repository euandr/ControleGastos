# Diagramas: Arquitetura de Componentes

## 3 Camadas

```
┌─────────────────────────────────────┐
│     FRONTEND (React + Vite)         │
│  Port: 5173                         │
│  - Pages (Dashboard, Transações, etc)│
│  - Components (Button, Card, etc)   │
│  - Services (Axios, Context)        │
└────────────────┬────────────────────┘
                 │ HTTP (JSON)
┌────────────────▼────────────────────┐
│     BACKEND (FastAPI)               │
│  Port: 8000                         │
│  - Routes (/api/transacoes, etc)    │
│  - Schemas (Validação)              │
│  - Services (Lógica negócio)        │
│  - Models (SQLAlchemy)              │
└────────────────┬────────────────────┘
                 │ SQL
┌────────────────▼────────────────────┐
│     DATABASE (PostgreSQL)           │
│  Port: 5432                         │
│  - 7 Tabelas (usuarios, transacoes, etc)│
│  - Índices e constraints            │
└─────────────────────────────────────┘
```

---

## Comunicação

1. **Frontend → Backend**: Axios (GET/POST/PUT/DELETE)
2. **Backend → Database**: SQLAlchemy (SQL)
3. **Database → Backend**: Dados + Validação
4. **Backend → Frontend**: JSON

---

## Frontend

- React com Vite
- Axios para HTTP
- Recharts para gráficos
- React Router para navegação

---

## Backend

- FastAPI (framework moderno)
- Pydantic (validação)
- SQLAlchemy (ORM)
- Uvicorn (servidor)

---

## Database

- PostgreSQL (relacional)
- Supabase (hosting)
- Modelo centrado em transacoes, categorias, tags e anotacoes

---

## Próximo passo

➡️ [[BACKEND/01-setup.md]] - Configure o backend
