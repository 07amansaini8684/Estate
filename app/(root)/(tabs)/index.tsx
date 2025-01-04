import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from "expo-router";



import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { FlatList } from 'react-native';
import { useGlobalContext } from '@/lib/golabal-provider';
const index = () => {

    const {user} = useGlobalContext()
    console.log("user", user)

    return (
        <SafeAreaView className="bg-whtie -h-full">
            <FlatList
                data={[1, 2,3,4]}
                renderItem={({ item }) => <Card/>}
                keyExtractor={(item) => item.toString()}
                numColumns={2}
                contentContainerClassName='pb-32'
                columnWrapperClassName='flex gap-5 px-5'
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row items-center">
                                <View className="bg-primary-300/70 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-0.5">
                                <Image source={user?.avatar ? {uri : user?.avatar} : images.realAvatar} className="w-full h-full rounded-full" resizeMode="contain" />
                                </View>
                                <View className="flex flex-col items-start  ml-2 justify-center" >
                                    <Text className="text-xs font-rubik text-black-100">Dattebayo</Text>
                                    <Text className="">{user?.name || "looker"}</Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className="size-6" resizeMode="contain" />
                        </View>
                        <Search />
                        <View className="mt-5">
                            <View className="flex flex-row items-center justify-between px-2">
                                <Text className="text-black-300 font-rubik-semibold text-lg">Featured</Text>
                                <TouchableOpacity>
                                <Link href="/explore" className="text-primary-300 font-rubik text-sm">See All</Link>
                                </TouchableOpacity>
                            </View>
                            <FlatList 
                            data={[1, 2, 3, 4]}
                            renderItem={({ item }) => <FeaturedCard/>}
                            keyExtractor={(item) => item.toString()}
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName='flex gap-5 mt-5'
                            bounces={false}

                            />
                        </View>
                        
                        <View className="mt-5">
                            <View className="flex flex-row items-center justify-between px-2">
                                <Text className="text-black-300 font-rubik-semibold text-lg">Recommended</Text>
                                <TouchableOpacity>
                                    <Link href="/explore" className="text-primary-300 font-rubik text-sm">See All</Link>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Filters />
                     
                    </View>
                }
            />

        </SafeAreaView>
    )
}

export default index