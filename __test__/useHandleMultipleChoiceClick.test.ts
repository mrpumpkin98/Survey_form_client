import { useHandleMultipleChoiceClick } from "../src/hooks/useHandleMultipleChoiceClick";

describe("useHandleMultipleChoiceClick", () => {
  it("handleMultipleChoiceClick 함수가 올바르게 동작해야 합니다", () => {
    const checkboxStates = {
      checkbox1: false,
      checkbox2: true,
      checkbox3: false,
    };

    const setCheckboxStates = jest.fn();

    const { handleMultipleChoiceClick } = useHandleMultipleChoiceClick(
      checkboxStates,
      setCheckboxStates
    );

    handleMultipleChoiceClick("checkbox1");

    const updatedCheckboxStates = {
      checkbox1: true,
      checkbox2: false,
      checkbox3: false,
    };
    expect(setCheckboxStates).toHaveBeenCalledWith(updatedCheckboxStates);
  });
});
