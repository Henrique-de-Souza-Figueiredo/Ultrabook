import {Pressable, ScrollView, Text, StyleSheet, View} from "react-native";

export default function Categorias({categorias, categoriaSelecionada, setCategoriaSelecionada}) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.conteudo}
            >
                {categorias.map((categoria) => (
                    <Pressable
                        key={categoria}
                        style={[
                            styles.categoria,
                            categoriaSelecionada === categoria &&
                            styles.categoriaSelecionada
                        ]}
                        onPress={() => {
                            if (categoriaSelecionada === categoria) {
                                setCategoriaSelecionada(null);
                            } else {
                                setCategoriaSelecionada(categoria);
                            }
                        }}>
                        <Text
                            style={[styles.texto, categoriaSelecionada === categoria && styles.textoSelecionado
                            ]}>
                            {categoria}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
    },

    conteudo: {
        paddingHorizontal: 15,
        alignItems: "center",
    },

    categoria: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ca0909",
    },

    categoriaSelecionada: {
        backgroundColor: "#ca0909",
    },

    texto: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },

    textoSelecionado: {
        color: "#fff",
    },
});