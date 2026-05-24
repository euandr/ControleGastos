# Frontend: Páginas Principais

## Passo 1: Dashboard.jsx

Crie `src/pages/Dashboard.jsx`:

```jsx
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { incomeAPI, expenseAPI } from '../services/api'

export default function Dashboard() {
  const [month, setMonth] = useState(null)
  const [monthId] = useState('seu-month-id')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const incomeData = await incomeAPI.getAll(monthId)
      const expenseData = await expenseAPI.getAll(monthId)
      
      const totalIncome = incomeData.data.reduce((sum, i) => sum + parseFloat(i.amount), 0)
      const totalExpense = expenseData.data.reduce((sum, e) => sum + parseFloat(e.amount), 0)
      
      setMonth({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      })
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Card title="Receitas">
          <p className="text-2xl font-bold text-green-600">
            R$ {month?.totalIncome?.toFixed(2) || '0.00'}
          </p>
        </Card>
        
        <Card title="Despesas">
          <p className="text-2xl font-bold text-red-600">
            R$ {month?.totalExpense?.toFixed(2) || '0.00'}
          </p>
        </Card>
        
        <Card title="Saldo">
          <p className="text-2xl font-bold text-blue-600">
            R$ {month?.balance?.toFixed(2) || '0.00'}
          </p>
        </Card>
      </div>
    </div>
  )
}
```

---

## Passo 2: Income.jsx

Crie `src/pages/Income.jsx`:

```jsx
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Form from '../components/Form'
import { incomeAPI } from '../services/api'

export default function Income() {
  const [income, setIncome] = useState([])
  const [monthId] = useState('seu-month-id')

  useEffect(() => {
    loadIncome()
  }, [])

  const loadIncome = async () => {
    try {
      const response = await incomeAPI.getAll(monthId)
      setIncome(response.data)
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const handleCreate = async (data) => {
    try {
      await incomeAPI.create({
        ...data,
        month_id: monthId,
        amount: parseFloat(data.amount)
      })
      loadIncome()
    } catch (error) {
      alert('Erro ao criar receita')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deletar?')) {
      await incomeAPI.delete(id)
      loadIncome()
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Receitas</h1>
      
      <Card title="Adicionar Receita">
        <Form
          fields={[
            { name: 'description', label: 'Descrição', type: 'text', required: true },
            { name: 'amount', label: 'Valor', type: 'number', required: true },
            { name: 'income_date', label: 'Data', type: 'date', required: true }
          ]}
          onSubmit={handleCreate}
          buttonText="Adicionar"
        />
      </Card>

      <Card title="Minhas Receitas">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left">Descrição</th>
              <th className="text-right">Valor</th>
              <th className="text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {income.map(i => (
              <tr key={i.id} className="border-b hover:bg-gray-100">
                <td>{i.description}</td>
                <td className="text-right">R$ {parseFloat(i.amount).toFixed(2)}</td>
                <td className="text-right">
                  <button onClick={() => handleDelete(i.id)} className="text-red-600">
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
```

---

## Passo 3: Expenses.jsx

Similar a Income.jsx mas para despesas.

---

## Próximo passo

➡️ [[FRONTEND/06-graficos.md]] - Crie gráficos com Recharts
