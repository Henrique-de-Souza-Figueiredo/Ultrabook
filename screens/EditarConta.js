import {useEffect, useState} from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import BotaoCadastro from "../components/BotaoCadastro";
import CampoCadastro from "../components/CampoCadastro";
import {getBiometria} from "../services/Auth/biometria";
import {editarUsuario} from "../services/Usuarios/usuarioApi";
import {buscarUsuario, salvarUsuario} from "../services/Usuarios/usuarioStorage";

export default function EditarConta({navigation}) {
    const [usuarioAtual, setUsuarioAtual] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        async function carregarUsuario() {
            const usuario = await buscarUsuario();

            if (!usuario) {
                navigation.navigate("Login");
                return;
            }

            setUsuarioAtual(usuario);
            setNome(usuario.nome || usuario.name || "");
            setEmail(usuario.email || "");
            setSenha(usuario.senha || "");
        }

        carregarUsuario();
    }, [navigation]);

    async function salvarConta() {
        const usuarioId = usuarioAtual?.id || usuarioAtual?._id;
        const nomeTratado = nome.trim();
        const emailTratado = email.trim().toLowerCase();
        const senhaTratada = senha.trim();

        if (!usuarioId) {
            setMensagemErro("Nao foi possivel identificar sua conta.");
            return;
        }

        if (!nomeTratado || !emailTratado) {
            setMensagemErro("Preencha nome e email.");
            return;
        }

        if (senhaTratada && senhaTratada.length < 6) {
            setMensagemErro("A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setCarregando(true);
        setMensagemErro("");

        try {
            const biometriaConfirmada = await getBiometria();

            if (!biometriaConfirmada) {
                setMensagemErro("Confirme sua identidade para editar a conta.");
                return;
            }

            const dadosAtualizados = {
                nome: nomeTratado,
                email: emailTratado,
                senha: senhaTratada || usuarioAtual.senha,
            };

            if (!dadosAtualizados.senha) {
                setMensagemErro("Entre novamente na sua conta antes de editar sem trocar a senha.");
                return;
            }

            const usuarioResposta = await editarUsuario(usuarioId, dadosAtualizados);
            const usuarioSalvo = {
                ...usuarioAtual,
                ...dadosAtualizados,
                ...usuarioResposta,
                token: usuarioAtual.token,
            };

            await salvarUsuario(usuarioSalvo);

            Alert.alert("Conta atualizada", "Suas informacoes foram salvas.");
            navigation.navigate("Home");
        } catch (erro) {
            setMensagemErro(erro.message || "Nao foi possivel editar a conta.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <Pressable style={styles.voltar} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>

            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Editar conta</Text>
                <Text style={styles.subtitulo}>Atualize as informacoes do seu cadastro.</Text>
            </View>

            <View style={styles.formulario}>
                <CampoCadastro
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite seu nome"
                    textContentType="name"
                />

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
                    textContentType="newPassword"
                />

                {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

                <BotaoCadastro onPress={salvarConta} carregando={carregando}>
                    Salvar conta
                </BotaoCadastro>
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
});
