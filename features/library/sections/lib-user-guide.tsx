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
};

type Props = {
  visible: boolean;
  onClose: () => void;
  pages?: GuidePage[];
};

const DEFAULT_PAGES: GuidePage[] = [
  {
    title: "Library ",
    content:
      "This is the plant library presented to you by Perenual API. You can find plant information here by clicking the plants. Use the search bar if you need to find something specific.\n\nNote: The search engine is pretty slow so bear with it.",
  },
  {
    title: "Favorites",
    content:
      "If you click on a plant, you can bookmark it if you want to keep it in mind. Just click the bookmark icon on the top-right of the header",
    image: require("@/assets/images/bookmark-guide.png"),
  },
];

export const LibUserGuide = ({
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
