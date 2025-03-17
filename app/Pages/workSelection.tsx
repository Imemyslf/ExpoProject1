// @ts-nocheck
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCompany, useModel, useWork } from "../Context/StoreContext";
import workData from "../Data/Work.json";
import { IconButton } from "react-native-paper";
import styles from "../../styles/WorkSelection";
import { useRouter } from "expo-router";

const WorkListComponent = () => {
  const { selectedCompany } = useCompany();
  const { selectedModelType } = useModel();
  const { selectedWorkType, setSelectedWorkType } = useWork();
  const [workSelected, setWorkSelected] = useState<string[]>([]);
  const [categorySelected, setCategorySelected] = useState<string>(
    "Regular Maintenance & Servicing"
  );
  const router = useRouter();

  const addWork = (name) => {
    if (!workSelected.includes(name)) {
      setWorkSelected([...workSelected, name]);
    }
  };

  const removeWork = (name) => {
    setWorkSelected(workSelected.filter((item) => item !== name));
  };

  const handleSubmit = () => {
    setSelectedWorkType(workSelected); // Store selected work in context
    console.log("Work Selected and Stored in Context:", workSelected);
    router.push("/Pages/invoice");
  };

  return (
    <View style={styles.container}>
      {/* First View Container (50% height) */}
      <View className="topContainer" style={styles.topContainer}>
        {/* Services List (Left) */}
        <View style={styles.servicesContainer}>
          <Text style={styles.heading}>Services</Text>
          <FlatList
            data={Object.keys(workData.services)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  categorySelected === item && styles.selectedCategory,
                ]}
                onPress={() => setCategorySelected(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categorySelected === item && styles.selectedCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Work List (Right) */}
        <View style={styles.workList}>
          <Text style={styles.heading}>Select Work From Here 👇</Text>
          <FlatList
            data={workData.services[categorySelected]}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.workItem}
                onPress={() => addWork(item.name)}
              >
                <Text style={styles.workText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Second View Container (Bottom 50%) */}
      <View style={styles.bottomContainer}>
        <Text style={styles.heading}>Work Selected</Text>
        <FlatList
          data={workSelected}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.selectedWorkItem}>
              <Text style={styles.selectedWorkText}>
                {index + 1}. {item}
              </Text>
              <IconButton
                icon="trash-can"
                size={24}
                onPress={() => removeWork(item)}
                style={styles.deleteIcon}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noWorkText}>No work selected</Text>
          }
          style={{ maxHeight: 250 }}
        />

        {/* Buttons for clearing and submitting work */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setWorkSelected([])}
          >
            <Text style={styles.clearButtonText}>Clear Work Selected </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => console.log("Submitting Work Selected")}
          >
            <Text style={styles.submitButtonText} onPress={handleSubmit}>
              Submit Work Selected
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkListComponent;
