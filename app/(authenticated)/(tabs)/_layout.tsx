import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import CustomHeader from "@/components/CustomHeader";

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
          height: 65,
          elevation: 10,
          paddingTop: 5,
          borderTopWidth: 1,
          backgroundColor:
            colorScheme === "light"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(33, 31, 38, 1)",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          header: ()=> <CustomHeader/>,
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
