import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import FeedScreen from "./Feed";
import SearchScreen from "./Search";
import AppHeader from "./header";

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          header: () => <AppHeader />,
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Tab.Screen
        name="Camera"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Camera");
          },
        })}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="camerao" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
          header: () => <AppHeader />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
