import { View, Text, StyleSheet } from "react-native";

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

export default SearchScreen;
