import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import tw from "../../tailwind"; 

const Header = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={tw`w-full bg-white py-4 px-5 flex-row items-center`}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.canGoBack() && navigation.goBack()}
        style={tw`mr-4`}
      >
        <Text style={tw`text-black text-xl`}>←</Text>
      </TouchableOpacity>

      {/* App Title (Clickable) */}
      <TouchableOpacity  onPress={() => router.push("/") } >
        <Text style={tw`text-black text-lg font-bold`}>FOURAGE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
