import { useRecoilState } from "recoil";
import { AnswerTypeItem } from "../components/surveyType/ShortAnswer";
import { selectedAnswerTypesState } from "../store";

export const useDeleteAnswerOption = (
  id: any,
  selectedAnswerTypes: any,
  answerOptions: any,
  setAnswerOptions: any
) => {
  const [, setSelectedAnswerTypes] = useRecoilState<AnswerTypeItem[]>(
    selectedAnswerTypesState
  );

  const deleteAnswerOption = (index: any) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);

    const updatedSelectedAnswerTypes = selectedAnswerTypes.map(
      (answerType: any) => {
        if (answerType.id === id) {
          const updatedAnswerOptions = { ...answerType.answerOptions };
          delete updatedAnswerOptions[index]; // 해당 옵션 삭제
          return {
            ...answerType,
            answerOptions: updatedAnswerOptions,
          };
        }
        return answerType;
      }
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  return { deleteAnswerOption };
};
