
from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta
import os
from jose import jwt, JWTError, ExpiredSignatureError
from fastapi import Header, HTTPException, Depends
from typing import Optional
from fastapi.security import OAuth2PasswordBearer


SECRET_KEY_ACESSO = os.getenv("TOKEN_ACESSO_SECRET_KEY_")
SECRET_KEY_EMAIL = os.getenv("TOKEN_EMAIL_SECRET_KEY")
password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="usuarios/login-form")


def Gerar_hash_senha(senha: str):
    return password_hash.hash(senha)

def Verificar_senha(senha: str, senha_hash: str):
    # return true or false se a senha é válida ou não
    return password_hash.verify(senha, senha_hash)

def criar_token_acesso(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    # header e signature são gerados automaticamente pelo jwt.encode
    token = jwt.encode(
        payload,
        SECRET_KEY_ACESSO, 
        algorithm="HS256")
    return token

def verificar_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY_ACESSO,
            algorithms=["HS256"]
        )

        return payload["sub"]

    except ExpiredSignatureError:
        return None

    except JWTError:
        return None


# dependencia
def usuario_logado(token: str =  Depends(oauth2_scheme)):
    user_id = verificar_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail=" Token inválido ou expirado"
        )
    return user_id



    
# def criar_token_confirmacao_email(user_id: str):
#     payload = {
#         "sub": user_id,
#         "exp": datetime.utcnow() + timedelta(minutes=15)
#     }
#     token = jwt.encode(payload, SECRET_KEY_ACESSO, algorithm="HS256")
#     return token

