import React from 'react'
import { Text, View } from 'react-native'
import { formatCurrency } from "react-native-format-currency";


const CurrencyBar = ({ description, value, emphasis }) => {

	const [valueFormattedWithSymbol] = formatCurrency({ amount: value, code: "USD"})

  return (
    <View className="flex-row justify-between mt-2">
			<Text className={`${emphasis ? "font-extrabold" : "font-bold"} ${emphasis ? "text-xl" : "text-sm"} ${emphasis ? "" : "text-gray-400"}`}>{description}</Text>
			<Text className={`${emphasis ? "font-extrabold" : "font-bold"} ${emphasis ? "text-xl" : "text-sm"} ${emphasis ? "" : "text-gray-400"}`}>
        {valueFormattedWithSymbol}
      </Text>
    </View>
  )
}
export default CurrencyBar
