import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";

interface CustomAlertProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isVisible,
  message,
  onClose,
}) => {
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View
        lightColor={Colors.backgroundLight}
        darkColor={Colors.backgroundDark}
        style={styles.alertBox}
      >
        <Text
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
          style={styles.header}
        >
          Alert
        </Text>
        <Text
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
          style={styles.message}
        >
          {message}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={[defaultStyles.pillButton, styles.button]}
        >
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={styles.buttonText}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  alertBox: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  message: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primaryLight,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
