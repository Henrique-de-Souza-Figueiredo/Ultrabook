import {Image, Pressable, View, StyleSheet, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

export default function Header({logado = false, onSair, onExcluirConta}) {
    const navigation = useNavigation();
    const [menuAberto, setMenuAberto] = useState(false);

    function navegar(nomeTela) {
        setMenuAberto(false);
        navigation.navigate(nomeTela);
    }

    return (
        <View style={styles.header}>
            <View style={styles.topo}>
                <Image
                    source={require("../assets/UltraBooksLogo.png")}
                    style={styles.logo}
                />

                <View style={styles.acoes}>
                    {logado ? (
                        <View style={styles.menuContainer}>
                            <Pressable
                                style={styles.botaoMenu}
                                onPress={() => setMenuAberto(!menuAberto)}
                            >
                                <Text style={styles.iconeMenu}>☰</Text>
                            </Pressable>

                            {menuAberto ? (
                                <View style={styles.menu}>
                                    <Pressable style={styles.itemMenu} onPress={() => navegar("Usuarios")}>
                                        <Text style={styles.itemMenuTexto}>Visualizar todos os usuarios</Text>
                                    </Pressable>

                                    <Pressable style={styles.itemMenu} onPress={() => navegar("EditarConta")}>
                                        <Text style={styles.itemMenuTexto}>Editar conta</Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.itemMenu}
                                        onPress={() => {
                                            setMenuAberto(false);
                                            onExcluirConta();
                                        }}
                                    >
                                        <Text style={[styles.itemMenuTexto, styles.itemPerigoso]}>Excluir conta</Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.itemMenu}
                                        onPress={() => {
                                            setMenuAberto(false);
                                            onSair();
                                        }}
                                    >
                                        <Text style={styles.itemMenuTexto}>Sair</Text>
                                    </Pressable>
                                </View>
                            ) : null}
                        </View>
                    ) : (
                        <>
                            <Pressable style={styles.botaoSecundario} onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.botaoSecundarioTexto}>Login</Text>
                            </Pressable>

                            <Pressable style={styles.botaoCadastro} onPress={() => navigation.navigate("Cadastro")}>
                                <Text style={styles.botaoCadastroTexto}>Cadastro</Text>
                            </Pressable>
                        </>
                    )}
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

    menuContainer: {
        position: "relative",
        marginTop: 15,
        zIndex: 10,
    },

    botaoMenu: {
        width: 42,
        height: 38,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ca0909",
    },

    iconeMenu: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },

    menu: {
        position: "absolute",
        top: 44,
        right: 0,
        width: 230,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#dedede",
        backgroundColor: "#fff",
        elevation: 6,
        zIndex: 20,
    },

    itemMenu: {
        minHeight: 42,
        paddingHorizontal: 12,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
    },

    itemMenuTexto: {
        color: "#222",
        fontSize: 14,
        fontWeight: "600",
    },

    itemPerigoso: {
        color: "#ca0909",
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
