import { useAnswerOptionUpdater } from "../src/hooks/useAnswerOptionUpdater";

const mockUseRecoilState = jest.fn();
jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: (state: any) => mockUseRecoilState(state),
}));

describe("useAnswerOptionUpdater", () => {
  it("updateAnswerOption 함수가 올바르게 작동해야 합니다", () => {
    const id = 123;
    const answerOptions = [{ text: "Option 1" }, { text: "Option 2" }];
    const setAnswerOptions = jest.fn();
    const selectedAnswerTypes = [
      { id: 123, text: "Answer Type 1", answerOptions: {} },
      { id: 456, text: "Answer Type 2", answerOptions: {} },
    ];
    const setSelectedAnswerTypes = jest.fn();

    mockUseRecoilState.mockReturnValue([
      selectedAnswerTypes,
      setSelectedAnswerTypes,
    ]);

    const { updateAnswerOption } = useAnswerOptionUpdater(
      id,
      answerOptions,
      setAnswerOptions,
      selectedAnswerTypes
    );

    updateAnswerOption(0, "Updated Option 1");

    expect(setAnswerOptions).toHaveBeenCalledWith([
      { text: "Updated Option 1" },
      { text: "Option 2" },
    ]);

    expect(setSelectedAnswerTypes).toHaveBeenCalledWith([
      {
        id: 123,
        text: "Answer Type 1",
        answerOptions: { 0: "Updated Option 1" },
      },
      { id: 456, text: "Answer Type 2", answerOptions: {} },
    ]);
  });
});
