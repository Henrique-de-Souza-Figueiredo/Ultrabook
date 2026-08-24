import { Image, TextInput, View, StyleSheet } from "react-native";

export default function BarraPesquisa() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/lupa.png")}
                style={styles.lupa}
            />

            <TextInput
                style={styles.input}
                placeholder="Buscar livros..."
                placeholderTextColor="#grey"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        margin: 15,

        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#7c7c7c",
    },

    lupa: {
        width: 22,
        height: 22,
        marginLeft: 10,
    },

    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        color: "#333",
    },
});