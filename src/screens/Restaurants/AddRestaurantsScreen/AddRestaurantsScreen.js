import React from 'react'
import { ScrollView } from 'react-native'
import { Button } from "react-native-elements"
import { useFormik } from 'formik'
import { initialValue, validationSchema } from "./AddRestaurantsScreen.data"
import { db } from "../../../utils"
import { useNavigation } from "@react-navigation/native"
import { InfoForm, UploadImageForm, ImageRestaurant } from "../../../Components/Restaurants/AddRestaurant"
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from "firebase/firestore"
import { style } from "./addRestaurantScreen.styles"

export function AddRestaurantsScreen() {

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createAt = new Date();

        // const myDB = doc(db, "restaurants", newData.id)
        // await setDoc(myDB, newData);
        //la siguiente linea es lo mismo pero mas simplificada

        await setDoc(doc(db, "restaurants", newData.id), newData)

        navigation.goBack();

      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <ScrollView>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button
        title="Añadir restaurante"
        buttonStyle={style.addRestaurante}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )
}