import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/GlobalStyle";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { Link, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;

const Page = () => {
  const { email, signin } = useLocalSearchParams<{
    email: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptEmailAddressVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].longMessage);
      }
    }
  };

  return (
    <View
        style={defaultStyles.container}
          lightColor={Colors.backgroundLight}
          darkColor={Colors.backgroundDark}
    >
      <Text
        lightColor={Colors.secondaryDark}
        darkColor={Colors.secondaryLight}
        style={defaultStyles.header}
      >
        6-digit code
      </Text>
      <Text
        lightColor={Colors.secondaryDark}
        darkColor={Colors.secondaryLight}
        style={defaultStyles.descriptionText}
      >
        Code sent to {email} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              lightColor={Colors.secondaryDark}
              darkColor={Colors.secondaryLight}
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
                style={styles.cellText}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={[defaultStyles.textLink]}
          >
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 8,
  },
  cellText: {
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
export default Page;
