import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Image, Text, Rating, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { screen } from "../../../utils"
import { style } from "./RestaurantRanking.styles"

export function RestaurantRanking({ restaurant, index }) {

    const navigation = useNavigation();

    const goToRestaurant = () => {
        navigation.navigate(screen.restaurant.tab, {
            screen: screen.restaurant.restaurant,
            params: {
                id: restaurant.id
            }
        })
    }

    const renderMedal = () => {
        if (index > 2) return null;

        let color = "";
        if (index === 0) color = "#FFD700"
        if (index === 1) color = "#BEBEBE"
        if (index === 2) color = "#CD7F32"
        return (
            <Icon
                type='material-community'
                name='medal-outline'
                color={color}
                containerStyle={style.medal}
            />
        )
    }
    return (
        <TouchableOpacity onPress={goToRestaurant}>
            <View style={style.content}>
                <Image source={{ uri: restaurant.images[0] }} style={style.image} />
                <View style={style.infoContent}>
                    <View style={style.nameContent}>
                        {renderMedal()}
                        <Text style={style.name}>{restaurant.name}</Text>
                    </View>
                    <Rating imageSize={15} readOnly startingValue={restaurant.ratingMedia} />
                </View>
                <Text style={style.description}>{restaurant.description}</Text>
            </View>
        </TouchableOpacity >
    )
}