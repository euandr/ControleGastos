import api from "../api";

export async function MesesDisponiveis() {
  const response = await api.get("/analises/meses_disponiveis");
  return response.data.meses;
}

export async function buscarNome() {
  const response = await api.get("/usuarios/me");
  return response.data.nome;
}
