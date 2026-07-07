from fastapi import APIRouter, HTTPException, Depends
from services.transacoes import InsertTransacao, BuscarTransacoes,DeletarTransacao, atualizarTransacao
from schemas.transacao import CreateTransacao, UpdateTransacao
from services.auth import usuario_logado



router = APIRouter(
    prefix="/transacoes",
    tags=["transacoes"]
)


@router.post("/criar_transacao")
def criar_transacao(transacao: CreateTransacao, user_id: str = Depends(usuario_logado)):
    try:
        criando = InsertTransacao(user_id, transacao)
        return {
            "message": "transacao criada com susseso!",
            "data": criando
        }

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao criar transacao."
        )

        
@router.get("/")
def buscar_transacoes(user_id: str = Depends(usuario_logado)):
    trans = BuscarTransacoes(user_id)
    return {"data": trans}


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

@router.patch("/{id_trans}")
def atualizar_trans(data_transacao: UpdateTransacao, id_trans: str, user_id: str = Depends(usuario_logado)):

    try:
        updating = atualizarTransacao(user_id, id_trans,data_transacao)
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
            detail="Erro interno ao atualizar transação."
        )


