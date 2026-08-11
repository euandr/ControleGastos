import api from "../api";

export async function buscarResumoMensal(mes) {
  const response = await api.get("/analises/Cards_resumo-mensal", {
    params: { mes },
  });

  return response.data;
}
