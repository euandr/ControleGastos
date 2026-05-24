# Frontend: Componentes Base

## Passo 1: Button.jsx

Crie `src/components/Button.jsx`:

```jsx
export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const baseClass = "px-4 py-2 rounded font-semibold"
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600"
  }

  return (
    <button 
      type={type} 
      onClick={onClick}
      className={`${baseClass} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}
```

---

## Passo 2: Card.jsx

Crie `src/components/Card.jsx`:

```jsx
export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
      {children}
    </div>
  )
}
```

---

## Passo 3: Form.jsx

Crie `src/components/Form.jsx`:

```jsx
import { useState } from 'react'

export default function Form({ fields, onSubmit, buttonText = "Salvar" }) {
  const [data, setData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
    setData({})
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block font-semibold">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={data[field.name] || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required={field.required}
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {buttonText}
      </button>
    </form>
  )
}
```

---

## Props e State

- **Props**: Dados passados do pai
- **State**: Dados locais com `useState`

---

## Próximo passo

➡️ [[FRONTEND/04-integracao.md]] - Conecte ao backend
