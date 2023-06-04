import { Text, TouchableOpacity, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";
import { useAppDispatch } from "../redux/storeHooks";
import { removeFromCart, updateCartTotal } from "../redux/slices/cartSlice";
import colors from "../constants/colors";
import { formatCurrency } from "react-native-format-currency";
import TouchableIcon from "./TouchableIcon";

type CartItemProps = {
  _id: string;
  price: number;
  name: string;
  quantity: number;
};
const CartItemBar = ({ _id, price, name, quantity }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: price,
    code: "USD",
  });
  const [totalValueFormattedWithSymbol] = formatCurrency({
    amount: Number(price * quantity),
    code: "USD",
  });

  const trashHandler = () => {
    dispatch(removeFromCart(_id));
    dispatch(updateCartTotal(-quantity));
  };
  return (
    <View
      testID="cart-item-bar"
      className="flex-row items-center justify-between text-gray-500 font-bold"
    >
      <View className={`bg-[#fab005] h-10 w-10 rounded`}>
        {/* Image goes here */}
      </View>
      <View className="">
        <Text className="text-sm text-left font-semibold">{name}</Text>
        <Text className="text-sm text-left">
          {valueFormattedWithSymbol} X {quantity} ={" "}
          <Text className="font-extrabold">
            {" "}
            {totalValueFormattedWithSymbol}
          </Text>
        </Text>
      </View>
      <TouchableIcon touchableIconHandler={trashHandler} />
    </View>
  );
};

export default CartItemBar;
