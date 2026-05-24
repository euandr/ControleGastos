# Frontend: Estrutura de Pastas

## Organização

```
src/
├── pages/           # Páginas (rotas)
├── components/      # Componentes reutilizáveis
├── services/        # Chamadas HTTP
├── hooks/           # Hooks customizados
├── context/         # Estado global
├── styles/          # CSS/Tailwind
├── utils/           # Funções auxiliares
├── App.jsx
└── main.jsx
```

---

## O que vai em cada pasta

### pages/
Componentes de página (uma por rota):
- `Dashboard.jsx` - Resumo do mês
- `Income.jsx` - Gerenciar receitas
- `Expenses.jsx` - Gerenciar despesas
- `Settings.jsx` - Configurações

### components/
Componentes reutilizáveis:
- `Button.jsx` - Botão genérico
- `Card.jsx` - Card/caixa
- `Form.jsx` - Formulário
- `Charts.jsx` - Gráficos

### services/
APIs:
- `api.js` - Configurar Axios

### hooks/
Hooks customizados:
- `useIncomeData.js` - Hook para receitas
- `useExpenses.js` - Hook para despesas

### context/
Estado global:
- `MonthContext.js` - Mês atual
- `AuthContext.js` - Autenticação

---

## Próximo passo

➡️ [[FRONTEND/03-componentes.md]] - Crie componentes base
