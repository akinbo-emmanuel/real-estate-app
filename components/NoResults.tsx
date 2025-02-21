import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-11/2 h-80"
        resizeMode="contain"
      />
      <Text className="text-black-300 text-2xl font-rubikBold mt-5">
        No Results
      </Text>
      <Text className="text-black-100 text-base font-rubik mt-2">
        We couldn't find any results
      </Text>
    </View>
  );
};

export default NoResults;
