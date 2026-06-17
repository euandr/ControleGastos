
from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta
import os
from jose import jwt, JWTError, ExpiredSignatureError



SECRET_KEY_ACESSO = os.getenv("TOKEN_ACESSO_SECRET_KEY_")
SECRET_KEY_EMAIL = os.getenv("TOKEN_EMAIL_SECRET_KEY")
password_hash = PasswordHash.recommended()


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
    
def usuario_logado(token: str):
    pass

    
# def criar_token_confirmacao_email(user_id: str):
#     payload = {
#         "sub": user_id,
#         "exp": datetime.utcnow() + timedelta(minutes=15)
#     }
#     token = jwt.encode(payload, SECRET_KEY_ACESSO, algorithm="HS256")
#     return token

