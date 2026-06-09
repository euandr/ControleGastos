
from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta
import os


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
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }
    token = jwt.encode(payload, SECRET_KEY_ACESSO, algorithm="HS256")
    return token


def criar_token_confirmacao_email(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }
    token = jwt.encode(payload, SECRET_KEY_ACESSO, algorithm="HS256")
    return token

def Logar_usuario(user_id: str):
    token_acesso = criar_token_acesso(user_id)
    return token_acesso