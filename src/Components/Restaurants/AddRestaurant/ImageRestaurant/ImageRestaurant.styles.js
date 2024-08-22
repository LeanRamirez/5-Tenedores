import { StyleSheet, Dimensions } from "react-native";

const widthScreen = Dimensions.get("window").width;
export const style = StyleSheet.create({
    content: {
        marginBottom: 20,
        marginTop: 2
    },
    image: {
        height: 200,
        width: widthScreen
    }
});