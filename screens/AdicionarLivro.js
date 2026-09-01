import {useState} from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import BotaoCadastro from "../components/BotaoCadastro";
import CampoCadastro from "../components/CampoCadastro";
import {cadastrarLivro, editarLivro} from "../services/Livros/salvarLivro";

export default function AdicionarLivro({navigation, route}) {
    const livroEdicao = route?.params?.livro || null;
    const editando = Boolean(livroEdicao);
    const livroId = livroEdicao?.id || livroEdicao?._id;

    const [titulo, setTitulo] = useState(livroEdicao?.titulo || "");
    const [autor, setAutor] = useState(livroEdicao?.autor || "");
    const [categoria, setCategoria] = useState(livroEdicao?.categoria || "");
    const [faixaEtaria, setFaixaEtaria] = useState(livroEdicao?.faixa_etaria || livroEdicao?.faixaEtaria || "");
    const [imagem, setImagem] = useState(livroEdicao?.imagem || "");
    const [descricao, setDescricao] = useState(livroEdicao?.descricao || "");
    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    async function salvar() {
        const livro = {
            titulo: titulo.trim(),
            autor: autor.trim(),
            categoria: categoria.trim(),
            faixa_etaria: faixaEtaria.trim(),
            imagem: imagem.trim(),
            descricao: descricao.trim(),
        };

        if (!livro.titulo || !livro.autor || !livro.categoria || !livro.faixa_etaria || !livro.imagem || !livro.descricao) {
            setMensagemErro("Preencha todos os campos.");
            return;
        }

        setCarregando(true);
        setMensagemErro("");

        try {
            if (editando) {
                await editarLivro(livroId, livro);
                Alert.alert("Livro editado", "As informacoes do livro foram atualizadas.");
            } else {
                await cadastrarLivro(livro);
                Alert.alert("Livro cadastrado", "O livro foi adicionado com sucesso.");
            }

            navigation.navigate("Home");
        } catch (erro) {
            setMensagemErro(erro.message || "Nao foi possivel salvar o livro.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <Pressable style={styles.voltar} onPress={() => navigation.goBack()}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </Pressable>

            <View style={styles.cabecalho}>
                <Text style={styles.tituloPagina}>{editando ? "Editar livro" : "Adicionar livro"}</Text>
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
                    label="Imagem"
                    value={imagem}
                    onChangeText={setImagem}
                    placeholder="Cole o link da imagem"
                    keyboardType="url"
                    autoCapitalize="none"
                    textContentType="URL"
                />

                <CampoCadastro
                    label="Descricao"
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Digite a descricao do livro"
                    multiline
                    numberOfLines={5}
                />

                {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

                <BotaoCadastro onPress={salvar} carregando={carregando}>
                    {editando ? "Salvar alteracoes" : "Adicionar livro"}
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

    erro: {
        marginTop: 2,
        marginBottom: 8,
        color: "#ca0909",
        fontSize: 14,
        fontWeight: "600",
    },
});
