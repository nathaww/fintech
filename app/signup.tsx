import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const signup = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+49");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#111" }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <SafeAreaView
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
        <Text
          style={defaultStyles.descriptionText}
          lightColor={Colors.secondaryDark}
          darkColor={Colors.secondaryDark}
        >
          Enter your phone number. We will send you a confirmation code there.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={
              colorScheme === "light"
                ? Colors.primaryLight
                : Colors.secondaryLight
            }
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={
              colorScheme === "light"
                ? Colors.primaryLight
                : Colors.primaryDark
            }
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            {
              marginBottom: 20,
              backgroundColor:
                colorScheme === "light"
                  ? Colors.primaryLight
                  : Colors.primaryDark,
            },
          ]}
          onPress={() => {}}
        >
          <Text
            style={defaultStyles.buttonText}
            lightColor={Colors.secondaryLight}
            darkColor={Colors.secondaryDark}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    backgroundColor: Colors.primaryLight,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primaryLight,
  },
  disabled: {
    backgroundColor: Colors.primaryLight,
  },
});
