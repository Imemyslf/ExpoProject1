import React, { useRef, useState, useEffect, useMemo } from "react";
import { Text, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ComponentRef } from "react";
import { useCompany } from "../../Context/StoreContext";
import { useRouter } from "expo-router";
import { CompanyCard } from "../../Components/Pressable";
import tw from "twrnc";
import SearchBar from "../../Components/SearchBar";
import Pagination from "../../Components/Pagination";
import CompanyDropdown from "../../Components/CompanyDropdown";
import imageMap from "../../Data/companyLogos";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const { setSelectedCompany } = useCompany();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState(fetchedData);
  const [progressIndex, setProgressIndex] = useState(0);
  const carouselRef = useRef<ComponentRef<typeof Carousel>>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Fetching companies...");
        const backendUrl = Constants?.expoConfig?.extra?.BACKEND_URL;
        console.log("Backend URL:", backendUrl);
        const response = await fetch(
          `https://backend-deploy-engine-production.up.railway.app/data/automotive-companies`
        );
        const data = await response.json();
        console.log("Fetched companies:", data);
        setFetchedData(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    loadData();
  }, []);

  // Memoize dropdownData
  const dropdownData = useMemo(
    () =>
      search.length > 0
        ? fetchedData.filter((company) =>
            company.name.toLowerCase().includes(search.toLowerCase())
          )
        : [],
    [search, fetchedData]
  );

  // Memoize carouselData if you have any filtering/sorting logic
  const carouselData = useMemo(() => fetchedData, [fetchedData]);

  // Handle dropdown selection
  const handleSelectCompany = (companyName: string) => {
    setSearch(companyName);
    setShowDropdown(false);
    const idx = fetchedData.findIndex((c) => c.name === companyName);
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
    const idx = fetchedData.findIndex((company) =>
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
      setFilteredCompanies(fetchedData);
    }
  }, [search, fetchedData]);

  // Estimate heights of header, search bar, and pagination
  const HEADER_HEIGHT = 48;
  const SEARCH_BAR_HEIGHT =
    60 +
    (showDropdown && dropdownData.length > 0
      ? Math.min(dropdownData.length, 4) * 44
      : 0);
  const PAGINATION_HEIGHT = 70;
  const carouselHeight =
    height - HEADER_HEIGHT - SEARCH_BAR_HEIGHT - PAGINATION_HEIGHT;

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`w-[95%] self-center mt-4 relative z-20`}>
        <SearchBar
          value={search}
          onChange={(text) => {
            setSearch(text);
          }}
          onFocus={() => setShowDropdown(true)}
          onSearch={handleSearchIconPress}
        />
        {showDropdown && dropdownData.length > 0 && (
          <CompanyDropdown
            visible={showDropdown}
            data={dropdownData}
            onSelect={handleSelectCompany}
          />
        )}
      </View>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={carouselHeight}
        data={fetchedData}
        scrollAnimationDuration={1000}
        mode="vertical-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 10,
          scaleInterval: 0.05,
          opacityInterval: 0.15,
          rotateZDeg: 0,
        }}
        pagingEnabled
        snapEnabled
        autoPlay={false}
        onSnapToItem={setActiveIndex}
        onProgressChange={(_, absoluteProgress) => {
          setProgressIndex(absoluteProgress);
        }}
        renderItem={({ item }) => (
          <CompanyCard
            name={item.name}
            logo={
              imageMap[item.logo] || {
                uri: "https://ik.imagekit.io/3eq4ilonj/Cars%20&%20Company/Companies/default.png?updatedAt=1751425679738",
              }
            }
            onPress={() => {
              setSelectedCompany(item.name);
              router.push("/Pages/Car_Selection");
            }}
            showLogo={true}
          />
        )}
      />

      {/* Pagination */}
      <Pagination
        total={carouselData.length}
        activeIndex={Math.round(progressIndex)}
      />
    </View>
  );
}
