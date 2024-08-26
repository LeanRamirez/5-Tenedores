
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Icon } from "react-native-elements"
import { getAuth } from "firebase/auth"
import { doc, setDoc, getDocs, query, where, collection, deleteDoc } from "firebase/firestore"
import { v4 as uuid } from "uuid"
import { size, forEach } from "lodash"
import { db } from "../../../utils"
import { style } from "./BtnFavorite.styles"

export function BtnFavorite({ idRestaurant }) {
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [isReload, setIsReload] = useState(false)
    const auth = getAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavorites();
            if (size(response) > 0) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        })()
    }, [idRestaurant, isReload])

    const onReload = () => setIsReload(prevState => !prevState)

    const getFavorites = async () => {
        try {
            const q = query(
                collection(db, "favorites"),
                where("idRestaurant", "==", idRestaurant),
                where("idUser", "==", auth.currentUser.uid)
            );
            const result = await getDocs(q); // Asegúrate de esperar a la promesa
            return result.docs; // Devuelve los documentos obtenidos
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const addFavorites = async () => {
        try {
            const idFavorite = uuid();
            const data = {
                id: idFavorite,
                idRestaurant,
                idUser: auth.currentUser.uid,
            }

            await setDoc(doc(db, "favorites", idFavorite), data);
            setIsFavorite(true); // Actualiza el estado después de agregar a favoritos
            onReload();

        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorites = async () => {
        try {
            const response = await getFavorites()
            forEach(response, async (item) => {
                await deleteDoc(doc(db, "favorites", item.id))
            })
            onReload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={style.content}>
            {isFavorite !== undefined && (
                <Icon
                    type='material-community'
                    name={isFavorite ? "heart" : "heart-outline"}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    onPress={isFavorite ? removeFavorites : addFavorites}
                />
            )}
        </View>
    )
}
