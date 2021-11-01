import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { PrimaryColor } from "../../consts/Colors";
import { fontScale } from "../../consts/ScreenSize";
import i18n, { tokens } from "../../utils/i18n";

interface GroupNameSectionProps {
  madorName: string;
  onChangeMadorText: (newMadorName: string) => void;
}

const GroupNameSection: React.FC<GroupNameSectionProps> = (
  props: GroupNameSectionProps
) => {
  const { madorName, onChangeMadorText } = props;

  const { GroupNameLabel } = tokens.app.intro;
  const groupNameLabel = i18n.t(GroupNameLabel);

  return (
    <View style={styles.groupNameSection}>
      <View style={styles.groupNameContainer}>
        <Text style={styles.groupNameText}>{groupNameLabel}</Text>
      </View>
      <View style={styles.groupInputContainer}>
        <TextInput
          onChangeText={onChangeMadorText}
          value={madorName}
          style={styles.madorName}
        />
      </View>
    </View>
  );
};

export default GroupNameSection;

const styles = StyleSheet.create({
  groupNameSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  groupInputContainer: {
    height: "30%",
    width: "60%",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: PrimaryColor,
    borderWidth: 2,
  },
  groupNameContainer: {
    height: "30%",
    width: "60%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  groupNameText: {
    fontSize: fontScale * 20,
    fontWeight: "bold",
    color: "white",
  },
  madorName: {
    color: PrimaryColor,
    textAlign: "center",
  },
});
