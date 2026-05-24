# Backend: Services (Lógica de Negócio)

## O que são Services?

Services contêm a lógica de negócio, separada das rotas.

---

## Passo 1: Income Service

Crie `backend/app/services/income_service.py`:

```python
from sqlalchemy.orm import Session
from decimal import Decimal
from app.models.income import Income
from app.models.month import Month

def create_income(db: Session, user_id, month_id, description, amount, income_date):
    # Validar
    if amount <= 0:
        raise ValueError("Valor deve ser positivo")
    
    # Criar receita
    income = Income(
        user_id=user_id,
        month_id=month_id,
        description=description,
        amount=amount,
        income_date=income_date
    )
    db.add(income)
    
    # Recalcular saldo do mês
    recalculate_month(db, month_id)
    
    db.commit()
    return income

def recalculate_month(db: Session, month_id):
    from sqlalchemy import func
    
    month = db.query(Month).filter(Month.id == month_id).first()
    if not month:
        return
    
    # Calcular totais
    total_income = db.query(func.sum(Income.amount)).filter(
        Income.month_id == month_id
    ).scalar() or 0
    
    total_expenses = db.query(func.sum(Expense.amount)).filter(
        Expense.month_id == month_id
    ).scalar() or 0
    
    total_deductions = db.query(func.sum(Deduction.calculated_amount)).filter(
        Deduction.month_id == month_id
    ).scalar() or 0
    
    # Atualizar
    month.total_income = Decimal(str(total_income))
    month.total_expenses = Decimal(str(total_expenses))
    month.total_deductions = Decimal(str(total_deductions))
    month.balance = month.total_income - month.total_expenses - month.total_deductions
    
    db.commit()
```

---

## Passo 2: Deduction Service

Crie `backend/app/services/deduction_service.py`:

```python
from sqlalchemy.orm import Session
from decimal import Decimal
from app.models.deduction import Deduction
from app.models.month import Month

def create_deduction(db: Session, user_id, month_id, deduction_type, percentage=None, fixed_amount=None):
    month = db.query(Month).filter(Month.id == month_id).first()
    
    if percentage:
        calculated = (month.total_income * Decimal(str(percentage))) / 100
    else:
        calculated = fixed_amount
    
    deduction = Deduction(
        user_id=user_id,
        month_id=month_id,
        type=deduction_type,
        percentage=percentage,
        fixed_amount=fixed_amount,
        calculated_amount=calculated
    )
    
    db.add(deduction)
    db.commit()
    return deduction

def apply_deduction(db: Session, month_id, deduction_type, amount):
    """Aplica deduções ao mês (Dízimo, Investimento, etc)"""
    deduction = Deduction(
        month_id=month_id,
        type=deduction_type,
        fixed_amount=amount,
        calculated_amount=amount
    )
    db.add(deduction)
    db.commit()
    return deduction
```

---

## Fórmulas principais

```python
# Saldo final
balance = total_income - total_expenses - total_deductions

# Restante líquido (considerando carry_over anterior)
liquid = balance - carry_over_from_previous_month

# Carry-over para próximo mês
next_month_carry_over = balance

# Dízimo (por percentual)
dizimo = total_income * (percentage / 100)

# Investimento (fixo)
investimento = fixed_amount
```

---

## Próximo passo

➡️ [[BACKEND/06-testes.md]] - Teste os endpoints
