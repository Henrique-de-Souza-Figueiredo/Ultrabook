let tokenAtual = null;

export function salvarToken(token) {
    tokenAtual = token;
}

export function buscarToken() {
    return tokenAtual;
}

export function usuarioEstaLogado() {
    return Boolean(tokenAtual);
}
