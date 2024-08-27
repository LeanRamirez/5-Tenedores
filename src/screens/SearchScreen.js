import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar, ListItem, Avatar, Icon, Text } from "react-native-elements"
import { useNavigation } from '@react-navigation/native'
import { query, collection, startAt, endAt, limit, orderBy, getDocs } from "firebase/firestore"
import { size, map } from "lodash"
import { Loading } from "../Components/Shared"
import { db, screen } from "../utils"

export function SearchScreen() {
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const q = query(
                collection(db, "restaurants"),
                orderBy("name"),
                startAt(searchText),
                endAt(`${searchText}\uf8ff`),
                limit(20)
            );
            const querySnapshot = await getDocs(q)
            setSearchResult(querySnapshot.docs)
        })()
    }, [searchText])

    const goToRestaurant = (idRestaurante) => {
        navigation.navigate(screen.restaurant.tab, {
            screen: screen.restaurant.restaurant,
            params: {
                id: idRestaurante,
            }
        })
    }

    return (
        <>
            <SearchBar
                placeholder='Buscar restaurant'
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            {!searchResult && <Loading show text="Cargando" />}

            <ScrollView>
                {size(searchResult) === 0 ? (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text>No se han encontrado resultados</Text>
                    </View>
                ) : (
                    map(searchResult, (item) => {
                        const data = item.data();

                        return (
                            <ListItem
                                key={data.id}
                                bottomDivider
                                onPress={() => goToRestaurant(data.id)}>
                                <Avatar source={{ uri: data.images[0] }} rounded />
                                <ListItem.Content>
                                    <ListItem.Title>{data.name}</ListItem.Title>
                                </ListItem.Content>
                                <Icon
                                    type='material-community'
                                    name='chevron-right'
                                />
                            </ListItem>
                        );
                    })
                )}
            </ScrollView>
        </>
    );
}