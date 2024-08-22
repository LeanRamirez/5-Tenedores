import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    content: {
        margin: 15,
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        marginTop: 5,
        color: "#828282"
    }
});