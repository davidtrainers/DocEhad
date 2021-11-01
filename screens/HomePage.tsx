import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import PeopleList from "../components/HomePage/PeopleList/PeopleList";
import { SafeAreaView } from "react-native-safe-area-context";
import { getValueFor, save } from "../cache/localStorage";
import i18n, { tokens } from "../utils/i18n";
import Header from "../UI/Header";
import GroupNameSection from "../components/HomePage/GroupNameSection";
import { PrimaryColor } from "../consts/Colors";
import RNButton from "../UI/RNButton";

interface INamesStatus {
  name: string;
  status: string;
}

const HomePage: React.FC = () => {
  const [madorName, setMadorName] = useState<string>("");

  const [names, setNames] = useState<INamesStatus[]>([]);

  const { SendToWhatApp, Update, AddNewRow } = tokens.app.intro;
  const sendToWhatApp = i18n.t(SendToWhatApp);
  const update = i18n.t(Update);
  const addNewRow = i18n.t(AddNewRow);

  const onChangeMadorText = (newMadorName: string) => {
    setMadorName(newMadorName);
  };

  const saveOnLocalStorage = async () => {
    await save(
      "names",
      names.filter((item) => item.name != "")
    );
    if (madorName) await save("madorName", madorName);
  };

  const AddName = () => {
    setNames((prev) => [{ name: "", status: "" }, ...prev]);
  };

  const sendDataStatus = () => {
    saveOnLocalStorage();
    if (!madorName) {
      alert("הכנס שם מדור!! עכשיו!!!");
      return;
    }
    let dataToWhatapp = `${madorName}:\n`;
    names.forEach((item) => {
      if (item.name != "הוסף" && item.name != "")
        dataToWhatapp += `${item.name} - ${item.status}\n`;
    });
    Linking.openURL(`whatsapp://send?text=${dataToWhatapp}`);
  };

  useEffect(() => {
    const getNamesFromLocalHost = async () => {
      let data = await getValueFor("names");
      let localMadorName = await getValueFor("madorName");
      if (data) {
        setNames(data);
      } else setNames([{ name: "הוסף", status: "" }]);
      setMadorName(localMadorName);
    };
    getNamesFromLocalHost();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.madorNameContainer}>
          <GroupNameSection
            onChangeMadorText={onChangeMadorText}
            madorName={madorName}
          />
        </View>
        <View style={styles.tablePeopleContainer}>
          <PeopleList names={names} setNames={setNames} />
        </View>
        <View style={styles.addNewRowContainer}>
          <RNButton
            text={addNewRow}
            onPress={AddName}
            buttonStyle={styles.addNewRow}
            textStyle={styles.addNewRowLabel}
          />
        </View>
        <View style={styles.actionsContainer}>
          <RNButton
            text={update}
            onPress={saveOnLocalStorage}
            iconName={"sync-outline"}
            buttonStyle={styles.saveSendData}
            textStyle={styles.textSaveData}
          />
          <RNButton
            text={sendToWhatApp}
            onPress={sendDataStatus}
            iconName={"send"}
            buttonStyle={styles.saveSendData}
            textStyle={styles.textSaveData}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    flex: 1.6,
    flexDirection: "row",
    backgroundColor: PrimaryColor,
  },
  madorNameContainer: {
    display: "flex",
    flex: 2.4,
  },
  addNewRowContainer: { flex: 1 },
  addNewRow: {
    height: "100%",
    width: "30%",
    backgroundColor: "rgb(54, 48, 74)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addNewRowLabel: {
    color: "white",
    fontSize: Dimensions.get("screen").fontScale * 15,
    fontWeight: "bold",
  },
  tablePeopleContainer: {
    display: "flex",
    flex: 13,
    borderColor: "rgb(54, 48, 74)",
  },
  scrollview: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionsContainer: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  peoplelist: {
    flex: 8,
    flexDirection: "row",
    width: "100%",
  },
  saveSendData: {
    width: "45%",
    height: "60%",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(54, 48, 74)",
    color: "white",
  },
  textSaveData: {
    fontSize: Dimensions.get("screen").fontScale * 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "white",
  },
  madorText: {
    color: "#FFF",
    fontSize: Dimensions.get("screen").fontScale * 15,
  },
});

export default HomePage;
