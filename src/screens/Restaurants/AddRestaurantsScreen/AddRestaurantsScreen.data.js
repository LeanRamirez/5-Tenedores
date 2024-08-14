import * as Yup from "yup";

export function initialValue() {
    return {
        name: "",
        addres: "",
        phone: "",
        email: "",
        description: "",
    }
};

export function validationSchema() {
    return Yup.object({
        name: Yup.string().required("Este campo es obligatorio"),
        addres: Yup.string().required("Este campo es obligatorio"),
        phone: Yup.string().required("Este campo es obligatorio"),
        email: Yup.string().email("No es un email valido").required("Este campo es obligatorio"),
        description: Yup.string().required("Este campo es obligatorio"),
    })
}