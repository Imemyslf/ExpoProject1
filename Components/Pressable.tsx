// import { Text, Image, Pressable, StyleSheet } from "react-native";

// interface CompanyCardProps {
//   name: string;
//   logo: { uri: string };
//   onPress: () => void;
// }

// const CompanyCard = ({ name, logo, onPress }: CompanyCardProps) => {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.card,
//         { backgroundColor: pressed ? "#e0e0e0" : "#fff" }, // Changes color when pressed
//       ]}
//     >
//       <Image style={styles.logo} source={logo} />
//       <Text style={styles.companyName}>{name}</Text>
//     </Pressable>
//   );
// };

// export default CompanyCard;

// const styles = StyleSheet.create({
//   card: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   logo: {
//     width: 200,
//     height: 100,
//     resizeMode: "contain",
//     marginBottom: 10,
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });


import { Text, Image, Pressable, StyleSheet, View } from "react-native";

interface CompanyCardProps {
  name: string;
  logo: any;
  onPress: () => void;
  showLogo?: boolean;
}

const CompanyCard = ({ name, logo, onPress, showLogo = false }: CompanyCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? "#f0f0f0" : "#f0f0f0" },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Select ${name} company`}
    >
      {showLogo ? (
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.companyName} numberOfLines={2} adjustsFontSizeToFit>
            {name}
          </Text>
        </View>
      ) : (
        <Text style={styles.companyNameOnly}>{name}</Text>
      )}
    </Pressable>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "80%", 
    resizeMode: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    maxWidth: "100%",
    flexShrink: 1,
  },
  companyNameOnly: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
