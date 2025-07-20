import React, { useRef } from "react";
import { View, Button, Alert, ScrollView } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import tw from "../../tailwind";
import Invoice from "../../Components/InvoicePDFComponent";
import Constants from "expo-constants";

export default function InvoicePDF() {
  const invoiceRef = useRef(null);

  const generateAndShare = async () => {
    try {
      // Ensure BACKEND_URL exists
      // const backendUrl = Constants?.expoConfig?.extra?.BACKEND_URL;
      // console.log("Backend URL:", backendUrl);
      // if (!backendUrl) {
      //   throw new Error("BACKEND_URL is not defined in expoConfig.extra");
      // }

      // 1. Capture invoice as base64 image
      const base64 = await captureRef(invoiceRef, {
        format: "png",
        quality: 1,
        result: "base64",
      });

      // 2. Send to backend
      const response = await fetch(`https://backend-deploy-engine-production.up.railway.app/img/upload-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!response.ok) throw new Error("Failed to generate PDF from backend");

      const blob = await response.blob();

      // 3. Convert blob to base64 using FileReader safely
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          const base64data = reader.result.split(",")[1]; // Remove data prefix

          const fileUri = `${FileSystem.documentDirectory}invoice.pdf`;

          await FileSystem.writeAsStringAsync(fileUri, base64data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await Sharing.shareAsync(fileUri, {
            mimeType: "application/pdf",
            dialogTitle: "Share Invoice PDF",
          });
        } else {
          Alert.alert("Error", "Unable to process the PDF file.");
        }
      };

      reader.readAsDataURL(blob); // triggers onloadend
    } catch (error) {
      console.error("❌ PDF generation error:", error);
      Alert.alert("Error", "Failed to generate or share PDF.");
    }
  };

  return (
    <>
      <View style={tw`flex-1 bg-white`}>
        <ScrollView
          contentContainerStyle={tw`p-4`}
          showsVerticalScrollIndicator={false}
        >
          {/* 🔽 Invoice Content to be Captured */}
          <View ref={invoiceRef} collapsable={false}>
            <Invoice />
          </View>
        </ScrollView>

        <View style={tw`p-4 border-t border-gray-200`}>
          <Button
            title="📤 Generate & Share Invoice PDF"
            onPress={generateAndShare}
          />
        </View>
      </View>
    </>
  );
}
