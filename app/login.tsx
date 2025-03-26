import {
  ActivityIndicator,
  Alert,
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const login = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Email) {
      setLoading(true);
      try {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: email,
          password
        });

        const firstEmailFactor: any = supportedFirstFactors?.find(
          (factor: any) => factor.strategy === "email_code"
        );

        const { emailAddressId } = firstEmailFactor;

        await signIn!.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });

        router.push({
          pathname: "/verify/[email]",
          params: { email, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      } finally {
        setLoading(false);
      }
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
          Welcome back!
        </Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there.
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
        <View style={styles.inputContainer}>
          <ThemedInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            keyboardType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              marginBottom: 20,
              backgroundColor: Colors.primaryLight,
            },
          ]}
          disabled={email === ""}
          onPress={() => {}}
        >
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primaryDark} />
          ) : (
            <Text
              style={defaultStyles.buttonText}
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="mail" size={24} color={Colors.primaryLight} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={Colors.primaryLight} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={Colors.primaryLight} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
});
