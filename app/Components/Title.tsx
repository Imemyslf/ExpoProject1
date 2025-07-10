import { View, Text, TextInput } from "react-native";
import tw from "../../tailwind";

interface ContactProps {
  name: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

interface TitleProps {
  name: string;
}

const Contact = ({ name, placeholder }: ContactProps) => {
  return (
    <View style={tw`flex-column p-2`}>
      {/* Wrapper around Text to limit background */}
      <View style={tw`bg-white self-start px-2 rounded-md`}>
        <Text style={tw`mb-2 font-semibold text-base`}>{name}</Text>
      </View>

      {/* Input Field */}
      <TextInput
        style={tw`bg-white w-[95%] border pl-4 rounded-lg self-center`}
        placeholder={placeholder}
      />
    </View>
  );
};

const Title = ({ name }: TitleProps) => {
  return (
    <View style={tw`items-center`}>
      <Text style={tw`text-2xl font-bold mb-2`}>{name}</Text>
    </View>
  );
};
export { Contact, Title };
