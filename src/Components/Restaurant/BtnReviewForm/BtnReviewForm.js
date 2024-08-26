import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button } from "react-native-elements"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { query, collection, where, onSnapshot } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { size } from "lodash"
import { screen, db } from "../../../utils"
import { style } from "./BtnReviewForm.styles"

export function BtnReviewForm({ idRestaurant }) {
    const [hasLogged, setHasLogged] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, []);

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db, ("reviews")),
                where("idRestaurant", "==", idRestaurant),
                where("idUser", "==", auth.currentUser.uid))

            onSnapshot(q, (snapShot) => {
                if (size(snapShot.docs) > 0) setHasReview(true)

            })

        }
    }, [hasLogged])


    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }

    const goToAddReview = () => {
        navigation.navigate(screen.restaurant.addReviewRestaurant, {
            idRestaurant,
        })
    }

    if (hasLogged && hasReview) {
        return (
            <View style={style.content}>
                <Text style={style.textSendReview}>Ya hiciste un comentario sobre este restaurant</Text>
            </View>
        )
    }

    return (
        <View style={style.content}>
            {hasLogged ? (
                <Button
                    title="Escribe un opnión"
                    icon={{
                        type: 'material-community',
                        name: "square-edit-outline",
                        color: "#00a680"
                    }}
                    buttonStyle={style.button}
                    titleStyle={style.btnText}
                    onPress={goToAddReview}
                />
            ) : (
                <Text style={style.text} onPress={goToLogin}>Para escribir una opnión <Text style={style.textClick}>toca AQUÍ para iniciar sesión</Text></Text>
            )}
        </View>
    )
}