const API_URL = "https://apps-api-livros.ucxocw.easypanel.host/usuarios";

export async function cadastrarUsuario(usuario) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    });

    const textoResposta = await resposta.text();
    let dados = {};

    try {
        dados = textoResposta ? JSON.parse(textoResposta) : {};
    } catch {
        dados = {};
    }

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Nao foi possivel criar o cadastro.");
    }

    return dados;
}
