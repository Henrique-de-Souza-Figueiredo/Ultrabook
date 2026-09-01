import {buscarToken} from "../Auth/sessao";

const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/usuarios";

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

export async function listarUsuarios() {
    const resposta = await fetch(API_URL, {
        method: "GET",
        headers: criarHeaders(),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel listar os usuarios.");
    }

    return dados.usuarios || dados.users || dados;
}

export async function editarUsuario(id, usuario) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: criarHeaders(),
        body: JSON.stringify(usuario),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel editar a conta.");
    }

    return dados.usuario || dados.user || dados;
}

export async function excluirUsuario(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: criarHeaders(),
    });

    const dados = await lerResposta(resposta);

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel excluir a conta.");
    }

    return dados;
}
