from database import supabase
from datetime import datetime
from services.categorias import BuscarCategorias

# tipos: investimento, receita, gasto
def BuscarResumoMensal(user_id, mes):
    # 2026-07
    response = (
            supabase.table("transacoes")
            .select("tipo","valor")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .execute()
        )

    def resumo():
        dados = response.data

        total_investimento = 0
        total_receita = 0
        total_gasto = 0

        for item in dados:
            if item["tipo"] == "investimento":
                total_investimento += item["valor"]

            elif item["tipo"] == "receita":
                total_receita += item["valor"]

            elif item["tipo"] == "gasto":
                total_gasto += item["valor"]

        return {
            "totalGasto": total_gasto,
            "totalReceita": total_receita,
            "totalInvestimento": total_investimento,
            "Sdisponivel": total_receita - total_gasto - total_investimento
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


def ResumoGastos(mes, user_id):

    response = (
            supabase.table("transacoes")
            .select("valor","necessidade")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "gasto")
            .execute()
        )
    return response.data
    


def ResumoReceitas(mes, user_id):
    response = (
            supabase.table("transacoes")
            .select("valor", "id_categoria")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "receita")
            .execute()
        )
    return response.data

def ValorPorCategoria(id_categoria, mes, user_id):
    response = (
            supabase.table("transacoes")
            .select("valor")
            .eq("usuario_id", user_id)
            .eq("mes_ref", mes)
            .eq("tipo", "receita")
            .eq("id_categoria", id_categoria)
            .execute()
        )
    nomeCategoria = BuscarCategorias(user_id,id_categoria).data[0]["nome"]
    return response.data


# entrada = id_categoria, mes, user_id
# sairda = {
#     categoria1 : 22,
#     categoria2: 23,
# }




