import {buscarToken} from "../Auth/sessao";

const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/livros";

export async function buscarLivroPorId(id) {
    const token = buscarToken();

    if (!token) {
        throw new Error("Voce precisa estar logado para ver os detalhes.");
    }

    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const textoResposta = await resposta.text();
    let dados = {};

    try {
        dados = textoResposta ? JSON.parse(textoResposta) : {};
    } catch {
        dados = {};
    }

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel carregar os detalhes.");
    }

    return dados.livro || dados;
}
