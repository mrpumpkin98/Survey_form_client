import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import DismissKeyboardView from "../components/DismissKeyboardView";
import ShortAnswer, { AnswerTypeItem } from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import MultipleChoiceAnswer from "../components/MultipleChoiceAnswer";
import CheckBoxAnswer from "../components/CheckBoxAnswer";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useRecoilState } from "recoil";
import {
  selectedAnswerTypesState,
  selectedAnswerTitleState,
  selectedAnswerDescriptionState,
  previewState,
} from "../store/index";
import generateRandomId from "../components/GenerateRandomId";

const eyeIcon = require("../../src/assets/eye.png");
const addIcon = require("../../src/assets/add.png");
const sortIcon = require("../../src/assets/sort.png");
const longIcon = require("../../src/assets/long.png");
const circleIcon = require("../../src/assets/circleIcon.png");
const checkbox = require("../../src/assets/checkbox.png");

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
          <View style={styles.icon}>
            <Pressable style={styles.eyeIconPressable} onPress={onPreview}>
              <Image source={eyeIcon} style={styles.eyeIcon} />
            </Pressable>
            <Pressable
              onPress={openActionSheet}
              style={styles.addIconPressable}
            >
              <Image source={addIcon} style={styles.addIcon} />
            </Pressable>
          </View>
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
        </>
      ) : (
        <>
          <View style={styles.icon}>
            <Pressable style={styles.eyeIconPressable} onPress={onPreview}>
              <Image source={eyeIcon} style={styles.eyeIcon} />
            </Pressable>
          </View>
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
  eyeIcon: {
    width: 25,
    height: 25,
  },
  eyeIconPressable: {
    width: 25,
    height: 25,
  },
  addIconPressable: {
    width: 25,
    height: 25,
  },
  addIcon: {
    width: 25,
    height: 25,
    marginLeft: 25,
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
  actionSheet: {
    height: 300,
    padding: 30,
  },
  select: {
    padding: 15,
  },
});
