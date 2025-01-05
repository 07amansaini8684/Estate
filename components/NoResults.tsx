import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import images from "@/constants/images";

const NoResults = () => {
    return (
        <View className="flex-1 items-center justify-center bg-gray-100 px-6 py-8">
            {/* Image Section */}
            <Image
                source={images.noResult}
                className="w-11/12 h-72"
                resizeMode="contain"
            />

            {/* Main Message */}
            <Text className="text-2xl font-bold text-gray-800 mt-6">
                No Properties Found
            </Text>

            {/* Subtext */}
            <Text className="text-base text-gray-600 text-center mt-3">
                Sorry, we couldn't find any properties matching your search.
            </Text>

            {/* Suggestion */}
            <Text className="text-sm text-gray-500 text-center mt-2 mb-6">
                Try adjusting your filters or explore other locations.
            </Text>

            {/* Call-to-Action Button */}
            <TouchableOpacity className="bg-indigo-500 px-6 py-3 rounded-full">
                <Text className="text-white text-base font-semibold">
                    Browse Featured Properties
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default NoResults;
