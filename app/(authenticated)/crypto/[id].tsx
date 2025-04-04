import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { defaultStyles } from "@/constants/GlobalStyle";
import { SafeAreaView, Text, View } from "@/components/Themed";

const categories = ["Overview", "News", "Orders", "Transactions"];
const screenWidth = Dimensions.get("window").width;

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: coin,
    isLoading: coinLoading,
    isError: coinError,
  } = useQuery({
    queryKey: ["coin-details", id],
    queryFn: async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  const {
    data: marketChart,
    isLoading: marketLoading,
    isError: marketError,
  } = useQuery({
    queryKey: ["coin-chart", id],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
      );
      return res.json();
    },
    enabled: !!id,
  });

  if (marketLoading || coinLoading) {
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

  if (marketError || coinError || marketChart.length === 0) {
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
      <SectionList
        style={{}}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(i) => i.title || Math.random().toString()}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabBar}
          >
            {categories &&
              categories?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveIndex(index)}
                  style={
                    activeIndex === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                >
                  <Text
                    style={
                      activeIndex === index
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.headerRow}>
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
                style={styles.subtitle}
              >
                {coin?.symbol?.toUpperCase()}
              </Text>
              <Image source={{ uri: coin?.image?.large }} style={styles.logo} />
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity
                onPress={router.back}
                style={[defaultStyles.pillButtonSmall, styles.buyButton]}
              >
                <Ionicons name="arrow-back" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[defaultStyles.pillButtonSmall, styles.buyButton]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  styles.receiveButton,
                  { backgroundColor: Colors.secondaryLight },
                ]}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={Colors.primaryLight}
                />
                <Text
                  lightColor={Colors.primaryLight}
                  darkColor={Colors.primaryLight}
                  style={{ fontSize: 18, fontWeight: 400 }}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={() => (
          <>
            {marketChart && (
              <View style={{alignSelf: "center"}}>
                <Text
                  lightColor={Colors.secondaryDark}
                  darkColor={Colors.secondaryLight}
                  style={styles.chartTitle}
                >
                  Price (last 7 days)
                </Text>
                <LineChart
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data:
                          marketChart &&
                          marketChart?.prices?.map((p: number[]) => p[1]),
                      },
                    ],
                  }}
                  width={screenWidth - 20}
                  height={350}
                  yAxisSuffix="$"
                  chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                      r: "3",
                      strokeWidth: "2",
                      stroke: Colors.primaryLight,
                    },
                  }}
                  style={{
                    borderRadius: 16,
                  }}
                />
              </View>
            )}
            <View
              lightColor={Colors.secondaryLight}
              darkColor={Colors.secondaryDark}
              style={[defaultStyles.block, { marginVertical: 20, padding: 10 }]}
            >
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
                style={styles.subtitle}
              >
                Overview
              </Text>
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
              >
                {coin?.description?.en?.slice(0, 500) ||
                  "No description available."}
              </Text>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  tabBar: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    margin: 12,
  },
  buyButton: {
    backgroundColor: Colors.primaryLight,
    flexDirection: "row",
    gap: 16,
  },
  receiveButton: {
    flexDirection: "row",
    gap: 16,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default Page;
