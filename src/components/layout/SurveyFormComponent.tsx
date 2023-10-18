import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DismissKeyboardView from "../DismissKeyboardView";
import {
  previewState,
  selectedAnswerDescriptionState,
  selectedAnswerTitleState,
  selectedAnswerTypesState,
} from "../../store";
import { useRecoilState } from "recoil";
import ShortAnswer from "../surveyType/ShortAnswer";
import LongAnswer from "../surveyType/LongAnswer";
import MultipleChoiceAnswer from "../surveyType/MultipleChoiceAnswer";
import CheckBoxAnswer from "../surveyType/CheckBoxAnswer";

export default function SurveyFormComponent() {
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
        <View style={styles.wrapper}>
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
        </View>
      ) : (
        <View style={styles.wrapper}>
          <DismissKeyboardView>
            <View style={styles.container}>
              <Text style={styles.title}>{surveyTitle}</Text>
              <Text style={styles.description}>{surveyDescription}</Text>
              {renderSelectedAnswers()}
            </View>
          </DismissKeyboardView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: 30,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2D62EA",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    paddingLeft: 2,
    color: "#6691FF",
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputTitle: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  inputDescription: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
