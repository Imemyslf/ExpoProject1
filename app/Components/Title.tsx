import { View, Text, TextInput } from "react-native";
import tw from "../../tailwind";

interface ContactProps {
  name: string;
  placeholder: string;
}

interface TitleProps {
    name: string;
  }

const Contact = ({ name, placeholder }: ContactProps) => {
  return (
    <View style={tw`flex-column p-2`}>
      <Text style={tw`mb-2 flex font-semibold text-base pl-4`}>{name}</Text>
      <TextInput
        style={tw`bg-white w-[95%] border pl-4 rounded-lg self-center`}
        placeholder={placeholder} // Fixed typo here
      />
    </View>
  );
};

const Title = ({name}: TitleProps) => {
    return (
    <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{name}</Text>
    </View>);
}
export {Contact, Title};
