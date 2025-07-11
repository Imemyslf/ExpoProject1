// app/Pages/invoice_pdf.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "../../tailwind";
import UPIQRPayment from "../../Components/UPIQRPayment";
import { useInvoice } from "../../Context/StoreContext";

export default function InvoicePDF() {
  const { invoiceData } = useInvoice();

  if (!invoiceData) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-gray-600`}>No invoice data found.</Text>
      </View>
    );
  }

  const { customerName, customerPhone, workDone, prices, total } = invoiceData;

  return (
    <ScrollView style={tw`flex-1 bg-white px-4 py-6`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>🧾 INVOICE</Text>

      {/* Customer Info */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-base font-semibold mb-1`}>
          Customer: {customerName}
        </Text>
        <Text style={tw`text-base font-semibold`}>
          Phone: {customerPhone}
        </Text>
      </View>

      {/* Table Header */}
      <View style={tw`flex-row border-b border-gray-300 py-2 mb-2`}>
        <Text style={tw`w-2/3 font-bold text-lg`}>Work Done</Text>
        <Text style={tw`w-1/3 font-bold text-lg text-right`}>Price (₹)</Text>
      </View>

      {/* Table Rows */}
      {workDone.map((item, index) => (
        <View key={index} style={tw`flex-row py-2 border-b border-gray-100`}>
          <Text style={tw`w-2/3 text-base`}>{item}</Text>
          <Text style={tw`w-1/3 text-base text-right`}>
            ₹ {prices[index]?.toFixed(2) ?? "0.00"}
          </Text>
        </View>
      ))}

      {/* Total */}
      <View style={tw`mt-6 border-t border-gray-300 pt-3`}>
        <Text style={tw`text-xl font-bold text-right text-green-700`}>
          Total: ₹ {total.toFixed(2)}
        </Text>
      </View>

      {/* QR Code */}
      <View style={tw`mt-8 items-center`}>
        <Text style={tw`text-base font-semibold mb-2`}>Scan to Pay</Text>
        <UPIQRPayment total={total} />
      </View>
    </ScrollView>
  );
}
