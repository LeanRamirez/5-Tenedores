import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from "react-native-elements"
import { style } from "./NotFoundRestaurants.styles"

export function NotFoundRestaurants() {
    return (
        <View style={style.content}>
            <Icon
                type='material-community'
                name='alert-outline'
                size={80}
            />
            <Text style={style.text} >No tienes restaurantes en tu lista</Text>
        </View>
    )
}