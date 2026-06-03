# Diagramas: Sequência de Operações

## Diagrama 1: Criar Transação

```
Browser → Backend: POST /api/transacoes
Backend → Database: INSERT transacoes
Database → Backend: ✓ Sucesso
Backend → Database: INSERT transacoes_categorias / transacoes_tags (se houver)
Backend → Browser: 201 Created (dados atualizados)
Browser → Browser: Atualiza dashboard e gráficos
```

## Diagrama 2: Calcular Resumo Mensal

```
Backend: Busca transacoes por usuario_id e mes_ref
Backend: Agrupa por tipo, necessidade, natureza, categoria e tags
Backend → Database: SELECT SUM(valor)
  receita = transacoes.tipo = 'receita'
  despesa = transacoes.tipo = 'despesa'
  investimento = transacoes.tipo = 'investimento'
  saldo = receita - despesa - investimento
Database: ✓ Resumo calculado
```

## Diagrama 3: Visualizar Gráficos

```
Browser: GET /api/analytics/?mes_ref=2026-01
Backend → Database: SELECT transacoes filtradas por mes_ref
Database → Backend: Dados agrupados por categoria, tag e necessidade
Backend → Browser: JSON com dados dos gráficos
Browser: Renderiza gráficos com Recharts
```

---

## Fórmulas

```
receitas = SUM(valor) WHERE tipo = 'receita'
despesas = SUM(valor) WHERE tipo = 'despesa'
investimentos = SUM(valor) WHERE tipo = 'investimento'
saldo = receitas - despesas - investimentos
despesas_necessarias = SUM(valor) WHERE tipo = 'despesa' AND necessidade = true
despesas_nao_necessarias = SUM(valor) WHERE tipo = 'despesa' AND necessidade = false
```

---

## Próximo passo

➡️ [[DIAGRAMAS/componentes.md]] - Veja a arquitetura
