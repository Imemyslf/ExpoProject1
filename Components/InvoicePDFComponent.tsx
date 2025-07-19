import React, { useEffect, useState, forwardRef } from "react";
import { View, Text } from "react-native";
import tw from "../tailwind";
import UPIQRPayment from "../Components/UPIQRPayment";
import Constants from "expo-constants";

interface InvoiceData {
  customerName: string;
  customerPhone: string;
  paymentMode?: string;
  workDone: string[];
  prices: Record<number, number>;
  total: number;
}

const InvoicePDF = forwardRef<View>((props, ref) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    async function fetchLastInvoice() {
      try {
        const backendUrl = Constants?.expoConfig?.extra?.BACKEND_URL;
        const response = await fetch(`${backendUrl}data/last-invoice`);
        const data = await response.json();
        if (data) {
          const { id, ...rest } = data;
          setInvoiceData(rest as InvoiceData);
        }
      } catch (err) {
        console.error("Error fetching last invoice:", err);
        setInvoiceData(null);
      }
    }
    fetchLastInvoice();
  }, []);

  if (!invoiceData) {
    return (
      <View style={tw`justify-center items-center`} ref={ref}>
        <Text style={tw`text-lg text-gray-600`}>No invoice data found.</Text>
      </View>
    );
  }

  const { customerName, customerPhone, workDone, prices, total, paymentMode } =
    invoiceData;

  return (
    <View ref={ref} style={tw`bg-white p-4 w-full`} collapsable={false}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>🧾 INVOICE</Text>

      <View style={tw`mb-4`}>
        <Text style={tw`text-base font-semibold mb-1`}>
          Customer: {customerName}
        </Text>
        <Text style={tw`text-base font-semibold`}>Phone: {customerPhone}</Text>
        <Text style={tw`text-base font-semibold`}>
          Payment Mode: {paymentMode ?? "N/A"}
        </Text>
      </View>

      <View style={tw`flex-row border-b border-gray-300 py-2 mb-2`}>
        <Text style={tw`w-2/3 font-bold text-lg`}>Work Done</Text>
        <Text style={tw`w-1/3 font-bold text-lg text-right`}>Price (₹)</Text>
      </View>

      {workDone.map((item, index) => (
        <View key={index} style={tw`flex-row py-2 border-b border-gray-100`}>
          <Text style={tw`w-2/3 text-base`}>{item}</Text>
          <Text style={tw`w-1/3 text-base text-right`}>
            ₹ {prices[index]?.toFixed(2) ?? "0.00"}
          </Text>
        </View>
      ))}

      <View style={tw`mt-6 border-t border-gray-300 pt-3`}>
        <Text style={tw`text-xl font-bold text-right text-green-700`}>
          Total: ₹ {total.toFixed(2)}
        </Text>
      </View>

      <View style={tw`mt-8 items-center mb-10`}>
        <UPIQRPayment total={total} />
      </View>
    </View>
  );
});

export default InvoicePDF;
