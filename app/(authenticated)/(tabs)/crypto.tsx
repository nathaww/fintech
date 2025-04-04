import {
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Link, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";
import { useCallback } from "react";
import { Currency } from "@/interfaces/crypto";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

const TabFour = () => {
  const colorScheme = useColorScheme();
  const {
    data: currencies,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cryptoListings"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch crypto data");
      return response.json();
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView
        lightColor={Colors.backgroundLight}
        darkColor={Colors.backgroundDark}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.primaryLight} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        lightColor={Colors.backgroundLight}
        darkColor={Colors.backgroundDark}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "red" }}>Failed to load crypto data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Text
          lightColor={Colors.primaryLight}
          darkColor={Colors.secondaryLight}
          style={defaultStyles.sectionHeader}
        >
          Latest Cryptocurrencies
        </Text>

        <View style={defaultStyles.block}>
          {currencies?.map((currency: Currency) => (
            <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 14,
                  alignItems: "center",
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.white
                      : Colors.secondaryDark,
                }}
              >
                <Image
                  source={{ uri: currency.image }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ flex: 1, gap: 6 }}>
                  <Text
                    lightColor={Colors.primaryLight}
                    darkColor={Colors.secondaryLight}
                    style={{ fontWeight: "600" }}
                  >
                    {currency.name}
                  </Text>
                  <Text style={{ color: Colors.gray }}>
                    {currency.symbol.toUpperCase()}
                  </Text>
                </View>
                <View style={{ gap: 6, alignItems: "flex-end" }}>
                  <Text
                    lightColor={Colors.primaryLight}
                    darkColor={Colors.secondaryLight}
                  >
                    ${currency.current_price.toFixed(2)}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons
                      name={
                        currency.price_change_percentage_24h > 0
                          ? "caret-up"
                          : "caret-down"
                      }
                      size={16}
                      color={
                        currency.price_change_percentage_24h > 0
                          ? "green"
                          : "red"
                      }
                    />
                    <Text
                      style={{
                        color:
                          currency.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {currency.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TabFour;
