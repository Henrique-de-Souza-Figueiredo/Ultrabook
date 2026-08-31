import {useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import BotaoCadastro from "../components/BotaoCadastro";
import CampoCadastro from "../components/CampoCadastro";

export default function AdicionarLivro({navigation}) {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [faixaEtaria, setFaixaEtaria] = useState("");
    const [descricao, setDescricao] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <Pressable style={styles.voltar} onPress={() => navigation.goBack()}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>

            <View style={styles.cabecalho}>
                <Text style={styles.tituloPagina}>Adicionar livro</Text>
                <Text style={styles.subtitulo}>Preencha as informacoes do livro.</Text>
            </View>

            <View style={styles.formulario}>
                <CampoCadastro
                    label="Titulo"
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Digite o titulo do livro"
                />

                <CampoCadastro
                    label="Autor"
                    value={autor}
                    onChangeText={setAutor}
                    placeholder="Digite o nome do autor"
                />

                <CampoCadastro
                    label="Categoria"
                    value={categoria}
                    onChangeText={setCategoria}
                    placeholder="Digite a categoria"
                />

                <CampoCadastro
                    label="Faixa etaria"
                    value={faixaEtaria}
                    onChangeText={setFaixaEtaria}
                    placeholder="Ex: 10+"
                />

                <CampoCadastro
                    label="Descricao"
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Digite a descricao do livro"
                    multiline
                    numberOfLines={5}
                />

                <BotaoCadastro onPress={() => {}}>
                    Adicionar livro
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

    tituloPagina: {
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
});
