import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import * as ImageComponent from "../libraries/ImageComponent";

interface OptionListProps {
  options: any;
  onUpdate: any;
  onDelete: any;
}

function CheckBoxOptionList({ options, onUpdate, onDelete }: OptionListProps) {
  return (
    <>
      {options.map((option: any, index: any) => (
        <View key={index} style={styles.optionContainer}>
          <Image source={ImageComponent.checkbox} style={styles.checkbox} />
          <TextInput
            style={styles.optionInput}
            placeholder={`옵션 ${index + 1}`}
            onChangeText={(text) => onUpdate(index, text)}
            value={option.text}
          />
          <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(index)}
          >
            <Image source={ImageComponent.cross} style={styles.cross} />
          </Pressable>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginLeft: 5,
  },
  optionInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
    padding: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  cross: {
    width: 22,
    height: 22,
  },
});

export default CheckBoxOptionList;
