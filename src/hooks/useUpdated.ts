import { useRecoilState } from "recoil";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useUpdated = (
  id: any,
  setQuestion: any,
  selectedAnswerTypes: any
) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const updated = (text: string) => {
    setQuestion(text);
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          return {
            ...answerType,
            inputValue: text,
          };
        }
        return answerType;
      }
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  return { updated };
};
