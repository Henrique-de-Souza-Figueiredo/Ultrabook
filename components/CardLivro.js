import {Image, Text, View, StyleSheet, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function CardLivro({ livro, logado = false, onExcluir }) {
    const navigation = useNavigation();
    const livroId = livro.id || livro._id;

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: livro.imagem }}
                style={styles.imagem}
            />

            <Text style={styles.titulo}>
                {livro.titulo}
            </Text>

            <Text style={styles.info}>
                {livro.categoria} - {livro.autor}
            </Text>

            <Text style={styles.descricao}>
                {livro.descricao}
            </Text>
            <Pressable
                style={styles.butao}
                onPress={() => navigation.navigate("DetalhesLivro", {
                    livroId,
                    livroResumo: livro,
                })}
            >
                <Text style={styles.butaotexto}>
                    Ver Detalhes
                </Text>
            </Pressable>

            {logado ? (
                <View style={styles.acoes}>
                    <Pressable
                        style={[styles.botaoAcao, styles.botaoEditar]}
                        onPress={() => navigation.navigate("AdicionarLivro", {livro})}
                    >
                        <Text style={[styles.textoAcao, styles.textoEditar]}>Editar</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.botaoAcao, styles.botaoExcluir]}
                        onPress={() => onExcluir(livro)}
                    >
                        <Text style={[styles.textoAcao, styles.textoExcluir]}>Excluir</Text>
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        elevation: 4,
        justifyContent: "space-between",
    },

    imagem: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },

    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    info: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 5,
    },

    descricao: {
        fontSize: 14,
        color: "#333",
        marginTop: 8,
    },
    butao: {
        marginTop: 12,
        height: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderColor: "#ca0909",
        borderWidth: 1,
    },

    butaotexto: {
        color: "#ca0909",
        fontSize: 14,
        fontWeight: "bold",
    },

    acoes: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },

    botaoAcao: {
        flex: 1,
        height: 36,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },

    botaoEditar: {
        borderColor: "#222",
        backgroundColor: "#222",
    },

    botaoExcluir: {
        borderColor: "#ca0909",
        backgroundColor: "#fff",
    },

    textoAcao: {
        fontSize: 13,
        fontWeight: "bold",
    },

    textoEditar: {
        color: "#fff",
    },

    textoExcluir: {
        color: "#ca0909",
    },
});
