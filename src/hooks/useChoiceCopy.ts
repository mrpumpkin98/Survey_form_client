import { useRecoilState } from "recoil";
import generateRandomId from "../libraries/utils";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useChoiceCopy = (
  id: any,
  selectedAnswerTypes: any,
  question: any,
  answerOptions: any
) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const onCopy = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          const newAnswerOptions: { [key: number]: string } = {};
          answerOptions.forEach((option: any, index: any) => {
            newAnswerOptions[index] = option.text;
          });

          return {
            ...answerType,
            inputValue: question,
            answerOptions: newAnswerOptions,
          };
        }
        return answerType;
      }
    );

    const copiedAnswer = selectedAnswerTypes.find(
      (answerType: any) => answerType.id === id
    );
    if (copiedAnswer) {
      const newAnswerOptions: { [key: number]: string } = {};
      answerOptions.forEach((option: any, index: any) => {
        newAnswerOptions[index] = option.text;
      });

      const newId = generateRandomId();
      const copiedAnswerWithNewId = {
        ...copiedAnswer,
        id: newId,
        inputValue: question,
        answerOptions: newAnswerOptions, // answerOptions 추가
      };

      const index = updatedSelectedAnswerTypes.findIndex(
        (answerType: any) => answerType.id === id
      );
      const updatedList = [...updatedSelectedAnswerTypes];
      updatedList.splice(index + 1, 0, copiedAnswerWithNewId);

      setSelectedAnswerTypes(updatedList);
    }
  };
  return { onCopy };
};
