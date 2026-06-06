from pydantic import BaseModel

class UsersCreate(BaseModel):
    nome: str
    email: str
    senha: str
