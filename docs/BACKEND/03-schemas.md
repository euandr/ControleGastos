# Backend: Schemas Pydantic

## O que são Schemas?

Schemas validam dados que vêm do HTTP e definem o formato da resposta.

---

## Passo 1: Criar IncomeSchema

Crie `backend/app/schemas/income_schema.py`:

```python
from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional
import uuid

class IncomeCreate(BaseModel):
    user_id: uuid.UUID
    month_id: uuid.UUID
    description: str = Field(..., min_length=1, max_length=255)
    amount: Decimal = Field(..., gt=0)
    income_date: date

class IncomeUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    income_date: Optional[date] = None

class IncomeResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    month_id: uuid.UUID
    description: str
    amount: Decimal
    income_date: date
    created_at: str

    class Config:
        from_attributes = True
```

---

## Passo 2: Criar ExpenseSchema

Crie `backend/app/schemas/expense_schema.py`:

```python
from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional
import uuid

class ExpenseCreate(BaseModel):
    user_id: uuid.UUID
    month_id: uuid.UUID
    category_id: uuid.UUID
    description: str = Field(..., min_length=1)
    amount: Decimal = Field(..., gt=0)
    expense_date: date
    is_necessary: bool = True

class ExpenseUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    category_id: Optional[uuid.UUID] = None
    is_necessary: Optional[bool] = None

class ExpenseResponse(BaseModel):
    id: uuid.UUID
    description: str
    amount: Decimal
    category_id: uuid.UUID
    is_necessary: bool

    class Config:
        from_attributes = True
```

---

## Passo 3: Criar CategorySchema

Crie `backend/app/schemas/category_schema.py`:

```python
from pydantic import BaseModel, Field
from typing import Optional
import uuid

class CategoryCreate(BaseModel):
    user_id: uuid.UUID
    name: str = Field(..., min_length=1, max_length=100)
    color: str = Field(default="#3498db")

class CategoryResponse(BaseModel):
    id: uuid.UUID
    name: str
    color: str

    class Config:
        from_attributes = True
```

---

## Diferença entre Model e Schema

| Model | Schema |
|-------|--------|
| Representa tabela BD | Valida dados HTTP |
| SQLAlchemy | Pydantic |
| Persistência | Validação |
| `app/models/user.py` | `app/schemas/user_schema.py` |

---

## Próximo passo

➡️ [[BACKEND/04-routes.md]] - Crie os endpoints
