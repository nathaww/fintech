import {
  ActivityIndicator,
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
import { useSignUp } from "@clerk/clerk-expo";
import CustomAlert from "@/components/CustomAlert";
import * as Clipboard from 'expo-clipboard';

const signup = () => {
  const router = useRouter();
  const { signUp } = useSignUp();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const generatePassword = async () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword); // Set password field
    await Clipboard.setStringAsync(newPassword); // Copy to clipboard

    setAlertMessage("Password generated and copied to clipboard!");
    setAlertVisible(true);
  };

  const onSignUpPress = async () => {
    try {
      setLoading(true);
      await signUp!.create({
        emailAddress,
        password,
      });
      await signUp?.prepareEmailAddressVerification();
      router.push({
        pathname: "/verify/[email]",
        params: { email: emailAddress },
      });
    } catch (err: any) {
      if (err.errors?.length > 0) {
        setAlertMessage(`Error: ${err.errors[0].message}`);
      } else {
        setAlertMessage("An unexpected error occurred. Please try again.");
      }
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={[defaultStyles.descriptionText, { marginBottom: 20 }]}>
          Enter your email address. We will send you a confirmation code there.
        </Text>

        <View style={styles.inputContainer}>
          <ThemedInput
            style={[styles.input, { flex: 1 }]}
            placeholder="E-mail"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={generatePassword}
            style={styles.generateButton}
          >
            <Text style={styles.generateButtonText}>🔑</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              marginBottom: 20,
              backgroundColor: Colors.primaryLight,
            },
          ]}
          disabled={emailAddress === ""}
          onPress={onSignUpPress}
        >
          {!loading ? (
            <Text
              style={defaultStyles.buttonText}
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
            >
              Sign up
            </Text>
          ) : (
            <ActivityIndicator size="large" color={Colors.primaryDark} />
          )}
        </TouchableOpacity>

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
      </View>

      <CustomAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default signup;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginBottom: 20,
  },
  generateButton: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 18,
  },
});
