import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";

const InvestPage = () => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
      >
        {/* Portfolio Overview */}
        <View
          lightColor={Colors.white}
          darkColor={Colors.secondaryDark}
          style={styles.card}
        >
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={styles.title}
          >
            Your Portfolio
          </Text>
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={styles.balance}
          >
            $12,480.39
          </Text>
          <View style={styles.portfolioRow}>
            <Text style={styles.label}>Today's Gain</Text>
            <Text style={styles.profit}>+ $210.23 (1.72%)</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.row, { marginVertical: 16 }]}>
          <TouchableOpacity style={[defaultStyles.pillButton, styles.buyBtn]}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.pillButton, styles.receiveBtn]}
          >
            <Ionicons
              name="download-outline"
              size={24}
              color={Colors.primaryLight}
            />
            <Text style={[styles.buttonText, { color: Colors.primaryLight }]}>
              Receive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Assets */}
        <Text
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
          style={styles.title}
        >
          Top Assets
        </Text>
        <View style={styles.assetCard}>
          <Image
            source={{
              uri: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
            }}
            style={styles.assetIcon}
          />
          <View>
            <Text style={styles.assetTitle}>Bitcoin</Text>
            <Text style={styles.assetSubtitle}>BTC</Text>
          </View>
          <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={styles.assetPrice}>$41,200.52</Text>
            <Text style={[styles.assetChange, { color: "#34C759" }]}>
              +2.3%
            </Text>
          </View>
        </View>

        <View style={styles.assetCard}>
          <Image
            source={{
              uri: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
            }}
            style={styles.assetIcon}
          />
          <View>
            <Text style={styles.assetTitle}>Ethereum</Text>
            <Text style={styles.assetSubtitle}>ETH</Text>
          </View>
          <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={styles.assetPrice}>$2,380.10</Text>
            <Text style={[styles.assetChange, { color: "#FF3B30" }]}>
              -1.5%
            </Text>
          </View>
        </View>

        {/* Learn Section */}
        <View
          lightColor={Colors.white}
          darkColor={Colors.secondaryDark}
          style={[styles.card, { marginTop: 24 }]}
        >
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={styles.title}
          >
            Learn & Grow
          </Text>
          <Text style={{ marginBottom: 10, color: Colors.gray }}>
            Discover how investing works and grow your crypto knowledge.
          </Text>
          <TouchableOpacity style={styles.learnBtn}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Start Learning
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvestPage;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.gray,
  },
  profit: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34C759",
  },
  portfolioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  buyBtn: {
    backgroundColor: Colors.primaryLight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  receiveBtn: {
    backgroundColor: Colors.secondaryLight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  assetCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: Colors.primaryLight,
  },
  assetIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  assetTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: Colors.white,
  },
  assetSubtitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundLight,
  },
  assetChange: {
    fontSize: 14,
  },
  learnBtn: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
