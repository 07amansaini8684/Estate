import { useGlobalContext } from "@/lib/golabal-provider";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Redirect, Slot } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

const ANIMATION_CONFIG = {
    opacityDuration: 500,
    heightDuration: 1000,
    maxHeight: 100,
    bounceDistance: 10,
};

const LoadingDots = ({ opacity } : {opacity: any}) => (
    <View className="flex-row justify-center items-center h-5">
        {[0, 1, 2].map((_, i) => (
            <Animated.View
                key={i}
                className="w-2 h-2 mx-1 rounded-full bg-blue-500"
                style={{
                    opacity: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                    }),
                    transform: [{
                        translateY: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, i % 2 === 0 ? -ANIMATION_CONFIG.bounceDistance : ANIMATION_CONFIG.bounceDistance],
                        }),
                    }],
                }}
            />
        ))}
    </View>
);

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    const buildingHeight = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const runAnimations = () => {
        buildingHeight.setValue(0);
        opacity.setValue(0);

        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: ANIMATION_CONFIG.opacityDuration,
                useNativeDriver: true,
            }),
            Animated.timing(buildingHeight, {
                toValue: 1,
                duration: ANIMATION_CONFIG.heightDuration,
                useNativeDriver: false,
            }),
        ]).start();
    };

    useEffect(() => {
        if (loading) {
            runAnimations();
        }
    }, [loading]);

    if (loading) {
        return (
            <View className="flex-1 bg-gray-50 justify-center items-center">
                <View className="items-center">
                    <Animated.View
                        className="w-20 bg-blue-500 rounded-lg overflow-hidden mb-5"
                        style={{
                            height: buildingHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, ANIMATION_CONFIG.maxHeight],
                            }),
                        }}
                    >
                        <View className="flex-1 flex-row flex-wrap p-2.5 justify-around">
                            <View className="w-5 h-5 bg-white/90 m-1 rounded" />
                            <View className="w-5 h-5 bg-white/90 m-1 rounded" />
                            <View className="w-5 h-5 bg-white/90 m-1 rounded" />
                            <View className="w-5 h-5 bg-white/90 m-1 rounded" />
                        </View>
                    </Animated.View>
                    <Animated.Text
                        className="text-lg text-gray-800 font-semibold mb-5"
                        style={{ opacity }}
                        accessibilityLabel="Loading text indicating progress"
                    >
                        Finding Your Dream Home...
                    </Animated.Text>
                    <LoadingDots opacity={opacity} />
                </View>
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href="/sign-in" />;
    }

    return <Slot />;
}
