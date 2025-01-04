import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import {EXPO_PUBLIC_APPWRITE_PROJECT_ID} from "@env";


import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
const index = () => {

  return (
    <SafeAreaView className="bg-whtie -h-full">
        <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center">
                    <Image source={images.avatar} className="size-10 roundede-lg" resizeMode="contain" />
                    <View className="flex flex-col items-start  ml-2 justify-center" >
                        <Text className="text-xs font-rubik text-black-100">Dattebayo</Text>
                        <Text className="">Blue | Moon</Text>
                    </View>
                </View>
                <Image source={icons.bell} className="size-6" resizeMode="contain" />
            </View>
        <Search/>
        <View className="mt-5">
            <View className="flex flex-row items-center justify-between px-2">
                <Text className="text-black-300 font-rubik text-lg">Featured</Text>
                <Link href="/explore" className="text-primary-300 font-rubik text-sm">See All</Link>
            </View>
        </View>
       <View className="flex flex-row gap-5 mt-5">
           <FeaturedCard />
           <FeaturedCard />
           <FeaturedCard />
       </View>
            <View className="mt-5">
                <View className="flex flex-row items-center justify-between px-2">
                    <Text className="text-black-300 font-rubik text-lg">Recommended</Text>
                    <TouchableOpacity>
                        <Link href="/explore" className="text-primary-300 font-rubik text-sm">See All</Link>
                    </TouchableOpacity>
                </View>
            </View>
            <Filters/>
            <View className="flex flex-row gap-5 mt-5">
                <Card />
                <Card />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default index