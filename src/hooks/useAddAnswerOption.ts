import { useRecoilState } from "recoil";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useAddAnswerOption = (
  setAnswerOptions: any,
  answerOptions: any
) => {
  const addAnswerOption = () => {
    const newOption = { text: "" };
    setAnswerOptions([...answerOptions, newOption]);
  };

  return { addAnswerOption };
};
