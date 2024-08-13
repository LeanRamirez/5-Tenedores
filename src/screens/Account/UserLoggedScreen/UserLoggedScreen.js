import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from "react-native-elements"
import { getAuth, signOut } from "firebase/auth"
import { LoadingModal } from "../../../Components/Shared/loadingModal/LoadingModal.js"
import { InfoUser } from "../../../Components/Account/InfoUser/InfoUser"
import { AccountOptions } from "../../../Components/Account"
import { styles } from "./UserLoggedScreen.styles.js"


export function UserLoggedScreen() {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("")

    const logOut = async () => {
        const auth = getAuth();
        await signOut(auth)
    }
    return (
        <View>
            <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
            <AccountOptions />
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnStyles}
                titleStyle={styles.btnTextStyle}
                onPress={logOut}
            />
            <LoadingModal show={loading} text={loadingText} />
        </View>
    )
}