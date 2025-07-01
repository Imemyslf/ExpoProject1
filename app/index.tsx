import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ComponentRef } from "react";



import companyData from "./Data/Company.json";
import { useCompany } from "./Context/StoreContext";
import { useRouter } from "expo-router";
import CompanyCard from "./Components/Pressable";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const imageMap: { [key: string]: any } = {
  "Maruti_Suzuki_logo.png": require("../assets/images/Company/Maruti_Suzuki.png"),
  "Tata_Motors_logo.png": require("../assets/images/Company/Tata_Motors.png"),
  "Hyundai_Motor_logo.png": require("../assets/images/Company/Hyundai_Motor_Company_logo.svg.png"),
  "Mahindra_Mahindra_logo.png": require("../assets/images/Company/Mahindra-Logo.png"),
  "Honda_Cars_logo.png": require("../assets/images/Company/honda-logo.png"),
};

export default function Index() {
  const { setSelectedCompany } = useCompany();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState(
    companyData.four_wheeler_companies
  );

  const [carouselData, setCarouselData] = useState(
    companyData.four_wheeler_companies
  );

  // const carouselRef = useRef(null);
  const carouselRef = useRef<ComponentRef<typeof Carousel>>(null);


  // Filter companies for dropdown as user types
  const dropdownData =
    search.length > 0
      ? companyData.four_wheeler_companies.filter((company) =>
          company.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  // Handle dropdown selection
  const handleSelectCompany = (companyName: string) => {
    setSearch(companyName);
    setShowDropdown(false);
    const idx = companyData.four_wheeler_companies.findIndex(
      (c) => c.name === companyName
    );
    if (idx !== -1) {
      setActiveIndex(idx);
      // Scroll carousel to the selected index
      if (carouselRef.current) {
        carouselRef.current?.scrollTo({ index: idx, animated: true });
      }
    }
  };

  // Handle search icon press
  const handleSearchIconPress = () => {
    if (search.trim() === "") return;
    const idx = companyData.four_wheeler_companies.findIndex((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
    if (idx !== -1) {
      setActiveIndex(idx);
      setShowDropdown(false);
      if (carouselRef.current) {
        carouselRef.current?.scrollTo({ index: idx, animated: true });
      }
    }
  };

  // Reset carousel data if search is cleared
  React.useEffect(() => {
    if (search === "") {
      setCarouselData(companyData.four_wheeler_companies);
    }
  }, [search]);

  // Estimate heights of header, search bar, and pagination
  const HEADER_HEIGHT = 48;
  const SEARCH_BAR_HEIGHT =
    60 +
    (showDropdown && dropdownData.length > 0
      ? Math.min(dropdownData.length, 4) * 44
      : 0);
  const PAGINATION_HEIGHT = 40;
  const carouselHeight =
    height - HEADER_HEIGHT - SEARCH_BAR_HEIGHT - PAGINATION_HEIGHT;

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold text-center text-gray-800 my-4`}>
        FOURAGE
      </Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter Company name"
          placeholderTextColor="#888"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={handleSearchIconPress}
        >
          <Ionicons name="search" size={22} color="#888" />
        </TouchableOpacity>
      </View>
      {/* Dropdown */}
      {showDropdown && dropdownData.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={dropdownData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelectCompany(item.name)}
              >
                <Text style={styles.dropdownText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
      <Carousel
        ref={carouselRef}
        loop
        vertical
        width={width}
        height={carouselHeight}
        data={companyData.four_wheeler_companies}
        scrollAnimationDuration={1000}
        mode="vertical-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 10, // Small offset for elegant effect
          scaleInterval: 0.05, // Slight scale for depth
          opacityInterval: 0.15, // Fade effect
          rotateZDeg: 0, // Optional rotation, keep 0 for clean view
        }}
        pagingEnabled
        snapEnabled
        autoPlay={false}
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => (
          <CompanyCard
            name={item.name}
            logo={
              imageMap[item.logo] ||
              require("../assets/images/Company/default.png")
            }
            onPress={() => {
              setSelectedCompany(item.name);
              router.push("/Pages/Car_Selection");
            }}
            showLogo={true}
          />
        )}
      />
      <View style={styles.pagination}>
        {carouselData.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 8,
    position: "relative",
    zIndex: 2,
  },
  searchBar: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#bbb",
    borderRadius: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#222",
    paddingRight: 40, // space for icon
  },
  searchIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -11 }],
    zIndex: 3,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 12,
    maxHeight: 176,
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
