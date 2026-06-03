# 💰 ControleGastos

Sistema web de controle de gastos pessoais desenvolvido com **React**, **FastAPI** e **Supabase**.

## 🎯 O que é?

ControleGastos é um sistema full-stack que replica e expande as funcionalidades de uma planilha Excel de controle financeiro. O modelo atual é centrado em `transacoes`, com suporte a categorias, tags e anotações por mês de referência.

## 🛠️ Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: FastAPI + Python 3.11
- **Database**: Supabase (PostgreSQL)

## 🧱 Modelo de Dados

- `usuarios` - usuários do sistema
- `transacoes` - núcleo financeiro do app
- `categorias` e `transacoes_categorias` - classificação por categorias
- `tags` e `transacoes_tags` - marcadores livres
- `anotacoes` - observações por período

## 📚 Documentação

Toda a documentação pessoal está em `/docs/`.

Os pontos de entrada mais importantes são:

- [docs/DATABASE/02-schema.md](docs/DATABASE/02-schema.md) - esquema final do banco
- [docs/DIAGRAMAS/er-diagram.md](docs/DIAGRAMAS/er-diagram.md) - ER atualizado
- [docs/PLANO.md](docs/PLANO.md) - visão geral do projeto

## 🚀 Início Rápido

### Pré-requisitos

- Python 3.11+
- Node.js 16+
- Conta Supabase

## 🎓 Aprendizado

Esta documentação foi desenvolvida para ensinar:

- Arquitetura de software
- REST APIs com FastAPI
- React com Vite
- PostgreSQL com SQLAlchemy
- Integração Frontend-Backend

## 📝 Licença

Projeto de aprendizado. Livre para modificar.

## 🔄 Fluxo recomendado

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

_Gerado automaticamente por claude Opus  para o projeto ControleGastos_
