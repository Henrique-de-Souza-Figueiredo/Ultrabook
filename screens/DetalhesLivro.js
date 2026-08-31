import {useEffect, useState} from "react";
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import {buscarLivroPorId} from "../services/Livros/buscarLivroPorId";
import {usuarioEstaLogado} from "../services/Auth/sessao";

export default function DetalhesLivro({route, navigation}) {
    const {livroId, livroResumo} = route.params;
    const [livro, setLivro] = useState(livroResumo || null);
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        async function carregarDetalhes() {
            if (!usuarioEstaLogado()) {
                setCarregando(false);
                setMensagemErro("Voce precisa estar logado para ver os detalhes.");
                return;
            }

            try {
                const livroApi = await buscarLivroPorId(livroId);
                setLivro(livroApi);
            } catch (erro) {
                setMensagemErro(erro.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarDetalhes();
    }, [livroId]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
            <Pressable style={styles.voltar} onPress={() => navigation.goBack()}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>

            {carregando ? (
                <View style={styles.estado}>
                    <ActivityIndicator color="#ca0909" size="large" />
                    <Text style={styles.estadoTexto}>Carregando detalhes...</Text>
                </View>
            ) : mensagemErro ? (
                <View style={styles.estado}>
                    <Text style={styles.erro}>{mensagemErro}</Text>
                    <Pressable style={styles.botaoLogin} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.botaoLoginTexto}>Fazer login</Text>
                    </Pressable>
                </View>
            ) : (
                <>
                    <Image source={{uri: livro.imagem}} style={styles.imagem} />

                    <View style={styles.info}>
                        <Text style={styles.titulo}>{livro.titulo}</Text>
                        <Text style={styles.autor}>{livro.autor}</Text>

                        <View style={styles.linhaDetalhes}>
                            <Text style={styles.etiqueta}>{livro.categoria}</Text>
                            <Text style={styles.etiqueta}>{livro.faixa_etaria}</Text>
                        </View>

                        <Text style={styles.subtitulo}>Descricao</Text>
                        <Text style={styles.descricao}>{livro.descricao}</Text>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    conteudo: {
        padding: 18,
        paddingBottom: 32,
    },

    voltar: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ca0909",
        marginBottom: 16,
    },

    voltarTexto: {
        color: "#ca0909",
        fontWeight: "bold",
        fontSize: 14,
    },

    estado: {
        minHeight: 280,
        alignItems: "center",
        justifyContent: "center",
    },

    estadoTexto: {
        marginTop: 12,
        color: "#555",
        fontSize: 15,
    },

    erro: {
        color: "#ca0909",
        fontSize: 16,
        lineHeight: 22,
        textAlign: "center",
        fontWeight: "600",
    },

    botaoLogin: {
        marginTop: 16,
        height: 42,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ca0909",
    },

    botaoLoginTexto: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },

    imagem: {
        width: "100%",
        height: 360,
        borderRadius: 8,
        resizeMode: "contain",
        backgroundColor: "#f2f2f2",
    },

    info: {
        marginTop: 18,
    },

    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
    },

    autor: {
        marginTop: 6,
        fontSize: 18,
        color: "#555",
    },

    linhaDetalhes: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 14,
    },

    etiqueta: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#f2f2f2",
        color: "#333",
        fontWeight: "600",
    },

    subtitulo: {
        marginTop: 22,
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
    },

    descricao: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
    },
});
