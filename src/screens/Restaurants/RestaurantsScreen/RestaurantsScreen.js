import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Icon } from "react-native-elements"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { LoadingModal } from "../../../Components/Shared"
import { ListRestaurants } from "../../../Components/Restaurants"
import { screen, db } from "../../../utils"
import { style } from "./RestaurantsScreen.styles"

export function RestaurantsScreen(props) {

    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null);
    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, []);

    useEffect(() => {
        const q = query(
            collection(db, "restaurants"),
            orderBy("createAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            setRestaurants(snapshot.docs);
        })
    }, [])



    const goToAddRestaurant = () => {
        // navigation.navigate(screen.restaurant.addRestaurant)
        navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.addRestaurant });
    }
    return (
        <View style={style.content}>
            {!restaurants ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <ListRestaurants restaurants={restaurants} />

            )}

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
