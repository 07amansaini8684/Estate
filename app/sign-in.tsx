import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import google from "@/assets/icons/google.png";
const SignIn = () => {

    const handleLoginfn = () => {}
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className='w-full h-4/6' resizeMode="contain" />
                <View className="px-7">
                    <Text className="text-base text-center uppercase font-rubik-semibold text-black-100 ">
                        Welcome to ReState
                    </Text>
                    <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get You Cloaser to {"\n"}
                        <Text className="text-primary-300">
                            Your Ideal Home
                        </Text>
                    </Text>
                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                        Login to ReState with Google
                    </Text>
                    <TouchableOpacity onPress={handleLoginfn} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
                        <View className="flex items-center flex-row justify-center gap-2 ">
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">Continue With Google</Text>
                            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" /></View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        {/*
         package name - com.blue.estate
         Google auth URI - https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/67781428001b0f0b23a2

         */}
        </SafeAreaView>
    )
}
export default SignIn

