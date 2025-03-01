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

const WorkListComponent = () => {
  const { selectedCompany } = useCompany();
  const { selectedModelType } = useModel();
  const { selectedWorkType, setSelectedWorkType } = useWork();
  const [workSelected, setWorkSelected] = useState<string[]>([]);
  const [categorySelected, setCategorySelected] = useState<string>(
    "Regular Maintenance & Servicing"
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  topContainer: {
    flex: 1.4, // 50% height
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
  },
  servicesContainer: {
    flex: 1.2,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 6,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "left",
  },
  selectedCategory: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  workList: {
    flex: 1,
    padding: 5,
    margin: 3,
  },
  workItem: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "left",
  },
  workText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomContainer: {
    flex: 1, // 50% height
    padding: 10,
    backgroundColor: "#fff",
  },
  selectedWorkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedWorkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  deleteIcon: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  noWorkText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    flex: 0.8,
    backgroundColor: "black",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
