import {Image, Text, View, StyleSheet, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function CardLivro({ livro }) {
    const navigation = useNavigation();

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
                    livroId: livro.id,
                    livroResumo: livro,
                })}
            >
                <Text style={styles.butaotexto}>
                    Ver Detalhes
                </Text>
            </Pressable>
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
});
