import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text, Image } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { screen } from "../../../utils"
import { style } from "./ListRestaurants.styles"

export function ListRestaurants({ restaurants }) {

    const navigation = useNavigation();

    const goToRestaurant = (restaurante) => {
        navigation.navigate(screen.restaurant.restaurant, { id: restaurante.id });
    }
    return (

        <FlatList
            data={restaurants}
            renderItem={(doc) => {
                const restaurante = doc.item.data();

                return (
                    <TouchableOpacity onPress={() => goToRestaurant(restaurante)}>
                        <View style={style.content}>
                            {/* aca va la imagen */}
                            <Image
                                source={{ uri: restaurante.images[0] }}
                                style={style.image}
                            />
                            <View>
                                <Text style={style.name}>{restaurante.name}</Text>
                                <Text style={style.info}>{restaurante.addres}</Text>
                                <Text style={style.info}>{restaurante.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />

    )
}

