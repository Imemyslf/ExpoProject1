import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../app/index"; // Landing Page
import CarsPage from "../app/Pages/Car_Selection"; // Another Page
import Header from "../Components/Header";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header: () => <Header title={route.name} />, // Dynamic Header Title
        })}
      >
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="Cars" component={CarsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
