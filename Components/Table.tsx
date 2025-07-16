import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import tw from "../tailwind";
import TOButton from "./TOButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import UPIQRPayment from "./UPIQRPayment";

interface TableProps {
  data: string[];
  price: Record<number, number>;
  total: number;
  onChange: (text: string, index: number) => void;
  showFlip?: boolean;
  paymentMode: "UPI" | "Cash" | "None"; // <-- add this
  setPaymentMode: (mode: "UPI" | "Cash" | "None") => void; // <-- add this
}

const Table = ({
  data,
  price,
  total,
  onChange,
  showFlip,
  paymentMode,
  setPaymentMode,
}: TableProps) => {
  const isFlipped = useSharedValue(0);
  const [frontEvents, setFrontEvents] = useState<"auto" | "none">("auto");
  const [backEvents, setBackEvents] = useState<"auto" | "none">("none");
  const HEIGHT = Dimensions.get("window").height * 0.4;

  useAnimatedReaction(
    () => isFlipped.value,
    (val) => {
      runOnJS(setFrontEvents)(val >= 90 ? "none" : "auto");
      runOnJS(setBackEvents)(val >= 90 ? "auto" : "none");
    },
    []
  );

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
    <View style={[tw`items-center`, { perspective: 1000 }]}>
      {/* FRONT SIDE */}
      <Animated.View
        style={[tw`w-[85%]`, frontAnimatedStyle]}
        pointerEvents={frontEvents}
      >
        <View style={tw`m-2 rounded-lg`}>
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

          {/* Scrollable Content */}
          <View style={{ height: HEIGHT }}>
            <ScrollView
              style={tw`flex-1`}
              contentContainerStyle={tw`pb-4`}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              keyboardDismissMode="on-drag"
              scrollEventThrottle={16}
              decelerationRate="fast"
            >
              {data.map((item, index) => (
                <View
                  key={index}
                  style={tw`flex flex-row justify-between rounded-lg p-2 m-1 border-l border-r border-b`}
                >
                  <Text
                    style={tw`w-[50%] text-left pl-4 font-medium text-base`}
                  >
                    {item}
                  </Text>
                  <View
                    style={[
                      tw`flex flex-row pl-1 justify-center items-center border border-black rounded-lg bg-white`,
                      { width: 90, height: 48 }, // <-- Fixed width and height for consistency
                    ]}
                  >
                    <Text style={tw`font-semibold text-2xl mr-1`}>
                      {"\u20B9"}
                    </Text>
                    <TextInput
                      style={[
                        tw`bg-white rounded-lg text-center`,
                        { width: 60, height: 40, fontSize: 18 },
                      ]}
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
              ))}

              {/* Total Section */}
              <View
                style={tw`flex-row justify-between items-center mt-9 py-2 px-5 rounded-xl bg-white shadow-md`}
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
            </ScrollView>
          </View>
        </View>
      </Animated.View>

      {/* BACK SIDE */}
      <Animated.View
        style={[tw`w-[90%]`, backAnimatedStyle]}
        pointerEvents={backEvents}
      >
        <View style={tw`flex-1 justify-center p-4 items-center `}>
          <UPIQRPayment total={total} />
          {/* Payment Mode Buttons */}
          <View style={tw`flex-row `}>
            <TOButton
              title="UPI"
              iconName="qrcode"
              iconColor="green"
              onPress={() => setPaymentMode("UPI")}
              style={[
                paymentMode === "UPI" ? tw`bg-black` : tw`bg-white`,
              ]}
              textStyle={paymentMode === "UPI" ? tw`text-white` : tw`text-black`}
            />
            <TOButton
              title="Cash"
              iconName="cash"
              iconColor="blue"
              onPress={() => setPaymentMode("Cash")}
              style={[
                paymentMode === "Cash" ? tw`bg-black` : tw`bg-white`,
              ]}
              textStyle={paymentMode === "Cash" ? tw`text-white` : tw`text-black`}
            />
          </View>

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
