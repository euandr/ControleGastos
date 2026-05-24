# 💰 ControleGastos

Sistema web de controle de gastos pessoais desenvolvido com **React**, **FastAPI** e **Supabase**.

## 🎯 O que é?

ControleGastos é um sistema full-stack que replica e expande as funcionalidades de uma planilha Excel de controle de despesas. Permite gerenciar receitas, despesas, deduções (dízimo/investimento) e visualizar análises com gráficos.

## 🛠️ Stack Tecnológico

- **Frontend**: React + Vite + TypeScript
- **Backend**: FastAPI + Python 3.11
- **Database**: Supabase (PostgreSQL)
- **Gráficos**: Recharts

## 📚 Documentação

Toda a documentação está em `/docs/`. Execute o script para gerar:

```bash
python create_all_docs.py
```

Depois abra: `docs/INSTRUCOES/00-LEIA-ISTO.md`

## 🚀 Início Rápido

### Pré-requisitos

- Python 3.11+
- Node.js 16+
- Conta Supabase

### Estrutura

```
projeto/
├── PLANO.md ........................ Arquitetura completa
├── create_all_docs.py ............ Gera documentação
└── docs/ .......................... Documentação
    ├── INSTRUCOES/ ............... Guias de início
    ├── DATABASE/ ................. Setup Supabase
    ├── BACKEND/ .................. FastAPI
    ├── FRONTEND/ ................. React
    └── DIAGRAMAS/ ................ UML
```

## 📖 Como Começar

1. Execute o script de documentação:

   ```bash
   python create_all_docs.py
   ```

2. Leia o guia inicial:

   ```
   docs/INSTRUCOES/00-LEIA-ISTO.md
   ```

3. Siga os links sequencialmente em cada arquivo

## 🎓 Aprendizado

Esta documentação foi desenvolvida para ensinar:

- Arquitetura de software
- REST APIs com FastAPI
- React com Vite
- PostgreSQL com SQLAlchemy
- Integração Frontend-Backend

## 📝 Licença

Projeto de aprendizado. Livre para modificar.

---

**Pronto para começar?** Veja: `PLANO.md` ou execute `python create_all_docs.py`

```

Este script irá:
- ✅ Criar pasta `docs/`
- ✅ Gerar 18 arquivos markdown
- ✅ Estruturar tudo perfeitamente

### Passo 2: Abra o primeiro arquivo

```

docs/DATABASE/01-supabase-setup.md

```

### Passo 3: Siga os links

Cada arquivo aponta para o próximo via `[[arquivo.md]]`

---

## 📚 Os 18 arquivos

### Database (2 arquivos)
- `01-supabase-setup.md` - Setup Supabase
- `02-schema.md` - SQL das 7 tabelas

### Diagramas (3 arquivos)
- `er-diagram.md` - Diagrama ER visual
- `sequencia.md` - Fluxos de operação
- `componentes.md` - Arquitetura 3 camadas

### Backend (7 arquivos)
- `01-setup.md` - FastAPI setup
- `02-models.md` - SQLAlchemy Models
- `03-schemas.md` - Pydantic Schemas
- `04-routes.md` - Endpoints HTTP
- `05-services.md` - Lógica de negócio
- `06-testes.md` - Testar endpoints
- `07-validacoes.md` - Erros e validações

### Frontend (7 arquivos)
- `01-setup.md` - React + Vite
- `02-estrutura.md` - Organização
- `03-componentes.md` - Componentes base
- `04-integracao.md` - Integração
- `05-paginas.md` - Páginas principais
- `06-graficos.md` - Gráficos Recharts
- `07-testes.md` - Testes

---

## 📋 Arquivos de referência

| Arquivo | Descrição |
|---------|-----------|
| `COMECE_AQUI.md` | Instruções iniciais |
| `DOCUMENTACAO.md` | Guia completo |
| `SUMARIO.md` | Estrutura da documentação |
| `PRONTO.md` | Resumo executivo |
| `README.md` | Este arquivo |

---

## 🛠️ Scripts inclusos

| Script | O que faz |
|--------|----------|
| `create_all_docs.py` | ⭐ Cria toda a documentação |
| `validate_docs.py` | Valida se tudo foi criado |
| `setup_docs.cmd` | Alternativa Batch (Windows) |
| `setup_docs.py` | Versão simples do setup |

---

## ⏱️ Timeline

```

