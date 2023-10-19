import { useToggleEssential } from "../src/hooks/useToggleEssential";

const mockUseRecoilState = jest.fn();
jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: (state: any) => mockUseRecoilState(state),
}));

describe("useToggleEssential", () => {
  it("필수 토글이 올바르게 동작해야 합니다", () => {
    const id = 123;
    const selectedAnswerTypes = [
      {
        id: 123,
        essential: false,
      },
      {
        id: 456,
        essential: true,
      },
    ];

    const setSelectedAnswerTypes = jest.fn();
    mockUseRecoilState.mockReturnValue([
      selectedAnswerTypes,
      setSelectedAnswerTypes,
    ]);

    const { toggleEssential } = useToggleEssential(id, selectedAnswerTypes);

    toggleEssential();

    expect(setSelectedAnswerTypes).toHaveBeenCalledWith([
      {
        id: 123,
        essential: true,
      },
      {
        id: 456,
        essential: true,
      },
    ]);
  });
});
