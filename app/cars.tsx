import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import companyData from "./Data/Company.json";
import { useCompany } from "./Context/StoreContext";
const Models = () => {
  const { selectedCompany } = useCompany();
  const [model, selectedModel] = useState({});

  useEffect(() => {
    if (selectedCompany) {
      const findCompany = companyData.four_wheeler_companies.find(
        (companyName) => companyName.name === selectedCompany
      );
      selectedModel([findCompany]);
    }
  }, [selectedModel]);
  console.log(companyData);
  console.log(selectedCompany);
  console.log(model);
  return (
    <View>
      <Text>Models</Text>
    </View>
  );
};

export default Models;
