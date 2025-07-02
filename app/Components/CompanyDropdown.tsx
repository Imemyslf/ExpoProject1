import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

interface Company {
  name: string;
  logo: string;
  description: string;
  models: { name: string }[];
}

interface CompanyDropdownProps {
  visible: boolean;
  data: Company[];
  onSelect: (companyName: string) => void;
}

const CompanyDropdown: React.FC<CompanyDropdownProps> = ({ visible, data, onSelect }) => {
  if (!visible || data.length === 0) return null;

  return (
    <View style={tw`absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-xl max-h-44 z-50 shadow`}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`py-3 px-4 border-b border-gray-200`}
            onPress={() => onSelect(item.name)}
          >
            <Text style={tw`text-base text-gray-800`}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default CompanyDropdown;