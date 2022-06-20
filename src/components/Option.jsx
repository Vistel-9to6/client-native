import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const defaultFilterValue = {
  color: "original",
  grid: "1x1",
  fps: 15,
};

function Option({ item, filterType, filter, onPress }) {
  const handleButtonPress = () => {
    console.log(item.type);
    if (item.type === filter[filterType]) {
      onPress({ ...filter, [filterType]: defaultFilterValue[filterType] });
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
