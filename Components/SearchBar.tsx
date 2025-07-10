import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onFocus: () => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onFocus,
  onSearch,
}) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      style={tw`w-full px-4 py-2 border-2 border-gray-300 rounded-2xl bg-white text-base text-gray-800 pr-10`}
      placeholder="Enter Company name"
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
    />
    <TouchableOpacity
      style={[
        tw`absolute right-4 top-1/2 z-30`,
        { transform: [{ translateY: -11 }] },
      ]}
      onPress={onSearch}
    >
      <Ionicons name="search" size={22} color="#888" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 8,
    position: "relative",
    zIndex: 2,
  },
});

export default SearchBar;