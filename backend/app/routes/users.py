from fastapi import APIRouter, HTTPException
from app.schemas.users import UsersCreate
from app.services.users import InsertUser, SelectUser


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

@router.get("/")
def listUsers(id: str | None = None):
    if id is not None:
        return {"id": id}
    return SelectUser()

@router.post("/", status_code=201)
def CreateUsers(user: UsersCreate):
    try:
        add = InsertUser(user.nome, user.email, user.senha)
        return {
            "mensagem": "Usuário criado",
            "data": add,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"erro ao criar usuário: {exc}")