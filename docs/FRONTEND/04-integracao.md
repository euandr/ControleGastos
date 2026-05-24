# Frontend: Integração com Backend

## Passo 1: Criar api.js

Crie `src/services/api.js`:

```javascript
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Funções de Income
export const incomeAPI = {
  getAll: (monthId) => api.get(`/api/income/`, { params: { month_id: monthId } }),
  create: (data) => api.post(`/api/income/`, data),
  update: (id, data) => api.put(`/api/income/${id}`, data),
  delete: (id) => api.delete(`/api/income/${id}`)
}

// Funções de Expenses
export const expenseAPI = {
  getAll: (monthId) => api.get(`/api/expenses/`, { params: { month_id: monthId } }),
  create: (data) => api.post(`/api/expenses/`, data),
  update: (id, data) => api.put(`/api/expenses/${id}`, data),
  delete: (id) => api.delete(`/api/expenses/${id}`)
}

// Funções de Categories
export const categoryAPI = {
  getAll: () => api.get(`/api/categories/`),
  create: (data) => api.post(`/api/categories/`, data)
}

export default api
```

---

## Passo 2: Usar em um componente

```jsx
import { useEffect, useState } from 'react'
import { incomeAPI } from '../services/api'

export default function Income() {
  const [income, setIncome] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadIncome()
  }, [])

  const loadIncome = async () => {
    try {
      const response = await incomeAPI.getAll('month-id-aqui')
      setIncome(response.data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data) => {
    try {
      await incomeAPI.create(data)
      loadIncome()
    } catch (error) {
      console.error('Erro ao criar:', error)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      <h1>Receitas</h1>
      <ul>
        {income.map(i => (
          <li key={i.id}>{i.description} - R${i.amount}</li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Tratamento de Erros

```javascript
try {
  await incomeAPI.create(data)
} catch (error) {
  if (error.response?.status === 400) {
    console.log('Dados inválidos:', error.response.data)
  } else {
    console.log('Erro do servidor')
  }
}
```

---

## Próximo passo

➡️ [[FRONTEND/05-paginas.md]] - Crie as páginas principais
