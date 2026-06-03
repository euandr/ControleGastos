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
│  POSTGRESQL (BD)    │  (transacoes, categorias, tags)
└─────────────────────┘
```

## Stack

- **Frontend**: React, Vite, Axios, Recharts
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: Supabase, PostgreSQL

## Modelo de Dados

O banco é centrado em `transacoes` e usa `usuarios`, `categorias`, `tags`, `transacoes_categorias`, `transacoes_tags` e `anotacoes` para organizar o domínio financeiro.

Não há tabela de meses no modelo final. O período é inferido por `mes_ref` nas transações e anotações.

## Próximo

Abra: `../DATABASE/01-supabase-setup.md`
