import { View, Text, TouchableOpacity} from "react-native"
import tw from "../../tailwind";
import { IconButton } from "react-native-paper";


interface ButtonUIContent {
    onPress: () => void;
    title: string;  // Renamed from 'type' to 'title'
    iconName: string;
    iconColor: string;
    size?: number;
}

const TOButton: React.FC<ButtonUIContent> = ({ onPress, title, iconName, iconColor, size = 24 }) => {
    return (
      <TouchableOpacity onPress={onPress} style={tw`h-15 w-[45%] m-2 flex-row items-center justify-center rounded-lg mt-4 border`}>
        <Text style={tw`font-bold text-lg text-${iconColor}`}>{title}</Text>
        <IconButton icon={iconName} size={size} iconColor={iconColor} />
      </TouchableOpacity>
    );
};

export default TOButton;
