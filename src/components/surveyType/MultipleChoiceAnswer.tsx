import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRecoilState } from "recoil";
import { previewState, selectedAnswerTypesState } from "../../store";
import { AnswerTypeItem, ShortAnswerProps } from "./ShortAnswer";
import { CheckBox as RNECheckBox } from "react-native-elements";
import * as ImageComponent from "../../libraries/ImageComponent";
import { useAnswerOptionUpdater } from "../../hooks/useAnswerOptionUpdater";
import { useUpdated } from "../../hooks/useUpdated";
import { useChoiceCopy } from "../../hooks/useChoiceCopy";
import { useToggleEssential } from "../../hooks/useToggleEssential";
import { useDelete } from "../../hooks/useDelete";
import { useDeleteAnswerOption } from "../../hooks/useDeleteAnswerOption";
import { useAddAnswerOption } from "../../hooks/useAddAnswerOption";
import { useHandleMultipleChoiceClick } from "../../hooks/useHandleMultipleChoiceClick";

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

  const { toggleEssential } = useToggleEssential(id, selectedAnswerTypes);

  const { onDelete } = useDelete(id, selectedAnswerTypes);

  const { onCopy } = useChoiceCopy(
    id,
    selectedAnswerTypes,
    question,
    answerOptions
  );

  const { updated } = useUpdated(id, setQuestion, selectedAnswerTypes);

  const { addAnswerOption } = useAddAnswerOption(
    setAnswerOptions,
    answerOptions
  );

  const { deleteAnswerOption } = useDeleteAnswerOption(
    id,
    selectedAnswerTypes,
    answerOptions,
    setAnswerOptions
  );

  const { updateAnswerOption } = useAnswerOptionUpdater(
    id,
    answerOptions,
    setAnswerOptions,
    selectedAnswerTypes
  );

  const { handleMultipleChoiceClick } = useHandleMultipleChoiceClick(
    checkboxStates,
    setCheckboxStates
  );

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
              <Image
                source={ImageComponent.circleIcon}
                style={styles.circleIcon}
              />
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
                <Image source={ImageComponent.cross} style={styles.cross} />
              </Pressable>
            </View>
          ))}
          <Pressable style={styles.addButton} onPress={addAnswerOption}>
            <Text style={styles.addButtonLabel}>옵션 추가</Text>
            <Image source={ImageComponent.down} style={styles.downIcon} />
          </Pressable>
          <View style={styles.pressableContainer}>
            <Pressable style={styles.pressable} onPress={onCopy}>
              <Image source={ImageComponent.copy} style={styles.copy} />
            </Pressable>
            <Pressable style={styles.pressable} onPress={onDelete}>
              <Image source={ImageComponent.trash} style={styles.trash} />
            </Pressable>
            <Pressable
              style={styles.pressableEssential}
              onPress={toggleEssential}
            >
              {!essential ? (
                <Image source={ImageComponent.star} style={styles.star} />
              ) : (
                <Image
                  source={ImageComponent.fullStar}
                  style={styles.fullStar}
                />
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
              <Image
                source={ImageComponent.fullStar}
                style={styles.fullStarPreview}
              />
            )}
          </View>
          {answerOptions.length === 0 ? (
            <View>
              <RNECheckBox
                checked={checkboxStates["옵션1"]}
                onPress={() => handleMultipleChoiceClick("옵션1")}
                title="옵션1"
                containerStyle={styles.checkBox}
              />
            </View>
          ) : (
            answerOptions.map((option, index) => (
              <View key={index}>
                <RNECheckBox
                  checked={checkboxStates[option.id] || false}
                  onPress={() => handleMultipleChoiceClick(option.id)}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
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
    borderColor: "#2D62EA",
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
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
    padding: 10,
    marginBottom: 15,
  },
  addButtonLabel: {
    marginRight: 5,
    color: "#6691FF",
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
    borderColor: "#6691FF",
    backgroundColor: "#fff",
  },
  notTextPreview: {
    paddingTop: 10,
    paddingBottom: 15,
    color: "#ccc",
  },
});
