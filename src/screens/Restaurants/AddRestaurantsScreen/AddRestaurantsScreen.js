import React from 'react'
import { View } from 'react-native'
import { Button } from "react-native-elements"
import { useFormik } from 'formik'
import { initialValue, validationSchema } from "./AddRestaurantsScreen.data"
import { InfoForm } from "../../../Components/Restaurants/AddRestaurant"
import { style } from "./addRestaurantScreen.styles"

export function AddRestaurantsScreen() {

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    }
  })
  return (
    <View>
      <InfoForm formik={formik} />

      <Button
        title="Añadir restaurante"
        buttonStyle={style.addRestaurante}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}