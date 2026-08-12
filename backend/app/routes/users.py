from fastapi import APIRouter, HTTPException, Depends
from schemas.users import UsersCreate, UserLogin
from services.users import InsertUser, Loging, BuscarNomeUsuario
from services.auth import criar_token_acesso, verificar_token, usuario_logado
from fastapi.security import OAuth2PasswordRequestForm

import logging

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)
logger = logging.getLogger(__name__)


@router.post("/create_user", status_code=201)
async def CreateUsers(user: UsersCreate):
    try:
        add = InsertUser(user.nome, user.email, user.senha)
        return {
            "mensagem": "Usuário criado",
            "data": add,
        }
    except Exception as error:
        logger.error(error)
        raise HTTPException(status_code=500, detail=f"erro ao criar usuário")

# @router.post("/login")
# async def login_for_acess_token(user: UserLogin):
#     usuario = Loging(user.email, user.senha)

#     if not usuario:
#         raise HTTPException(status_code=401, detail="Credenciais inválidas")

#     token = criar_token_acesso(usuario["id"])
#     return {
#         "access_token": token,
#         "token_type": "bearer"
#     }

@router.post("/login-form")
async def login_form(dados_form: OAuth2PasswordRequestForm= Depends()):
    usuario = Loging(dados_form.username, dados_form.password)

    if not usuario:
        raise HTTPException(status_code=401 , detail="Credenciais inválidas")

    token = criar_token_acesso(usuario["id"])
    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
async def me(user_id: str = Depends(usuario_logado)):
    nome = BuscarNomeUsuario(user_id)
    return{
        "message":"voce está autenticado",
        "user_id":user_id,
        "nome": nome
    }

# @router.put   ("/esqueci_senha") 