from database import supabase


def insert_trans_and_tag(id_trans:str, ids_tags: list[str]):
    for tag_id in ids_tags:
        response = (
            supabase.table("transacoes_tags")
            .insert({ "transacao_id": id_trans, "tag_id": tag_id})
            .execute()
        )



def atualizando_associacao(id_trans:str, ids_tags: list[str]):
    if ids_tags is None:
        return
    response = (
            supabase.table("transacoes_tags")
            .delete()
            .eq("transacao_id", id_trans)
            .execute()
        )
    for tag_id in ids_tags:
        response = (
            supabase.table("transacoes_tags")
            .insert({ "transacao_id": id_trans, "tag_id": tag_id})
            .execute()
        )

    