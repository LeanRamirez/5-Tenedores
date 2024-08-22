import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Text } from "react-native-elements"
import { style } from "./Loading.styles"

export function Loading({ show, text }) {

    if (!show) return null;

    return (
        <View style={style.content}>
            <ActivityIndicator size="large" color="#00a680" />
            {text && <Text style={style.text}>{text}</Text>}
        </View>
    )
}