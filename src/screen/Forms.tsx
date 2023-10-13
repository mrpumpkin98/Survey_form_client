import React, { useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import ActionSheetComponent from "../components/ActionSheetComponent";
import IconComponent from "../components/layout/IconComponent";
import SurveyForm from "../components/layout/SurveyForm";

export default function Forms() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <>
        <IconComponent actionSheetRef={actionSheetRef} />
        <SurveyForm />
        <ActionSheetComponent actionSheetRef={actionSheetRef} />
      </>
    </>
  );
}
