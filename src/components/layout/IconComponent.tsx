import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { previewState } from "../../store";
import { Image } from "expo-image";
import * as ImageComponent from "../../libraries/ImageComponent";

export default function IconComponent({ actionSheetRef }: any) {
  const [preview, setPreview] = useRecoilState(previewState);

  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(true);
    }
  };

  return (
    <>
      {!preview ? (
        <View style={styles.icon}>
          <Pressable
            style={styles.eyeIconPressable}
            onPress={() => setPreview((prevPreview) => !prevPreview)}
          >
            <Image source={ImageComponent.eyeIcon} style={styles.eyeIcon} />
          </Pressable>
          <Pressable onPress={openActionSheet} style={styles.addIconPressable}>
            <Image source={ImageComponent.addIcon} style={styles.addIcon} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.iconPreview}>
          <Pressable
            style={styles.eyeIconPressable}
            onPress={() => setPreview((prevPreview) => !prevPreview)}
          >
            <Image source={ImageComponent.eyeIcon} style={styles.eyeIcon} />
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
    top: 50,
    display: "flex",
    flexDirection: "row",
  },
  iconPreview: {
    position: "absolute",
    zIndex: 9999,
    right: 35,
    top: 50,
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
