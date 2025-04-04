import { FlatList, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import RoundButton from "@/components/RoundButton";
import WidgetList from "@/components/SortableList/WidgetList";

export default function TabOne() {
  const colorScheme = useColorScheme();
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  return (
    <View
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
      style={styles.container}
    >
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {/* Widgets Section */}
            <Text
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
              style={defaultStyles.sectionHeader}
            >
              Widgets
            </Text>
            <WidgetList/>
          </>
        }
        ListHeaderComponent={
          <>
            {/* Balance Section */}
            <View style={styles.account}>
              <View style={styles.row}>
                <Text
                  lightColor={Colors.secondaryDark}
                  darkColor={Colors.secondaryLight}
                  style={styles.balance}
                >
                  {balance()}
                </Text>
                <Text
                  lightColor={Colors.secondaryDark}
                  darkColor={Colors.secondaryLight}
                  style={styles.currency}
                >
                  €
                </Text>
              </View>
              <View
                lightColor={Colors.primaryLight}
                darkColor={Colors.secondaryDark}
                style={[defaultStyles.pillButtonSmall, { marginVertical: 20 }]}
              >
                <Text style={[defaultStyles.buttonTextSmall]}>Accounts</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <RoundButton
                icon={"add"}
                text={"Add money"}
                onPress={onAddMoney}
              />
              <RoundButton
                icon={"refresh"}
                text={"Clear"}
                onPress={clearTransactions}
              />
              <RoundButton icon={"list"} text={"Details"} />
              <RoundButton icon={"menu"} text={"More"} />
            </View>

            {/* Transactions Section Header */}
            <Text
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
              style={defaultStyles.sectionHeader}
            >
              Transactions
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", padding: 14, color: Colors.gray }}
          >
            No transactions found.
          </Text>
        }
        renderItem={({ item: transaction }) => (
          <View
            lightColor={Colors.white}
            darkColor={Colors.secondaryDark}
            style={styles.transactionItem}
          >
            <View
              lightColor={Colors.primaryLight}
              darkColor={Colors.backgroundDark}
              style={styles.circle}
            >
              <Ionicons
                name={transaction.amount > 0 ? "add" : "remove"}
                size={24}
                color={colorScheme === "light" ? Colors.secondaryLight : Colors.secondaryLight}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
                style={{ fontWeight: "400" }}
              >
                {transaction.title}
              </Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {new Date(transaction.date).toLocaleString()}
              </Text>
            </View>
            <Text
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
            >
              {transaction.amount}€
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    margin: 40,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    margin: 8,
    borderRadius: 10,
    padding: 14,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
