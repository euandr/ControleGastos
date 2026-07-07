from datetime import date
from pydantic import BaseModel
from typing import Optional

class CreateTransacao(BaseModel):
    descricao: str
    valor: float
    tipo: str
    natureza: str
    necessidade: bool
    metodo_pagamento: str
    data: date

class UpdateTransacao(BaseModel):
    descricao: Optional[str] = None
    valor: Optional[float] = None
    tipo: Optional[str] = None
    natureza: Optional[str] = None
    necessidade: Optional[bool] = None
    metodo_pagamento: Optional[str] = None
    data: Optional[date] = None