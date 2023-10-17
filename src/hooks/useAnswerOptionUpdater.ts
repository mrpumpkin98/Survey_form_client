import { useRecoilState } from "recoil";
import { selectedAnswerTypesState } from "../store";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";

export const useAnswerOptionUpdater = (
  id: any,
  answerOptions: any,
  setAnswerOptions: any,
  selectedAnswerTypes: any
) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const updateAnswerOption = (index: number, text: string) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].text = text;
    setAnswerOptions(updatedOptions);

    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          return {
            ...answerType,
            answerOptions: {
              ...answerType.answerOptions,
              [index]: text,
            },
          };
        }
        return answerType;
      }
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  return { updateAnswerOption };
};
