import { Alert, Pressable, Text, View, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import {useFocusEffect} from "@react-navigation/native";

import Header from "../components/Header";
import { buscarLivros } from "../services/Livros/buscarLivros";
import Destaques from "../components/Destaques";
import BarraPesquisa from "../components/BarraPesquisa";
import { buscarCategorias } from "../services/Categorias/buscarCategorias";
import Categorias from "../components/Categorias";
import {removerToken, usuarioEstaLogado} from "../services/Auth/sessao";
import {buscarUsuario, removerUsuario} from "../services/Usuarios/usuarioStorage";
import {excluirLivro} from "../services/Livros/salvarLivro";
import {excluirUsuario} from "../services/Usuarios/usuarioApi";
import {getBiometria} from "../services/Auth/biometria";

export default function Home({navigation}) {
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [logado, setLogado] = useState(usuarioEstaLogado());
    const [usuario, setUsuario] = useState(null);
    const nomeUsuario = usuario?.nome || usuario?.name || "";

    function carregarLivros() {
        buscarLivros(setLivros);
    }

    useEffect(() => {
        carregarLivros();
    }, []);

    useEffect(() => {
        buscarCategorias(setCategorias);
    }, []);

    useFocusEffect(useCallback(() => {
        async function atualizarTela() {
            const usuarioSalvo = await buscarUsuario();

            setUsuario(usuarioSalvo);
            setLogado(usuarioEstaLogado());
            carregarLivros();
        }

        atualizarTela();
    }, []));

    function confirmarExclusao(livro) {
        const livroId = livro.id || livro._id;

        Alert.alert(
            "Excluir livro",
            `Deseja excluir "${livro.titulo}"?`,
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await excluirLivro(livroId);
                            carregarLivros();
                        } catch (erro) {
                            Alert.alert("Erro", erro.message || "Nao foi possivel excluir o livro.");
                        }
                    },
                },
            ],
        );
    }

    async function sair() {
        removerToken();
        setLogado(false);
        navigation.navigate("Login");
    }

    function confirmarExclusaoConta() {
        const usuarioId = usuario?.id || usuario?._id;

        if (!usuarioId) {
            Alert.alert("Erro", "Nao foi possivel identificar sua conta.");
            return;
        }

        Alert.alert(
            "Excluir conta",
            "Deseja excluir sua conta?",
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const biometriaConfirmada = await getBiometria();

                            if (!biometriaConfirmada) {
                                Alert.alert("Verificacao necessaria", "Confirme sua identidade para excluir a conta.");
                                return;
                            }

                            await excluirUsuario(usuarioId);
                            await removerUsuario();
                            await sair();
                        } catch (erro) {
                            Alert.alert("Erro", erro.message || "Nao foi possivel excluir a conta.");
                        }
                    },
                },
            ],
        );
    }

    const textoBusca = busca.trim().toLowerCase();

    const livrosFiltrados = livros.filter((livro) => {
        const correspondeCategoria = categoriaSelecionada
            ? livro.categoria === categoriaSelecionada
            : true;

        const correspondeBusca = textoBusca
            ? [
                livro.titulo,
                livro.autor,
                livro.categoria,
                livro.descricao,
            ].some((campo) => String(campo || "").toLowerCase().includes(textoBusca))
            : true;

        return correspondeCategoria && correspondeBusca;
    });

    return (
        <View style={styles.container}>
            <Header
                logado={logado}
                onSair={sair}
                onExcluirConta={confirmarExclusaoConta}
            />

            {logado ? (
                <>
                    <Text style={styles.saudacao}>Olá, {nomeUsuario}</Text>

                    <Pressable style={styles.botaoAdicionar} onPress={() => navigation.navigate("AdicionarLivro")}>
                        <Text style={styles.botaoAdicionarTexto}>Adicionar livro</Text>
                    </Pressable>
                </>
            ) : null}

            <BarraPesquisa busca={busca} setBusca={setBusca} />

            <Categorias
                categorias={categorias}
                categoriaSelecionada={categoriaSelecionada}
                setCategoriaSelecionada={setCategoriaSelecionada}
            />

            <Destaques
                livros={livrosFiltrados}
                logado={logado}
                onExcluirLivro={confirmarExclusao}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    botaoAdicionar: {
        height: 44,
        marginHorizontal: 15,
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: "#ca0909",
        alignItems: "center",
        justifyContent: "center",
    },

    botaoAdicionarTexto: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },

    saudacao: {
        marginHorizontal: 15,
        marginTop: 12,
        fontSize: 17,
        fontWeight: "bold",
        color: "#222",
    },
});
