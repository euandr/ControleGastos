from database import supabase



def InsertCategoria(usuario_id:str, nome:str):
    categoria_existente =( supabase.table("categorias")
        .select("id")
        .eq("usuario_id", usuario_id)
        .eq("nome", nome)
        .execute()
        )

    if categoria_existente.data:
        raise ValueError("Categoria ja existe")
    
    
    return response.data[0]

def BuscarCategorias(usuario_id: str):
    response = (
        supabase.table("categorias")
        .select("id, nome")
        .eq("usuario_id", usuario_id)
        .execute()
    )
    return response.data

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
    
    
