import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PeopleList from "../components/PeopleList";
import { SafeAreaView } from "react-native-safe-area-context";
import { getValueFor, save } from "../cache/localStorage";
import i18n, { tokens } from "../utils/i18n";
import { Ionicons } from "@expo/vector-icons";

interface INamesStatus {
  name: string;
  status: string;
}

const HomePage: React.FC = () => {
  const [madorName, setMadorName] = useState<string>();

  const [names, setNames] = useState<INamesStatus[]>([
    { name: "הוסף", status: "" },
  ]);

  const { ApplicationName, GroupNameLabel, SendToWhatApp, Update } =
    tokens.app.intro;
  const applicationName = i18n.t(ApplicationName);
  const groupNameLabel = i18n.t(GroupNameLabel);
  const sendToWhatApp = i18n.t(SendToWhatApp);
  const update = i18n.t(Update);

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
          <View style={styles.imageIconContainer}>
            <Image
              height={30}
              width={30}
              style={styles.imageIcon}
              source={require(`../assets/icon.png`)}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{applicationName}</Text>
          </View>
        </View>
        <View style={styles.madorNameContainer}>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: "30%",
                width: "60%",
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                backgroundColor: "rgb(54, 48, 74)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: Dimensions.get("screen").fontScale * 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {groupNameLabel}
              </Text>
            </View>
            <View
              style={{
                height: "30%",
                width: "60%",
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: "rgb(54, 48, 74)",
                borderWidth: 2,
              }}
            >
              <TextInput
                onChangeText={onChangeMadorText}
                value={madorName}
                style={styles.madorName}
              />
            </View>
          </View>
        </View>
        <View style={styles.tablePeopleContainer}>
          <PeopleList names={names} setNames={setNames} />
        </View>
        <View style={styles.addNewRowContainer}>
          <TouchableOpacity onPress={AddName} style={styles.addNewRow}>
            <Text style={styles.addNewRowLabel}>הוסף שורה חדשה</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={saveOnLocalStorage}
            style={styles.saveSendData}
          >
            <Text style={styles.textSaveData}>{update}</Text>
            <Ionicons name="sync-outline" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendDataStatus}
            style={styles.saveSendData}
          >
            <Text style={styles.textSaveData}>{sendToWhatApp}</Text>
            <Ionicons name="send" size={32} color="white" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.peoplelist}>
            <PeopleList names={names} setNames={setNames} />
          </View>
          <View style={styles.sendWhatappContainer}>
            <TouchableOpacity
              onPress={saveOnLocalStorage}
              style={styles.saveDataButton}
            >
              <Text style={styles.textSaveData}>שמור נתונים</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendDataStatus}
              style={styles.sendToWhatapp}
            >
              <Text style={styles.textToWhatapp}>שלח לווטסאפ</Text>
            </TouchableOpacity>
          </View> */}
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
    backgroundColor: "rgb(54, 48, 74)",
  },
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
    fontSize: Dimensions.get("screen").fontScale * 24,
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
  madorNameContainer: {
    display: "flex",
    flex: 2.4,
  },
  peoplelist: {
    flex: 8,
    flexDirection: "row",
    width: "100%",
  },
  sendWhatappContainer: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveDataButton: {
    width: "45%",
    height: "60%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  saveSendData: {
    width: "45%",
    height: "65%",
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
  textToWhatapp: {
    fontSize: Dimensions.get("screen").fontScale * 15,
    fontWeight: "bold",
    color: "white",
  },
  madorName: {
    color: "rgb(54, 48, 74)",
    textAlign: "center",
  },
  madorText: {
    color: "#FFF",
    fontSize: Dimensions.get("screen").fontScale * 15,
  },
});

export default HomePage;
