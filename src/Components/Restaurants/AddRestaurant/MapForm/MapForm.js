import React from 'react'
import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Modal } from "../../../Shared"
import * as Location from "expo-location"
import MapView from 'react-native-maps'
import Toast from 'react-native-toast-message'
import { style } from "./MapForm.styles"
import { Marker } from 'react-native-maps'

export function MapForm({ show, close, formik }) {

    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
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
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            });
        })();
    }, []);

    const saveLocation = () => {
        formik.setFieldValue("location", location)
        close();
    }


    return (
        <Modal show={show} close={close}>

            <MapView
                initialRegion={location}
                showsUserLocation={true}
                style={style.mapStyle}
                onRegionChange={(locationTemp) => setLocation(locationTemp)}
            >
                <Marker draggable coordinate={location} />
            </MapView>
            <View style={style.mapActions}>
                <Button
                    title='Guardar'
                    containerStyle={style.btnMapContainerSave}
                    buttonStyle={style.btnMapSave}
                    onPress={saveLocation}
                />
                <Button title='Cerrar'
                    containerStyle={style.btnMapContainerCancel}
                    buttonStyle={style.btnMapCancel}
                    onPress={close} />
            </View>

        </Modal >
    )
}