# Backend: Models SQLAlchemy

## O que são Models?

Models são classes Python que representam tabelas do banco de dados.

---

## Passo 1: Criar conexão ao banco

Crie `backend/app/database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## Passo 2: Criar User Model

Crie `backend/app/models/user.py`:

```python
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True)
    name = Column(String(255))
    password_hash = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    # Relacionamentos
    months = relationship("Month", back_populates="user")
    income = relationship("Income", back_populates="user")
    expenses = relationship("Expense", back_populates="user")
```

---

## Passo 3: Criar Month Model

Crie `backend/app/models/month.py`:

```python
from sqlalchemy import Column, Date, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database import Base

class Month(Base):
    __tablename__ = "months"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    month = Column(Date, nullable=False)
    total_income = Column(Numeric(10, 2), default=0)
    total_expenses = Column(Numeric(10, 2), default=0)
    total_deductions = Column(Numeric(10, 2), default=0)
    balance = Column(Numeric(10, 2), default=0)
    carry_over = Column(Numeric(10, 2), default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship("User", back_populates="months")
    income = relationship("Income", back_populates="month")
    expenses = relationship("Expense", back_populates="month")
```

---

## Passo 4: Criar Income Model

Crie `backend/app/models/income.py`:

```python
from sqlalchemy import Column, String, Numeric, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database import Base

class Income(Base):
    __tablename__ = "income"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    month_id = Column(UUID(as_uuid=True), ForeignKey("months.id"))
    description = Column(String(255), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    income_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship("User", back_populates="income")
    month = relationship("Month", back_populates="income")
```

---

## Passo 5: Criar __init__.py

Crie `backend/app/models/__init__.py`:

```python
from app.models.user import User
from app.models.month import Month
from app.models.income import Income
# Importar outros models aqui
```

---

## Próximo passo

➡️ [[BACKEND/03-schemas.md]] - Crie os schemas Pydantic
