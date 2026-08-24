import {Image, View, StyleSheet, Text} from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/UltraBooksLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.titulo}>
                Encontre seu próximo livro
            </Text>
            <Text style={styles.subtitulo}>
                Conhecimento que inspira. Histórias que transformam
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 15,
        justifyContent: "center",
    },

    logo: {
        marginTop: 15,
        width: 150,
        height: 50,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",

    },
    subtitulo: {
        marginBottom: 5,
        fontSize: 15,
        color: "grey",
    },
});