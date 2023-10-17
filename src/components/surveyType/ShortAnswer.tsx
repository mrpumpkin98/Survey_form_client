import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { selectedAnswerTypesState, previewState } from "../../store";
import { Image } from "expo-image";
import * as ImageComponent from "../../libraries/ImageComponent";
import { useUpdated } from "../../hooks/useUpdated";
import { useToggleEssential } from "../../hooks/useToggleEssential";
import { useSubjectiveCopy } from "../../hooks/useSubjectiveCopy";
import { useDelete } from "../../hooks/useDelete";

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

  const { onDelete } = useDelete(id, selectedAnswerTypes);

  const { toggleEssential } = useToggleEssential(id, selectedAnswerTypes);

  const { onCopy } = useSubjectiveCopy(id, selectedAnswerTypes, question);

  const { updated } = useUpdated(id, setQuestion, selectedAnswerTypes);

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
  text: {
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
  inputPreview: {
    width: "60%",
    borderBottomWidth: 1,
    borderColor: "#2D62EA",
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
