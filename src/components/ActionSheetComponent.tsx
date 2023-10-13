import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Image } from "expo-image";
import generateRandomId from "../components/GenerateRandomId";

const sortIcon = require("../../src/assets/sort.png");
const longIcon = require("../../src/assets/long.png");
const circleIcon = require("../../src/assets/circleIcon.png");
const checkbox = require("../../src/assets/checkbox.png");

export default function ActionSheetComponent({
  actionSheetRef,
  addAnswer,
}: any) {
  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.actionSheet}>
      <Text>More</Text>
      <View style={styles.select}>
        <Pressable
          onPress={() => addAnswer("ShortAnswer")}
          style={styles.Pressable}
        >
          <Image source={sortIcon} style={styles.sortIcon} />
          <Text>단답형</Text>
        </Pressable>
        <Pressable
          onPress={() => addAnswer("LongAnswer")}
          style={styles.Pressable}
        >
          <Image source={longIcon} style={styles.longIcon} />
          <Text>장문형</Text>
        </Pressable>
        <Pressable
          onPress={() => addAnswer("MultipleChoiceAnswer")}
          style={styles.Pressable}
        >
          <Image source={circleIcon} style={styles.circleIcon} />
          <Text>객관식</Text>
        </Pressable>
        <Pressable
          onPress={() => addAnswer("CheckBoxAnswer")}
          style={styles.Pressable}
        >
          <Image source={checkbox} style={styles.checkbox} />
          <Text>체크박스</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionSheet: {
    height: 300,
    padding: 30,
  },
  select: {
    padding: 15,
  },
  Pressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 33,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  sortIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  longIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  circleIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
});
