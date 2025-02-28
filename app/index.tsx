import { Text, View, StyleSheet, FlatList } from "react-native";
import companyData from "./Data/Company.json";
import { useCompany } from "./Context/StoreContext";
import { useRouter } from "expo-router";
import CompanyCard from "./Components/Pressable";

const imageMap: { [key: string]: any } = {
  "Maruti_Suzuki_logo.png": require("../assets/images/Company/Maruti_Suzuki.png"),
  "Tata_Motors_logo.png": require("../assets/images/Company/Tata_Motors.png"),
  "Hyundai_Motor_logo.png": require("../assets/images/Company/Hyundai_Motor_Company_logo.svg.png"),
  "Mahindra_Mahindra_logo.png": require("../assets/images/Company/Mahindra-Logo.png"),
  "Honda_Cars_logo.png": require("../assets/images/Company/honda-logo.png"),
};

export default function Index() {
  const { setSelectedCompany } = useCompany();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Four Wheeler Company</Text>
      <FlatList
        data={companyData.four_wheeler_companies}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CompanyCard
            name={item.name}
            logo={
              imageMap[item.logo] ||
              require("../assets/images/Company/default.png")
            }
            onPress={() => {
              setSelectedCompany(item.name);
              router.push("/Pages/cars");
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
