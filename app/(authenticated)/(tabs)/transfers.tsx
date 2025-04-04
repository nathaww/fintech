import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView, Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";

const TransferPage = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
    >
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Transfer Overview */}
        <View
          lightColor={Colors.white}
          darkColor={Colors.secondaryDark}
          style={styles.card}
        >
          <Text
            style={styles.title}
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
          >
            Transfer Funds
          </Text>
          <Text
            style={styles.description}
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
          >
            Easily send or request crypto with zero fees.
          </Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[defaultStyles.pillButton, styles.actionBtn]}
            >
              <Ionicons name="arrow-up-circle-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[defaultStyles.pillButton, styles.secondaryBtn]}
            >
              <Ionicons
                name="arrow-down-circle-outline"
                size={24}
                color={Colors.primaryLight}
              />
              <Text style={[styles.actionText, { color: Colors.primaryLight }]}>
                Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Contacts */}
        <Text
          style={styles.title}
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
        >
          Recent Contacts
        </Text>

        {["satoshi.eth", "vitalik.eth", "friend.crypto"].map(
          (contact, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.contactRow,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.white
                      : Colors.secondaryDark,
                },
              ]}
            >
              <Ionicons
                name="person-circle-outline"
                size={36}
                color={Colors.gray}
              />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={styles.contactName}
                  lightColor={Colors.secondaryDark}
                  darkColor={Colors.secondaryLight}
                >
                  {contact}
                </Text>
                <Text
                  style={styles.contactSub}
                  lightColor={Colors.secondaryDark}
                  darkColor={Colors.secondaryLight}
                >
                  Ethereum
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}

        {/* Add New Contact */}
        <TouchableOpacity style={styles.addNew}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors.primaryLight}
          />
          <Text
            style={styles.addNewText}
            lightColor={Colors.primaryLight}
            darkColor={Colors.primaryDark}
          >
            Add New Contact
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransferPage;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    backgroundColor: Colors.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
  secondaryBtn: {
    backgroundColor: Colors.secondaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
  },
  contactSub: {
    fontSize: 12,
  },
  addNew: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
