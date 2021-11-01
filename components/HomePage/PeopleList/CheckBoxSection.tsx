import Checkbox from "expo-checkbox";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ICheckBoxSectionProps {
  location: string;
  currentSelected: string | undefined;
}

const CheckboxSection: React.FC<ICheckBoxSectionProps> = (
  props: ICheckBoxSectionProps
) => {
  const { location, currentSelected } = props;

  return (
    <Checkbox
      style={styles.container}
      value={location == currentSelected}
      onValueChange={() => {}}
      color={location ? "#4630EB" : undefined}
    />
  );
};

export default CheckboxSection;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
