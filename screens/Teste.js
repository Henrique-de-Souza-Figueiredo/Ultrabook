import {Alert, Button, StyleSheet, View} from "react-native";
import {getBiometria} from "../services/Auth/biometria";

export default function teste() {
    async function testarBiometria() {
        var biometria = await getBiometria;


        if (biometria) {
            Alert.alert("Biometria sucesso")
        } else {
            Alert.alert("Erro na Biometria")
        }
    }

    return (
        <View style={styles.container}>
            <Button onPress={testarBiometria} title={"testar biometria"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
})