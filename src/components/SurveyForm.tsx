import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DismissKeyboardView from "./DismissKeyboardView";
import {
  previewState,
  selectedAnswerDescriptionState,
  selectedAnswerTitleState,
  selectedAnswerTypesState,
} from "../store";
import { useRecoilState } from "recoil";
import ShortAnswer from "./ShortAnswer";
import LongAnswer from "./LongAnswer";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import CheckBoxAnswer from "./CheckBoxAnswer";

export default function SurveyForm() {
  const [surveyTitle, setSurveyTitle] = useState("제목 없는 설문지");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [preview, setPreview] = useRecoilState(previewState);
  const [selectedAnswerTitle, setSelectedAnswerTitle] = useRecoilState(
    selectedAnswerTitleState
  );
  const [selectedAnswerDescription, setSelectedAnswerDescription] =
    useRecoilState(selectedAnswerDescriptionState);

  const [selectedAnswerTypes, setSelectedAnswerTypes] = useRecoilState(
    selectedAnswerTypesState
  );

  const handleTitleChange = (text: string) => {
    setSurveyTitle(text);
    setSelectedAnswerTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setSurveyDescription(text);
    setSelectedAnswerDescription(text);
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

  return (
    <>
      {!preview ? (
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
      ) : (
        <DismissKeyboardView>
          <View style={styles.container}>
            <Text style={styles.title}>{surveyTitle}</Text>
            <Text style={styles.description}>{surveyDescription}</Text>
            {renderSelectedAnswers()}
          </View>
        </DismissKeyboardView>
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
