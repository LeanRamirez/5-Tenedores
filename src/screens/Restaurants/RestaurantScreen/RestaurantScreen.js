import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { doc, onSnapshot } from "firebase/firestore"
import { Carrusel, Loading } from "../../../Components/Shared"
import { Header, Info, BtnReviewForm, Reviews, BtnFavorite } from "../../../Components/Restaurant"
import { db } from "../../../utils"
import { style } from "./RestaurantScreen.styles"

const { width } = Dimensions.get("window")

export function RestaurantScreen({ route }) {
    const [restaurant, setRestaurant] = useState(null)


    useEffect(() => {
        setRestaurant(null)
        onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
            setRestaurant(doc.data());

        })
    }, [route.params.id])

    if (!restaurant) return <Loading show text="Cargando restaurantes" />;


    return (
        <ScrollView style={style.content}>
            <Carrusel images={restaurant.images} height={250} width={width} />
            <Header restaurant={restaurant} />
            <Info restaurant={restaurant} />
            <BtnReviewForm idRestaurant={restaurant.id} />
            <Reviews idRestaurant={restaurant.id} />
            <BtnFavorite idRestaurant={restaurant.id} />
        </ScrollView>
    )
}

