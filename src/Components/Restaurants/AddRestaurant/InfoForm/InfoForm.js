import React, { useState } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { MapForm } from "../MapForm"
import { style } from "./InfoForm.styles"


export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)

    const onOpenCloseMap = () => setShowMap(prevState => !prevState)
    return (<>
        <View style={style.content}>

            <Input
                placeholder='Nombre del restaurante'
                onChangeText={(text) => formik.setFieldValue("name", text)}
                errorMessage={formik.errors.name}
            />
            <Input
                placeholder='Dirección'
                rightIcon={{
                    type: "material-community",
                    name: "map-marker-radius",
                    color: "#c2c2c2",
                    onPress: onOpenCloseMap,
                }}
                onChangeText={(text) => formik.setFieldValue("addres", text)}
                errorMessage={formik.errors.addres}
            />
            <Input
                placeholder='Telefono'
                onChangeText={(text) => formik.setFieldValue("phone", text)}
                errorMessage={formik.errors.phone}
            />
            <Input
                placeholder='Email'
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input
                placeholder='Descripción del restaurante'
                multiline={true}
                inputContainerStyle={style.textArea}
                onChangeText={(text) => formik.setFieldValue("description", text)}
                errorMessage={formik.errors.description}
            />
        </View>
        <MapForm show={showMap} close={onOpenCloseMap} />
    </>
    )
}