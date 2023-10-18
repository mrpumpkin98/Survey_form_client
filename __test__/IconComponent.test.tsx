import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { RecoilRoot } from "recoil";
import IconComponent from "../src/components/layout/IconComponent";

describe("IconComponent", () => {
  it("should toggle preview correctly", () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <IconComponent />
      </RecoilRoot>
    );

    const eyeIconPressable = getByTestId("eyeIconPressable");

    fireEvent.press(eyeIconPressable);

    expect(eyeIconPressable).toBeTruthy();
  });
});
