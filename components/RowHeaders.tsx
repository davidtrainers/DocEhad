import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface IRowHeadersProps {
  item: any;
}

const RowHeaders = (props: IRowHeadersProps) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Text>{item}</Text>
    </View>
  );
};

export default RowHeaders;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
