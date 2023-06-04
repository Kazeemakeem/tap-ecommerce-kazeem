// import { render, fireEvent, screen } from "@testing-library/react-native";
import { render, screen, fireEvent } from "../../test.utils";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import CartItemBar from "../CartItemBar";
import "@testing-library/jest-native/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TouchableIcon from "../TouchableIcon";

// jest.mock(
//   "react-native/Libraries/Components/Touchable/TouchableOpacity.js",
//   () => {
//     const { View } = require("react-native");
//     const MockTouchable = (props: any) => {
//       return <View {...props} />;
//     };

//     MockTouchable.displayName = "TouchableOpacity";

//     return MockTouchable;
//   }
// );

describe("CartItemBar", () => {
  const item = {
    _id: "123",
    price: 9.99,
    name: "Test Item",
    quantity: 2,
  };

  it("renders correctly", () => {
    render(<CartItemBar {...item} />);
    expect(screen.getByText(item.name)).toBeOnTheScreen();
    expect(screen.getByText("$9.99 X 2 = $19.98")).toBeOnTheScreen();
    expect(screen.getByTestId("trash-icon")).toBeOnTheScreen();
  });

  // it("calls remove from cart and update cart total on trash press", () => {
  //   const { getByTestId } = render(<CartItemBar {...item} />);
  //   const trashButton = getByTestId("trash-icon");
  //   expect(trashButton).toBeOnTheScreen();
  //   fireEvent.press(trashButton);
  //   expect(removeHandler).toHaveBeenCalledTimes(1);
  // });
  test("renders trashIcon correctly", () => {
    const { getByTestId } = render(<CartItemBar {...item} />);
    const trashIcon = getByTestId("trash-icon");
    expect(trashIcon).toBeOnTheScreen();
  });
});
