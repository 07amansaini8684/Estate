import {View, Text, SafeAreaView, Image, TouchableOpacity, Button, ActivityIndicator} from 'react-native'
import React, {useEffect} from 'react'
import {Link, router, useLocalSearchParams} from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { FlatList } from 'react-native';
import { useGlobalContext } from '@/lib/golabal-provider';
import seed from "@/lib/seed";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import NoResults from "@/components/NoResults";
import SkeletonLoader, {SkeletonCard} from "@/components/Skeleton";



const index = () => {

    const {user} = useGlobalContext()
    // console.log("user", user)

    const params = useLocalSearchParams<{query?:string; filter?:string}>()

   const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({fn: getLatestProperties})

    const {data: properties, loading, refetch} = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
    skip: true,
    })

    const handleCardPress = (id: string) => {
        // console.log("card pressed", id)
        router.push(`/properties/${id}`)
    }

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        })
    }, [params.filter, params.query]);

    // const loading = true;
    return (
        <SafeAreaView className="bg-whtie -h-full">
            {/*<Button title = "Seed" onPress={seed} />*/}
            <FlatList
                data={properties}
                renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName='pb-32'
                columnWrapperClassName='flex gap-5 px-5'
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                loading ? (
                    <View>
                        {Array.from({length: 4}).map((_, index) => (
                            <SkeletonCard key={index} index={index}/> // Pass index to each skeleton
                        ))}
                    </View>
                ) : (
                   <NoResults />
                )
                }

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
                            {latestPropertiesLoading ? <ActivityIndicator size="large" className="text-primary-300" /> : !latestProperties || latestProperties.length === 0 ?<NoResults /> : (
                                <FlatList
                                    data={latestProperties}
                                    renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                                    keyExtractor={(item) => item.$id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName='flex gap-5 mt-5'
                                    bounces={false}

                                />
                            ) }

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