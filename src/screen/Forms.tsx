import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import DismissKeyboardView from "../components/DismissKeyboardView";
import ShortAnswer, { AnswerTypeItem } from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import MultipleChoiceAnswer from "../components/MultipleChoiceAnswer";
import CheckBoxAnswer from "../components/CheckBoxAnswer";
import { ActionSheetRef } from "react-native-actions-sheet";
import { useRecoilState } from "recoil";
import {
  selectedAnswerTypesState,
  selectedAnswerTitleState,
  selectedAnswerDescriptionState,
  previewState,
} from "../store/index";
import generateRandomId from "../components/GenerateRandomId";
import ActionSheetComponent from "../components/ActionSheetComponent";
import IconComponent from "../components/IconComponent";

type AnswerType =
  | "ShortAnswer"
  | "LongAnswer"
  | "MultipleChoiceAnswer"
  | "CheckBoxAnswer";

export default function Forms() {
  const [preview, setPreview] = useRecoilState(previewState);
  const [surveyTitle, setSurveyTitle] = useState("제목 없는 설문지");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [selectedAnswerTypes, setSelectedAnswerTypes] = useRecoilState(
    selectedAnswerTypesState
  );
  const [selectedAnswerTitle, setSelectedAnswerTitle] = useRecoilState(
    selectedAnswerTitleState
  );
  const [selectedAnswerDescription, setSelectedAnswerDescription] =
    useRecoilState(selectedAnswerDescriptionState);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const handleTitleChange = (text: string) => {
    setSurveyTitle(text);
    setSelectedAnswerTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setSurveyDescription(text);
    setSelectedAnswerDescription(text);
  };

  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(true);
    }
  };

  const addAnswer = (answerType: AnswerType) => {
    const id = generateRandomId();
    const newAnswer: AnswerTypeItem = {
      id,
      answerType,
      essential: false,
      inputValue: "",
      answerOptions: {},
    };

    setSelectedAnswerTypes([...selectedAnswerTypes, newAnswer]);
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(false);
    }
  };

  const renderSelectedAnswers = () => {
    return selectedAnswerTypes.map(({ answerType, id }, index) => {
      switch (answerType) {
        case "ShortAnswer":
          return <ShortAnswer key={id} id={id} />;
        case "LongAnswer":
          return <LongAnswer key={id} id={id} />;
        case "MultipleChoiceAnswer":
          return <MultipleChoiceAnswer key={id} id={id} />;
        case "CheckBoxAnswer":
          return <CheckBoxAnswer key={id} id={id} />;
        default:
          return null;
      }
    });
  };

  const onPreview = () => {
    setPreview((prevPreview) => !prevPreview);
  };

  return (
    <>
      {!preview ? (
        <>
          <IconComponent
            onPreview={onPreview}
            openActionSheet={openActionSheet}
          />
          <DismissKeyboardView>
            <View style={styles.container}>
              <Text style={styles.title}>{surveyTitle}</Text>
              <Text style={styles.description}>{surveyDescription}</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.inputTitle}
                  onChangeText={handleTitleChange}
                  value={surveyTitle}
                  placeholder="설문지 제목"
                />
                <TextInput
                  style={styles.inputDescription}
                  onChangeText={handleDescriptionChange}
                  value={surveyDescription}
                  placeholder="설문지 설명"
                />
              </View>
              {renderSelectedAnswers()}
            </View>
          </DismissKeyboardView>
          <ActionSheetComponent
            actionSheetRef={actionSheetRef}
            addAnswer={addAnswer}
          />
        </>
      ) : (
        <>
          <IconComponent
            onPreview={onPreview}
            openActionSheet={openActionSheet}
          />
          <DismissKeyboardView>
            <View style={styles.container}>
              <Text style={styles.title}>{surveyTitle}</Text>
              <Text style={styles.description}>{surveyDescription}</Text>
              {renderSelectedAnswers()}
            </View>
          </DismissKeyboardView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    zIndex: 9999,
    right: 60,
    top: 30,
    display: "flex",
    flexDirection: "row",
  },
  Pressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 33,
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
  },
  inputTitle: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  inputDescription: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
