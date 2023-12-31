import { useRecoilState } from "recoil";
import { selectedAnswerTypesState } from "../store";

export const useDelete = (id: any, selectedAnswerTypes: any) => {
  const [, setSelectedAnswerTypes] = useRecoilState(selectedAnswerTypesState);

  const onDelete = () => {
    const updatedSelectedAnswerTypes = selectedAnswerTypes.filter(
      (answerType: any) => answerType.id !== id
    );
    setSelectedAnswerTypes(updatedSelectedAnswerTypes);
  };

  return { onDelete };
};
