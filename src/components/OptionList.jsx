import { View, FlatList, Text, StyleSheet } from "react-native";
import Option from "./Option";

function OptionList({ item, filter, onPress }) {
  const filterType = item.filter;

  return (
    <View style={styles.filterRow}>
      <Text style={styles.optionTitle}>{item.filter}</Text>
      <FlatList
        contentContainerStyle={styles.itemList}
        horizontal={true}
        keyExtractor={(item) => item.id}
        data={item.options}
        renderItem={({ item }) => (
          <Option
            item={item}
            filterType={filterType}
            filter={filter}
            onPress={onPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 10,
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  optionTitle: {
    fontSize: 18,
  },
});

export default OptionList;
