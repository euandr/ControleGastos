# Database: Schema das Tabelas

## Tabelas principais

O projeto tem 7 tabelas:

| Tabela | Descrição |
|--------|-----------|
| `users` | Usuários |
| `months` | Meses de controle |
| `income` | Receitas |
| `expense_categories` | Categorias |
| `expenses` | Despesas |
| `deductions` | Dízimo/Investimento |
| `notes` | Anotações |

---

## Script SQL para criar todas as tabelas

Copie e execute no Supabase SQL Editor:

```sql
-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabela de meses
CREATE TABLE months (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    month DATE NOT NULL,
    total_income DECIMAL(10, 2) DEFAULT 0,
    total_expenses DECIMAL(10, 2) DEFAULT 0,
    total_deductions DECIMAL(10, 2) DEFAULT 0,
    balance DECIMAL(10, 2) DEFAULT 0,
    carry_over DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, month)
);

-- Tabela de receitas
CREATE TABLE income (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    month_id UUID NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    income_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) DEFAULT '#3498db',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name)
);

-- Tabela de despesas
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    month_id UUID NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES expense_categories(id),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    is_necessary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de deduções
CREATE TABLE deductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    month_id UUID NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    percentage DECIMAL(5, 2),
    fixed_amount DECIMAL(10, 2),
    calculated_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notas
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    month_id UUID NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX idx_months_user_id ON months(user_id);
CREATE INDEX idx_income_user_id ON income(user_id);
CREATE INDEX idx_income_month_id ON income(month_id);
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_month_id ON expenses(month_id);
CREATE INDEX idx_expenses_category_id ON expenses(category_id);
```

---

## Colunas principais

### users
- `id` - UUID único
- `email` - Email único
- `name` - Nome do usuário
- `password_hash` - Senha criptografada (bcrypt)
- `created_at` - Data de criação
- `is_active` - Se está ativo

### months
- `id` - UUID
- `user_id` - Referência ao usuário
- `month` - Data (2024-01-01 para janeiro)
- `total_income` - Soma de receitas
- `total_expenses` - Soma de despesas
- `total_deductions` - Soma de deduções
- `balance` - Saldo final
- `carry_over` - Saldo que vem do mês anterior

### income
- `id` - UUID
- `user_id` - Referência
- `month_id` - Referência ao mês
- `description` - Ex: "Salário"
- `amount` - Valor em reais
- `income_date` - Data da receita

### expenses
- `id` - UUID
- `user_id` - Referência
- `month_id` - Referência
- `category_id` - Qual categoria
- `description` - Detalhe
- `amount` - Valor
- `is_necessary` - Necessária ou não

---

## Relacionamentos

```
users (1) → (N) months
users (1) → (N) income
users (1) → (N) expenses
users (1) → (N) expense_categories
months (1) → (N) income
months (1) → (N) expenses
categories (1) → (N) expenses
```

---

## Próximo passo

➡️ [[DIAGRAMAS/er-diagram.md]] - Veja o diagrama ER visual
