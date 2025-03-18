import { View, Text, FlatList, TextInput, ScrollView } from "react-native";
import tw from "../../tailwind";

interface TableProps {
  data: string[];
  price: Record<number, number>;
  total: number;
  onChange: (text: string, index: number) => void;
}

const Table = ({ data, price, total, onChange }: TableProps) => {
  return (
    <ScrollView style={tw`h-[95%]`} nestedScrollEnabled={true}>
      <View style={tw`rounded-lg bg-white m-2`}>
        {/* Table Header */}
        <View style={tw`flex flex-row justify-between bg-gray-800 border-b border-gray-300 py-2 rounded-lg`}>
          <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
            Work Done
          </Text>
          <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
            Price
          </Text>
        </View>

        {/* FlatList wrapped inside View to avoid scroll conflicts */}
        <View>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false} // Disables FlatList scrolling
            renderItem={({ item, index }) => (
              <View style={tw`flex flex-row justify-between rounded-lg p-2 m-1 border-l border-r border-b`}>
                <Text style={tw`w-[50%]] text-left pl-4 font-medium text-base`}>
                  {item}
                </Text>
                <View style={tw`w-[30%] flex flex-row pl-1 justify-center border border-black rounded-lg`}>
                  <Text style={tw`w-[20%] font-semibold text-2xl`}>{"\u20B9"}</Text>
                  <TextInput
                    style={tw`w-[50%] bg-white rounded-lg text-center`}
                    placeholder="Eg. 273"
                    keyboardType="numeric"
                    value={price[index] !== undefined ? price[index].toString() : "0"}
                    onChangeText={(text) => onChange(text, index)} 
                  />
                </View>
              </View>
            )}
          />
        </View>

        {/* Total Price Section */}
        <View style={tw`flex-row justify-between items-center mt-4 py-2 px-5 rounded-xl bg-white shadow-md`}>
          <Text style={tw`font-bold text-xl`}>Total:</Text>
          <View style={tw`p-2 rounded-lg`}>
            <Text style={tw`font-bold text-lg text-green-700`}>
              ₹ {total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Table;
