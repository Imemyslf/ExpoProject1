import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from "react-native";
import tw from "../../tailwind";
import workDataJSON from "../Data/Work.json";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
// Define types
interface WorkItem {
  name: string;
}

interface WorkData {
  services: Record<string, WorkItem[]>;
}

// Load work data with correct types
const workData: WorkData = workDataJSON;

const WorkListComponent = () => {
  const [categorySelected, setCategorySelected] = useState<string>(
    "Regular Maintenance & Servicing"
  );
  const [workSelected, setWorkSelected] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<{ [key: string]: number }>({});
  const categoryKeys = Object.keys(workData.services);
  const router = useRouter();

  // Handle horizontal scroll event
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const centerPosition = scrollX + screenWidth / 2;

    let closestCategory = categoryKeys[0];
    let minDistance = Infinity;

    Object.entries(itemPositions.current).forEach(([category, xPos]) => {
      const distance = Math.abs(centerPosition - (xPos + 90));
      if (distance < minDistance) {
        minDistance = distance;
        closestCategory = category;
      }
    });

    if (closestCategory !== categorySelected) {
      setCategorySelected(closestCategory);
    }
  };

  // Store item positions for category selection logic
  const onItemLayout = (category: string, event: LayoutChangeEvent) => {
    itemPositions.current[category] = event.nativeEvent.layout.x;
  };

  // Add work item to selection
  const addWorkItem = (workName: string) => {
    if (!workSelected.includes(workName)) {
      setWorkSelected((prev) => [...prev, workName]);
    }
  };

  // Remove work item from selection
  const removeWork = (workName: string) => {
    setWorkSelected((prev) => prev.filter((item) => item !== workName));
  };

  // Handle submit action
  const handleSubmit = () => {
    console.log("Submitting Work Selected:", workSelected);
    router.push("/Pages/invoice");
  };

  return (
    <View className="main-container" style={tw`h-full p-4`}>
      {/* 🔴 First Section - 55% */}
      <View className="first" style={tw`h-[50%] p-2`}>
        {/* Scrollable Category List */}
        <View style={tw`items-center`}>
          <Text style={tw`font-bold text-2xl`}>Services</Text>
        </View>
        <View style={tw`p-2 rounded-lg`}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={tw`flex-row items-center`}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {categoryKeys.map((item) => (
              <View
                key={item}
                onLayout={(event) => onItemLayout(item, event)}
                style={tw`w-70 min-w-[180px] bg-white border border-black mr-2 p-4 rounded-lg`}
              >
                <Text style={tw`font-bold text-black text-center`}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Work Items Based on Centered Category */}
        <View style={tw`flex-1 mt-1 p-4 rounded-lg items-center`}>
          <Text style={tw`text-lg font-semibold text-gray-400 p-2`}>
            Select Work From Here 👇
          </Text>
          <ScrollView style={tw`flex-1 w-full pl-4`}>
            {Array.isArray(workData.services?.[categorySelected]) &&
              workData.services[categorySelected]!.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => addWorkItem(item.name)}
                  style={tw`w-70 bg-black border border-white m-1 p-3 rounded-lg`}
                >
                  <Text style={tw`font-bold text-white text-center`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      {/* 🔵 Second Section - 45% */}
      <View className="second" style={tw`h-[50%] p-2`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-semibold text-black p-2`}>
            Work Selected{" "}
          </Text>
        </View>
        {/* Display Selected Work */}
        <FlatList
          data={workSelected}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <View
              style={tw`flex-row items-center m-1 pl-4 bg-gray-300 border border-white rounded-lg`}
            >
              <Text style={tw`text-black flex-1 `}>
                {index + 1}. {item}
              </Text>
              <IconButton
                icon="trash-can"
                size={20}
                onPress={() => removeWork(item)}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={tw`text-gray-500 text-center mt-2`}>
              No work selected
            </Text>
          }
          style={{ maxHeight: 250 }}
        />

        {/* Buttons for Clearing & Submitting */}
        <View style={tw`flex-row justify-between mt-2`}>
          <TouchableOpacity
            style={tw`bg-red-300 p-3 rounded-lg flex-1 mr-2`}
            onPress={() => setWorkSelected([])}
          >
            <Text style={tw`text-black text-center font-bold`}>
              Clear Work Selected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-green-300 p-3 rounded-lg flex-1`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-black text-center font-bold`}>
              Submit Work Selected
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkListComponent;
