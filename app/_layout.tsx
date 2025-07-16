import { Stack } from "expo-router";
import {
  CompanyProvider,
  ModelProvider,
  WorkProvider,
  InvoiceProvider,
  TabProvider,
} from "../Context/StoreContext"; // Add InvoiceProvider and TabProvider
import Header from "../Components/Header"; // Custom header

export default function RootLayout() {
  return (
    <CompanyProvider>
      <ModelProvider>
        <WorkProvider>
          <InvoiceProvider> 
            <TabProvider> 
              <Stack
                screenOptions={({ route }) => ({
                  header: () => <Header title={route.name} />,
                })}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="Pages/Car_Selection" />
                <Stack.Screen name="Pages/Invoice_Generator" />
                <Stack.Screen name="Pages/Work_Selection" />
              </Stack>
            </TabProvider>
          </InvoiceProvider>
        </WorkProvider>
      </ModelProvider>
    </CompanyProvider>
  );
}
