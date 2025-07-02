import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import companyData from "../Data/Company.json";
import { useCompany, useModel } from "../Context/StoreContext";
import CompanyCard from "../Components/Pressable";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

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
  const [progressIndex, setProgressIndex] = useState(0); // <-- Use progress index
  const router = useRouter();

  useEffect(() => {
    if (selectedCompany) {
      const foundCompany = companyData.four_wheeler_companies.find(
        (c: Company) => c.name === selectedCompany
      );
      setCompany(foundCompany || null);
    }
  }, [selectedCompany]);

  // Get screen width for carousel
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Models for {selectedCompany}</Text>
      <View style={styles.carouselWrapper}>
        {company?.models ? (
          <>
            <Carousel
              loop
              width={width * 0.9}
              height={400}
              autoPlay={false}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.85,
                parallaxScrollingOffset: 100,
              }}
              pagingEnabled={true}
              data={company.models}
              onProgressChange={(_, absoluteProgress) => setProgressIndex(absoluteProgress)}
              renderItem={({ item }) => (
                <CompanyCard
                  name={item.name}
                  logo={
                    imageMaps[selectedCompany ?? ""]?.[item.name] ||
                    require("../../assets/images/Company/default.png")
                  }
                  onPress={() => {
                    setSelectedModelType(item.name);
                    router.push("/Pages/Work_Selection");
                  }}
                  showLogo={true}
                />
              )}
            />
            <View style={styles.pagination}>
              {company.models.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    Math.round(progressIndex) % company.models.length === idx &&
                      styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <Text>No models found</Text>
        )}
      </View>
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
    textAlign: "center",
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
