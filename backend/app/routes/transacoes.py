from fastapi import APIRouter, HTTPException, Depends
from services.transacoes import InsertTransacao, BuscarTransacoes,DeletarTransacao, atualizarTransacao
from services.transacoes_tags import insert_trans_and_tag,atualizando_associacao
from schemas.transacao import CreateTransacao, UpdateTransacao
from services.auth import usuario_logado



router = APIRouter(
    prefix="/transacoes",
    tags=["transacoes"]
)


@router.post("/criar_transacao")
def criar_transacao(transacao: CreateTransacao, user_id: str = Depends(usuario_logado)):
    try:
        criando_Trans = InsertTransacao(user_id, transacao)

        if transacao.tags:
            inserindo_em_TransTag = insert_trans_and_tag(criando_Trans[0]["id"],transacao.tags)
        return {
            "message": "transacao criada com sucesso!",
            "data": criando_Trans,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno ao criar transacao. erro: {e}"
        )

        
@router.get("/")
def buscar_transacoes(user_id: str = Depends(usuario_logado)):
    try:
        trans = BuscarTransacoes(user_id)
        return {"data": trans}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno ao deletar transação; {e}"
        )


@router.delete("/{id_trans}")
def deletar_trans(id_trans: str, user_id: str = Depends(usuario_logado)):
    try:
        deletando = DeletarTransacao(user_id, id_trans)
        return{
            "message": "transação deletada",
            "transacao": deletando
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao deletar transação."
        )

# na edicao de tgs associadas a uma transacao
    # apagar todas as tags associadas a transacao_id
    # da insert dinovo

@router.patch("/{id_trans}")
def atualizar_trans(data_transacao: UpdateTransacao, id_trans: str, user_id: str = Depends(usuario_logado)):
    try:
        updating = atualizarTransacao(user_id, id_trans,data_transacao)
        updating_tags = atualizando_associacao(id_trans, data_transacao.tags)
        return{
            "message":"informações da transação atualizadas",
            "transacao":updating
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno ao atualizar transação; {e}"
        )



# {
#   "descricao": "lanche na cantina",
#   "id_categoria": "d0f03464-612d-44e4-82fd-0d677390fe61",
#   "tags": [
#     "id_tag_1",
#     "id_tag_2"
#   ],
#   "valor": 23,
#   "tipo": "despesa",
#   "necessidade": false,
#   "metodo_pagamento": "dinheiro",
#   "data": "2026-07-22"
# }