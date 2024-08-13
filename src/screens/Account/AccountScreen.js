import react, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserGuestScreen } from "./UserGuestScreen/UserGuestScreen"
import { UserLoggedScreen } from "./UserLoggedScreen"
import { LoadingModal } from "../../Components/Shared/loadingModal"

export const AccountScreen = () => {
    const [hasLogged, setHasLogged] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    if (hasLogged === null) {
        return <LoadingModal show text="cargando" />
    }

    return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
}

