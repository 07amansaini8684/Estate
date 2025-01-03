import { View, Text } from 'react-native'
import React from 'react'
import {Link} from "expo-router";


const index = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }}>
      <Text>index</Text>
      <Text className=" text-green-700 text-2xl font-rubik-extrabold">New piece of text</Text>
        <Link  href="/sign-in">SignIN </Link>
        <Link  href="/explore">Explore </Link>
        <Link  href="/profile">Profile </Link>
    </View>
  )
}

export default index