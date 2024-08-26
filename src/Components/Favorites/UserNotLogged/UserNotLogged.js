import React from 'react'
import { View } from 'react-native'
import { Text, Icon, Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { screen } from "../../../utils"
import { style } from "./UserNotLogged.styles"

export function UserNotLogged() {

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }
    return (
        <View style={style.content}>
            <Icon
                type='material-community'
                name='alert-outline'
                size={80}
            />
            <Text style={style.info}>Necesitas iniciar sesión para ver los favoritos</Text>
            <Button
                title="Ir al login"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={goToLogin}
            />
        </View>
    )
}