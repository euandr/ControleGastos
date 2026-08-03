from database import supabase
from schemas.anotacao import CreateAnotacao,UpdateAnotacao
from datetime import datetime



def insert_anotacao(usuario_id: str, dados_anotacao: CreateAnotacao):
    # mes atual
    # mes_ref = datetime.now().strftime("%Y-%m")
    response = (
        supabase.table('anotacoes')
        .insert({"usuario_id": usuario_id, "titulo": dados_anotacao.titulo, "conteudo": dados_anotacao.conteudo,"cor":dados_anotacao.cor, "mes_ref":dados_anotacao.mes_ref})
        .execute()
    )
    return response.data[0]
    
def buscar_notas(user_id: str):
    response = (
        supabase.table("anotacoes")
        .select("id, titulo, conteudo, mes_ref, cor")
        .eq("usuario_id", user_id)
        .execute()
    )
    return response.data


def deletar_nota(usuario_id: str, id_nota: str):
    response = (
        supabase.table("anotacoes")
        .delete()
        .eq("usuario_id", usuario_id)
        .eq("id", id_nota)
        .execute()
    )
    if not response.data:
        raise ValueError("nota não existe")
    return response.data[0]

def atualizar_anotacao(usuario_id: str, id_nota: str, data_nota: UpdateAnotacao):
    
    dados_tratados = data_nota.model_dump(exclude_none=True)

    response = (
        supabase.table("anotacoes")
        .update(dados_tratados)
        .eq("id", id_nota)
        .eq("usuario_id", usuario_id)
        .execute()
    )
    if not response.data:
        raise ValueError("Transação não encontrada")
    return response.data[0]
    
