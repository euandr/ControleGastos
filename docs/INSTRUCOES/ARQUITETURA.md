# 🏗️ Visão Geral - Arquitetura

## 3 Camadas

```
┌─────────────────────┐
│   REACT FRONTEND    │  (Componentes, Pages)
└──────────┬──────────┘
           │ HTTP/JSON
           ↓
┌─────────────────────┐
│   FASTAPI BACKEND   │  (Routes, Services)
└──────────┬──────────┘
           │ SQL
           ↓
┌─────────────────────┐
│  POSTGRESQL (BD)    │  (Tabelas, Dados)
└─────────────────────┘
```

## Stack

- **Frontend**: React, Vite, Axios, Recharts
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: Supabase, PostgreSQL

## Próximo

Abra: `../DATABASE/01-supabase-setup.md`
