import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/";
import { UserStackParams } from "../navigation/User";
import colors from "../constants/colors";

export type CategoryCardsProps = {
  _id: string;
  name: string;
  description: string;
};
const CategoryCard = ({ _id, name, description }: CategoryCardsProps) => {
  const navigation = useNavigation<StackNavigationProp<UserStackParams>>();

  const handlePress = () => {
    //@ts-ignore
    navigation.navigate("Products", { _id, name });
  };

  return (
    <TouchableOpacity
      testID="category-card"
      onPress={handlePress}
      className={`bg-white w-40 h-52 flex space-y-2 justify-center items-center border-b-2 border-r-2 border-gray-300 rounded-xl mt-4`}
    >
      <View className={`rounded-2xl border-b-2 border-gray-300 shadow-sm`}>
        <Text className="text-xs px-4 py-2">{name}</Text>
      </View>
      <View className={`h-24 w-24 bg-[#fab005] p-4 rounded-full`}>
        {/* Category image should be here if available on the endpoint */}
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
