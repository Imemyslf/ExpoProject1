import { Stack } from "expo-router";
import { CompanyProvider, ModelProvider } from "./Context/StoreContext";

export default function RootLayout() {
  return (
    <CompanyProvider>
      <ModelProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="/InvoGen/app/Pages/Cars.tsx" />
        </Stack>
      </ModelProvider>
    </CompanyProvider>
  );
}
