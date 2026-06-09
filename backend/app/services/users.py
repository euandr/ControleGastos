
from database import supabase
from services.auth import Gerar_hash_senha, Verificar_senha


def InsertUser(nome: str, email: str, senha: str):
    senha_hash = Gerar_hash_senha(senha)
    response = (
        supabase.table("usuarios")
        .insert({"nome": nome, "email": email, "senha_hash": senha_hash})
        .execute()
    )
    return response.data

def Loging(email: str, senha: str):
    response = (
        supabase.table("usuarios")
        .select('*')
        .eq("email", email)
        .execute()
    )
    logado = False
    if email == response.data[0]["email"]:
        logado = Verificar_senha(senha, response.data[0]["senha_hash"])
        
    return {
        "logado": logado,
        "message": "deu certo" if logado else "algum erro ocorreu! confirme suas credenciais."
    }

