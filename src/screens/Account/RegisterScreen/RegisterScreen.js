import React from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image } from "react-native-elements"
import { styles } from "./RegisterScreen.styles"
import { RegisterForm } from '../../../Components/Auth/RegisterForm/RegisterForm'

export function RegisterScreen() {
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.img} />
            <View style={styles.content}>
                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    )
}