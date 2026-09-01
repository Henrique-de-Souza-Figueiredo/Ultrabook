import {buscarToken} from "../Auth/sessao";

const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/livros";

async function lerResposta(resposta) {
    const textoResposta = await resposta.text();

    try {
        return textoResposta ? JSON.parse(textoResposta) : {};
    } catch {
        return {};
    }
}

function criarHeaders() {
    const token = buscarToken();
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export async function cadastrarLivro(livro) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: criarHeaders(),
        body: JSON.stringify(livro),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel cadastrar o livro.");
    }

    return dados.livro || dados;
}

export async function editarLivro(id, livro) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: criarHeaders(),
        body: JSON.stringify(livro),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel editar o livro.");
    }

    return dados.livro || dados;
}

export async function excluirLivro(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: criarHeaders(),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel excluir o livro.");
    }

    return dados;
}
