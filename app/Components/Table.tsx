import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import tw from "../../tailwind";
import TOButton from "./TOButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import UPIQRPayment from "./UPIQRPayment";

interface TableProps {
  data: string[];
  price: Record<number, number>;
  total: number;
  onChange: (text: string, index: number) => void;
  showFlip?: boolean; // Add this line
}

const Table = ({ data, price, total, onChange, showFlip }: TableProps) => {
  const isFlipped = useSharedValue(0);

  // Track pointer event states
  const [frontEvents, setFrontEvents] = useState<"auto" | "none">("auto");
  const [backEvents, setBackEvents] = useState<"auto" | "none">("none");

  // Update pointer events when flip changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isFlipped.value >= 90) {
        setFrontEvents("none");
        setBackEvents("auto");
      } else {
        setFrontEvents("auto");
        setBackEvents("none");
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const toggleFlip = () => {
    isFlipped.value = withTiming(isFlipped.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${interpolate(isFlipped.value, [0, 180], [0, 180])}deg`,
      },
    ],
    opacity: isFlipped.value > 90 ? 0 : 1,
    backfaceVisibility: "hidden",
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${interpolate(isFlipped.value, [0, 180], [180, 360])}deg`,
      },
    ],
    opacity: isFlipped.value < 90 ? 0 : 1,
    backfaceVisibility: "hidden",
    position: "absolute",
  }));

  return (
    <View style={[tw`h-full flex-1 items-center justify-center`, { perspective: 1000 }]}>
      {/* FRONT SIDE */}
      <Animated.View
        style={[tw`w-[95%]`, frontAnimatedStyle]}
        pointerEvents={frontEvents}
      >
        <View style={tw`h-full`}>
          <View style={tw`rounded-lg bg-white m-2`}>
            {/* Header */}
            <View
              style={tw`flex flex-row justify-between bg-gray-800 border-b border-gray-300 py-2 rounded-lg`}
            >
              <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
                Work Done
              </Text>
              <Text style={tw`w-1/2 text-lg text-white font-bold text-center`}>
                Price
              </Text>
            </View>

            {/* Table Data */}
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View
                  style={tw`flex flex-row justify-between rounded-lg p-2 m-1 border-l border-r border-b`}
                >
                  <Text style={tw`w-[50%] text-left pl-4 font-medium text-base`}>
                    {item}
                  </Text>
                  <View
                    style={tw`w-[30%] flex flex-row pl-1 justify-center border border-black rounded-lg`}
                  >
                    <Text style={tw`w-[20%] font-semibold text-2xl`}>
                      {"\u20B9"}
                    </Text>
                    <TextInput
                      style={tw`w-[50%] bg-white rounded-lg text-center`}
                      keyboardType="numeric"
                      value={
                        price[index] !== undefined
                          ? price[index].toString()
                          : "0"
                      }
                      onChangeText={(text) => onChange(text, index)}
                    />
                  </View>
                </View>
              )}
            />

            {/* Total Section */}
            <View
              style={tw`flex-row justify-between items-center mt-4 py-2 px-5 rounded-xl bg-white shadow-md`}
            >
              <Text style={tw`font-bold text-xl`}>Total:</Text>
              {showFlip && (
                <TOButton
                  onPress={toggleFlip}
                  iconName="rotate-3d-variant"
                  iconColor="grey"
                />
              )}
              <View style={tw`p-2 rounded-lg`}>
                <Text style={tw`font-bold text-lg text-green-700`}>
                  ₹ {total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* BACK SIDE */}
      <Animated.View
        style={[tw`w-[90%] `, backAnimatedStyle]}
        pointerEvents={backEvents}
      >
        <View style={tw`flex-1 justify-center p-4 items-center bg-white`}>
          <UPIQRPayment total={total} />
          <TOButton
            onPress={toggleFlip}
            iconName="rotate-3d-variant"
            iconColor="grey"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Table;
