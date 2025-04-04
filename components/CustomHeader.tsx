import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Text, View } from "./Themed";
import { useUser } from "@clerk/clerk-expo";

const CustomHeader = () => {
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  return (
    <View
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
      style={{ paddingTop: top }}
    >
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
          },
        ]}
      >
        <Link href={"/(authenticated)/(modals)/account"} asChild>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor:
                colorScheme === "light"
                  ? Colors.primaryLight
                  : Colors.secondaryDark,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              lightColor={Colors.white}
              darkColor={Colors.secondaryLight}
              style={{ fontWeight: "500", fontSize: 16 }}
            >
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </Text>
          </TouchableOpacity>
        </Link>
        <View
          lightColor={Colors.primaryLight}
          darkColor={Colors.secondaryDark}
          style={styles.searchSection}
        >
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.white}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.white}
          />
        </View>
        <View
          lightColor={Colors.primaryLight}
          darkColor={Colors.secondaryDark}
          style={styles.circle}
        >
          <Ionicons name={"stats-chart"} size={20} color={Colors.white} />
        </View>
        <View
          lightColor={Colors.primaryLight}
          darkColor={Colors.secondaryDark}
          style={styles.circle}
        >
          <Ionicons name={"card"} size={20} color={Colors.white} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: Colors.secondaryDark,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: Colors.gray,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomHeader;
