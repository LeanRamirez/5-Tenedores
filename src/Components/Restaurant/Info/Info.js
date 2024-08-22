import React from 'react'
import { View } from 'react-native'
import { Text, ListItem, Icon, getIconType } from "react-native-elements"
import { map } from "lodash"
import { Map } from "../../Shared"
import { style } from "./Info.styles"

export function Info({ restaurant }) {

    const listInfo = [
        {
            text: restaurant.addres,
            iconType: "material-community",
            iconName: "map-marker"
        },
        {
            text: restaurant.phone,
            iconType: "material-community",
            iconName: "phone"
        },
        {
            text: restaurant.email,
            iconType: "material-community",
            iconName: "at"
        }
    ]

    return (
        <View style={style.content}>
            <Text style={style.title}>Información del restaurante</Text>
            <Map location={restaurant.location} name={restaurant.name} />
            {map(listInfo, (item, index) => (
                <ListItem key={index} bottomDivider>
                    <Icon
                        type={item.iconType}
                        name={item.iconName}
                        color="#00a682" />
                    <ListItem.Content>
                        <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}