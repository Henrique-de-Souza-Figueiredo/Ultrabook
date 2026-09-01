import * as LocalAuthentication from 'expo-local-authentication'

export async function getBiometria() {
    const possuiBiometria = await LocalAuthentication.hasHardwareAsync()

    if (!possuiBiometria) {
        console.log('Não possui biometria')
        return false
    }

    const biometriaCadastrada = await  LocalAuthentication.isEnrolledAsync()

    if (!biometriaCadastrada) {
        console.log("Não possui biometria cadastrada")
        return false
    }

    const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirme sua identidade',
        cancelLabel: 'Cancelar',
    })

    if (resultado.success) {
        console.log('Biometria validada com sucesso')
        return true
    }

    console.log('Biometria incorreto')
    return false
}