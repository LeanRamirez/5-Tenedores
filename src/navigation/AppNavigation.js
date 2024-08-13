import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { RestaurantStack } from "./RestaurantStack"
import { FavoritesStack } from "./FavoritesStack";
import { RankingStack } from "./RankingStack"
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack"
import { screen } from "../utils";

// import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
// import { FavoritesScreen } from "../screens/FavoritesScreen";
// import { RankingScreen } from "../screens/RankingScreen";
// import { SearchScreen } from "../screens/SearchScreen";
// import { AccountScreen } from "../screens/AccountScreen";
import { AddRestaurantsScreen } from "../screens/Restaurants/AddRestaurantsScreen"


const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "#646464", // Corregido a tabBarInactiveTintColor
                tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
            })}
        >
            <Tab.Screen
                name={screen.restaurant.tab}
                component={RestaurantStack}
                options={{ title: "Restaurantes" }}
            />
            {/* <Tab.Screen
                name={screen.restaurant.addRestaurant}
                component={AddRestaurantsScreen}
                options={{ title: "Agregar Restaurant" }}
            /> */}

            <Tab.Screen
                name={screen.favorites.tab}
                component={FavoritesStack}
                options={{ title: "Favoritos" }}
            />
            <Tab.Screen
                name={screen.ranking.tab}
                component={RankingStack}
                options={{ title: "Ranking" }}
            />
            <Tab.Screen
                name={screen.search.tab}
                component={SearchStack}
                options={{ title: "Buscar" }}
            />
            <Tab.Screen
                name={screen.account.tab}
                component={AccountStack}
                options={{ title: "Cuenta" }}
            />
        </Tab.Navigator>
    );
};

const screenOptions = (route, color, size) => {
    let iconName;

    if (route.name === screen.restaurant.tab) {
        iconName = "compass-outline";
    } else if (route.name === screen.favorites.tab) {
        iconName = "heart-outline";
    } else if (route.name === screen.ranking.tab) {
        iconName = "star-outline";
    } else if (route.name === screen.search.tab) {
        iconName = "magnify";
    } else if (route.name === screen.account.tab) {
        iconName = "home-outline";
    }

    return (
        <Icon
            type="material-community"
            name={iconName}
            color={color}
            size={size}
        />
    );
};




// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from "react-native-elements";
// import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen"
// import { FavoritesScreen } from "../screens/FavoritesScreen"
// import { RankingScreen } from "../screens/RankingScreen"
// import { SearchScreen } from "../screens/SearchScreen"
// import { AccountScreen } from "../screens/AccountScreen"
// import { screen } from "../utils"
// import { AddRestaurantsScreen } from "../screens/Restaurants/AddRestaurantsScreen"

// const Tab = createBottomTabNavigator();

// export const AppNavigation = () => {
//     return (
//         <Tab.Navigator screenOptions={({ route }) => ({
//             tabBarActiveTintColor: "#00a680",
//             tabBarInactiveColor: "#646464",
//             tabBarIcon: ({ color, size }) => screenOptions(route, color, size)
//         })}
//         >
//             <Tab.Screen name={screen.restaurant.tab}
//                 component={RestaurantsScreen}
//                 options={{ title: "Restaurantes" }}
//             />

//             <Tab.Screen name={screen.restaurant.addRestaurant}
//                 component={AddRestaurantsScreen}
//                 options={{ title: "Agregar Restaurantes" }}
//             />

//             <Tab.Screen name={screen.favorites.tab}
//                 component={FavoritesScreen}
//                 options={{ title: "Favoritos" }}
//             />

//             <Tab.Screen name={screen.ranking.tab}
//                 component={RankingScreen}
//                 options={{ title: "Ranking" }}
//             />

//             <Tab.Screen name={screen.search.tab}
//                 component={SearchScreen}
//                 options={{ title: "Buscar" }}
//             />

//             <Tab.Screen name={screen.account.tab}
//                 component={AccountScreen}
//                 options={{ title: "Cuenta" }}
//             />
//         </Tab.Navigator>
//     )
// }



// const screenOptions = (route, color, size) => {
//     let iconName;

//     if (route.name === screen.restaurant.tab) {
//         iconName = "compass-outline";
//     }

//     if (route.name === screen.favorites.tab) {
//         iconName = "heart-outline";
//     }
//     if (route.name === screen.ranking.tab) {
//         iconName = "star-outline"
//     }
//     if (route.name === screen.search.tab) {
//         iconName = "magnify"
//     }
//     if (route.name === screen.account.tab) {
//         iconName = "home-outline"
//     }
//     return (
//         <Icon
//             type="material-community"
//             name={iconName}
//             color={color}
//             size={size} />
//     )
// }

