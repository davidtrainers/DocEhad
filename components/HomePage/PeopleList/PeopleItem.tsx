import Checkbox from "expo-checkbox";
import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import CheckboxSection from "./CheckBoxSection";
import RowHeaders from "./RowHeaders";

interface IPeopleItemProps {
  name: string;
}

interface IPersonData {
  name: string;
  location: string;
}

interface ICheckBoxItem {
  location: string;
}

const PeopleItem: React.FC<IPeopleItemProps> = (props: IPeopleItemProps) => {
  const { name } = props;

  const [currentSelected, setCurrentSelected] = useState<string>();
  const [peopleName, setPeopleName] = useState<IPersonData>({
    name: name,
    location: "",
  });

  const itemsList = ["בסיס", "ת. חוץ", "חופש", 'אבט"ש', "הגנש"];

  const renderItem: React.FC<any> = (location: any) => {
    return (
      <CheckboxSection currentSelected={currentSelected} location={location} />
    );
  };

  const renderHeaderItem: React.FC<any> = (item: any) => {
    console.log(item);
    return <Text>{item.item}</Text>;
  };

  return name === "dd" ? (
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text>הוסף שם חדש</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.peopleItemContainer}>
      {name == "שם" ? (
        <>
          <View style={styles.textPeopleNameInput}>
            <Text style={{ textAlign: "center" }}>askdj</Text>
          </View>
          <View style={styles.checkboxList}>
            {itemsList.map((item, index) => {
              return <RowHeaders item={item} />;
            })}
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.textPeopleNameInput}
            onChangeText={(text) =>
              setPeopleName((prevPeopleData) => {
                return { ...prevPeopleData, name: text };
              })
            }
            value={peopleName.name}
          />
          <View style={styles.checkboxList}>
            {itemsList.map((item, index) => {
              return (
                <CheckboxSection
                  currentSelected={currentSelected}
                  location={item}
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

export default PeopleItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  peopleListTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  peopleListText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
  peopleListContainer: {
    flex: 5,
    backgroundColor: "yellow",
    justifyContent: "center",
  },
  textPeopleNameInput: {
    width: "40%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    color: "#FFF",
    backgroundColor: "rgb(32,32,32)",
    textAlign: "center",
  },
  peopleItemContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxList: {
    width: "60%",
    flexDirection: "row",
  },
});
