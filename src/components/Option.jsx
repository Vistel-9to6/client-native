import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { defalutGifFilterValue } from "../../constants/index";

function Option({ item, filterType, filter, onPress }) {
  const handleButtonPress = () => {
    if (item.type === filter[filterType]) {
      onPress({ ...filter, [filterType]: defalutGifFilterValue[filterType] });
    } else {
      onPress({ ...filter, [filterType]: item.type });
    }
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        num={item}
        style={{
          ...styles.optionButton,
          backgroundColor: filter[filterType] === item.type ? "black" : "white",
        }}
        onPress={handleButtonPress}
      >
        <Text
          style={{
            ...styles.option,
            color: filter[filterType] === item.type ? "white" : "black",
          }}
        >
          {item.type}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
  option: {
    color: "black",
    fontSize: 11,
  },
  optionButton: {
    width: 85,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Option;
