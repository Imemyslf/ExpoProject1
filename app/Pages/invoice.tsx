import { View, Text, TextInput, FlatList } from "react-native";
import { useWork } from "../Context/StoreContext";
import styles from "../../styles/Invoice";
import { useState } from "react";

const InvoicePage = () => {
  const { selectedWorkType } = useWork();
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [total, setTotal] = useState<number>(0);

  // Function to update price & total dynamically
  const handlePriceChange = (text: string, index: number) => {
    const parsedValue = parseFloat(text);
    const newPrices = {
      ...prices,
      [index]: isNaN(parsedValue) ? 0 : parsedValue,
    };
    setPrices(newPrices);

    // Calculate total sum
    const newTotal = Object.values(newPrices).reduce(
      (sum, num) => sum + (num || 0),
      0
    );
    setTotal(newTotal);
  };

  return (
    <View style={styles.container}>
      {/* Customer Details */}
      <View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Customer Name:</Text>
          <TextInput style={styles.input} placeholder="Eg. John Wick" />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Customer Ph no:</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. 1234567890"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Work List Table */}
      <View style={styles.primaryContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Work Done</Text>
          <Text style={styles.headerText}>Price</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={selectedWorkType}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cellText}>{item}</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Eg. 273"
                keyboardType="numeric"
                value={
                  prices[index] !== undefined ? prices[index].toString() : ""
                }
                onChangeText={(text) => handlePriceChange(text, index)}
              />
            </View>
          )}
        />
      </View>

      {/* Total Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <View style={styles.totalBox}>
          <Text style={styles.totalAmount}>₹ {total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default InvoicePage;
