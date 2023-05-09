import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryCard from '../components/CategoryCard';
import useAxios from '../util/axios';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'


export const HomeScreen = () => {
  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/category',
    headers: null,
    body: null,
});
const [data, setData] = useState([]);
const [searchResult, setSearchResult] = useState([]);
const [ searchTerm, setSearchTerm ] = useState('')
const [ showSearchResult, setShowSearchResult ] = useState(false)

useEffect(() => {
    if (response !== null) {
      //@ts-ignore
        setData(response.content.data);
    }
}, [response]);


const handleSubmit = () => {
  const searchedItemsAndCategories = data.filter(item => {
    //@ts-ignore
      return item['name'].toLowerCase().includes(searchTerm.substring()) || item['description'].toLowerCase().includes(searchTerm.substring())
  })
  setSearchResult(searchedItemsAndCategories)
  setShowSearchResult(true)
}

  return (
    <SafeAreaView className='mt-4'>
      <View className="flex-row space-x-2 pb-2 px-3">
        <View className="bg-gray-200 flex-row flex-1 space-x-2 px-3 py-2 rounded-lg">
          <View className="flex justify-center items-center">
            <MagnifyingGlassIcon size={20} color="gray"/>
          </View>
          <TextInput 
          onChangeText={value => {
            setShowSearchResult(false)
            setSearchTerm(value.toLocaleLowerCase())
          }}
          onSubmitEditing={handleSubmit}
          className="flex-1" placeholder="Search" keyboardType='default'/>
        </View>
      </View>
        {!showSearchResult ?
        <ScrollView>
          <View className='flex-row flex-wrap justify-between px-3 space-y-2'>
            { response && data.map(item => (
              //@ts-ignore
              <CategoryCard key={item._id} _id={item._id} name={item.name} description={item.description}/>
            ))}
            {error && <Text className='text-xl font-bold'>{error}</Text>}
            {loading && <Text className='text-xl font-bold'>Loading...</Text>}
          </View>
        </ScrollView> : searchResult.length ?
        <ScrollView>
          <View className='flex-row flex-wrap justify-between px-3'>
              { searchResult.map(item => (
              //@ts-ignore
              <CategoryCard key={item._id} _id={item._id} name={item.name} description={item.description}/>
            ))}
          </View>
        </ScrollView> : 
        <View className="flex-row items-center justify-center bg-white">
          <Text className="py-72 px-3 text-xl font-bold">No match for your search</Text>
        </View>}      
    </SafeAreaView>
  )
}