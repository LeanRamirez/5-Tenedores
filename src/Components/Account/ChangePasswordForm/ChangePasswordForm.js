import React, { useState } from 'react'
import { Input, Button } from "react-native-elements"
import { View } from 'react-native'
import { useFormik } from 'formik'
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { initialValues, validationSchema } from "./ChangePasswordForm.data"
import { style } from "./ChangePasswordForm.styles"

export function ChangePasswordForm({ onClose }) {

    const [showPassword, setShowPassword] = useState(false);

    const onShowPassword = () => setShowPassword(prevState => !prevState)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser;

                const credential = EmailAuthProvider.credential(
                    currentUser.email,
                    formValue.password
                )
                reauthenticateWithCredential(currentUser, credential);

                await updatePassword(currentUser, formValue.newPassword);
                onClose();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar la contraseña"
                })
            }
        }
    })

    return (
        <View style={style.content}>
            <Input
                placeholder='Contraseña actual'
                containerStyle={style.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassword,
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Input
                placeholder='Nueva contraseña'
                containerStyle={style.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassword,
                }}
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />
            <Input
                placeholder='Repetir contraseña'
                containerStyle={style.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassword,
                }}
                onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
                errorMessage={formik.errors.confirmNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting} />
        </View>
    )
}