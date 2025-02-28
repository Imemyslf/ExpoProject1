import { Text, Image, Pressable, StyleSheet, View } from "react-native";

interface CompanyCardProps {
  name: string;
  logo: { uri: string };
  onPress: () => void;
}

const CompanyCard = ({ name, logo, onPress }: CompanyCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? "#e0e0e0" : "#fff" }, // Changes color when pressed
      ]}
    >
      <Image style={styles.logo} source={logo} />
      <Text style={styles.companyName}>{name}</Text>
    </Pressable>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
