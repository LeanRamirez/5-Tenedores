import React from 'react'
import { View } from 'react-native'
import { Image } from "react-native-elements"
import { style } from "./ImageRestaurant.styles"

export function ImageRestaurant({ formik }) {

    const principalImage = formik.values.images[0];

    return (
        <View style={style.content}>
            <Image
                source={principalImage ? { uri: principalImage } : require("../../../../../assets/img/not-found-image.jpg")}
                style={style.image}
            />
        </View>
    )
}