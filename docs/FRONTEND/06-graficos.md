# Frontend: Gráficos com Recharts

## Passo 1: Gráfico Pizza (Necessárias vs Não-necessárias)

```jsx
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

export default function NecessaryChart({ expenses }) {
  const necessary = expenses.filter(e => e.is_necessary).reduce((s, e) => s + parseFloat(e.amount), 0)
  const unnecessary = expenses.filter(e => !e.is_necessary).reduce((s, e) => s + parseFloat(e.amount), 0)

  const data = [
    { name: 'Necessárias', value: necessary },
    { name: 'Não-necessárias', value: unnecessary }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} label>
          <Cell fill="#10b981" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

---

## Passo 2: Gráfico Barras (Por Categoria)

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CategoryChart({ expenses }) {
  const byCategory = {}
  expenses.forEach(e => {
    const cat = e.category
    byCategory[cat] = (byCategory[cat] || 0) + parseFloat(e.amount)
  })

  const data = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

---

## Passo 3: Gráfico Linha (Fluxo)

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function FlowChart({ months }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={months}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_income" stroke="#10b981" />
        <Line type="monotone" dataKey="total_expenses" stroke="#ef4444" />
        <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

## Próximo passo

➡️ [[FRONTEND/07-testes.md]] - Teste tudo junto
