import { Stack } from "expo-router";
import {
  CompanyProvider,
  ModelProvider,
  WorkProvider,
} from "./Context/StoreContext";

export default function RootLayout() {
  return (
    <CompanyProvider>
      <ModelProvider>
        <WorkProvider>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="/InvoGen/app/Pages/Cars.tsx" />
          </Stack>
        </WorkProvider>
      </ModelProvider>
    </CompanyProvider>
  );
}
