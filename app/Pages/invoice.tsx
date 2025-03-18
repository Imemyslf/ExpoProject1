{
  /* {total > 0 && Object.values(prices).every(value => value > 0) && (
        <View style={tw`flex-row justify-around`}>
          <TouchableOpacity style={tw`w-[40%] self-center flex-row items-center justify-center bg-gray-800 rounded-lg mt-4`}>
            <Text style={tw`font-bold text-lg text-white`}>Add More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[40%] self-center flex-row items-center justify-center bg-gray-800 rounded-lg mt-4`}
          >
            <Text style={tw`font-bold text-lg text-white`}>Share</Text>
            <IconButton icon="share-variant" size={24} iconColor="white" />
          </TouchableOpacity>
        </View>
      )} */
}

import { View, Text, Alert, ScrollView } from "react-native";
import { useWork } from "../Context/StoreContext";
import { useState, useRef, useEffect } from "react";
import tw from "../../tailwind";
import { Contact, Title } from "../Components/Title";
import Table from "../Components/Table";
import TOButton from "../Components/TOButton";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [makeImage, setImage] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const tableRef = useRef<ViewShot>(null); // Reference for capturing the Table component

  // Request media library permissions when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to update price & total dynamically
  const handlePriceChange = (text: string, index: number) => {
    const parsedValue = parseFloat(text);
    const newPrices = {
      ...prices,
      [index]: isNaN(parsedValue) ? 0 : parsedValue,
    };
    setPrices(newPrices);

    // Calculate total sum
    const newTotal = Object.values(newPrices).reduce(
      (sum, num) => sum + (num || 0),
      0
    );
    setTotal(newTotal);
  };

  // Function to capture the Table component and save as an image
  const captureAndSaveImage = async () => {
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Enable media permissions to save images."
      );
      return;
    }

    try {
      if (tableRef.current && typeof tableRef.current.capture === "function") {
        const uri = await tableRef.current.capture(); // Capture the component
        const fileUri = FileSystem.documentDirectory + "invoice.png";

        // Save captured image to a file
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });

        // Save to media library
        await MediaLibrary.saveToLibraryAsync(fileUri);
        Alert.alert("Success", "Invoice saved to gallery!");
      } else {
        console.error("Error: tableRef.current.capture is undefined");
        Alert.alert("Error", "Failed to capture the invoice.");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save the invoice.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} // Ensures scrolling & button visibility
      style={tw`h-full`}
    >
      {/* Invoice Content Inside ViewShot */}
        <View style={tw`p-4`}>
          <Title name="CONTACTS" />
          <Contact name="Customer Name:" placeholder="Eg. John Wick" />
          <Contact name="Customer Ph no:" placeholder="Eg. 1234567890" />

          <Title name="INVOICE" />
          <ViewShot ref={tableRef} options={{ format: "png", quality: 0.9 }}>
          <Table
            data={selectedWorkType || []}
            price={prices}
            total={total}
            onChange={handlePriceChange}
          />
          </ViewShot>
        </View>

      {/* Ensure Buttons are Always Visible */}
      <View
        style={tw`w-full p-4 flex-row justify-around absolute bottom-0`}
      >
        <TOButton
          onPress={() => {
            setImage(!makeImage);
            if (makeImage === true){
              captureAndSaveImage();
            }
          }}
          title="Confirm"
          iconName="check-all"
          iconColor="blue"
        />

        {makeImage && (
          <TOButton
            onPress={() => console.log("Sharing...")}
            title="Share"
            iconName="share-variant"
            iconColor="red"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default InvoicePage;
