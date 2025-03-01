import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import companyData from "../Data/Company.json";
import { useCompany, useModel } from "../Context/StoreContext";
import CompanyCard from "../Components/Pressable";
import { useRouter } from "expo-router";
// Define types for company and model
interface Model {
  name: string;
}

interface Company {
  name: string;
  models: Model[];
}

const imageMaps: Record<string, Record<string, ImageSourcePropType>> = {
  "Maruti Suzuki India Limited": {
    "Maruti Suzuki Alto": require("../../assets/images/Models/Maruti_Suzuki/Alto.png"),
    "Maruti Suzuki Swift": require("../../assets/images/Models/Maruti_Suzuki/Swift.png"),
    "Maruti Suzuki Baleno": require("../../assets/images/Models/Maruti_Suzuki/Baleno.png"),
    "Maruti Suzuki Dzire": require("../../assets/images/Models/Maruti_Suzuki/Dzire.png"),
    "Maruti Suzuki Vitara Brezza": require("../../assets/images/Models/Maruti_Suzuki/Brezza.png"),
  },
  "Hyundai Motor India Limited": {
    "Hyundai Creta": require("../../assets/images/Models/Hyundai/Creta.png"),
    "Hyundai Verna": require("../../assets/images/Models/Hyundai/Verna.png"),
    "Hyundai i20": require("../../assets/images/Models/Hyundai/i20.png"),
    "Hyundai Venue": require("../../assets/images/Models/Hyundai/Venue.png"),
  },
  "Tata Motors Limited": {
    "Tata Tiago": require("../../assets/images/Models/Tata_Motors/Tiago.png"),
    "Tata Altroz": require("../../assets/images/Models/Tata_Motors/altroz.png"),
    "Tata Safari": require("../../assets/images/Models/Tata_Motors/Safari.png"),
  },
  "Mahindra & Mahindra Limited": {
    "Mahindra Thar": require("../../assets/images/Models/Mahindra_and_Mahindra/Thar.png"),
    "Mahindra Scorpio": require("../../assets/images/Models/Mahindra_and_Mahindra/scorpio.png"),
    "Mahindra XUV300": require("../../assets/images/Models/Mahindra_and_Mahindra/xuv300.png"),
    "Mahindra Bolero": require("../../assets/images/Models/Mahindra_and_Mahindra/bolero.png"),
  },
  "Honda Cars India Limited": {
    "Honda City": require("../../assets/images/Models/Honda/City.png"),
    "Honda Amaze": require("../../assets/images/Models/Honda/Amaze.png"),
    "Honda WR-V": require("../../assets/images/Models/Honda/wr_v.png"),
  },
};

export default function CarsScreen() {
  const { selectedCompany } = useCompany();
  const { setSelectedModelType } = useModel();
  const [company, setCompany] = useState<Company | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedCompany) {
      const foundCompany = companyData.four_wheeler_companies.find(
        (c: Company) => c.name === selectedCompany
      );
      setCompany(foundCompany || null);
    }
  }, [selectedCompany]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Models for {selectedCompany}</Text>
      {company?.models ? (
        <FlatList
          data={company.models}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <CompanyCard
              name={item.name}
              logo={
                imageMaps[selectedCompany ?? ""]?.[item.name] ||
                require("../../assets/images/Company/default.png")
              }
              onPress={() => {
                console.log(item.name);
                setSelectedModelType(item.name);
                router.push("/Pages/workSelection");
              }}
            />
          )}
        />
      ) : (
        <Text>No models found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
