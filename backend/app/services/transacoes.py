from database import supabase
from schemas.transacao import CreateTransacao, UpdateTransacao




def InsertTransacao(usuario_id:str, transacao: CreateTransacao ):
    mes_ref = transacao.data.strftime("%Y-%m")
    response = (
        supabase.table("transacoes")
        .insert(
            { "usuario_id": usuario_id, "id_categoria":transacao.id_categoria, "descricao":transacao.descricao, "valor": transacao.valor, "tipo": transacao.tipo, "necessidade": transacao.necessidade,"metodo_pagamento": transacao.metodo_pagamento, "data":transacao.data.isoformat(), "mes_ref": mes_ref})
            # o data poderia ser apenas: str(transacao.data)
        .execute()
    )
    return response.data  
      


def BuscarTransacoes(usuario_id: str):
    response = (
        supabase.table("transacoes")
        .select("id, descricao,valor,id_categoria,tipo, necessidade, metodo_pagamento, data, mes_ref")
        .eq("usuario_id", usuario_id)
        .execute()
    )

    for transacao in response.data:
        tags_response = (
            supabase.table("transacoes_tags")
            .select("tag_id")
            .eq("transacao_id", transacao["id"])
            .execute()
        )

        transacao["tags"] = [ item["tag_id"] for item in tags_response.data]
   
    return response.data

# {
#   "id": "1833fb5a-61cd-4cdc-b5ba-371c2514e708",
#   "descricao": "lanche na cantina",
#   "valor": 23,
#   "id_categoria": "d0f03464-612d-44e4-82fd-0d677390fe61",
#   "necessidade": false,
#   "metodo_pagamento": "dinheiro",
#   "data": "2026-07-22",
#   "mes_ref": "2026-07",
#   "tags": [
#     "a1b2c3",
#     "d4e5f6"
#   ]
# }

def DeletarTransacao(usuario_id: str, id_trans: str):
    response = (
        supabase.table("transacoes")
        .delete()
        .eq("usuario_id", usuario_id)
        .eq("id", id_trans)
        .execute()
    )
    if not response.data:
        raise ValueError("transacao não existe")
    return response.data[0]


def atualizarTransacao(usuario_id: str, id_trans: str, data_transacao: UpdateTransacao):
    #  dados retorna um dict sem os campos com valor= None
    dados = data_transacao.model_dump(exclude_none=True)
    dados.pop("tags", None)
    if "data" in dados:
        dados["data"] = dados["data"].isoformat()

    response = (
        supabase.table("transacoes")
        .update(dados)
        .eq("id", id_trans)
        .eq("usuario_id", usuario_id)
        .execute()
    )
    if not response.data:
        raise ValueError("Transação não encontrada")
    return response.data
    


