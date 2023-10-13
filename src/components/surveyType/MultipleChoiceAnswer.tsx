import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRecoilState } from "recoil";
import { previewState, selectedAnswerTypesState } from "../../store";
import { AnswerTypeItem, ShortAnswerProps } from "./ShortAnswer";
import generateRandomId from "../GenerateRandomId";
import { CheckBox as RNECheckBox } from "react-native-elements";
const circleIcon = require("../../../src/assets/circleIcon.png");
const down = require("../../../src/assets/down.png");
const cross = require("../../../src/assets/cross-small.png");
const star = require("../../../src/assets/star.png");
const fullStar = require("../../../src/assets/fullStar.png");
const copy = require("../../../src/assets/copy.png");
const trash = require("../../../src/assets/trash.png");

export default function MultipleChoiceAnswer({ id }: ShortAnswerProps) {
  const [answerOptions, setAnswerOptions] = useState<
    {
      [x: string]: any;
      text: string;
    }[]
  >([]);
  const [selectedAnswerTypes, setSelectedAnswerTypes] = useRecoilState<
    AnswerTypeItem[]
  >(selectedAnswerTypesState);
  const [preview, setPreview] = useRecoilState(previewState);
  const [question, setQuestion] = useState("");
  const [essential, setEssential] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const answer = selectedAnswerTypes.find(
      (answerType) => answerType.id === id
    );
    if (answer) {
      setQuestion(answer.inputValue);
      setEssential(answer.essential);
      const { answerOptions } = answer;
      if (answerOptions) {
        const options = [];
        for (const key in answerOptions) {
          if (answerOptions.hasOwnProperty(key)) {
            options.push({ id: key, text: answerOptions[key] });
          }
        }
        setAnswerOptions(options);
      }
    }
  }, [selectedAnswerTypes, id]);

  const addAnswerOption = () => {
    const newOption = { text: "" };
    setAnswerOptions([...answerOptions, newOption]);
  };

  const deleteAnswerOption = (index: any) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);

    const updatedSelectedAnswerTypes = selectedAnswerTypes.map((answerType) => {
      if (answerType.id === id) {
        const updatedAnswerOptions = { ...answerType.answerOptions };
        delete updatedAnswerOptions[index];
        return {
          ...answerType,
          answerOptions: updatedAnswerOptions,
        };
      }
      return answerType;
    });
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  const onDelete = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.filter(
      (answerType) => answerType.id !== id
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  const toggleEssential = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map((answerType) => {
      if (answerType.id === id) {
        return {
          ...answerType,
          essential: !answerType.essential,
        };
      }
      return answerType;
    });
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  const onCopy = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map((answerType) => {
      if (answerType.id === id) {
        const newAnswerOptions: { [key: number]: string } = {};
        answerOptions.forEach((option, index) => {
          newAnswerOptions[index] = option.text;
        });

        return {
          ...answerType,
          inputValue: question,
          answerOptions: newAnswerOptions,
        };
      }
      return answerType;
    });

    const copiedAnswer = selectedAnswerTypes.find(
      (answerType) => answerType.id === id
    );
    if (copiedAnswer) {
      const newAnswerOptions: { [key: number]: string } = {};
      answerOptions.forEach((option, index) => {
        newAnswerOptions[index] = option.text;
      });

      const newId = generateRandomId();
      const copiedAnswerWithNewId = {
        ...copiedAnswer,
        id: newId,
        inputValue: question,
        answerOptions: newAnswerOptions, // answerOptions 추가
      };

      const index = updatedSelectedAnswerTypes.findIndex(
        (answerType) => answerType.id === id
      );
      const updatedList = [...updatedSelectedAnswerTypes];
      updatedList.splice(index + 1, 0, copiedAnswerWithNewId);

      setSelectedAnswerTypes(updatedList);
    }
  };

  const updated = (text: string) => {
    setQuestion(text);
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map((answerType) => {
      if (answerType.id === id) {
        return {
          ...answerType,
          inputValue: text,
        };
      }
      return answerType;
    });
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  const updateAnswerOption = (index: number, text: string) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].text = text;
    setAnswerOptions(updatedOptions);

    const updatedSelectedAnswerTypes = selectedAnswerTypes.map((answerType) => {
      if (answerType.id === id) {
        return {
          ...answerType,
          answerOptions: {
            ...answerType.answerOptions,
            [index]: text,
          },
        };
      }
      return answerType;
    });
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  const handleCheckboxClick = (checkboxId: any) => {
    const updatedCheckboxStates = { ...checkboxStates };
    updatedCheckboxStates[checkboxId] = !updatedCheckboxStates[checkboxId];
    for (const key in updatedCheckboxStates) {
      if (key !== checkboxId) {
        updatedCheckboxStates[key] = false;
      }
    }
    setCheckboxStates(updatedCheckboxStates);
  };

  return (
    <>
      {!preview ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="질문"
            onChangeText={updated}
            value={question}
          />
          {answerOptions.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <Image source={circleIcon} style={styles.circleIcon} />
              <TextInput
                style={styles.optionInput}
                placeholder={`옵션 ${index + 1}`}
                onChangeText={(text) => updateAnswerOption(index, text)}
                value={option.text}
              />
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteAnswerOption(index)}
              >
                <Image source={cross} style={styles.cross} />
              </Pressable>
            </View>
          ))}
          <Pressable style={styles.addButton} onPress={addAnswerOption}>
            <Text style={styles.addButtonLabel}>옵션 추가</Text>
            <Image source={down} style={styles.downIcon} />
          </Pressable>
          <View style={styles.pressableContainer}>
            <Pressable style={styles.pressable} onPress={onCopy}>
              <Image source={copy} style={styles.copy} />
            </Pressable>
            <Pressable style={styles.pressable} onPress={onDelete}>
              <Image source={trash} style={styles.trash} />
            </Pressable>
            <Pressable
              style={styles.pressableEssential}
              onPress={toggleEssential}
            >
              {!essential ? (
                <Image source={star} style={styles.star} />
              ) : (
                <Image source={fullStar} style={styles.fullStar} />
              )}
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titlePreview}>
            {!question ? (
              <Text style={styles.notTextPreview}>질문이 없습니다.</Text>
            ) : (
              <Text style={styles.textPreview}>{question}</Text>
            )}
            {essential && (
              <Image source={fullStar} style={styles.fullStarPreview} />
            )}
          </View>
          {answerOptions.length === 0 ? (
            <View>
              <RNECheckBox
                checked={checkboxStates["옵션1"]}
                onPress={() => handleCheckboxClick("옵션1")}
                title="옵션1"
                containerStyle={styles.checkBox}
              />
            </View>
          ) : (
            answerOptions.map((option, index) => (
              <View key={index}>
                <RNECheckBox
                  checked={checkboxStates[option.id] || false}
                  onPress={() => handleCheckboxClick(option.id)}
                  title={option.text}
                  containerStyle={styles.checkBox}
                />
              </View>
            ))
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginLeft: 5,
  },
  downIcon: {
    width: 22,
    height: 22,
  },
  cross: {
    width: 22,
    height: 22,
  },
  optionInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },

  buttonText: {
    color: "#fff",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
  },
  addButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  addButtonLabel: {
    marginRight: 5,
  },
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  pressable: {
    margin: 10,
  },
  pressableText: {},
  pressableEssential: {
    margin: 10,
  },
  pressableEssentialText: {},
  star: {
    width: 22,
    height: 22,
  },
  fullStar: {
    width: 22,
    height: 22,
  },
  trash: {
    width: 22,
    height: 22,
  },
  copy: {
    width: 22,
    height: 22,
  },
  textPreview: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  fullStarPreview: {
    width: 7,
    height: 7,
  },
  titlePreview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  notTextPreview: {
    paddingTop: 10,
    paddingBottom: 15,
    color: "#ccc",
  },
});
