import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";

const Property = () => {
  const { id } = useLocalSearchParams();

  const {
    data: property,
    loading,
    refetch,
  } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id as string, // Force TypeScript to treat it as a string
    },
  });

  useEffect(() => {
    refetch({
      id: id as string,
    });
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex items-center justify-center">
        <ActivityIndicator className="text-primary-300" size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Image
          source={{ uri: property?.image }}
          className="w-full h-[50vh]"
          resizeMode="cover"
        />
        <View className="px-5">
          <View className="mt-6 flex flex-col gap-4">
            <Text className="font-rubikBold text-2xl text-black-300">
              {property?.name}
            </Text>

            <View className="flex flex-row gap-2.5">
              <View className="py-1.5 px-2.5 bg-primary-300/5 rounded-full">
                <Text className="font-rubikMedium uppercase text-xs text-primary-300">
                  {property?.type}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-1.5">
                <Image source={icons.star} className="size-5" />
                <Text className="font-rubikMedium text-sm text-black-200">
                  {property?.rating} ({property?.reviews.length} reviews)
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center gap-6">
              
            </View>

            <Text className="font-rubik-medium text-lg text-black-300">
              {property?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
