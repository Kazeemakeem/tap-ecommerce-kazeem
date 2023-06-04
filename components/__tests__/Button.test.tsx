import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ActionButton } from "../Button";
import "@testing-library/jest-native/extend-expect";

jest.mock(
  "react-native/Libraries/Components/Touchable/TouchableOpacity.js",
  () => {
    const { View } = require("react-native");
    const MockTouchable = (props: any) => {
      return <View {...props} />;
    };

    MockTouchable.displayName = "TouchableOpacity";

    return MockTouchable;
  }
);

describe("ActionButton", () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const onPressHandler = jest.fn();

  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ActionButton
          text="Press me"
          onPressHandler={onPressHandler}
          isWide={false}
        />
      </Provider>
    );
    const actionButton = getByTestId("action-button");
    expect(actionButton).toBeOnTheScreen();
    fireEvent.press(actionButton);
    expect(onPressHandler).toHaveBeenCalledTimes(1);
  });
});
