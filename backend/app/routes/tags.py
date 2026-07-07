from fastapi import APIRouter, HTTPException, Depends
from services.tags import InsertTag, BuscarTags,DeletarTag
from schemas.tag import createTag
from services.auth import usuario_logado


router = APIRouter(
    prefix="/tags",
    tags=["tags"]
)


@router.post("/criar_tag")
async def criar(tag: createTag, user_id: str = Depends(usuario_logado)):
    try:
        criando = InsertTag(user_id, tag.nome)
        return {
            "message": "tag criada com susseso!",
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
            detail="Erro interno ao criar tag."
        )

        
@router.get("/")
async def buscar_tags(user_id: str = Depends(usuario_logado)):
    tags = BuscarTags(user_id)
    return {"data": tags}


@router.delete("/{id_tag}")
async def deletar(id_tag: str, user_id: str = Depends(usuario_logado)):
    try:
        deletando = DeletarTag(user_id, id_tag)
        return{
            "message": "tag deletada",
            "categoria": deletando
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao deletar tag."
        )

