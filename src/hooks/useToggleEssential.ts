import { useRecoilState } from "recoil";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useToggleEssential = (id: any, selectedAnswerTypes: any) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const toggleEssential = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          return {
            ...answerType,
            essential: !answerType.essential,
          };
        }
        return answerType;
      }
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  return { toggleEssential };
};
