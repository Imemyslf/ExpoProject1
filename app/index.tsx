import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import companyData from "./Data/Company.json";
import { useState } from "react";

// Image mapping (Static import is required in React Native)
const imageMap: { [key: string]: any } = {
  "Maruti_Suzuki_logo.png": require("../assets/images/Company/Maruti_Suzuki.png"),
  "Tata_Motors_logo.png": require("../assets/images/Company/Tata_Motors.png"),
  "Hyundai_Motor_logo.png": require("../assets/images/Company/Hyundai_Motor_Company_logo.svg.png"),
  "Mahindra_Mahindra_logo.png": require("../assets/images/Company/Mahindra-Logo.png"),
  "Honda_Cars_logo.png": require("../assets/images/Company/honda-logo.png"),
};

export default function Index() {
  const [companyName, setCompanyName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Four Wheeler Company</Text>
      <FlatList
        data={companyData.four_wheeler_companies}
        keyExtractor={(item) => item.name}
        // numColumns={2}
        // columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          console.log(item.logo, imageMap[item.logo]);

          return (
            <View style={styles.card}>
              <Pressable
                onPress={() => {
                  console.log(`Company selected:- ${item.name}`);
                  setCompanyName(item.name);
                }}
              >
                <Image
                  style={styles.logo}
                  source={
                    imageMap[item.logo] ||
                    (console.log(`missing ${item.logo}`),
                    require("../assets/images/Company/default.png"))
                  }
                />
              </Pressable>
            </View>
          );
        }}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});
