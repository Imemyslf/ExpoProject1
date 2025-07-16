import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import tw from "../tailwind";

interface ContactProps {
  name: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isAutoSuggestSafe?: boolean;
  autoComplete?: "name" | "tel" | "off" | "email" | "username" | "password";
  textContentType?: "name" | "telephoneNumber" | "emailAddress" | "password" | "username" | "none";
  keyboardType?: KeyboardTypeOptions;
}

interface TitleProps {
  name: string;
}

const Contact = ({
  name,
  placeholder,
  value,
  onChangeText,
  isAutoSuggestSafe = false,
  autoComplete = "off",
  textContentType,
  keyboardType = "default",
}: ContactProps) => {
  const handleChange = (text: string) => {
    if (isAutoSuggestSafe) {
      setTimeout(() => {
        onChangeText?.(text);
      }, 1);
    } else {
      onChangeText?.(text);
    }
  };

  return (
    <View style={tw`flex-column p-2`}>
      <View style={tw`self-start px-2 rounded-md`}>
        <Text style={tw`mb-2 font-semibold text-base`}>{name}</Text>
      </View>
      <TextInput
        style={tw`bg-white w-[95%] border pl-4 rounded-lg self-center`}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        onEndEditing={(e) => {
          const finalText = e.nativeEvent.text;
          onChangeText?.(finalText);
        }}
        autoCorrect={false}
        importantForAutofill="yes"
        returnKeyType="done"
        autoComplete={autoComplete}
        textContentType={textContentType}
        keyboardType={keyboardType}
        submitBehavior="submit"
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
