import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Dimensions,
  Button,
} from "react-native";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import { save, getValueFor } from "../../../cache/localStorage";
import {
  INamesStatus,
  IPeopleListProps,
  ITableData,
} from "../../../interfaces/IPeopleList";

const PeopleList: React.FC<IPeopleListProps> = (props: IPeopleListProps) => {
  const { names, setNames } = props;

  const [state, setState] = React.useState<ITableData>({
    tableHead: [
      "שם",
      "בסיס",
      "לימודים",
      "ת. חוץ",
      "חופש",
      "סיפוח",
      "אבטש",
      "איו דיווח",
    ],
    widthArr: [20, 18, 18, 18, 18, 18, 18, 18, 18],
  });

  const inputTextName = (rowData: any, cellData: any, index: number) => {
    const onChangeName = (text: string) => {
      setNames((prev) => {
        let newPrev = [...prev];
        newPrev[index].name = text;
        return newPrev;
      });
    };
    return (
      <TextInput
        onChangeText={onChangeName}
        value={rowData.name}
        multiline={true}
        maxLength={20}
        style={styles.name}
      />
    );
  };

  const inputCheckbox = (rowData: any, cellData: any, index: number) => {
    const setIsChecked = (isChecked: boolean) => {
      setNames((prev) => {
        let newPrev = [...prev];
        prev[index].status = cellData;
        return newPrev;
      });
    };
    return (
      <Checkbox
        style={{ alignSelf: "center" }}
        color="rgb(54, 48, 74)"
        value={cellData === rowData.status}
        onValueChange={setIsChecked}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Table>
        <Row
          data={state.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <ScrollView style={styles.dataWrapper}>
          {names.map((rowData, index) => (
            <TableWrapper
              key={index}
              style={{
                height: 45,
                flexDirection: "row",
                backgroundColor:
                  index % 2 == 1 ? "rgba(54, 48, 74,0.21)" : "white",
              }}
            >
              {state.tableHead.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    rowData.name === "הוסף"
                      ? null
                      : cellIndex === 0
                      ? inputTextName(rowData, cellData, index)
                      : inputCheckbox(rowData, cellData, index)
                  }
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </ScrollView>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    marginHorizontal: 10,
  },
  head: {
    height: 50,
    backgroundColor: "rgb(54, 48, 74)",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  text: { margin: 6, color: "white", textAlign: "center" },
  row: { height: 45, flexDirection: "row" },
  btn: { width: 58, height: 18, borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
  name: {
    height: 40,
    borderWidth: 1,
    borderRadius: 0,
    color: "rgb(54, 48, 74)",
  },
  dataWrapper: {},
});

export default PeopleList;
