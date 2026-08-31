import {StyleSheet, Text, TextInput, View} from "react-native";

export default function CampoCadastro({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "sentences",
    textContentType,
    multiline = false,
    numberOfLines = 1,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.inputMultilinha]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#8a8a8a"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                textContentType={textContentType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? "top" : "center"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },

    label: {
        marginBottom: 6,
        fontSize: 15,
        fontWeight: "bold",
        color: "#222",
    },

    input: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#7c7c7c",
        backgroundColor: "#f7f7f7",
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#222",
    },

    inputMultilinha: {
        minHeight: 120,
        paddingTop: 12,
    },
});
