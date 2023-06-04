import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

type ActionButtonProps = {
  text: string;
  onPressHandler: () => void;
  isWide: boolean;
};

export const ActionButton = ({
  text,
  onPressHandler,
  isWide,
}: ActionButtonProps) => (
  <TouchableOpacity
    testID="action-button"
    className={`bg-[#fab005] rounded-lg ${
      isWide ? "w-full h-[42px]" : "w-28 h-10"
    } flex-row justify-center items-center`}
    onPress={onPressHandler}
  >
    <Text
      testID="action-button-text"
      className={`px-4 py-2 text-sm font-bold ${
        isWide ? "text-xl font-bold" : ""
      }`}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

