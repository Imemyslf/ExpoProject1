
{/* {total > 0 && Object.values(prices).every(value => value > 0) && (
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
      )} */}


      import { View, Text } from "react-native";
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
        const [makeImage, setImage] = useState<boolean>(false);
      
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
              <Title name="CONTACTS" />
              <Contact name="Customer Name:" placeholder="Eg. John Wick" />
              <Contact name="Customer Ph no:" placeholder="Eg. 1234567890" />
            </View>
      
            <Title name="INVOICE" />
            {/* Pass the required props to Table */}
            <Table 
              data={selectedWorkType || []} 
              price={prices} 
              total={total} 
              onChange={handlePriceChange} 
            />
      
            <View style={tw`w-[90%] p-2 flex-row justify-around self-center`}>
              <TOButton 
                onPress={() => setImage(!makeImage)}
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
          </View>
        );
      };
      
      export default InvoicePage;
      