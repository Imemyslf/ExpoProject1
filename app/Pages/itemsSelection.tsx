import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCompany, useModel } from "../Context/StoreContext";
const WorkListComponent = () => {
  const { selectedCompany } = useCompany();
  const { selectedModelType } = useModel();
  return (
    <View>
      <Text>{selectedCompany}</Text>
      <Text>{selectedModelType}</Text>
    </View>
  );
};

export default WorkListComponent;
