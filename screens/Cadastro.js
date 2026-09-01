import {useState} from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import BotaoCadastro from "../components/BotaoCadastro";
import CampoCadastro from "../components/CampoCadastro";
import {cadastrarUsuario} from "../services/Usuarios/cadastrarUsuario";

export default function Cadastro({navigation}) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    async function enviarCadastro() {
        const nomeTratado = nome.trim();
        const emailTratado = email.trim().toLowerCase();

        if (!nomeTratado || !emailTratado || !senha || !confirmarSenha) {
            setMensagemErro("Preencha todos os campos.");
            return;
        }

        if (senha.length < 6) {
            setMensagemErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas nao conferem.");
            return;
        }

        setCarregando(true);
        setMensagemErro("");

        try {
            await cadastrarUsuario({
                nome: nomeTratado,
                email: emailTratado,
                senha,
            });

            Alert.alert("Cadastro criado", "Sua conta foi criada com sucesso.");
            navigation.navigate("Login");
        } catch (erro) {
            setMensagemErro(erro.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
            <ScrollView contentContainerStyle={styles.conteudo}>

                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>Criar cadastro</Text>
                    <Text style={styles.subtitulo}>Informe seus dados para acessar a UltraBooks.</Text>
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

                    <CampoCadastro
                        label="Confirmar senha"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        placeholder="Repita sua senha"
                        secureTextEntry
                        autoCapitalize="none"
                        textContentType="newPassword"
                    />

                    {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

                    <BotaoCadastro onPress={enviarCadastro} carregando={carregando}>
                        Cadastrar
                    </BotaoCadastro>

                    <Pressable style={styles.linkLogin} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.linkLoginTexto}>Ja tenho cadastro</Text>
                    </Pressable>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    conteudo: {
        flexGrow: 1,
        padding: 18,
        paddingBottom: 32,
        alignItems: "center",

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

    linkLogin: {
        alignSelf: "center",
        marginTop: 16,
        paddingVertical: 8,
    },

    linkLoginTexto: {
        color: "#ca0909",
        fontSize: 15,
        fontWeight: "bold",
    },
});
