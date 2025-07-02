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
    "Maruti Suzuki Alto": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Maruti%20Suzuki/Alto.png?updatedAt=1751424440466"},
    "Maruti Suzuki Swift": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Maruti%20Suzuki/Swift.png?updatedAt=1751424440585"},
    "Maruti Suzuki Baleno": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Maruti%20Suzuki/Baleno.png?updatedAt=1751424440481"},
    "Maruti Suzuki Dzire": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Maruti%20Suzuki/Dzire.png?updatedAt=1751424440387"},
    "Maruti Suzuki Vitara Brezza": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Maruti%20Suzuki/Brezza.png?updatedAt=1751424440512"},
  },
  "Hyundai Motor India Limited": {
    "Hyundai Creta": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Hyundai/Creta.png?updatedAt=1751424335818"},
    "Hyundai Verna": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Hyundai/Verna.png?updatedAt=1751424335887"},
    "Hyundai i20": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Hyundai/i20.png?updatedAt=1751424336012"},
    "Hyundai Venue": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Hyundai/Venue.png?updatedAt=1751424335947"},
  },
  "Tata Motors Limited": {
    "Tata Tiago": { uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Tata%20Motors/Tiago.png?updatedAt=1751424496339"},
    "Tata Altroz": { uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Tata%20Motors/altroz.png?updatedAt=1751424496349"},
    "Tata Safari": { uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Tata%20Motors/Safari.png?updatedAt=1751424496269"},
  },
  "Mahindra & Mahindra Limited": {
    "Mahindra Thar": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Mahindra%20and%20Mahindra/Thar.png?updatedAt=1751424390628"},
    "Mahindra Scorpio": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Mahindra%20and%20Mahindra/scorpio.png?updatedAt=1751424390538"},
    "Mahindra XUV300": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Mahindra%20and%20Mahindra/xuv300.png?updatedAt=1751424390318"},
    "Mahindra Bolero": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Mahindra%20and%20Mahindra/bolero.png?updatedAt=1751424390360"},
  },
  "Honda Cars India Limited": {
    "Honda City": {uri: "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Honda/Amaze.png?updatedAt=1751424092092"},
    "Honda Amaze": {uri: "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Honda/City.png?updatedAt=1751424108732"},
    "Honda WR-V": {uri : "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Honda/wr_v.png?updatedAt=1751424108833"},
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
