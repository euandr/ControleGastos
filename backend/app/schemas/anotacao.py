from pydantic import BaseModel, Field
from typing import Optional


class CreateAnotacao(BaseModel):
    titulo: str
    conteudo: str
    cor: str
    mes_ref: str = Field(pattern=r"^\d{4}-(0[1-9]|1[0-2])$")
    
class UpdateAnotacao(BaseModel):
    titulo: Optional[str] = None
    conteudo: Optional[str] = None
    cor: Optional[str] = None
    mes_ref: Optional[str] = Field(
        default=None,
        pattern=r"^\d{4}-(0[1-9]|1[0-2])$"
    )