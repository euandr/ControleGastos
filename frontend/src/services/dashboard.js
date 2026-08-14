import api from "../api";
 let nome_meses = [
   "Janeiro",
   "Fevereiro",
   "Março",
   "Abril",
   "Maio",
   "Junho",
   "Julho",
   "Agosto",
   "Setembro",
   "Outubro",
   "Novembro",
   "Dezembro",
 ];

export async function MesesDisponiveis() {
  const response = await api.get("/analises/meses_disponiveis");
  return response.data.meses;
}

export async function buscarNome() {
  const response = await api.get("/usuarios/me");
  return response.data.nome;
}

export async function buscarResumo(mes) {
  const response = await api.get(`/analises/Cards_resumo-mensal?mes=${mes}`);
  return response.data;
}

export async function ultimosTresMeses(mes) {
  const response = await api.get(
    `/analises/grafico_receitas-vs-despesas?mes=${mes}`,
  );
  let maior_valor = 0;
  let resposta_formatada = [];

  for (const [mes, transacoes] of Object.entries(response.data)) {
    let receitas = 0;
    let despesas = 0;

    for (const transacao of transacoes) {
      if (transacao.tipo === "receita") {
        receitas += transacao.valor;
      } else if (transacao.tipo === "gasto") {
        despesas += transacao.valor;
      }

    }

    if (receitas > maior_valor) {
      maior_valor = receitas;
    }
    if (despesas > maior_valor) {
      maior_valor = despesas;
    }
  
    resposta_formatada.push({
      month: nome_meses[parseInt(mes.slice(5)) - 1],
      receitas,
      despesas,
    });
  }

  return [resposta_formatada, maior_valor];
}

  export async function buscarGastosPorCategoria(mes) {
    const response = await api.get("/transacoes");

    let gastos =[]

    for (const transacao of response.data.data){
      if (transacao.tipo==="gasto" && transacao.mes_ref===mes){
        gastos.push({ "id_categoria": transacao.id_categoria,"tipo": transacao.tipo, "valor":transacao.valor});
      }
    }
    const responseCat = await api.get("/categorias");
    
    let categorias = []
    for(const transacao of responseCat.data.data){
      categorias.push({"id":transacao.id, "nome":transacao.nome, "cor":transacao.cor})
    }

    let resultado = []
    for (const categoria of categorias) {
      let valorTotal = 0;

      for (const gasto of gastos) {
        if (gasto.id_categoria === categoria.id) {
          valorTotal += gasto.valor;
        }
      }

      resultado.push({
        name: categoria.nome,
        value: valorTotal,
        color: categoria.cor,
      });
    }

    return resultado
  }

export async function buscarMovimetacoes(mes) {
  const response = await api.get("/transacoes");
  const categoriasResponse = await api.get("/categorias");
  const tagsResponse = await api.get("/tags/");

  const categorias = categoriasResponse.data.data;
  const tags = tagsResponse.data.data;

  let transacoes_mes_selecionado = [];

  for (const transacao of response.data.data) {
    if (transacao.mes_ref === mes) {
      const categoria = categorias.find(
        (cat) => cat.id === transacao.id_categoria
      );

      const nomesTags = transacao.tags.map((tagId) => {
        const tag = tags.find((tag) => tag.id === tagId);
        return tag?.nome;
      });

      transacoes_mes_selecionado.push({
        type: transacao.tipo,
        description: transacao.descricao,
        category: categoria.nome,
        date: transacao.data,
        tag: nomesTags,
        amount: transacao.valor,
        tone:
          transacao.tipo === "investimento"
            ? "purple"
            : transacao.tipo === "receita"
              ? "green"
              : "red",
      });
    }
  }

  return transacoes_mes_selecionado;
}


