import { StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { View, Text, SafeAreaView } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useVideoPlayer, VideoView } from "expo-video";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/GlobalStyle";

const videoSource = require("@/assets/videos/bg.mp4");

const index = () => {
  const colorScheme = useColorScheme();
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <SafeAreaView
      style={styles.container}
      lightColor={Colors.backgroundLight}
      darkColor={Colors.backgroundDark}
    >
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={false}
        contentFit="cover"
      />
      <View style={{ padding: 10 }}>
        <Text
          style={styles.header}
          lightColor={Colors.backgroundLight}
          darkColor={Colors.backgroundLight}
        >
          Ready to change the way you money?
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          asChild
          style={[defaultStyles.pillButton, { flex: 1 }]}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                colorScheme === "light"
                  ? Colors.backgroundLight
                  : Colors.backgroundDark,
            }}
          >
            <Text
              style={styles.buttonText}
              lightColor={Colors.primaryDark}
              darkColor={Colors.secondaryLight}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          asChild
          style={[defaultStyles.pillButton, { flex: 1 }]}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                colorScheme === "light"
                  ? Colors.primaryLight
                  : Colors.secondaryLight,
            }}
          >
            <Text
              style={styles.buttonText}
              lightColor={Colors.secondaryLight}
              darkColor={Colors.primaryLight}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "110%",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {},
  buttonText: {
    fontSize: 22,
    fontWeight: 700,
  },
});
