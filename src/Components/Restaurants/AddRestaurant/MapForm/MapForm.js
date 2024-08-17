import React from 'react'
import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Modal } from "../../../Shared"
import * as Location from "expo-location"
import Toast from 'react-native-toast-message'
import { style } from "./MapForm.styles"

export function MapForm({ show, close }) {

    const [location, setLocation] = useState({
        latitude: 0.001,
        longiotude: 0.001,
        latituDelta: 0.001,
        longitudeDelta: 0.001
    })

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Toast.show({
                    type: "info",
                    position: "bottom",
                    text1: "Tienes que activar la ubicación en ajustes"
                });
                return;
            }

            const locationTemp = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: locationTemp.coords.latitude,
                longiotude: locationTemp.coords.longitude,
                latituDelta: 0.001,
                longitudeDelta: 0.001
            })
        })()
    }, [])

    return (
        <Modal show={show} close={close}>
            <Text>MapForm</Text>
        </Modal >
    )
}