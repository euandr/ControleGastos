from fastapi import APIRouter, HTTPException, Depends
from services.categorias import InsertCategoria, BuscarCategorias,DeletarCategoria,atualizarCategoria
from schemas.categorias import createCategoria,updateCategoria
from services.auth import usuario_logado


router = APIRouter(
    prefix="/categorias",
    tags=["Categorias"]
)


@router.post("/criar_categoria")
async def criar(categoria: createCategoria, user_id: str = Depends(usuario_logado)):
    try:
        criando = InsertCategoria(user_id, categoria.nome, categoria.cor)
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

@router.get("/{id_categoria}")
async def buscar_categoria(
    id_categoria: str,
    user_id: str = Depends(usuario_logado)
):
    try:
        categoria = BuscarCategorias(user_id,id_categoria)
        return {"data": categoria}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno do servidor: {e}"
        )

@router.patch("/{id_categoria}")
async def atualizar(id_categoria: str, categoria: updateCategoria, user_id: str = Depends(usuario_logado)):
    try:
        atualizando = atualizarCategoria(id_categoria, user_id, categoria)
        if not atualizando:
            raise ValueError("Nenhum campo informado para atualização.")
        return {
            "message": "categoria atualizada com sucesso!",
            "data": atualizando
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno ao atualizar categoria. "
        )

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

# cores
# | Cor          | Hex       |
# | ------------ | --------- |
# | Laranja      | `#F59E0B` |
# | Azul         | `#3B82F6` |
# | Roxo         | `#8B5CF6` |
# | Rosa         | `#EC4899` |
# | Verde        | `#10B981` |
# | Índigo       | `#6366F1` |
# | Verde Escuro | `#4F9A5F` |
# | Azul Claro   | `#0EA5E9` |
# | Turquesa     | `#14B8A6` |
# | Vermelho     | `#EF4444` |
