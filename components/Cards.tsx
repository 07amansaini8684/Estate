import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";

interface Props {
    item: Models.Document
onPress?: () => void

}

import icons from "@/constants/icons";
import {Models} from "react-native-appwrite";
 export const FeaturedCard = ({ item : {
     image, rating, name, address, price
 }, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
            <Image source={image ? {uri: image} : images.splash } className="w-full h-full rounded-xl" resizeMode="cover" />
            <Image source={images.cardGradient} className="size-full rounded-xl absolute bottom-0 right-0 opacity-85" />
            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5 ">
                <Image source={icons.star} className="size-3" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-1">{rating || "2.4"}</Text>
            </View>
            <View className="flex flex-col items-start absolute bottom-3 inset-x-5 ">
                <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>{name || "Apartment"}</Text>
                <Text className="text-base font-rubik text-white" numberOfLines={1}>{address || "22 W 15th St, New York"}</Text>
                <View className="flex flex-row items-center justify-between w-full" >
                    <Text className="text-sm font-rubik-bold text-white">
                        $ {price || "$2,500"}
                    </Text>
                    <View className="flex flex-row items-center justify-center">
                        <Image source={icons.heart} className="size-5" />
                        <Text className="text-xs font-rubik text-white ml-1">2</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

 export const Card = ({item: {image, rating, name, address, price}, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 w-full mt-4 px-3 py-4 rounded-md bg-white shadow-lg shadow-black-100/70 relative">
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 py-1.5 rounded-full ">
                <Image source={icons.star} className="size-2" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-0.56">{rating || "2.4"}</Text>
            </View>
            <View>
                <Image source={image ? {uri: image} : images.newYork} className="w-full h-40 rounded-md"/>
            </View>
            <View className="flex flex-col items-start mt-3">
                <Text className="text-base font-rubik-bold text-black-300" >{name || "Cozy Studio"}</Text>
                <Text className="text-xs font-rubik text-black-200" >{address || "Unknown"}</Text>
                <View className="flex flex-row items-center justify-between w-full mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300">
                        $ {price || "$1,500"}
                    </Text>
                    <View className="flex flex-row items-center justify-center">
                        <Image source={icons.heart} className="w-5 h-5 mt-2  " tintColor="#0061FF" />
                        <Text className="text-xs font-rubik text-black-300 ml-1">2</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

 // cotrobat - https://www.gsocorganizations.dev/organization/international-catrobat-association/
// Plone -https://www.gsocorganizations.dev/organization/plone-foundation/