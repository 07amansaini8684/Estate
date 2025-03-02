import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {usePathname, useLocalSearchParams, router} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {
const path = usePathname();
const params = useLocalSearchParams<{query?:string}>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) =>router.setParams({query:text}),500)

    const handleSearch = (text:string) =>{
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="py-4">
            <View className="border border-zinc-700 flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100  mt-5 py-2">
                <View className="flex-1 flex flex-row items-center justify-start z-50">
                    <Image source={icons.search} className="size-5" resizeMode="contain" />
                    <TextInput value={search} onChangeText={handleSearch} placeholder="Search for a property"  className="text-black-300 font-rubik flex-1 text-base ml-2" />
                </View>
                <TouchableOpacity >
                    <Image source={icons.filter} className="size-5" resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Search
