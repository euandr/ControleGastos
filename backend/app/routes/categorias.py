from fastapi import APIRouter, HTTPException, Depends
from services.categorias import InsertCategoria, BuscarCategorias,DeletarCategoria
from schemas.categorias import createCategoria
from services.auth import usuario_logado


router = APIRouter(
    prefix="/categorias",
    tags=["Categorias"]
)


@router.post("/criar_categoria")
async def criar( categoria: createCategoria, user_id: str = Depends(usuario_logado)):
    try:
        criando = InsertCategoria(user_id, categoria.nome)
        return {
            "message": "categoria criada com susseso!",
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
            detail="Erro interno ao criar categoria."
        )

        
@router.get("/")
async def buscar_categorias(user_id: str = Depends(usuario_logado)):
    categorias = BuscarCategorias(user_id)
    return {"data": categorias}

@router.delete("/{id_categoria}")
async def deletar(id_categoria: str, user_id: str = Depends(usuario_logado)):
    try:
        deletando = DeletarCategoria(user_id, id_categoria)
        return{
            "message": "categoria deletada",
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
            detail="Erro interno ao deletar categoria."
        )

