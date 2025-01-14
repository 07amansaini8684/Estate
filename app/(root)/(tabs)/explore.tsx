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
import SkeletonCard from "@/components/Skeleton";



const Explore = () => {


    const params = useLocalSearchParams<{query?:string; filter?:string}>()



    const {data: properties, loading, refetch} = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
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
            limit:20,
        })
    }, [params.filter, params.query]);
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
                        <View className="flex flex-row items-center justify-start mt-5">
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="w-5 h-5" />
                            </TouchableOpacity>
                            <Text className="text-base font-rubik-bold text-black-300 ml-2">
                                Search for Your Ideal Home
                            </Text>
                            <Image source={icons.bell} className="w-4 h-4 ml-auto" />
                        </View>
                        <Search />
                        <View className="mt-5">
                            <Filters />
                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                                Found {properties?.length} properties
                            </Text>
                        </View>
                    </View>
                }
            />

        </SafeAreaView>
    )
}

export default Explore