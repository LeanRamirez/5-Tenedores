import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Image } from "react-native-elements"
import { styles } from "./LogginScreen.styles"
import { useNavigation } from "@react-navigation/native"
import { LoginForm } from '../../../Components/Auth/loginForm.js'
import { screen } from "../../../utils"

export function LoginScreen() {
    const navigation = useNavigation();
    const goToRegister = () => {
        navigation.navigate(screen.account.register)
    }
    return (
        <ScrollView>
            <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.img} />
            <View style={styles.content}>
                <LoginForm />

                <Text style={styles.textRegister}>
                    ¿Todavia no tenes cuenta?
                    <Text style={styles.btnRegister} onPress={goToRegister}> Registrate</Text>
                </Text>
            </View>
        </ScrollView>
    )
}
