import { TouchableOpacity, Text } from "react-native";
import { IconButton } from "react-native-paper";
import tw from "../../tailwind";

interface ButtonUIContent {
  onPress: () => void;
  iconName: string;
  iconColor: string;
  size?: number;
  title?: string;
  disabled?: boolean;
}

const TOButton: React.FC<ButtonUIContent> = ({
  onPress,
  title,
  iconName,
  iconColor,
  size = 24,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        title
          ? tw`h-11 w-[45%] m-2 flex-row items-center justify-center rounded-lg mt-4 border border-gray-400`
          : tw`h-11 w-[15%] m-2 flex-row items-center justify-center rounded-lg border border-gray-400`,
        disabled && { backgroundColor: "#e5e7eb", opacity: 0.6 }, // Tailwind gray-200
      ]}
    >
      {title && (
        <Text style={[tw`font-bold text-lg`, { color: iconColor }]}>{title}</Text>
      )}
      <IconButton icon={iconName} size={size} iconColor={iconColor} disabled={disabled} />
    </TouchableOpacity>
  );
};

export default TOButton;
