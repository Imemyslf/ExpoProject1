import { Stack } from "expo-router";
import { CompanyProvider } from "./Context/StoreContext";

export default function RootLayout() {
  return (
    <CompanyProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="/InvoGen/app/Pages/Cars.tsx" />
      </Stack>
    </CompanyProvider>
  );
}
