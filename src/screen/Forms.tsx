import React, { useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import ActionSheetComponent from "../components/ActionSheetComponent";
import IconComponent from "../components/layout/IconComponent";
import SurveyFormComponent from "../components/layout/SurveyFormComponent";

export default function Forms() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <>
        <IconComponent actionSheetRef={actionSheetRef} />
        <SurveyFormComponent />
        <ActionSheetComponent actionSheetRef={actionSheetRef} />
      </>
    </>
  );
}
