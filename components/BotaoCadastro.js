import {ActivityIndicator, Pressable, StyleSheet, Text} from "react-native";

export default function BotaoCadastro({children, onPress, carregando = false}) {
    return (
        <Pressable
            style={({pressed}) => [
                styles.botao,
                pressed && !carregando && styles.botaoPressionado,
                carregando && styles.botaoDesativado,
            ]}
            onPress={onPress}
            disabled={carregando}
        >
            {carregando ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.texto}>{children}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ca0909",
        marginTop: 8,
    },

    botaoPressionado: {
        opacity: 0.85,
    },

    botaoDesativado: {
        opacity: 0.7,
    },

    texto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
