import { Text, Image, Pressable, View } from "react-native";
import tw from "../tailwind";

interface CompanyCardProps {
  name: string;
  logo: any;
  onPress: () => void;
  showLogo?: boolean;
}

interface CarCardProps {
  name: string;
  logo: any;
  onPress: () => void;
}

const CompanyCard = ({ name, logo, onPress, showLogo = false }: CompanyCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        tw.style(
          "w-[80%] h-[80%] m-auto rounded-lg items-center justify-center border border-gray-300 shadow-lg", // Added border and shadow
          pressed ? "bg-gray-200" : "bg-white"
        )
      }
      accessibilityRole="button"
      accessibilityLabel={`Select ${name} company`}
    >
      {showLogo ? (
        <View style={tw`w-full h-[70%] items-center justify-center`}>
          <Image
            style={tw`w-[90%] h-[90%]`}
            resizeMode="contain"
            source={logo}
          />
        </View>
      ) : null}
      <Text style={tw`text-base font-bold text-gray-900 text-center mt-2`} numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
};

const CarCard = ({ name, logo, onPress }: CarCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        tw.style(
          "flex-1 rounded-lg items-center justify-center shadow-md",
          pressed ? "bg-gray-200" : "bg-white"
        )
      }
      accessibilityRole="button"
      accessibilityLabel={`Select ${name} model`}
    >
      <View style={tw`w-full h-[75%] items-center justify-center`}>
        <Image
          style={tw`w-[90%] h-[90%]`}
          resizeMode="contain"
          source={logo}
        />
      </View>
      <Text style={tw`text-base font-semibold text-gray-900 text-center mt-2`} numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
};

export { CompanyCard, CarCard };
