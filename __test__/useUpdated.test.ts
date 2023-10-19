import { useUpdated } from "../src/hooks/useUpdated";

const mockUseRecoilState = jest.fn();
jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: (state: any) => mockUseRecoilState(state),
}));

describe("useUpdated", () => {
  it("업데이트 함수가 올바르게 동작해야 합니다", () => {
    const id = 123;
    const setQuestion = jest.fn();
    const selectedAnswerTypes = [
      {
        id: 123,
        inputValue: "기존 질문",
      },
      {
        id: 456,
        inputValue: "다른 질문",
      },
    ];

    const setSelectedAnswerTypes = jest.fn();
    mockUseRecoilState.mockReturnValue([
      selectedAnswerTypes,
      setSelectedAnswerTypes,
    ]);

    const { updated } = useUpdated(id, setQuestion, selectedAnswerTypes);

    updated("새로운 질문");

    expect(setQuestion).toHaveBeenCalledWith("새로운 질문");
    expect(setSelectedAnswerTypes).toHaveBeenCalledWith([
      {
        id: 123,
        inputValue: "새로운 질문",
      },
      {
        id: 456,
        inputValue: "다른 질문",
      },
    ]);
  });
});
