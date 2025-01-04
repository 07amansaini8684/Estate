import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filters = () => {

    const params = useLocalSearchParams<{filter?:string}>();
    const [selectedCategory, setSelectedCategory] = React.useState(params.filter || "All");

    const handleCategory = (category:string) =>{
        if(category === selectedCategory){
            setSelectedCategory("All");
            router.setParams({filter:"All"});
            return;
        }else{
            setSelectedCategory(category);
            router.setParams({filter:category});
        }
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
            {categories.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleCategory(item.category)} className={`px-3 py-1.5 rounded-full ${selectedCategory === item.category ? "bg-primary-300" : "bg-accent-100"} mr-3`}>
                    <Text className={`text-sm font-rubik-medium ${selectedCategory === item.category ? "text-white" : "text-black-300"}`}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
export default Filters
