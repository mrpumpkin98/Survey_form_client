import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { selectedAnswerTypesState, previewState } from "../store";
import { Image } from "expo-image";
import generateRandomId from "./GenerateRandomId";
const star = require("../../src/assets/star.png");
const fullStar = require("../../src/assets/fullStar.png");
const copy = require("../../src/assets/copy.png");
const trash = require("../../src/assets/trash.png");

export interface ShortAnswerProps {
  id: string;
}

export interface AnswerTypeItem {
  id: string;
  answerType: string;
  essential: boolean;
  inputValue: string;
  answerOptions: { [key: string]: string };
}

export default function ShortAnswer({ id }: ShortAnswerProps) {
  const [selectedAnswerTypes, setSelectedAnswerTypes] = useRecoilState<
    AnswerTypeItem[]
  >(selectedAnswerTypesState);
  const [preview, setPreview] = useRecoilState(previewState);
  const [question, setQuestion] = useState("");
  const [essential, setEssential] = useState(false);

  useEffect(() => {
    const answer = selectedAnswerTypes.find(
      (answerType) => answerType.id === id
    );
    if (answer) {
      setQuestion(answer.inputValue);
      setEssential(answer.essential);
    }
  }, [selectedAnswerTypes, id]);

  const Delete = () => {
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
        return {
          ...answerType,
          inputValue: question,
        };
      }
      return answerType;
    });

    const copiedAnswer = selectedAnswerTypes.find(
      (answerType) => answerType.id === id
    );
    if (copiedAnswer) {
      const newId = generateRandomId();
      const copiedAnswerWithNewId = {
        ...copiedAnswer,
        id: newId,
        inputValue: question,
      };

      // 새로운 항목을 원하는 위치에 추가
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
          <Text style={styles.text}> 단답형 텍스트</Text>
          <View style={styles.pressableContainer}>
            <Pressable style={styles.pressable} onPress={onCopy}>
              <Image source={copy} style={styles.copy} />
            </Pressable>
            <Pressable style={styles.pressable} onPress={Delete}>
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
          <TextInput style={styles.inputPreview} placeholder="내 답변" />
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
  text: {
    color: "#ccc",
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
  inputPreview: {
    width: "60%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  textPreview: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  notTextPreview: {
    paddingTop: 10,
    paddingBottom: 15,
    color: "#ccc",
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
});
