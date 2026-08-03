from database import supabase
from schemas.categorias import updateCategoria


def InsertCategoria(usuario_id:str, nome:str, cor:str):
    categoria_existente =(
        supabase.table("categorias")
        .select("id")
        .eq("usuario_id", usuario_id)
        .eq("nome", nome)
        .execute()
        )

    if categoria_existente.data:
        raise ValueError("Categoria ja existe")

    response = (
        supabase.table("categorias")
        .insert({ "usuario_id": usuario_id, "nome": nome, "cor": cor})
        .execute()
    )
    return response.data[0]




def BuscarCategorias(usuario_id: str, id_categoria: str | None =None):
    if id_categoria != None:
        response = (
            supabase.table("categorias")
            .select("id, nome, cor, transacoes(count)")
            .eq("usuario_id", usuario_id)
            .eq("id", id_categoria)
            .execute()
        )
    else:
        response = (
            supabase.table("categorias")
            .select("id, nome, cor, transacoes(count)")
            .eq("usuario_id", usuario_id)
            .execute()
        )
        
    dados_limpos = [
        {
            "id": item["id"],
            "nome": item["nome"],
            "cor": item["cor"],
            "quantidade_transacoes":item["transacoes"][0]["count"]
        }
        for item in response.data
    ]
    return dados_limpos




def DeletarCategoria(usuario_id: str, id_categoria: str):
    response = (
        supabase.table("categorias")
        .delete()
        .eq("usuario_id", usuario_id)
        .eq("id", id_categoria)
        .execute()
    )
    if not response.data:
        raise ValueError("Categoria não existe")
    return response.data[0]
    

def atualizarCategoria(id_categoria: str, usuario_id: str, data_categoria: updateCategoria):
    #  dados retorna um dict sem os campos com valor= None
    dados = data_categoria.model_dump(exclude_none=True)

    response = (
        supabase.table("categorias")
        .update(dados)
        .eq("id", id_categoria)
        .eq("usuario_id", usuario_id)
        .execute()
    )
    if not response.data:
        raise ValueError(f"categoria não encontrada ")
    return response.data[0]
    