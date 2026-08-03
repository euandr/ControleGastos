from fastapi import APIRouter, HTTPException, Depends
from schemas.anotacao import CreateAnotacao,UpdateAnotacao
from services.auth import usuario_logado
from services.anotacoes import insert_anotacao, buscar_notas,deletar_nota,atualizar_anotacao

router = APIRouter(
    prefix="/anotacoes",
    tags=["anotacoes"]
)

@router.post("/criar_anotacao")
def criar_anotacao(dados_anotacao: CreateAnotacao, user_id: str = Depends(usuario_logado)):
    try:
        criando_anotacao = insert_anotacao(user_id, dados_anotacao)
        return{ 
            "message": "anotacao criada",
            "data":criando_anotacao
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
            # detail="Erro interno ao criar anotacao."
        )

@router.get("/")
def buscar_anotacoes(user_id: str = Depends(usuario_logado)):
    notas = buscar_notas(user_id)
    return{ "data":notas}

@router.delete("/{id_nota}")
def delet_anotacao(id_nota: str, user_id: str = Depends(usuario_logado)):
    try:
        deletando = deletar_nota(user_id, id_nota)
        return{
            "message": "nota deletada",
            "data": deletando
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao deletar nota."
        )


@router.patch("/{id_nota}")
def atualizar_nota(id_nota:str, data_nota:UpdateAnotacao,  user_id: str = Depends(usuario_logado)):  
    try:
        updating_nota = atualizar_anotacao(user_id, id_nota,data_nota)
        return{
            "message":"informações da anotacao atualizadas",
            "anotacao":updating_nota
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
            # detail="Erro interno ao atualizar a anotacao."
        )



