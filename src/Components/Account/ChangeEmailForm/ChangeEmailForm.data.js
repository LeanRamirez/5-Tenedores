import * as Yup from "yup"

export function initialValue() {
    return {
        email: "",
        password: ""
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email es incorrecto").required("El email es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    })
}