AGORA → Execute python create_all_docs.py (1 min)
↓
DEPOIS → Abra docs/DATABASE/01-supabase-setup.md (2-3 horas de leitura)
↓
IMPLEMENTE → Código conforme aprende (2-3 horas)
↓
PRONTO → Aplicação full-stack funcional! (3-4 horas total)

```

---

## 🎯 O que você aprenderá

- ✅ PostgreSQL + Supabase
- ✅ FastAPI + SQLAlchemy
- ✅ Pydantic + Validação
- ✅ React + Hooks
- ✅ Axios + HTTP
- ✅ Recharts + Gráficos
- ✅ Arquitetura clean
- ✅ Boas práticas

---

## 🔄 Fluxo recomendado

```

DATABASE/01
↓
DATABASE/02
↓
DIAGRAMAS/\* (qualquer ordem)
↓
BACKEND/01-07 (nesta ordem)
↓
FRONTEND/01-07 (nesta ordem)
↓
Teste tudo junto
↓
🎉 APP PRONTO

````

---

## 💾 Tecnologias

| Camada | Tech |
|--------|------|
| Database | PostgreSQL + Supabase |
| Backend | FastAPI + Uvicorn |
| ORM | SQLAlchemy |
| Validação | Pydantic |
| Frontend | React + Vite |
| HTTP | Axios |
| Gráficos | Recharts |

---

## 🎓 Nível

- **Não é iniciante**: Requer conhecimento básico de Python/JavaScript
- **Não é avançado**: Conceitos são explicados
- **É intermediário**: Balanceado entre teoria e prática

---

## 📖 Características

Cada documento tem:

✅ **Contexto claro** - O que você vai aprender
✅ **Explicação teórica** - Conceitos fundamentais
✅ **Passo a passo** - Implementação prática
✅ **Código pronto** - Para copiar e adaptar
✅ **Checklist** - Validar aprendizado
✅ **Próximo passo** - Link para continuar
✅ **Referências** - Para aprofundar

---

## 🚨 Importante

- Documentação é **modular** - pode pular se quiser
- Código é **comentado** - explica cada linha
- Tudo é **prático** - implemente conforme aprende
- Diagramas são **visuais** - em PlantUML
- Estrutura segue **boas práticas**

---

## ❓ FAQs

**P: Por onde começo?**
R: Execute `python create_all_docs.py` e abra `docs/DATABASE/01-supabase-setup.md`

**P: Quanto tempo leva?**
R: ~3-4 horas para ler + implementar tudo

**P: Preciso de internet?**
R: Sim, para Supabase e PlantUML online

**P: Posso pular seções?**
R: Sim, mas DATABASE é obrigatório

**P: O código funciona?**
R: Sim, foi testado e validado

---

## 📞 Precisa de ajuda?

Cada arquivo tem:
- 📚 Links para documentação oficial
- 💡 Dicas práticas
- 🐛 Como debugar erros
- 📋 Checklists de validação

---

## 🎁 Bônus

Você recebeu:
- Scripts de setup automatizados
- Validador de documentação
- Diagramas prontos
- Exemplos de dados
- Checklists de teste
- Guias de debugging

---

## ✨ Próximos passos

1. Leia este arquivo (PRONTO!)
2. Execute: `python create_all_docs.py`
3. Abra: `docs/DATABASE/01-supabase-setup.md`
4. Siga os links nos documentos
5. Implemente conforme aprende
6. Teste cada etapa

---

## 🎉 Aproveite!

Você tem **tudo que precisa** para aprender e implementar uma aplicação full-stack profissional.

**Comece agora!** ⬇️

```bash
python create_all_docs.py
````

---

**Bom aprendizado! 🚀**

_Gerado automaticamente com ❤️ para o projeto ControleGastos_
