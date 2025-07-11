import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import MainInvoiceScreen from "./Tabs/MainInvoiceTab";
import PdfShareTab from "./Tabs/PdfShareTab";
import InvoicePDF from "./Tabs/invoicePdf";
import { useTab } from "../Context/StoreContext"; // <-- Import the Tab context hook

export default function Index() {
  const { activeTab, setActiveTab } = useTab(); // <-- Use the context

  return (
    <>
      <View style={tw`flex-1`}>
        {/* Render the active screen */}
        {activeTab === "main" && <MainInvoiceScreen />}
        {activeTab === "pdf" && <PdfShareTab />}
        {activeTab === "invoice" && <InvoicePDF />}
      </View>

      {/* Custom Tab Bar */}
      <View style={tw`flex-row justify-around p-3 border-t border-gray-300 bg-white`}>
        <TouchableOpacity onPress={() => setActiveTab("main")}>
          <Text style={tw`${activeTab === "main" ? "text-blue-600" : "text-gray-600"} text-lg font-bold`}>
            Main
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("pdf")}>
          <Text style={tw`${activeTab === "pdf" ? "text-blue-600" : "text-gray-600"} text-lg font-bold`}>
            PDF
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("invoice")}>
          <Text style={tw`${activeTab === "invoice" ? "text-blue-600" : "text-gray-600"} text-lg font-bold`}>
            Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
