import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import EnumButton from "@/components/EnumButton";

const Property = () => {
    const {id} =useLocalSearchParams()
    return (
        <SafeAreaView className="h-full bg-white">
           <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
               <View className="w-full relative bg-green-500">
                   <View className="flex flex-row absolute w-full top-10 mx-2 z-10 justify-between items-center  px-6 py-2">
                       <View>
                           <Image source={icons.backArrow} className="w-6 h-6" />
                       </View>
                       <View className="flex flex-row items-center gap-4">
                           <Image source={icons.heart} className="w-8 h-8 text-black" />
                           <Image source={icons.send} className="w-8 h-8" />
                       </View>
                   </View>
                   <Image  source={images.japan}  className="w-full h-96" />
               </View>
               <View className="px-8 mt-10 py- w-full">
                  <View className="flex flex-col items-start justify-between">
                        <Text className="text-2xl font-rubik-bold">Japanese House</Text>
                      <View className="px-2 flex flex-row items-center gap-5 mt-4">
                          <View className=" bg-primary-300/20 flex items-center rounded-full py-2 px-6">
                              <Text className="text-primary-300 font-rubik-semibold">
                                  Type
                              </Text>
                          </View>
                          <View className=" flex flex-row gap-2 p-2">
                              <Image source={icons.star} className="w-6 h-6" />
                              <Text className="font-rubik-medium">

                                  Rating 4
                              </Text>
                              <Text className="text-black-200 font-rubik-medium">
                                  {"(200)"}
                              </Text>
                          </View>
                      </View>
                  </View>
               </View>
               <View className="w-full px-5 mt-5 py-2">
                <View className="flex flex-row px-4 mb-10 border border-b-2 border-black-200 gap-8 ">
                    <EnumButton title="8 Beds" icon={icons.bed} style="flex"/>
                    <EnumButton title="3 bath" icon={icons.bath} style="flex"/>
                    <EnumButton title="2000 sqft" icon={icons.area} style="flex"/>
                </View>

               </View>

           </ScrollView>
        </SafeAreaView>
    )
}
    export default Property
