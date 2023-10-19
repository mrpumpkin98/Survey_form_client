import { useHandleCheckboxClick } from "../src/hooks/useHandleCheckboxClick";

describe("useHandleCheckboxClick", () => {
  it("handleCheckboxClick 함수가 올바르게 동작해야 합니다", () => {
    const checkboxStates = [false, true, false];

    const setCheckboxStates = jest.fn();

    const { handleCheckboxClick } = useHandleCheckboxClick(
      checkboxStates,
      setCheckboxStates
    );

    handleCheckboxClick(0);

    const updatedCheckboxStates = [true, true, false];
    expect(setCheckboxStates).toHaveBeenCalledWith(updatedCheckboxStates);
  });
});
