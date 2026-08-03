from datetime import date
from pydantic import BaseModel, Field
from typing import Optional

class CreateTransacao(BaseModel):
    descricao: str
    id_categoria: str
    valor: float
    tipo: str
    necessidade: bool
    metodo_pagamento: str
    tags: list[str] = Field(default_factory=list)
    data: date

class UpdateTransacao(BaseModel):
    descricao: Optional[str] = None
    valor: Optional[float] = None
    necessidade: Optional[bool] = None
    metodo_pagamento: Optional[str] = None
    data: Optional[date] = None
    tags: Optional[list[str]] = None