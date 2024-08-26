import React from 'react'
import { View } from 'react-native'
import { Text, Rating } from "react-native-elements"
import { style } from "./Header.styles"

export function Header({ restaurant }) {
    console.log(restaurant.ratingMedia);

    return (
        <View style={style.content}>
            <View style={style.titleView}>
                <Text style={style.name}>{restaurant.name}</Text>
                <Rating imageSize={20} readonly startingValue={restaurant.ratingMedia | 0} />
            </View>
            <Text style={style.description}>{restaurant.description}</Text>
        </View>
    )
}