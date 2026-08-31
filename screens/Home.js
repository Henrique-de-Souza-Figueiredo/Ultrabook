import { Pressable, Text, View, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import {useFocusEffect} from "@react-navigation/native";

import Header from "../components/Header";
import { buscarLivros } from "../services/Livros/buscarLivros";
import Destaques from "../components/Destaques";
import BarraPesquisa from "../components/BarraPesquisa";
import { buscarCategorias } from "../services/Categorias/buscarCategorias";
import Categorias from "../components/Categorias";
import {usuarioEstaLogado} from "../services/Auth/sessao";

export default function Home({navigation}) {
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [logado, setLogado] = useState(usuarioEstaLogado());

    useEffect(() => {
        buscarLivros(setLivros);
    }, []);

    useEffect(() => {
        buscarCategorias(setCategorias);
    }, []);

    useFocusEffect(useCallback(() => {
        setLogado(usuarioEstaLogado());
    }, []));

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
            ].some((campo) => campo.toLowerCase().includes(textoBusca))
            : true;

        return correspondeCategoria && correspondeBusca;
    });

    return (
        <View style={styles.container}>
            <Header />

            {logado ? (
                <Pressable style={styles.botaoAdicionar} onPress={() => navigation.navigate("AdicionarLivro")}>
                    <Text style={styles.botaoAdicionarTexto}>Adicionar livro</Text>
                </Pressable>
            ) : null}

            <BarraPesquisa busca={busca} setBusca={setBusca} />

            <Categorias
                categorias={categorias}
                categoriaSelecionada={categoriaSelecionada}
                setCategoriaSelecionada={setCategoriaSelecionada}
            />

            <Destaques livros={livrosFiltrados} />
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
});
