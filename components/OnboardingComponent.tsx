import React from 'react'
import { Dimensions, Image, PixelRatio, Text, View } from 'react-native'

export type OnboardingCompProps = {
  imagePosition: string;
  header: string;
  bodyArr: string[];
}

export const OnboardingComponent = ({imagePosition, header, bodyArr} : OnboardingCompProps) => {
  // const { width, height } = Dimensions.get('window')
  const assetsObject : {[key:string] : any} = {
    first: require("../assets/cart_basket.jpg"),
    second: require("../assets/delivery_truck.jpg"),
    third: require("../assets/hour_glass.jpg"),
    }
  return (
    <>
      <View className={`relative w-screen h-full flex justify-center items-center`}>
        <View className={`w-screen h-full`}>
          <Image source={assetsObject[imagePosition]} 
            className="w-full h-full" />
        </View>
        <View className="absolute w-full h-full bg-black/40 flex items-center z-10"></View>
        <View className="flex justify-center items-center my-4 absolute z-20 px-4">
          <Text className="text-3xl font-bold mb-3 text-white mb-6">{header}</Text>
          <View className="flex-col gap-4">
            {bodyArr.map((item, index) => (
              <Text key={index} className={`text-2xl text-white text-center`}><Text className='font-semibold text-white'>{`${item.split(":")[0]}`}</Text>{item.split(":")[1]}</Text>
            ))}
          </View>
        </View>
      </View>  
    </>
  )
}

// export default OnboardingComponent
