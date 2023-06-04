import React from "react";
import { TouchableOpacity } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";

type handlerType = {
  touchableIconHandler: () => void;
};

const TouchableIcon = ({ touchableIconHandler }: handlerType) => {
  return (
    <TouchableOpacity testID="trash-icon" onPress={touchableIconHandler}>
      <TrashIcon size={24} color="gray" />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
