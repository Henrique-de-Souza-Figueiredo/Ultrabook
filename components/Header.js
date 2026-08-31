import {Image, Pressable, View, StyleSheet, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.topo}>
                <Image
                    source={require("../assets/UltraBooksLogo.png")}
                    style={styles.logo}
                />

                <View style={styles.acoes}>
                    <Pressable style={styles.botaoSecundario} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.botaoSecundarioTexto}>Login</Text>
                    </Pressable>

                    <Pressable style={styles.botaoCadastro} onPress={() => navigation.navigate("Cadastro")}>
                        <Text style={styles.botaoCadastroTexto}>Cadastro</Text>
                    </Pressable>
                </View>
            </View>

            <Text style={styles.titulo}>
                Encontre seu proximo livro
            </Text>
            <Text style={styles.subtitulo}>
                Conhecimento que inspira. Historias que transformam
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
    },

    topo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    logo: {
        marginTop: 15,
        width: 150,
        height: 50,
    },

    acoes: {
        flexDirection: "row",
        gap: 8,
    },

    botaoSecundario: {
        marginTop: 15,
        height: 38,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ca0909",
    },

    botaoSecundarioTexto: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },

    botaoCadastro: {
        marginTop: 15,
        height: 38,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ca0909",
        alignItems: "center",
        justifyContent: "center",
    },

    botaoCadastroTexto: {
        color: "#ca0909",
        fontSize: 14,
        fontWeight: "bold",
    },

    titulo: {
        fontSize: 20,
        fontWeight: "bold",
    },

    subtitulo: {
        marginBottom: 5,
        fontSize: 15,
        color: "grey",
    },
});
