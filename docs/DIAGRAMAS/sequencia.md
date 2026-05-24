# Diagramas: Sequência de Operações

## Diagrama 1: Criar Receita

```
Browser → Backend: POST /api/income
Backend → Database: INSERT income
Database → Backend: ✓ Sucesso
Backend → Database: UPDATE months (recalcula totais)
Backend → Browser: 201 Created (dados atualizados)
Browser → Browser: Atualiza gráficos
```

## Diagrama 2: Calcular Saldo

```
Backend: Busca todas as receitas do mês
Backend: Busca todas as despesas do mês
Backend: Busca todas as deduções do mês
Backend → Database: UPDATE months
  total_income = SUM(income)
  total_expenses = SUM(expenses)
  total_deductions = SUM(deductions)
  balance = total_income - total_expenses - total_deductions
Database: ✓ Atualizado
```

## Diagrama 3: Visualizar Gráficos

```
Browser: GET /api/analytics/?month=2024-01
Backend → Database: SELECT expenses, SUM por categoria
Database → Backend: Dados agrupados
Backend → Database: SELECT receitas vs despesas
Database → Backend: Resumo financeiro
Backend → Browser: JSON com dados dos gráficos
Browser: Renderiza 3 gráficos com Recharts
```

---

## Fórmulas

```
balance = total_income - total_expenses - total_deductions
liquid = balance - carry_over_anterior
```

---

## Próximo passo

➡️ [[DIAGRAMAS/componentes.md]] - Veja a arquitetura
