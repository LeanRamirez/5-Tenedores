import React from 'react'
import { ScrollView, Alert } from 'react-native'
import { Icon, Avatar, Text } from "react-native-elements"
import * as ImagePicker from "expo-image-picker"
import { v4 as uuid } from 'uuid';
import { map, filter } from "lodash"
import { LoadingModal } from "../../../Shared"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { style } from "./UploadImageForm.style"
import { useState } from 'react'

export function UploadImageForm({ formik }) {

    const [IsLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            setIsLoading(true);
            await uploadImage(result.assets[0].uri);
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `restaurants/${uuid()}`);

        uploadBytes(storageRef, blob).then((snapshot) => {
            updatePhotosRestaurant(snapshot.metadata.fullPath);
        })
    }

    updatePhotosRestaurant = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);

        const imageUrl = await getDownloadURL(imageRef);

        formik.setFieldValue("images", [...formik.values.images, imageUrl]);
        setIsLoading(false);
    };

    const removeImage = (img) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Esta seguro que desea borrar la imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        const result = filter(formik.values.images, (image) => image !== img)
                        formik.setFieldValue("images", result)
                    }
                },
            ],
            { cancelable: false }
        )
    };

    return (
        <>
            <ScrollView style={style.viewImage} horizontal showsHorizontalScrollIndicator={false}>
                <Icon
                    type="material-community"
                    name="camera"
                    color="#a7a7a7"
                    containerStyle={style.containerIcon}
                    onPress={openGallery}
                />

                {map(formik.values.images, (image) => (
                    <Avatar
                        key={image}
                        source={{ uri: image }}
                        containerStyle={style.imgStyle}
                        onPress={() => removeImage(image)}
                    />
                ))}

            </ScrollView>
            <Text style={style.error}>{formik.errors.images}</Text>

            <LoadingModal show={IsLoading} text="Cargando imagen" />
        </>
    )
}


// import React from 'react';
// import { View, Alert } from 'react-native';
// import { Icon } from "react-native-elements";
// import * as ImagePicker from "expo-image-picker";
// import uuid from 'react-native-uuid';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { style } from "./UploadImageForm.style";

// export function UploadImageForm({ formik }) {

//     const openGallery = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const downloadURL = await uploadImage(result.assets[0].uri);
//             if (downloadURL) {
//                 updatePhotosRestaurant(downloadURL);
//             }
//         }
//     };

//     const uploadImage = async (uri) => {
//         try {
//             const response = await fetch(uri);
//             const blob = await response.blob();

//             const storage = getStorage();
//             const storageRef = ref(storage, `restaurants/${uuid.v4()}`);

//             const snapshot = await uploadBytes(storageRef, blob);

//             // Obtener la URL de descarga después de subir la imagen
//             const downloadURL = await getDownloadURL(snapshot.ref);

//             console.log("Imagen subida y URL obtenida:", downloadURL);
//             return downloadURL;

//         } catch (error) {
//             Alert.alert("Error al subir la imagen", error.message);
//             console.error("Error al subir la imagen:", error);
//             return null;
//         }
//     };

//     const updatePhotosRestaurant = (downloadURL) => {
//         const updatedImages = [...formik.values.images, downloadURL];
//         formik.setFieldValue("images", updatedImages);
//     };

//     return (
//         <View style={style.viewImage}>
//             <Icon
//                 type="material-community"
//                 name="camera"
//                 color="#a7a7a7"
//                 containerStyle={style.containerIcon}
//                 onPress={openGallery}
//             />
//         </View>
//     );
// 
