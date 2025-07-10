import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useWork } from "../Context/StoreContext";
import { useState } from "react";
import tw from "../../tailwind";
import { Contact, Title } from "../Components/Title";
import Table from "../Components/Table";
import TOButton from "../Components/TOButton";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [makeImage, setMakeImage] = useState<boolean>(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Update price and total dynamically
  const handlePriceChange = (text: string, index: number) => {
    const parsedValue = parseFloat(text);
    const newPrices = {
      ...prices,
      [index]: isNaN(parsedValue) ? 0 : parsedValue,
    };
    setPrices(newPrices);

    const newTotal = Object.values(newPrices).reduce(
      (sum, num) => sum + (num || 0),
      0
    );
    setTotal(newTotal);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1`}>
        <View style={tw`p-2`}>
          <Title name="CONTACTS" />
          <Contact
            name="Customer Name:"
            placeholder="Eg. John Wick"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <Contact
            name="Customer Ph no:"
            placeholder="Eg. 1234567890"
            value={customerPhone}
            onChangeText={setCustomerPhone}
          />

          <Title name="INVOICE" />
          <Table
            data={selectedWorkType || []}
            price={prices}
            total={total}
            onChange={handlePriceChange}
            showFlip={makeImage}
          />
        </View>

        <View style={tw`absolute bottom-0 left-0 w-full p-4 flex-row justify-around bg-white border-t border-gray-200`}>
          <TOButton
            onPress={() => {
              setMakeImage(true);
              // You can add share logic here later
            }}
            title="Confirm"
            iconName="check-all"
            iconColor="blue"
            disabled={total <= 0}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InvoicePage;
