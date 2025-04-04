import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Text, View } from "./Themed";

type RoundButtonProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};

const RoundButton = ({ icon, text, onPress }: RoundButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={styles.circle}
      >
        <Ionicons
          name={icon}
          size={30}
          color={
            colorScheme === "light" ? Colors.primaryLight : Colors.secondaryLight
          }
        />
      </View>
      <Text
        style={styles.label}
        lightColor={Colors.secondaryDark}
        darkColor={Colors.secondaryLight}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
export default RoundButton;
