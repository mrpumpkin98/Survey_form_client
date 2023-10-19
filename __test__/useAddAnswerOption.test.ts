import { useAddAnswerOption } from "../src/hooks/useAddAnswerOption";

const setAnswerOptions = jest.fn();

describe("useAddAnswerOption", () => {
  it("새로운 답변 옵션을 추가해야 합니다", () => {
    const initialAnswerOptions = [{ text: "옵션 1" }, { text: "옵션 2" }];

    const { addAnswerOption } = useAddAnswerOption(
      setAnswerOptions,
      initialAnswerOptions
    );

    addAnswerOption();

    expect(setAnswerOptions).toHaveBeenCalledWith([
      { text: "옵션 1" },
      { text: "옵션 2" },
      { text: "" },
    ]);
  });
});
