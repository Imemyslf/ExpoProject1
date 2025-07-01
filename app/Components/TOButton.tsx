import { View, Text, TouchableOpacity } from "react-native";
import tw from "../../tailwind";
import { IconButton } from "react-native-paper";

interface ButtonUIContent {
  onPress: () => void;
  iconName: string;
  iconColor: string;
  size?: number;
  title?: string; // Optional
}

const TOButton: React.FC<ButtonUIContent> = ({
  onPress,
  title,
  iconName,
  iconColor,
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        title
          ? tw`h-11 w-[45%] m-2 flex-row items-center justify-center rounded-lg mt-4 border border-gray-400`
          : tw`h-11 w-[15%] m-2 flex-row items-center justify-center rounded-lg border border-gray-400`
      }
    >
      {title && (
        <Text style={[tw`font-bold text-lg`, { color: iconColor }]}>{title}</Text>
      )}
      <IconButton icon={iconName} size={size} iconColor={iconColor} />
    </TouchableOpacity>
  );
};

export default TOButton;
