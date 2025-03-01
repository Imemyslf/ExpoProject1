// @ts-nocheck
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCompany, useModel } from "../Context/StoreContext";
import workData from "../Data/Work.json";
import { IconButton } from "react-native-paper";

const WorkListComponent = () => {
  const { selectedCompany } = useCompany();
  const { selectedModelType } = useModel();
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

  return (
    <View style={styles.container}>
      {/* First View: Category List & Selected Work */}
      <View style={styles.workService}>
        {/* Category List (50%) */}
        <View style={{ flex: 0.6 }}>
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

        {/* Selected Work Scrollable List (50%) */}
        <View style={{ flex: 0.5, paddingTop: 15 }}>
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
                  icon="trash-can" // Alternative to "delete"
                  size={24} // Reduce size to 24
                  onPress={() => removeWork(item)}
                  style={{
                    position: "absolute",
                    bottom: 0, // Adjust for visibility
                    right: 0, // Move to the bottom-right
                  }}
                />
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noWorkText}>No work selected</Text>
            }
            style={{ maxHeight: 250 }}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setWorkSelected([])}
          >
            <Text style={styles.clearButtonText}>Clear Work Selected</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Second View: Work List */}
      <View style={styles.workList}>
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
  );
};

export default WorkListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
  },
  workService: {
    flex: 0.6,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
    alignItems: "center",
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
    flex: 0.6,
    padding: 10,
    margin: 5,
  },
  workItem: {
    backgroundColor: "#777",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  workText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  selectedWorkItem: {
    position: "relative", // Allow absolute positioning inside
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    minHeight: 100, // Ensure enough height for positioning
    justifyContent: "center", // Center text
  },
  selectedWorkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  noWorkText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
