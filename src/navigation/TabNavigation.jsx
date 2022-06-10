import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import Feed from "../components/Feed";
import SearchScreen from "../screen/SearchScreen";
import AppHeader from "../components/shared/header";

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

function AppTabs({ navigation }) {
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
        name="Camera"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Camera");
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

export default AppTabs;
