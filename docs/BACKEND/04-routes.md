# Backend: Routes (Endpoints)

## O que são Routes?

Routes são endpoints HTTP que recebem requisições e retornam respostas.

---

## Passo 1: Criar Income Routes

Crie `backend/app/routes/income.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.income import Income
from app.schemas.income_schema import IncomeCreate, IncomeResponse
from typing import List

router = APIRouter(prefix="/api/income", tags=["income"])

@router.get("/", response_model=List[IncomeResponse])
def get_income(month_id: str, db: Session = Depends(get_db)):
    income = db.query(Income).filter(Income.month_id == month_id).all()
    return income

@router.post("/", response_model=IncomeResponse, status_code=201)
def create_income(income: IncomeCreate, db: Session = Depends(get_db)):
    db_income = Income(**income.dict())
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@router.put("/{income_id}", response_model=IncomeResponse)
def update_income(income_id: str, income: IncomeCreate, db: Session = Depends(get_db)):
    db_income = db.query(Income).filter(Income.id == income_id).first()
    if not db_income:
        return {"error": "Receita não encontrada"}, 404
    
    for key, value in income.dict().items():
        setattr(db_income, key, value)
    
    db.commit()
    db.refresh(db_income)
    return db_income

@router.delete("/{income_id}", status_code=204)
def delete_income(income_id: str, db: Session = Depends(get_db)):
    db_income = db.query(Income).filter(Income.id == income_id).first()
    if db_income:
        db.delete(db_income)
        db.commit()
    return None
```

---

## Passo 2: Criar Expense Routes

Crie `backend/app/routes/expenses.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.expense import Expense
from app.schemas.expense_schema import ExpenseCreate, ExpenseResponse
from typing import List

router = APIRouter(prefix="/api/expenses", tags=["expenses"])

@router.get("/", response_model=List[ExpenseResponse])
def get_expenses(month_id: str, db: Session = Depends(get_db)):
    expenses = db.query(Expense).filter(Expense.month_id == month_id).all()
    return expenses

@router.post("/", response_model=ExpenseResponse, status_code=201)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: str, expense: ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not db_expense:
        return {"error": "Despesa não encontrada"}, 404
    
    for key, value in expense.dict().items():
        setattr(db_expense, key, value)
    
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.delete("/{expense_id}", status_code=204)
def delete_expense(expense_id: str, db: Session = Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense:
        db.delete(db_expense)
        db.commit()
    return None
```

---

## Passo 3: Registrar Routes no main.py

Atualize `backend/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import income, expenses
from app.database import Base, engine

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ControleGastos API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rotas
app.include_router(income.router)
app.include_router(expenses.router)

@app.get("/")
def read_root():
    return {"message": "✓ API rodando!"}
```

---

## Próximo passo

➡️ [[BACKEND/05-services.md]] - Implemente a lógica de negócio
