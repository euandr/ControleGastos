from database import supabase



def InsertTag(usuario_id:str, nome_tag:str):
    tag_existente =(supabase.table("tags")
        .select("id")
        .eq("usuario_id", usuario_id)
        .eq("nome", nome_tag)
        .execute()
        )

    if tag_existente.data:
        raise ValueError("tag ja existe")

    response = (
        supabase.table("tags")
        .insert({ "usuario_id": usuario_id, "nome": nome_tag})
        .execute()
    )
    return response.data[0]


def BuscarTags(usuario_id: str):
    response = (
        supabase.table("tags")
        .select("id, nome")
        .eq("usuario_id", usuario_id)
        .execute()
    )
    return response.data


def DeletarTag(usuario_id: str, id_tag: str):
    response = (
        supabase.table("tags")
        .delete()
        .eq("usuario_id", usuario_id)
        .eq("id", id_tag)
        .execute()
    )
    if not response.data:
        raise ValueError("tag não existe")
    return response.data[0]
    
    
