import { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  useWindowDimensions,
} from "react-native";
import tw from "../../tailwind";
import axios from "axios";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { useWork } from "../../Context/StoreContext";
import Constants from "expo-constants";

// Define types
interface WorkItem {
  name: string;
}

interface WorkData {
  services: Record<string, WorkItem[]>;
}

const WorkListComponent = () => {
  const { height } = useWindowDimensions();
  const [categorySelected, setCategorySelected] = useState<string>(
    "Regular Maintenance & Servicing"
  );
  const { setSelectedWorkType } = useWork();
  const [workSelected, setWorkSelected] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<{ [key: string]: number }>({});
  const [workDatas, setWorkDatas] = useState<WorkData | null>(null);
  const router = useRouter();

  const categoryKeys = useMemo(
    () => (workDatas ? Object.keys(workDatas.services) : []),
    [workDatas]
  );

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
    setSelectedWorkType(workSelected);
    router.push("/Pages/Invoice_Generator");
  };

  useEffect(() => {
    async function loadServices() {
      try {
        const backendUrl = Constants?.expoConfig?.extra?.BACKEND_URL;
        const response = await axios.get(`${backendUrl}data/workshop-services`);
        console.log(
          "Fetched workshop services:",
          JSON.stringify(response.data, null, 2)
        );

        // Transform the response to map categories to their services
        // Remove duplicate 'id' field and use only '_id' if needed
        // Structure: { services: { [category]: WorkItem[] } }
        const services: Record<string, WorkItem[]> = {};
        response.data.forEach((item: any) => {
          services[item.category] = item.services.map((service: any) => ({
            name: service.name,
            price: service.price,
          }));
        });

        console.log("Transformed services:", JSON.stringify(services, null, 2));
        setWorkDatas({ services });
      } catch (error) {
        console.error("Error fetching workshop services:", error);
      }
    }
    loadServices();
  }, []);

  if (!workDatas) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading services...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-36`}>
        <View style={tw`p-4`}>
          {/* Service selection */}
          <View style={tw`mb-4`}>
            <Text style={tw`font-bold text-2xl text-center`}>Services</Text>
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex-row items-center mt-2`}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {categoryKeys.map((item) => (
                <View
                  key={item}
                  onLayout={(event) => onItemLayout(item, event)}
                  style={tw`w-70 min-w-[180px] bg-white border border-black mr-2 p-4 rounded-lg`}
                >
                  <Text style={tw`font-bold text-black text-center`}>
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Work list */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`text-lg font-semibold text-gray-500 text-center mb-2`}
            >
              Select Work From Here 👇
            </Text>
            <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
              {Array.isArray(workDatas?.services?.[categorySelected]) &&
                workDatas.services[categorySelected]!.map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => addWorkItem(item.name)}
                    style={tw`w-70 bg-black border border-white m-1 p-3 rounded-lg self-center`}
                  >
                    <Text style={tw`font-bold text-white text-center`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Selected Work */}
          <View style={tw`mt-6`}>
            <Text
              style={tw`text-2xl font-semibold text-black text-center mb-2`}
            >
              Work Selected
            </Text>
            <View style={tw`mt-4`}>
              {workSelected.length === 0 ? (
                <Text style={tw`text-gray-500 text-center mt-2`}>
                  No work selected
                </Text>
              ) : (
                workSelected.map((item, index) => (
                  <View
                    key={`${item}-${index}`}
                    style={tw`flex-row items-center m-1 pl-4 bg-gray-300 border border-white rounded-lg`}
                  >
                    <Text style={tw`text-black flex-1`}>
                      {index + 1}. {item}
                    </Text>
                    <IconButton
                      icon="trash-can"
                      size={20}
                      onPress={() => removeWork(item)}
                    />
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View
        style={tw`absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 flex-row justify-between`}
      >
        <TouchableOpacity
          style={tw`bg-red-300 p-3 rounded-lg flex-1 mr-2`}
          onPress={() => setWorkSelected([])}
        >
          <Text style={tw`text-black text-center font-bold`}>
            Clear Work Selected
          </Text>
        </TouchableOpacity>

        {workSelected.length !== 0 && (
          <TouchableOpacity
            style={tw`bg-green-300 p-3 rounded-lg flex-1`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-black text-center font-bold`}>
              Submit Work Selected
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default WorkListComponent;
