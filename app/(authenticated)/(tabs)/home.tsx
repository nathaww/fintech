import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

export default function page() {
  return (
    <View
      style={styles.container}
    >
      <Text
        lightColor={Colors.secondaryDark}
        darkColor={Colors.secondaryLight}
        style={styles.title}
      >
        Home
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
