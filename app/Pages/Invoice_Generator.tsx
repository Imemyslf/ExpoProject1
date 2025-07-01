import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useWork } from "../Context/StoreContext";
import { useState, useRef } from "react";
import tw from "../../tailwind";
import { Contact, Title } from "../Components/Title";
import Table from "../Components/Table";
import TOButton from "../Components/TOButton";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [makeImage, setMakeImage] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null); // Store image URI
  const tableRef = useRef<ViewShot>(null);

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

  // Function to capture the invoice image
  const captureInvoiceImage = async () => {
    try {
      if (tableRef.current && typeof tableRef.current.capture === "function") {
        const uri = await tableRef.current.capture(); // Capture image
        setImageUri(uri); // Store URI instead of saving to gallery
        Alert.alert("Success", "Invoice is ready to be shared!");
      } else {
        console.error("Error: tableRef.current.capture is undefined");
        Alert.alert("Error", "Failed to capture the invoice.");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert("Error", "Failed to generate the invoice image.");
    }
  };

  // Function to share the generated invoice image
  const shareInvoiceImage = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please confirm the invoice first.");
      return;
    }

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(imageUri);
      } else {
        Alert.alert("Sharing not available", "Unable to share the invoice.");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "Failed to share the invoice image.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1`}>
        <ScrollView style={tw`flex-1`}>
          <ViewShot ref={tableRef} options={{ format: "png", quality: 0.9 }}>
            <View style={tw`p-2`}>
              <Title name="CONTACTS" />
              <Contact name="Customer Name:" placeholder="Eg. John Wick" />
              <Contact name="Customer Ph no:" placeholder="Eg. 1234567890" />

              <Title name="INVOICE" />
              <Table
                data={selectedWorkType || []}
                price={prices}
                total={total}
                onChange={handlePriceChange}
                showFlip={makeImage}
              />
            </View>
          </ViewShot>
        </ScrollView>

        <View style={tw`w-full p-4 flex-row justify-around bg-white`}>
          <TOButton
            onPress={() => {
              setMakeImage(true);
              captureInvoiceImage();
            }}
            title="Confirm"
            iconName="check-all"
            iconColor="blue"
          />

          {makeImage && (
            <TOButton
              onPress={shareInvoiceImage}
              title="Share"
              iconName="share-variant"
              iconColor="red"
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InvoicePage;
