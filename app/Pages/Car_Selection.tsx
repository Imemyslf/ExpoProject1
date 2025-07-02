import { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import { useCompany, useModel } from "../Context/StoreContext";
import CompanyCard from "../Components/Pressable";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import Pagination from "../Components/Pagination";
import imageMaps from "../Data/carImages";
import tw from "twrnc";
import { fetchFourWheelers } from "../firebase/fetchData";

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
  const [firebaseData, setFirebaseData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCompanies() {
      const allCompanies = await fetchFourWheelers();
      setFirebaseData(allCompanies);
    }
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const foundCompany = firebaseData.find(
        (c) => c.name === selectedCompany
      );
      setCompany(foundCompany || null);
    }
  }, [selectedCompany, firebaseData]);

  const { width } = Dimensions.get("window");

  return (
    <View style={tw`flex-1 bg-gray-100 p-5`}>
      <Text style={tw`text-2xl font-bold mb-2 text-center`}>
        Models for {selectedCompany}
      </Text>
      <View style={tw`flex-1 justify-center items-center`}>
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
                    { uri: "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Companies/default.png?updatedAt=1751425679738" }
                  }
                  onPress={() => {
                    setSelectedModelType(item.name);
                    router.push("/Pages/Work_Selection");
                  }}
                  showLogo={true}
                />
              )}
            />
            <Pagination total={company?.models?.length ?? 0} activeIndex={Math.round(progressIndex)} />
          </>
        ) : (
          <Text>No models found</Text>
        )}
      </View>
    </View>
  );
}
