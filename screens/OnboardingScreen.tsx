import React, {useState} from 'react'
import { Dimensions, SafeAreaView, ScrollView, View, TouchableOpacity, Text, NativeSyntheticEvent,
  NativeScrollEvent } from 'react-native'
import { OnboardingComponent } from '../components/OnboardingComponent'
import { useNavigation } from '@react-navigation/native'
import { onboardingContent } from '../constants/onboardingContent'
import { StackNavigationProp } from '@react-navigation/stack/';
import { UserStackParams } from '../navigation/User';




const OnboardingSwipeScreen = () => {

  const navigation = useNavigation<StackNavigationProp<UserStackParams>>()
  
  const boardButton = (text: string, slideIndex: number) => (
		<TouchableOpacity
    className={`w-full px-4 absolute bottom-2 flex flex-row ${slideIndex === 0 ? "justify-start" : slideIndex === 2 ? "justify-end" : ""}`} 
      onPress={() => navigation.replace("Home")}
      ><View className="bg-[#00CCBB] flex justify-center items-center rounded-lg">
			  <Text className="text-lg px-4 py-1 text-white">{text}</Text>
      </View>
		</TouchableOpacity>
	)

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event : NativeSyntheticEvent<NativeScrollEvent>) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          setSliderPage(event)
        }}
      >
        {onboardingContent.map((item, index) => (
          <OnboardingComponent
            key={index} 
            imagePosition={item.position}
            header={item.header}
            bodyArr={item.bodyArr}/>
        ))}

      </ScrollView>
      <View className="absolute bottom-20 left-0 right-0 justify-center mr-3 items-center flex-row">
        {Array.from(Array(3).keys()).map((key, index) => (
          <View key={index} className={`h-3 w-3 ml-3 rounded-full ${pageIndex === index ? "bg-[#00CCBB]" : "bg-white"}`} />
        ))}
      </View>
      {pageIndex === 0 ? boardButton("Skip", pageIndex) : pageIndex === 2 ? boardButton("Done", pageIndex) : null}
  </SafeAreaView>
  )
}

export default OnboardingSwipeScreen
