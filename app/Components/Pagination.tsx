import React from "react";
import { View } from "react-native";
import tw from "twrnc";

interface PaginationProps {
  total: number;
  activeIndex: number;
  style?: object;
}

const Pagination: React.FC<PaginationProps> = ({ total, activeIndex, style }) => {
  if (total <= 1) return null;
  return (
    <View style={[tw`flex-row justify-center items-center mt-4`, style]}>
      {Array.from({ length: total }).map((_, idx) => (
        <View
          key={idx}
          style={
            idx === (activeIndex % total)
              ? tw`bg-gray-800 w-3.5 h-3.5 rounded-full mx-1`
              : tw`bg-gray-300 w-2.5 h-2.5 rounded-full mx-1`
          }
        />
      ))}
    </View>
  );
};

export default Pagination;