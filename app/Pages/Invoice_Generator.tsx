import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useWork } from "../../Context/StoreContext";
import { useState } from "react";
import tw from "../../tailwind";
import { Contact, Title } from "../../Components/Title";
import Table from "../../Components/Table";
import TOButton from "../../Components/TOButton";
import { useInvoice, useTab, useCompany, useModel } from "../../Context/StoreContext";
import { storeInvoice } from "../../firebase/storeData";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const { setInvoiceData } = useInvoice();
  const { setActiveTab } = useTab();
  const { selectedCompany } = useCompany();
  const { selectedModelType } = useModel();

  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [makeImage, setMakeImage] = useState<boolean>(false);
  const [pdfReady, setPdfReady] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState<"UPI" | "Cash" | "None">("None");

  const handlePriceChange = (text: string, index: number) => {
    const parsedValue = parseFloat(text);
    const newPrices = {
      ...prices,
      [index]: isNaN(parsedValue) ? 0 : parsedValue,
    };
    setPrices(newPrices);

    const newTotal = Object.values(newPrices).reduce(
      (sum, num) => sum + (num || 0),
      0
    );
    setTotal(newTotal);
  };

  const handleConfirm = async () => {
    if (total <= 0 ) { 
      alert("Please enter a total.");
      return;
    }

    setIsSaving(true);

    try {
      const invoiceId = await storeInvoice({
        customerName,
        customerPhone,
        company: selectedCompany || "N/A",
        carModel: selectedModelType || "N/A",
        workDone: selectedWorkType || [],
        prices,
        total,
        paymentMode, 
      });

      console.log("Invoice saved successfully with ID:", invoiceId);

      // Update local state
      setMakeImage(true);
      setInvoiceData({
        customerName,
        customerPhone,
        workDone: selectedWorkType || [],
        prices,
        total,
        paymentMode, 
      });
      setPdfReady(true);

    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save invoice. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePdfPress = () => {
    setActiveTab("invoice");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1`}>
        <View style={tw`p-2`}>
          <Title name="CONTACTS" />
          <Contact
            name="Customer Name:"
            placeholder="Eg. John Wick"
            value={customerName}
            onChangeText={setCustomerName}
            autoComplete="name"
            textContentType="name"
          />
          <Contact
            name="Customer Ph no:"
            placeholder="Eg. 1234567890"
            value={customerPhone}
            onChangeText={setCustomerPhone}
            autoComplete="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />

          <Title name="INVOICE" />
          <Table
            data={selectedWorkType || []}
            price={prices}
            total={total}
            onChange={handlePriceChange}
            showFlip={makeImage}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
          />
        </View>

        <View
          style={tw`absolute bottom-0 left-0 w-full p-1 flex-row justify-around `}
        >
          <TOButton
            onPress={handleConfirm}
            title={isSaving ? "Saving..." : "Confirm"}
            iconName="check-all"
            iconColor="blue"
            disabled={total <= 0 || isSaving}
          />

          {pdfReady && (
            <TOButton
              onPress={handlePdfPress}
              title="PDF"
              iconName="file-document"
              iconColor="green"
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InvoicePage;
