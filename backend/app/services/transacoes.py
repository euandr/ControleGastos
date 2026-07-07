from database import supabase
from schemas.transacao import CreateTransacao, UpdateTransacao




def InsertTransacao(usuario_id:str, transacao: CreateTransacao ):
    mes_ref = transacao.data.strftime("%Y-%m")
    response = (
        supabase.table("transacoes")
        .insert(
            { "usuario_id": usuario_id, "descricao":transacao.descricao, "valor": transacao.valor, "tipo": transacao.tipo, "natureza": transacao.natureza, "necessidade": transacao.necessidade,"metodo_pagamento": transacao.metodo_pagamento, "data":transacao.data.isoformat(), "mes_ref": mes_ref})
            # o data poderia ser apenas: str(transacao.data)
        .execute()
    )
    return response.data[0]  
      


def BuscarTransacoes(usuario_id: str):
    response = (
        supabase.table("transacoes")
        .select("id, descricao")
        .eq("usuario_id", usuario_id)
        .execute()
    )
    return response.data


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

    response = (
    supabase.table("transacoes")
    .update(dados)
    .eq("id", id_trans)
    .eq("usuario_id", usuario_id)
    .execute()
)
    if not response.data:
        raise ValueError("Transação não encontrada")
    return response.data[0]
    
