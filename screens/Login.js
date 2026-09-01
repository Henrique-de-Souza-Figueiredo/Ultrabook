import {useEffect, useState} from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {buscarTokenUsuario} from "../services/Usuarios/usuarioStorage";

import BotaoCadastro from "../components/BotaoCadastro";
import CampoCadastro from "../components/CampoCadastro";
import {loginUsuario} from "../services/Auth/loginUsuario";
import {getBiometria} from "../services/Auth/biometria";
import {salvarToken} from "../services/Auth/sessao";

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        const cancelarEscuta = navigation.addListener("focus", async function () {
            const token = await buscarTokenUsuario();
            const estaLogado = Boolean(token);

            console.log("login", estaLogado);

            if (token) {
                const bio = await getBiometria();

                if (bio) {
                    salvarToken(token);
                    navigation.navigate("Home");
                }
            }
        });

        return cancelarEscuta;
    }, [navigation]);

    async function entrar() {
        const emailTratado = email.trim().toLowerCase();

        if (!emailTratado || !senha) {
            setMensagemErro("Preencha email e senha.");
            return;
        }

        setCarregando(true);
        setMensagemErro("");

        try {
            const dados = await loginUsuario({
                email: emailTratado,
                senha,
            });

            const token = dados.usuario?.token || dados.token;

            if (!token) {
                setMensagemErro("Login realizado, mas a API nao retornou token.");
                return;
            }

            salvarToken(token);
            Alert.alert("Login realizado", "Voce entrou na sua conta.");
            navigation.navigate("Home");
        } catch (erro) {
            setMensagemErro(erro.message || "Nao foi possivel fazer login.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">

            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Entrar</Text>
                <Text style={styles.subtitulo}>Acesse sua conta para continuar na UltraBooks.</Text>
            </View>

            <View style={styles.formulario}>
                <CampoCadastro
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                />

                <CampoCadastro
                    label="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="password"
                />

                {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

                <BotaoCadastro onPress={entrar} carregando={carregando}>
                    Entrar
                </BotaoCadastro>

                <Pressable style={styles.linkCadastro} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={styles.linkCadastroTexto}>Ainda nao tenho cadastro</Text>
                </Pressable>
            </View>
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

    cabecalho: {
        marginBottom: 24,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
    },

    subtitulo: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 22,
        color: "#555",
    },

    formulario: {
        width: "100%",
    },

    erro: {
        marginTop: 2,
        marginBottom: 8,
        color: "#ca0909",
        fontSize: 14,
        fontWeight: "600",
    },

    linkCadastro: {
        alignSelf: "center",
        marginTop: 16,
        paddingVertical: 8,
    },

    linkCadastroTexto: {
        color: "#ca0909",
        fontSize: 15,
        fontWeight: "bold",
    },
});
