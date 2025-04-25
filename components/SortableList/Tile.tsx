import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../Themed";

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 150,
    borderRadius: 20,
    padding: 14,
    alignSelf: "center",
  },
});

interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();

  if (id === "spent") {
    return (
      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={styles.container}
        pointerEvents="none"
      >
        <Text
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
          style={{ fontWeight: "500", fontSize: 16 }}
        >
          Spent this month
        </Text>
        <Text
          style={{
            color: Colors.primaryLight,
            fontWeight: "bold",
            fontSize: 26,
            paddingTop: 10,
          }}
        >
          1024€
        </Text>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: Colors.primaryLight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              5%
            </Text>
          </View>
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontWeight: "bold", fontSize: 18 }}
          >
            Cashback
          </Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={styles.container}
        pointerEvents="none"
      >
        <View>
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontWeight: "500", fontSize: 16 }}
          >
            Recent transaction
          </Text>

          {transactions.length === 0 && (
            <Text
              style={{
                color: Colors.gray,
                fontWeight: "bold",
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.gray,
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingVertical: 10,
                }}
              >
                {transactions[transactions.length - 1].amount}€
              </Text>
              <Text
                style={{ color: Colors.gray, fontWeight: "bold", fontSize: 16 }}
              >
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={styles.container}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryLight}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

export default Tile;
