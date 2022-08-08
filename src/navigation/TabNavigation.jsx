import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image } from "react-native";
import { UserAuth } from "../context/AuthContext";

import MainFeedScreen from "../screen/MainFeedScreen";
import SearchScreen from "../screen/SearchScreen";
import FeedSlideScreen from "../screen/FeedSlideScreen";
import AppHeader from "../components/shared/header";

import { AntDesign, Feather, Entypo, FontAwesome } from "@expo/vector-icons";

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

function TabNavigation({ navigation }) {
  const { idToken, user } = UserAuth();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 50 } }}
    >
      <Tab.Screen
        name="Feed"
        component={MainFeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={25} color={color} />
          ),
          header: () => <AppHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
      <Tab.Screen
        name="Slide"
        component={FeedSlideScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={25} color={color} />
          ),
          header: () => null,
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
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={35} color={color} />
          ),
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={25} color={color} />
          ),
          header: () => <AppHeader navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();

            idToken
              ? navigation.navigate("Profile")
              : navigation.navigate("Login");
          },
        })}
        options={{
          tabBarIcon: ({ color }) => {
            return user ? (
              <Image
                style={styles.profile}
                source={{
                  uri: user?.profilePhoto,
                }}
              />
            ) : (
              <Feather name="user" size={25} color={color} />
            );
          },
          header: () => <AppHeader navigation={navigation} />,
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
