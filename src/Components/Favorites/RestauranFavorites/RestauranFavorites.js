import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Image, Icon, Text } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { doc, deleteDoc } from "firebase/firestore"
import { db, screen } from "../../../utils"
import { style } from "./RestauranFavorites.styles"

export function RestauranFavorites({ restaurant }) {

    const navigation = useNavigation()

    const goToRestaurant = () => {
        navigation.navigate(screen.restaurant.tab, {
            screen: screen.restaurant.restaurant,
            params: {
                id: restaurant.id
            }
        })
    }

    const onRemoveFavorite = async () => {
        try {
            await deleteDoc(doc(db, "favorites", restaurant.idFavorite))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity onPress={goToRestaurant} >
            <View style={style.content}>
                <Image source={{ uri: restaurant.images[0] }} style={style.image} />
                <View style={style.infoContent}>
                    <Text style={style.name}>
                        {restaurant.name}
                    </Text>
                    <Icon
                        type='material-community'
                        name='heart'
                        color="#f00"
                        size={35}
                        containerStyle={style.iconContent}
                        onPress={onRemoveFavorite}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}