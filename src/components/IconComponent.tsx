import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { previewState } from "../store";
import { Image } from "expo-image";

const eyeIcon = require("../../src/assets/eye.png");
const addIcon = require("../../src/assets/add.png");

export default function IconComponent({ onPreview, openActionSheet }: any) {
  const [preview, setPreview] = useRecoilState(previewState);
  return (
    <>
      {!preview ? (
        <View style={styles.icon}>
          <Pressable style={styles.eyeIconPressable} onPress={onPreview}>
            <Image source={eyeIcon} style={styles.eyeIcon} />
          </Pressable>
          <Pressable onPress={openActionSheet} style={styles.addIconPressable}>
            <Image source={addIcon} style={styles.addIcon} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.icon}>
          <Pressable style={styles.eyeIconPressable} onPress={onPreview}>
            <Image source={eyeIcon} style={styles.eyeIcon} />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    zIndex: 9999,
    right: 60,
    top: 30,
    display: "flex",
    flexDirection: "row",
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
});
