import {View, Text, Image, TouchableOpacity, ImageSourcePropType, Alert} from 'react-native'
import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from "react-native"

import icons from "@/constants/icons"
import images from "@/constants/images"
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/golabal-provider";
import {logout} from "@/lib/appwrite";

interface SettingItemsProps {
    icon: ImageSourcePropType
    title: string
    OnPress?: () => void
    textStyle?: string
    ShowArrow?: boolean
}

const SettingsItem = ({icon, title, OnPress, textStyle, ShowArrow = true}: SettingItemsProps) => (
    <TouchableOpacity className="flex flex-row items-center justify-between py-2 p-4">
        <View className="flex flex-row items-center gap-3 ">
            <Image source={icon} className="size-6" />
            <Text className={`text - lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        {ShowArrow && (
            <Image source={icons.rightArrow} className="w-4 h-4" />
        )}
    </TouchableOpacity>
)

const Profile = () => {

    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        try {
            const result = await logout();

            if (result) {
                Alert.alert("Logout Success", "You have been logged out");
                refetch(); // Refetch user data after logout
            } else {
                Alert.alert("Logout Failed", "An error occurred while trying to logout");
            }
        } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Logout Failed", "An unexpected error occurred");
        }
    };


    const [name, setName] = React.useState<string | string[]>("User");

    useEffect(() => {
        const handleName = () => {
            if (user?.name) {
                setName(user?.name.split(" "));
            } else {
                setName("dattabyo");
            }
        };
        handleName();
    }, [user?.name]);


    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="text-xl font-rubik-bold">
                        Profile

                    </Text>
                    <Image source={icons.bell} className="w-4 h-4" resizeMode="contain" />
                </View>
                <View className="flex-row justify-center flex mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image source={user?.avatar ? {uri : user?.avatar} : images.realAvatar} className="size-44 relative rounded-full" />
                        <TouchableOpacity className="absolute bottom-11 right-2" >
                            <Image source={icons.edit} className="size-6" />
                        </TouchableOpacity>
                        <Text className="font-rubik-semibold mt-2 text-xl text-black">
                            {name[0]} {" "}
                            <Text className="font-rubik-regular  text-gray-500 text-md">
                                | {name[1] || ""}
                            </Text>
                        </Text>

                    </View>
                </View>
                <View className="flex flex-col mt-10">
                    <SettingsItem icon={icons.calendar} title="My Bookings" OnPress={() => {}} />
                    <SettingsItem icon={icons.wallet} title="Payments" />

                </View>
                <View className="flex flex-col mt-5 border-t pt-5  border-primary-200" >
                    {settings.slice(2).map((item,index)=>(
                        <SettingsItem key={index} icon={item.icon} title={item.title}  />
                    ))}
                </View>
                <View className="flex flex-col mt-5 border-t border-primary-200">
                    <SettingsItem icon={icons.logout} title="Logout" OnPress={handleLogout} textStyle="text-danger" ShowArrow={false} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
