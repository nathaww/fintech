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

const signup = () => {
  const router = useRouter();
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    try {
      await signUp!.create({
        emailAddress: email,
      });
      signUp!.prepareEmailAddressVerification();

      router.push({
        pathname: "/verify/[email]",
        params: { email: email },
      });
    } catch (error) {
      console.error("Error signing up:", error);
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
        <Text style={defaultStyles.descriptionText}>
          Enter your email address. We will send you a confirmation code there.
        </Text>

        <View style={styles.inputContainer}>
          <ThemedInput
            style={[styles.input, { flex: 1 }]}
            placeholder="E-mail"
            keyboardType="email"
            value={email}
            onChangeText={setEmail}
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
          disabled={email === ""}
          onPress={onSignup}
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
