# Backend: Validações e Tratamento de Erros

## Status HTTP padrão

| Código | Significado | Exemplo |
|--------|------------|---------|
| `200` | OK | GET bem-sucedido |
| `201` | Created | POST criou recurso |
| `400` | Bad Request | Dados inválidos |
| `401` | Unauthorized | Não autenticado |
| `404` | Not Found | Recurso não existe |
| `500` | Server Error | Erro do servidor |

---

## Validações com Pydantic

```python
from pydantic import BaseModel, Field, validator
from decimal import Decimal

class IncomeCreate(BaseModel):
    description: str = Field(..., min_length=1, max_length=255)
    amount: Decimal = Field(..., gt=0)  # Deve ser > 0
    
    @validator('amount')
    def validate_amount(cls, v):
        if v > Decimal('999999.99'):
            raise ValueError('Valor muito alto')
        return v
```

---

## Tratamento de erros

Atualize `backend/app/routes/income.py`:

```python
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

@router.post("/", response_model=IncomeResponse, status_code=201)
def create_income(income: IncomeCreate, db: Session = Depends(get_db)):
    try:
        db_income = Income(**income.dict())
        db.add(db_income)
        db.commit()
        db.refresh(db_income)
        return db_income
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Dados duplicados")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{income_id}")
def get_income(income_id: str, db: Session = Depends(get_db)):
    db_income = db.query(Income).filter(Income.id == income_id).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    return db_income
```

---

## Mensagens de erro claras

```python
raise HTTPException(
    status_code=400,
    detail={
        "error": "invalid_amount",
        "message": "Valor deve ser maior que 0",
        "field": "amount"
    }
)
```

---

## Próximo passo

➡️ [[FRONTEND/01-setup.md]] - Configure o frontend
