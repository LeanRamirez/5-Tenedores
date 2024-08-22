// import React from 'react'
// import MapView, { Marker } from 'react-native-maps'
// import { style } from "./Map.styles"

// export function Map({ location, name }) {
//     return (
//         <MapView style={style.content} initialRegion={location}>
//             <Marker coordinate={location} />
//         </MapView>
//     )
// }

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native';
import { showLocation } from 'react-native-map-link';
import { style } from './Map.styles';

export function Map({ location, name }) {
    const openMap = () => {
        showLocation({
            latitude: location.latitude,
            longitude: location.longitude,
            title: name, // Opcional: el título que se mostrará en la app de mapas
            googleForceLatLon: true, // Forzar el uso de coordenadas en Google Maps
        });
    };

    return (
        <TouchableOpacity style={style.content} onPress={openMap}>
            <MapView style={style.content} initialRegion={location}>
                <Marker coordinate={location} />
            </MapView>
        </TouchableOpacity>
    );
}
