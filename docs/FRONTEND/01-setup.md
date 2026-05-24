# Frontend: Setup React + Vite

## O que você vai fazer

- Criar projeto React com Vite
- Instalar dependências (Axios, React Router, Recharts)
- Rodar o servidor
- Testar a estrutura básica

---

## Passo 1: Criar projeto React

```bash
npm create vite@latest frontend -- --template react
cd frontend
```

---

## Passo 2: Instalar dependências

```bash
npm install
npm install axios react-router-dom recharts
```

**package.json terá:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.18.0",
    "recharts": "^2.10.0"
  }
}
```

---

## Passo 3: Estrutura de pastas

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Income.jsx
│   │   ├── Expenses.jsx
│   │   └── Settings.jsx
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Form.jsx
│   │   └── Charts.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## Passo 4: Atualizar App.jsx

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expenses from './pages/Expenses'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

## Passo 5: Rodar

```bash
npm run dev
```

**Saída:**
```
Local: http://localhost:5173/
```

---

## Próximo passo

➡️ [[FRONTEND/02-estrutura.md]] - Organize a estrutura
