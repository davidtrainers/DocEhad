import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { fontScale } from "../consts/ScreenSize";
import i18n, { tokens } from "../utils/i18n";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const { ApplicationName } = tokens.app.intro;
  const applicationName = i18n.t(ApplicationName);
  const imageSize: number = 30;
  return (
    <>
      <View style={styles.imageIconContainer}>
        <Image
          height={imageSize}
          width={imageSize}
          style={styles.imageIcon}
          source={require(`../assets/icon.png`)}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{applicationName}</Text>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  imageIconContainer: {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  imageIcon: {
    height: 55,
    width: 55,
    borderRadius: 28,
    marginHorizontal: 5,
  },
  headerTextContainer: {
    display: "flex",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "white",
    fontSize: fontScale * 24,
  },
});
