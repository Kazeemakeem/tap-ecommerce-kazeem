import React from "react";
import { render, screen, fireEvent } from "../../test.utils";
import TouchableIcon from "../TouchableIcon";

describe("TouchableIcon", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <TouchableIcon touchableIconHandler={() => {}} />
    );

    expect(getByTestId("trash-icon")).toBeDefined();
  });

  it("calls the touchableIconHandler when pressed", () => {
    const mockHandler = jest.fn();
    const { getByTestId } = render(
      <TouchableIcon touchableIconHandler={mockHandler} />
    );

    fireEvent.press(getByTestId("trash-icon"));

    expect(mockHandler).toHaveBeenCalled();
  });
});
