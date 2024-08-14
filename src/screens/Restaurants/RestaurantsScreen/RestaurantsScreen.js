import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Icon } from "react-native-elements"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { screen } from "../../../utils/screensNames"
import { style } from "./RestauranScreen.styles"

export function RestaurantsScreen(props) {

    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])


    const goToAddRestaurant = () => {
        // navigation.navigate(screen.restaurant.addRestaurant)
        navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.addRestaurant });
    }
    return (
        <View style={style.content}>
            <Text>RestaurantsScreen</Text>

            {currentUser && (
                <Icon
                    reverse
                    type='material-community'
                    name='plus'
                    color="#00a680"
                    containerStyle={style.btnContainer}
                    onPress={goToAddRestaurant}
                />
            )}

        </View>
    )
}
