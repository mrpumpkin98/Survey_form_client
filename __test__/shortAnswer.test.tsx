import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ShortAnswer, {
  ShortAnswerProps,
} from "../src/components/surveyType/ShortAnswer";

// 모의 데이터 생성
const sampleProps: ShortAnswerProps = {
  id: "1", // 원하는 ID 값
};

describe("ShortAnswer Component", () => {
  it("renders the question correctly", () => {
    const { getByPlaceholderText } = render(<ShortAnswer {...sampleProps} />);

    const questionInput = getByPlaceholderText("질문");
    const sampleQuestion = "What is your name?";
    fireEvent.changeText(questionInput, sampleQuestion);

    expect(questionInput.props.value).toBe(sampleQuestion);
  });

  it("toggles essential star correctly", async () => {
    const { getByTestId } = render(<ShortAnswer {...sampleProps} />);

    // Essential 스타 버튼을 찾아 클릭하고 확인
    const essentialStar = getByTestId("essential-star"); // 이에 해당하는 testID를 컴포넌트에서 설정하세요.
    fireEvent.press(essentialStar);
    await waitFor(() => expect(essentialStar).toBeTruthy());

    fireEvent.press(essentialStar);
    await waitFor(() => expect(essentialStar).toBeFalsy());
  });

  it("copies the question text correctly", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ShortAnswer {...sampleProps} />
    );

    // 복사 버튼을 찾아 클릭
    const copyButton = getByTestId("copy-button"); // 이에 해당하는 testID를 컴포넌트에서 설정하세요.
    fireEvent.press(copyButton);

    // 복사 버튼을 누른 후, '질문' 입력 필드에 복사된 텍스트가 있는지 확인
    const questionInput = getByPlaceholderText("질문");
    await waitFor(() =>
      expect(questionInput.props.value).toBe("What is your name?")
    );
  });
});
