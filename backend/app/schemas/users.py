from pydantic import BaseModel

class UsersCreate(BaseModel):
    nome: str
    email: str
    senha: str

class UserLogin(BaseModel):
    email: str
    senha: str