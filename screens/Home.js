import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import { buscarLivros } from "../services/Livros/buscarLivros";
import Destaques from "../components/Destaques";
import BarraPesquisa from "../components/BarraPesquisa";
import { buscarCategorias } from "../services/Categorias/buscarCategorias";
import Categorias from "../components/Categorias";

export default function Home() {
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        buscarLivros(setLivros);
    }, []);

    useEffect(() => {
        buscarCategorias(setCategorias);
    }, []);

    const livrosFiltrados = categoriaSelecionada
        ? livros.filter(
            (livro) => livro.categoria === categoriaSelecionada
        )
        : livros;

    return (
        <View style={styles.container}>
            <Header />

            <BarraPesquisa />

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
});