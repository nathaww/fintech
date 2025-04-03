import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "light" ? Colors.primaryDark : Colors.secondaryLight,
        tabBarInactiveTintColor:
          colorScheme === "light" ? Colors.gray : Colors.secondaryDark,

        tabBarStyle: {
          width: "95%",
          height: 60,
          elevation: 20,
          borderRadius: 10,
          marginBottom: 5,
          marginVertical: "auto",
          alignSelf: "center",
          paddingTop: 5,
          borderTopWidth: 0,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          headerShown: false,
          title: "Invest",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          headerShown: false,
          title: "Transfers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="exchange" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          headerShown: false,
          title: "Crypto",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bitcoin" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          headerShown: false,
          title: "Lifestyle",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
