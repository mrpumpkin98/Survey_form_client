import { useRecoilState } from "recoil";
import generateRandomId from "../libraries/utils";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useSubjectiveCopy = (
  id: any,
  selectedAnswerTypes: any,
  question: any
) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const onCopy = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          return {
            ...answerType,
            inputValue: question,
          };
        }
        return answerType;
      }
    );

    const copiedAnswer = selectedAnswerTypes.find(
      (answerType: any) => answerType.id === id
    );
    if (copiedAnswer) {
      const newId = generateRandomId();
      const copiedAnswerWithNewId = {
        ...copiedAnswer,
        id: newId,
        inputValue: question,
      };

      // 새로운 항목을 원하는 위치에 추가
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
