import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from "react-native-elements"
import * as ImagePicker from "expo-image-picker"
import { getAuth, updateProfile } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { styles } from "./InfoUser.styles"

export function InfoUser({ setLoading, setLoadingText }) {

    const { uid, photoURL, displayName, email } = getAuth().currentUser
    const [avatar, setAvatar] = useState(photoURL)


    const changeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        })
        // console.log(result);
        if (!result.canceled) uploadImage(result.assets[0].uri);
    }

    const uploadImage = async (uri) => {
        setLoadingText("Cargando imagen")
        setLoading(true)

        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `avatar/${uid}`);

        uploadBytes(storageRef, blob).then((snapshot) => {
            updatePhotoUrl(snapshot.metadata.fullPath)
        })
    }

    const updatePhotoUrl = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);

        const imageUrl = await getDownloadURL(imageRef);

        const auth = getAuth();
        updateProfile(auth.currentUser, { photoURL: imageUrl });
        setAvatar(imageUrl)
        setLoading(false)
    }

    return (
        <View style={styles.content}>
            <Avatar
                size="large"
                rounded
                icon={{ type: "material", name: "person" }}
                containerStyle={styles.avatar}
                source={{ uri: avatar }}
            >
                <Avatar.Accessory size={24} onPress={changeAvatar} />
            </Avatar>
            <View>
                <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}