import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName!, lastName: lastName! });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <View
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
      style={{ flex: 1, paddingTop: 100 }}
    >
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
          {user?.imageUrl && (
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 6 }}>
          {!edit && (
            <View style={styles.editRow}>
              <Text
                lightColor={Colors.secondaryDark}
                darkColor={Colors.secondaryLight}
                style={{ fontSize: 26 }}
              >
                {firstName} {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={Colors.primaryDark}
                />
              </TouchableOpacity>
            </View>
          )}
          {edit && (
            <View style={styles.editRow}>
              <TextInput
                placeholder="First Name"
                value={firstName || ""}
                onChangeText={setFirstName}
                style={[styles.inputField]}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName || ""}
                onChangeText={setLastName}
                style={[styles.inputField]}
              />
              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons
                  name="checkmark-outline"
                  size={24}
                  color={Colors.primaryDark}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View
        lightColor={Colors.white}
        darkColor={Colors.secondaryDark}
        style={styles.actions}
      >
        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Ionicons name="log-out" size={24} color={Colors.primaryLight} />
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontSize: 20 }}
          >
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={Colors.primaryLight} />
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontSize: 20 }}
          >
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="bulb" size={24} color={Colors.primaryLight} />
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontSize: 20 }}
          >
            Learn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={Colors.primaryLight} />
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontSize: 18, flex: 1 }}
          >
            Inbox
          </Text>
          <View
            style={{
              backgroundColor: Colors.primaryLight,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={router.back} style={styles.btn}>
          <Ionicons name="close" size={24} color={Colors.primaryLight} />
          <Text
            lightColor={Colors.secondaryDark}
            darkColor={Colors.secondaryLight}
            style={{ fontSize: 18, flex: 1 }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editRow: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  actions: {
    borderRadius: 16,
    gap: 10,
    margin: 20,
  },
  btn: {
    padding: 24,
    flexDirection: "row",
    gap: 20,
  },
});
export default Page;
