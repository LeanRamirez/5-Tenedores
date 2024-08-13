import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen"
import { AddRestaurantsScreen } from "../screens/Restaurants/AddRestaurantsScreen"
import { screen } from "../utils"

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.restaurant.restaurantes}
                component={RestaurantsScreen}
                options={{ title: "Restaurantes" }}
            />
            <Stack.Screen name={screen.restaurant.addRestaurant}
                component={AddRestaurantsScreen}
                options={{ title: "Nuevo Restaurante" }}
            />
        </Stack.Navigator>
    )
}