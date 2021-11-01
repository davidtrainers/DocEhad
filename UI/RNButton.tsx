import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RNButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  iconName?: any;
}

const RNButton: React.FC<RNButtonProps> = (props: RNButtonProps) => {
  const { text, onPress, iconName, buttonStyle, textStyle } = props;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{text}</Text>
      {iconName && <Ionicons name={iconName} size={32} color="white" />}
    </TouchableOpacity>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  container: {},
});
