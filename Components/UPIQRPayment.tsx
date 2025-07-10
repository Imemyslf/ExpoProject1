import React from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import tw from "../tailwind"; 

interface UPIQRPaymentProps {
  total: number
}

const merchatUPI = "kishanbro9666@okhdfcbank";
const merchantName = "Tea stall";

const UPIQRPayment: React.FC<UPIQRPaymentProps> = ({ total }) => {
  const upiURL = `upi://pay?pa=${merchatUPI}&pn=${merchantName}&am=${total}&cu=INR`;

  return (
    <View style={tw`mt-2 bg-white p-5 rounded-xl shadow items-center justify-center`}>
      <Text style={tw`text-lg font-bold mb-4`}>Scan to Pay</Text>
      <QRCode value={upiURL} size={200} />
    </View>
  );
};

export default UPIQRPayment;
