import * as yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

export function validationSchema() {
    return yup.object({
        email: yup.string().email("El email no es correcto").required("El email es obligatorio"),
        password: yup.string().required("La contraseña es obligatoria"),
        repeatPassword: yup.string().required("La contraseña es obligatoria").oneOf([yup.ref("password")], "Las contraseñas tienen que ser iguales")
    })
}