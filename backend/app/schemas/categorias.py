from pydantic import BaseModel
from pydantic import BaseModel
from typing import Optional

class createCategoria(BaseModel):
    nome : str
    cor : str


class updateCategoria(BaseModel):
    nome: Optional[str] = None
    cor: Optional[str] = None

