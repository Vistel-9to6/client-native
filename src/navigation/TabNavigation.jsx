import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image } from "react-native";
import { UserAuth } from "../context/AuthContext";

import Feed from "../components/Feed";
import SearchScreen from "../screen/SearchScreen";
import AppHeader from "../components/shared/header";
import Profile from "../components/Profile";
import FeedSlide from "../components/FeedSlide";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

function TabNavigation({ navigation }) {
  const { idToken, user } = UserAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
          header: () => <AppHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: "black",
          },
          tabBarStyle: { height: 60 },
        }}
      />
      <Tab.Screen
        name="Slide"
        component={FeedSlide}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={30} color={color} />
          ),
          header: () => null,
          tabBarStyle: { height: 60 },
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
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={40} color={color} />
          ),
          tabBarStyle: { height: 60 },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={30} color={color} />
          ),
          header: () => <AppHeader navigation={navigation} />,
          tabBarStyle: { height: 60 },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();

            idToken
              ? navigation.navigate("Profile")
              : navigation.navigate("Login");
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return user ? (
              <Image
                style={styles.profile}
                source={{
                  uri: user?.profilePhoto,
                }}
              />
            ) : (
              <Feather name="user" size={30} color={color} />
            );
          },
          header: () => <AppHeader navigation={navigation} />,
          tabBarStyle: { height: 60 },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default TabNavigation;
