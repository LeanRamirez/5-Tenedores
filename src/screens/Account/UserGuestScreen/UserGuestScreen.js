import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from 'react-native'
import { styles } from "./UserGuestScreen.styles";
import { Text, Button, Image } from "react-native-elements"
import { screen } from "../../../utils"

export function UserGuestScreen() {
    const navigation = useNavigation();
    const goToLogin = () => {
        navigation.navigate(screen.account.login)
    };
    return (
        <ScrollView centerContent={true} style={styles.content}>
            <Image
                source={require("../../../../assets/img/user-guest.png")}
                style={styles.img} />
            <Text style={styles.title}>Consulta tu perfil de 5 tenedores
            </Text>
            <Text style={styles.description}>¿Como describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla,
                vota cual te a gustado mas y comenta como a sido tu experiencia</Text>
            <Button title="Ver tu perfil"
                onPress={goToLogin}
                buttonStyle={styles.buttonStyle} />
        </ScrollView>
    )
}



