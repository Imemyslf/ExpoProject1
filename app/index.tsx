import { Text, View, FlatList } from "react-native";
import companyData from "./Data/Company.json";
import { useCompany } from "./Context/StoreContext";
import { useRouter } from "expo-router";
import CompanyCard from "./Components/Pressable";
import tw from "twrnc"; // Import Tailwind CSS

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
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold text-center text-gray-800 my-4`}>
        FOURAGE
      </Text>
      <FlatList
        data={companyData.four_wheeler_companies}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CompanyCard
            name={item.name}
            logo={imageMap[item.logo] || require("../assets/images/Company/default.png")}
            onPress={() => {
              setSelectedCompany(item.name);
              router.push("/Pages/Car_Selection");
            }}
          />
        )}
      />
    </View>
  );
}
