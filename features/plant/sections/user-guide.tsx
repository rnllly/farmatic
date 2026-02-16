import { UserModal } from "@/components/user-modal";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export type GuidePage = {
  title: string;
  content: string;
  image?: ImageSourcePropType;
  plants?: {
    name: string;
    image: ImageSourcePropType;
  }[];
};

type Props = {
  visible: boolean;
  onClose: () => void;
  pages?: GuidePage[];
};

const DEFAULT_PAGES: GuidePage[] = [
  {
    title: "Greenhouse Overview",
    content:
      "This dashboard allows you to monitor soil moisture and device activity inside your greenhouse.",
  },
  {
    title: "Setting up the Greenhouse",
    content:
      "First and foremost, you need to plant the seeds in the greenhouse first before you add one in here! \n" +
      "\nWe recommend using this as a layout for planting your seeds.",
    image: require("@/assets/images/plot.png"),
  },
  {
    title: "Adding a Plant",
    content:
      "Click the plus button in the top right to add the plant you planted in the greenhouse.\n\nAvailable Plants:\n",

    plants: [
      {
        name: "Bell Pepper",
        image: require("@/assets/images/bell-pepper.jpg"),
      },
      {
        name: "Chili Pepper",
        image: require("@/assets/images/chili-pepper.jpg"),
      },
      { name: "Sunflower", image: require("@/assets/images/sunflower.jpg") },
      { name: "Eggplant", image: require("@/assets/images/eggplant.webp") },
      { name: "Papaya", image: require("@/assets/images/papaya.jpg") },
      { name: "Lettuce", image: require("@/assets/images/lettuce.webp") },
      {
        name: "Bitter Gourd",
        image: require("@/assets/images/bitter-gourd.jpg"),
      },
      { name: "Okra", image: require("@/assets/images/okra.webp") },
      { name: "Tomato", image: require("@/assets/images/tomato.jpg") },
    ],
  },
  {
    title: "Monitoring",
    content:
      "Once you have set everything up, you can now click the plant and see the sensors and actuators working!",
  },
];

export const UserGuide = ({
  visible,
  onClose,
  pages = DEFAULT_PAGES,
}: Props) => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!visible) setPageIndex(0);
  }, [visible]);

  const isLast = pageIndex === pages.length - 1;
  const isFirst = pageIndex === 0;

  const next = () => {
    if (isLast) onClose();
    else setPageIndex((p) => p + 1);
  };

  const prev = () => {
    if (!isFirst) setPageIndex((p) => p - 1);
  };

  const page = pages[pageIndex];

  return (
    <UserModal isOpen={visible}>
      <View className="w-full max-h-[90%] bg-white rounded-2xl p-5">
        <Pressable onPress={onClose} className="absolute right-6 top-4 z-10">
          <Text className="text-gray-400 text-lg font-bold">✕</Text>
        </Pressable>
        <Text className="text-xl font-bold mb-3">{page.title}</Text>

        <ScrollView className="mb-5" showsVerticalScrollIndicator={false}>
          <Text className="text-l text-gray-600 leading-5">{page.content}</Text>
          {page.plants && (
            <View className="flex-row flex-wrap gap-3 mt-4">
              {page.plants.map((plant) => (
                <View key={plant.name} className="items-center w-[30%]">
                  <Image
                    source={plant.image}
                    className="w-16 h-16 rounded-lg"
                    resizeMode="contain"
                  />
                  <Text className="text-xs text-center mt-1">{plant.name}</Text>
                </View>
              ))}
            </View>
          )}
          {page.image && (
            <Image
              source={page.image}
              className="w-full h-96 rounded-xl"
              resizeMode="contain"
            />
          )}
        </ScrollView>

        <View className="flex-row justify-between items-center">
          {!isFirst ? (
            <Pressable className="p-2" onPress={prev}>
              <Text className="text-gray-500">Previous</Text>
            </Pressable>
          ) : (
            <View />
          )}

          <Pressable
            className="bg-green-600 py-2 px-5 rounded-xl"
            onPress={next}
          >
            <Text className="text-white font-bold">
              {isLast ? "Close" : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </UserModal>
  );
};
