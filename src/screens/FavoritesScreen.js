import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore"
import { size, map } from "lodash"
import { UserNotLogged, NotFoundRestaurants, RestauranFavorites } from "../Components/Favorites"
import { Loading } from "../Components/Shared"
import { db } from "../utils"

export function FavoritesScreen() {
    const [hasLogged, setHasLogged] = useState(null)
    const [restaurants, setRestaurants] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setHasLogged(!!user); // Establece true si el usuario existe, false si no.
        });
        return unsubscribe; // Desuscribir el listener cuando el componente se desmonta
    }, [])

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db, "favorites"),
                where("idUser", "==", auth.currentUser.uid)
            );
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                let restaurantArray = []
                for await (const item of snapshot.docs) {
                    const data = item.data()
                    const docRef = doc(db, "restaurants", data.idRestaurant)
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const newData = docSnap.data();
                        newData.idFavorite = data.id

                        restaurantArray.push(newData)
                    }
                }
                setRestaurants(restaurantArray);
            });

            return unsubscribe; // Desuscribir el listener cuando el componente se desmonta
        }
    }, [hasLogged]) // Se ejecuta solo si hasLogged es true

    if (hasLogged === null) return <Loading show text="Cargando" />; // Muestra un loader mientras se verifica el estado de autenticación
    if (!hasLogged) return <UserNotLogged />; // Muestra el componente de usuario no autenticado si el usuario no está autenticado
    if (!restaurants) return <Loading show text="Cargando" />; // Muestra un loader mientras se cargan los restaurantes

    if (size(restaurants) === 0) return <NotFoundRestaurants />; // Muestra un mensaje si no hay restaurantes favoritos

    return (
        <ScrollView>
            {map(restaurants, (restaurant) => (
                <RestauranFavorites key={restaurant.id} restaurant={restaurant} />
            ))}
        </ScrollView>
    )
}
