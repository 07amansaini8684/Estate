import {View, Text, SafeAreaView, Image} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import {EXPO_PUBLIC_APPWRITE_PROJECT_ID} from "@env";


import images from "@/constants/images";
const index = () => {

  return (
    <SafeAreaView className="bg-whtie -h-full">
        <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center">
                    <Image source={images.avatar} className="size-10 roundede-lg" resizeMode="contain" />
                    <View className="flex flex-col items-center items-start ml-2 justify-center" >
                        <Text className="text-xs font-rubik text-black-100">Dattebayo</Text>
                        <Text className="">Blue | Moon</Text>
                    </View>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default index