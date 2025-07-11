import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import tw from "../../tailwind";

export default function PdfShareTab() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        Alert.alert("Cancelled", "PDF selection was cancelled.");
        return;
      }

      const file = result.assets[0]; // safe after cancellation check
      setPdfUri(file.uri);
      setFileName(file.name || "shared.pdf");
    } catch (error) {
      console.error("PDF selection error:", error);
      Alert.alert("Error", "Something went wrong while picking the PDF.");
    }
  };

  const sharePdf = async () => {
    if (!pdfUri || !fileName) {
      Alert.alert("No PDF", "Please select a PDF file first.");
      return;
    }

    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Unavailable", "Sharing is not available on this device.");
      return;
    }

    try {
      const destinationUri = FileSystem.documentDirectory + fileName;

      // Copy the file to give it a friendly name
      await FileSystem.copyAsync({
        from: pdfUri,
        to: destinationUri,
      });

      await Sharing.shareAsync(destinationUri, {
        dialogTitle: `Share ${fileName}`,
        mimeType: "application/pdf",
      });
    } catch (error) {
      console.error("Sharing failed:", error);
      Alert.alert("Error", "Failed to share the selected PDF.");
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-6`}>
      <Text style={tw`text-xl font-bold mb-6`}>📄 PDF Share Tab</Text>

      <Button title="📂 Pick PDF File" onPress={pickPdf} />

      {fileName && (
        <Text style={tw`text-sm mt-4 text-center`}>
          Selected: {fileName}
        </Text>
      )}

      <View style={tw`mt-6`}>
        <Button
          title="📤 Share PDF (choose WhatsApp)"
          onPress={sharePdf}
          disabled={!pdfUri}
        />
      </View>
    </View>
  );
}
