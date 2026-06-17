from fastapi import APIRouter, HTTPException
from schemas.users import UsersCreate, UserLogin
from services.users import InsertUser, Loging
from services.auth import criar_token_acesso, verificar_token

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)



@router.post("/create_user", status_code=201)
def CreateUsers(user: UsersCreate):
    try:
        add = InsertUser(user.nome, user.email, user.senha).data
        return {
            "mensagem": "Usuário criado",
            "data": add,
        }
    except Exception:
        raise HTTPException(status_code=500, detail=f"erro ao criar usuário")

@router.post("/login")
def login_for_acess_token(user: UserLogin):
    usuario = Loging(user.email, user.senha)

    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = criar_token_acesso(usuario["id"])
    return {
        "message": "Login bem-sucedido",
        "access_token": token
    }

# @router.put   ("/esqueci_senha")