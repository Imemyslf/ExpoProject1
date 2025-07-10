import { Stack } from "expo-router";
import {
  CompanyProvider,
  ModelProvider,
  WorkProvider,
} from "../Context/StoreContext"; // Fixed import path
import Header from "../Components/Header"; // Import custom header

export default function RootLayout() {
  return (
    <CompanyProvider>
      <ModelProvider>
        <WorkProvider>
          <Stack
            screenOptions={({ route }) => ({
              header: () => <Header title={route.name} />, // Dynamic header
            })}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Pages/Car_Selection" />
            <Stack.Screen name="Pages/Invoice_Generator" />
            <Stack.Screen name="Pages/Work_Selection.tsx" />
          </Stack>
        </WorkProvider>
      </ModelProvider>
    </CompanyProvider>
  );
}
