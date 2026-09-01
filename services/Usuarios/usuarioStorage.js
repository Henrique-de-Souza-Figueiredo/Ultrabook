import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIO = "@UltraBooks:usuario";

export async function salvarUsuario(usuario) {
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function buscarUsuario() {
    const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

export async function removerUsuario() {
    await AsyncStorage.removeItem(CHAVE_USUARIO);
}

export async function buscarTokenUsuario() {
    const usuario = await buscarUsuario();

    return usuario?.token || null;
}

export async function getToken() {
    return buscarTokenUsuario();
}
