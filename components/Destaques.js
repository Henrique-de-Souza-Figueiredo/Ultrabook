import { ScrollView, View, StyleSheet, Text } from "react-native";
import CardLivro from "../components/CardLivro";

export default function Destaques({ livros, logado = false, onExcluirLivro }) {
    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.destaque}>
                Livros em Destaque
            </Text>

            <ScrollView>
                <View style={styles.lista}>
                    {livros.map((livro) => (
                        <CardLivro
                            key={livro.id || livro._id}
                            livro={livro}
                            logado={logado}
                            onExcluir={onExcluirLivro}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
    },

    destaque: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    lista: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
});
