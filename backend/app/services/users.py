
from app.database import supabase
from app.services.auth import Gerar_hash_senha, Verificar_senha


def InsertUser(nome: str, email: str, senha: str):
    senha_hash = Gerar_hash_senha(senha)
    response = (
        supabase.table("usuarios")
        .insert({"nome": nome, "email": email, "senha_hash": senha_hash})
        .execute()
    )
    return response.data

def SelectUser():
    response = (
        supabase.table("usuarios")
        .select("*")
        .execute()
    )
    return response.data

def login():
    return