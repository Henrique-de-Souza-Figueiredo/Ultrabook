import {useEffect, useState} from "react";
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import {listarUsuarios} from "../services/Usuarios/usuarioApi";

export default function Usuarios({navigation}) {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const dados = await listarUsuarios();
                setUsuarios(Array.isArray(dados) ? dados : []);
            } catch (erro) {
                setMensagemErro(erro.message || "Nao foi possivel listar os usuarios.");
            } finally {
                setCarregando(false);
            }
        }

        carregarUsuarios();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Pressable style={styles.voltar} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>

            <Text style={styles.titulo}>Usuarios</Text>

            {carregando ? (
                <View style={styles.estado}>
                    <ActivityIndicator color="#ca0909" size="large" />
                    <Text style={styles.estadoTexto}>Carregando usuarios...</Text>
                </View>
            ) : mensagemErro ? (
                <Text style={styles.erro}>{mensagemErro}</Text>
            ) : (
                usuarios.map((usuario) => (
                    <View key={usuario.id || usuario._id || usuario.email} style={styles.usuario}>
                        <Text style={styles.nome}>{usuario.nome || usuario.name || "Sem nome"}</Text>
                        <Text style={styles.email}>{usuario.email}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        flexGrow: 1,
        padding: 18,
        paddingBottom: 32,
        backgroundColor: "#fff",
    },

    voltar: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ca0909",
        marginBottom: 22,
    },

    voltarTexto: {
        color: "#ca0909",
        fontWeight: "bold",
        fontSize: 14,
    },

    titulo: {
        marginBottom: 16,
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
    },

    estado: {
        minHeight: 240,
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
        fontSize: 15,
        fontWeight: "600",
    },

    usuario: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },

    nome: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#222",
    },

    email: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
    },
});
