import { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import { useCompany, useModel } from "../../Context/StoreContext";
import { CarCard } from "../../Components/Pressable";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import Pagination from "../../Components/Pagination";
import imageMaps from "../../Data/carImages";
import tw from "../../tailwind"; // Use correct tw import as per instructions
import axios from "axios";
import Constants from "expo-constants";

// Define types for company and model
interface Model {
  name: string;
}

interface Company {
  name: string;
  models: Model[];
}

export default function CarsScreen() {
  const { selectedCompany } = useCompany();
  const { setSelectedModelType } = useModel();
  const [company, setCompany] = useState<Company | null>(null);
  const [progressIndex, setProgressIndex] = useState(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCompanies() {
      try {
        console.log("Fetching companies...");
        // const backendUrl = Constants?.expoConfig?.extra?.BACKEND_URL;
        const response = await axios.get(
          `https://backend-deploy-engine-production.up.railway.app/data/automotive-companies`
);
        setFetchedData(response.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      console.log("Selected company:", selectedCompany);
      const foundCompany = fetchedData.find((c) => c.name === selectedCompany);
      setCompany(foundCompany || null);
    }
  }, [selectedCompany, fetchedData]);

  const { width } = Dimensions.get("window");

  return (
    <View style={tw`flex-1 bg-gray-100 p-5`}>
      <Text
        style={tw`text-2xl w-[100%] font-semibold mb-2 text-center`}
      >
        Models for {selectedCompany}
      </Text>

      <View style={tw`flex-1 justify-center items-center`}>
        {company?.models ? (
          <>
            <Carousel
              loop
              width={width * 0.9}
              height={500}
              autoPlay={false}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.85,
                parallaxScrollingOffset: 100,
              }}
              pagingEnabled={true}
              data={company.models}
              onProgressChange={(_, absoluteProgress) =>
                setProgressIndex(absoluteProgress)
              }
              renderItem={({ item }) => (
                <CarCard
                  name={item.name}
                  logo={
                    imageMaps[selectedCompany ?? ""]?.[item.name] || {
                      uri: "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Companies/default.png?updatedAt=1751425679738",
                    }
                  }
                  onPress={() => {
                    setSelectedModelType(item.name);
                    router.push("/Pages/Work_Selection");
                  }}
                />
              )}
            />
            <Pagination
              total={company?.models?.length ?? 0}
              activeIndex={Math.round(progressIndex)}
            />
          </>
        ) : (
          <Text>No models found</Text>
        )}
      </View>
    </View>
  );
}
