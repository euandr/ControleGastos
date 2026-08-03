from fastapi import APIRouter, HTTPException, Depends
from services.auth import usuario_logado
from services.analytics_service import BuscarResumoMensal,BuscarUltimosMeses,ResumoGastos,ResumoReceitas,ValorPorCategoria
from datetime import datetime
import calendar

router = APIRouter(
    prefix="/analytics",
    tags=["analytics"]
)


# pagina dashboad

@router.get("/Cards_resumo-mensal") #deve passsar o mes atraves da Query string: ?mes=12/2026-07
def buscar_resumo_mensal(mes: str, user_id: str = Depends(usuario_logado)):
    # tipos: investimento, receita, gasto
   return BuscarResumoMensal(user_id, mes)


  

@router.get("/grafico_receitas-vs-despesas")
#ultimos 3 meses
def buscar_ultimos_meses(mes:str, user_id: str = Depends(usuario_logado)):
    buscando =BuscarUltimosMeses(mes, user_id)
    return buscando


# paginagastos
@router.get("/resumo-gastos")
def Buscar_resumo_gastos(mes:str, user_id: str =  Depends(usuario_logado)):
        
        dia_atual = datetime.now().day
        mes_atual = datetime.now().strftime("%m-%Y")

        if mes == mes_atual:
            divisor = dia_atual
        else:
            divisor = calendar.monthrange(int(mes[:4]), int(mes[5:]))[1]
        
        totalGasto = BuscarResumoMensal(user_id, mes)["totalGasto"]
        gastos = ResumoGastos(mes,user_id)
        qtd_gastos = len(gastos)
        media_diaria = sum(gasto["valor"] for gasto in gastos)/divisor
        gastos_necessarios = sum(gasto["valor"] for gasto in gastos if gasto["necessidade"])
        gastos_desnecessarios = sum(gasto["valor"] for gasto in gastos if not gasto["necessidade"])
        qtd_gastos_ness = len([gasto['valor'] for gasto in gastos if gasto["necessidade"]])
        qtd_gastos_desness = len([gasto['valor'] for gasto in gastos if not gasto["necessidade"]])

        return {
            "totalGasto": totalGasto,
            "quantidadeGastos": qtd_gastos,
            "mediaDiaria": media_diaria,
            "gastosNecessarios": gastos_necessarios,
            "gastosDesnecessarios": gastos_desnecessarios,
            "quantidadeNecessarios": qtd_gastos_ness,
            "quantidadeDesnecessarios": qtd_gastos_desness
            }

@router.get("/resumo_receitas")
def resumo_mensal_receitas(mes: str, user_id: str = Depends(usuario_logado)):
    resumo = ResumoReceitas(mes, user_id)
    
    total = sum([receita['valor'] for receita in resumo])
    maior_entrada = max([receita['valor'] for receita in resumo])
    qtd_receitas = len([receita['valor'] for receita in resumo])

    return resumo
    # return{
    #     "totalRecebido": total,
    #     "maiorEntrada": maior_entrada,
    #     "quantidadeReceitas": qtd_receitas
    #     }


