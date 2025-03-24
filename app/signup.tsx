import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import ThemedInput from "@/components/ThemedInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const signup = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+251");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#111" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View
        style={defaultStyles.container}
        lightColor={Colors.backgroundLight}
        darkColor={Colors.backgroundDark}
      >
        <Text
          style={defaultStyles.header}
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryLight}
        >
          Let's get started!
        </Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there.
        </Text>

        <View style={styles.inputContainer}>
          <ThemedInput
            style={styles.input}
            placeholder="Country code"
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <ThemedInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text
              style={defaultStyles.textLink}
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
            >
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              marginBottom: 20,
              backgroundColor: Colors.primaryLight,
            },
          ]}
          disabled={phoneNumber === ""}
          onPress={() => {}}
        >
          <Text
            style={defaultStyles.buttonText}
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default signup;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
});
