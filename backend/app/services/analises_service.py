from database import supabase
from datetime import datetime
from services.categorias import BuscarCategorias

# tipos: investimento, receita, gasto
def BuscarResumoMensal(user_id, mes):
    # 2026-07
    response = (
            supabase.table("transacoes")
            .select("tipo","valor","mes_ref")
            .eq("usuario_id", user_id)
            .execute()
        )

    def resumo():
        dados = response.data

        total_investimento = 0
        total_receita = 0
        total_gasto = 0

        saldo_disponivel = 0

        for item in dados:
            tipo = item["tipo"]
            valor = item["valor"]
            mes_ref = item["mes_ref"]

            # SALDO ACUMULADO
            if mes_ref <= mes:
                if tipo == "receita":
                    saldo_disponivel += valor

                elif tipo == "gasto":
                    saldo_disponivel -= valor

                elif tipo == "investimento":
                    saldo_disponivel -= valor

            # RESUMO DO MÊS SELECIONADO
            if mes_ref == mes:
                if tipo == "receita":
                    total_receita += valor

                elif tipo == "gasto":
                    total_gasto += valor

                elif tipo == "investimento":
                    total_investimento += valor

        return {
            "totalGasto": total_gasto,
            "totalReceita": total_receita,
            "totalInvestimento": total_investimento,
            "Sdisponivel": saldo_disponivel
        }
    return resumo()

def BuscarUltimosMeses(mes:str, user_id:str):
    # mes_atual = datetime.now().strftime("%m-%Y")   2026-07
    mes = mes
    r = {}
    for cada_mes in range(4):
        response = (
            supabase.table("transacoes")
            .select("tipo","valor")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .execute()
        )
        r.update({mes:response.data})

        mes = mes[0:5] + f"{int(mes[5:])-1:02d}"
        if mes[5:] == '00':
            mes = str(int(mes[0:4])-1) + "-12"
    return r


def ResumoGastos(mes:str, user_id:str):

    response = (
            supabase.table("transacoes")
            .select("valor","necessidade")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "gasto")
            .execute()
        )
    return response.data
    


def ResumoReceitas(mes:str, user_id:str):
    response = (
            supabase.table("transacoes")
            .select("valor", "id_categoria")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "receita")
            .execute()
        )
    return response.data

def ValorPorCategoria(mes:str, user_id:str):
    responseTransacoes = (
            supabase.table("transacoes")
            .select("valor",'id_categoria')
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "receita")
            .execute()
        ).data
    categorias = BuscarCategorias(user_id)

    resultado= []
   
    for c in categorias:
        total = 0.0

        for t in responseTransacoes:
            if c['id']==t['id_categoria']:
                total+=t['valor']

        resultado.append({
            'id':c['id'],
            'nome':c['nome'], 
            'valor_total':total
        })
    return resultado


def MesesDisponiveis(user_id:str):
    response = (
            supabase.table("transacoes")
            .select("mes_ref")
            .eq("usuario_id", user_id)
            .execute()
        ).data
    meses = set()  #set nao permite duplicidade de itens, já remove automaticamente
    for r in response:
        meses.add(r['mes_ref'])

    return meses


