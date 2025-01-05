import {View, Text, Image, ImageSourcePropType} from 'react-native'
import React from 'react'

interface EnumButtonProps {
    title: string | null
    icon: ImageSourcePropType
    style: string | null
}
const EnumButton = ({title, icon, style} : EnumButtonProps) => {
    return (
        <View className="flex flex-row items-center gap-2 ">
            <View className="flex flex-row items-center justify-center bg-primary-300/5 rounded-full p-4">
                <Image source={icon} className="w-6 h-6" />
            </View>
            <Text className="text-black font-rubik-semibold">{title}</Text>
        </View>
    )
}
export default EnumButton
