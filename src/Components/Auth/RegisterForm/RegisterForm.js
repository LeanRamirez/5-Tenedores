import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { useFormik } from "formik"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { screen } from "../../../utils"
import { initialValues, validationSchema } from "./RegisterForm.data"
import { styles } from "./RegisterForm.styles"

export function RegisterForm() {

    const [showPassword, setshowPassword] = useState(false)
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                );
                navigation.navigate(screen.account.cuenta);
            } catch (error) {
                Toast.show({
                    type: "Error",
                    position: "bottom",
                    text1: "Error al registrarse, intentelo de nuevo"
                })
            }
        }
    });

    const showHiddenPassword = () => setshowPassword(prevState => !prevState)

    return (
        <View style={styles.content}>
            <Input placeholder='Correo electronico'
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type='material-community'
                        name="at"
                        iconStyle={styles.icon} />}
                onChangeText={text => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon=
                {<Icon
                    type='material-community'
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon} />}
                onChangeText={text => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
                onPress={showHiddenPassword}
            />
            <Input placeholder='Confirmar contraseña'
                ontainerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon=
                {<Icon
                    type='material-community'
                    name="eye-outline"
                    iconStyle={styles.icon} />}
                onChangeText={text => formik.setFieldValue("repeatPassword", text)}
                errorMessage={formik.errors.repeatPassword}
                onPress={showHiddenPassword}
            />
            <Button
                title="Unirse"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={formik.handleSubmit} />
        </View>
    )
}