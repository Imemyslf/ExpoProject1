import { View, Text, TextInput, FlatList } from "react-native";
import { useWork } from "../Context/StoreContext";
import { useState } from "react";
import tw from "../../tailwind";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);

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

  return (
    <View style={tw`h-full`}>
      <View style={tw`min-h p-2`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold mb-2`}>CONTACTS</Text>
        </View>
        <View style={tw`flex-column p-2`}>
          <Text style={tw`mb-2 flex font-semibold text-base pl-4`}>
            Customer Name:
          </Text>
          <TextInput
            style={tw`bg-white w-[95%] border pl-4 rounded-lg self-center`}
            placeholder="Eg. John Wick"
          />
        </View>
        <View style={tw`flex-column p-2`}>
          <Text style={tw`mb-2 flex font-semibold text-base pl-4`}>
            Customer Ph no:
          </Text>
          <TextInput
            style={tw`bg-white w-[95%] border pl-4 rounded-lg self-center`}
            placeholder="Eg. 1234567890"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold mb-2`}>INVOICE</Text>
      </View>
      <View style={tw`rounded-lg bg-white m-2`}>
        {/* Table Header */}
        <View
          className="headerInfo"
          style={tw`flex flex-row jsutify-between bg-gray-500 border-b border-gray-300 py-2 rounded-lg`}
        >
          <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
            Work Done
          </Text>
          <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
            Price
          </Text>
        </View>

        <FlatList
          data={selectedWorkType}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={tw`flex flex-row justify-between rounded-lg p-4`}>
              <Text style={tw`w-1/2 text-left pl-4 `}>{item}</Text>
              <View
                style={tw`w-1/2 flex flex-row pl-4 justify-center border border-black rounded-lg`}
              >
                <Text style={tw`w-[20%] font-semibold text-2xl`}>
                  {" "}
                  {"\u20B9"}
                </Text>
                <TextInput
                  style={tw` w-[50%] bg-white rounded-lg text-center `}
                  placeholder="Eg. 273"
                  keyboardType="numeric"
                  value={
                    prices[index] !== undefined ? prices[index].toString() : ""
                  }
                  onChangeText={(text) => handlePriceChange(text, index)}
                />
              </View>
            </View>
          )}
        />
        <View
          style={tw`flex-row justify-between items-center mt-4 py-2 px-5 rounded-xl bg-white shadow-md`}
        >
          <Text style={tw`font-bold text-xl`}>Total:</Text>
          <View style={tw`bg-gray-500 p-2 rounded-lg`}>
            <Text style={tw`font-bond text-lg text-white `}>
              ₹ {total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvoicePage;
