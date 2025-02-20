import { Stack } from "expo-router";
import { CompanyProvider } from "./Context/StoreContext";

export default function RootLayout() {
  return (
    <CompanyProvider>
      <Stack />
    </CompanyProvider>
  );
}
