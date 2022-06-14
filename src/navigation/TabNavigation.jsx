import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserAuth } from "../context/AuthContext";

import Feed from "../components/Feed";
import SearchScreen from "../screen/SearchScreen";
import AppHeader from "../components/shared/header";

import { AntDesign } from "@expo/vector-icons";

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

function TabNavigation({ navigation }) {
  const { idToken } = UserAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          header: () => <AppHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Tab.Screen
        name="Record"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();

            idToken
              ? navigation.navigate("Camera")
              : navigation.navigate("Login");
          },
        })}
        options={{
          tabBarIcon: () => (
            <AntDesign name="camerao" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
          header: () => <AppHeader navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
