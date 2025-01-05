import React from 'react';
import { View } from 'react-native';


export const SkeletonCard = ({index} : {index: number}) => {
    return (
        <View>
        <View className="flex-1 w-full mt-4 px-3 py-4 rounded-md bg-white shadow-lg shadow-black-100/70">
            {/* Skeleton Rating */}
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 py-1.5 rounded-full">
                <View className="w-4 h-4 rounded-full bg-gray-300 animate-pulse" />
                <View className="w-8 h-3 ml-1 bg-gray-300 rounded animate-pulse" />
            </View>

            {/* Skeleton Image */}
            <View className="w-full h-40 bg-gray-300 rounded-md animate-pulse" />

            {/* Skeleton Content */}
            <View className="flex flex-col items-start mt-3 space-y-2">
                <View className="w-3/4 h-5 bg-gray-300 rounded animate-pulse" />
                <View className="w-1/2 h-4 bg-gray-300 rounded animate-pulse" />

                <View className="flex flex-row items-center justify-between w-full mt-2">
                    <View className="w-1/3 h-5 bg-gray-300 rounded animate-pulse" />
                    <View className="flex flex-row items-center space-x-2">
                        <View className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
                        <View className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
                    </View>
                </View>
            </View>
        </View>
        </View>
    );
};

export default SkeletonCard;
