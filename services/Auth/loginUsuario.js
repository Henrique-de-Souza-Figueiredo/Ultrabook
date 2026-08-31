import {salvarToken} from "./sessao";

const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/auth/login";

function extrairToken(dados) {
    return dados.token || dados.accessToken || dados.access_token || dados.jwt || dados.usuario?.token;
}

export async function loginUsuario(credenciais) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciais),
    });

    const textoResposta = await resposta.text();
    let dados = {};

    try {
        dados = textoResposta ? JSON.parse(textoResposta) : {};
    } catch {
        dados = {};
    }

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Email ou senha invalidos.");
    }

    const token = extrairToken(dados);

    if (token) {
        salvarToken(token);
    }

    return dados;
}
