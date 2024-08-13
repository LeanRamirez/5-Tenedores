import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from "react-native-elements"
import { useFormik } from "formik"
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { initialValue, validationSchema } from "./ChangeEmailForm.data"
import { style } from "./ChangeEmailForm.styles"

export function ChangeEmailForm({ onClose, onReload }) {
    const [showPassword, setShowPassword] = useState(false)

    const onShowPassword = () => setShowPassword(prevState => !prevState)

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser;

                const credential = EmailAuthProvider.credential(
                    currentUser.email,
                    formValue.password
                );

                reauthenticateWithCredential(currentUser, credential);

                await updateEmail(currentUser, formValue.email)

                onReload();
                onClose();
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el email"
                })
            }
        }
    })

    return (
        <View style={style.content}>
            <Input
                placeholder='Cambiar email'
                containerStyle={style.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email} />
            <Input
                placeholder='Contraseña'
                containerStyle={style.input}
                secureTextEntry={showPassword ? true : false}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassword
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Button
                title="Cambiar email"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}


