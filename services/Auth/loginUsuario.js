import {salvarToken} from "./sessao";
import {salvarUsuario} from "../Usuarios/usuarioStorage";

const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/auth/login";

function extrairToken(dados) {
    return dados.token || dados.accessToken || dados.access_token || dados.jwt || dados.usuario?.token || dados.user?.token;
}

function montarUsuario(dados, credenciais, token) {
    const usuarioResposta = dados.usuario || dados.user || dados;
    const {token: _token, accessToken, access_token, jwt, ...informacoesUsuario} = usuarioResposta;

    return {
        ...informacoesUsuario,
        email: usuarioResposta.email || credenciais.email,
        senha: usuarioResposta.senha || credenciais.senha,
        token,
    };
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

    if (!token) {
        throw new Error("Login realizado, mas a API nao retornou token.");
    }

    const usuario = montarUsuario(dados, credenciais, token);

    salvarToken(token);
    await salvarUsuario(usuario);

    return {
        ...dados,
        usuario,
        token,
    };
}
