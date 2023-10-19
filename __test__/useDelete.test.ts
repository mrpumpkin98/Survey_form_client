import { useDelete } from "../src/hooks/useDelete";

const mockUseRecoilState = jest.fn();
jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: (state: any) => mockUseRecoilState(state),
}));

describe("useDelete", () => {
  it("선택된 답변 유형에서 항목을 삭제해야 합니다", () => {
    const idToDelete = 123;
    const selectedAnswerTypes = [
      { id: 123, text: "옵션 1" },
      { id: 456, text: "옵션 2" },
    ];

    const setSelectedAnswerTypesMock = jest.fn();

    mockUseRecoilState.mockReturnValue([
      selectedAnswerTypes,
      setSelectedAnswerTypesMock,
    ]);

    const { onDelete } = useDelete(idToDelete, selectedAnswerTypes);

    onDelete();

    expect(setSelectedAnswerTypesMock).toHaveBeenCalledWith([
      { id: 456, text: "옵션 2" },
    ]);
  });
});
