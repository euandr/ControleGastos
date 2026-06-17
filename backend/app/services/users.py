
from database import supabase
from services.auth import Gerar_hash_senha, Verificar_senha


def InsertUser(nome: str, email: str, senha: str):
    usuario_existente = (
    supabase.table("usuarios")
    .select("id")
    .eq("email", email)
    .execute()
    )

    if usuario_existente.data:
        raise ValueError("Email já cadastrado")


    senha_hash = Gerar_hash_senha(senha)
    response = (
        supabase.table("usuarios")
        .insert({"nome": nome, "email": email, "senha_hash": senha_hash})
        .execute()
    )
    return response.data[0]

def Loging(email: str, senha: str):
    response = (
        supabase.table("usuarios")
        .select('*')
        .eq("email", email)
        .execute()
    )
    if not response.data:
        return None

    usuario = response.data[0] 
    if not Verificar_senha(senha, usuario["senha_hash"]):
        return None 
    return usuario
    
