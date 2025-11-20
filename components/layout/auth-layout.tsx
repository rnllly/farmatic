import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import clsx from "clsx";
import { SafeAreaView } from "react-native-safe-area-context";

export const AuthLayout = ({
  children,
  title,
  description,
  fontSize = "text-5xl",
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  fontSize?: string;
}) => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 relative">
            <Image
              source={require("@/assets/images/image-background.png")}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />

            <View className="flex-1 justify-end">
              <View className="items-center justify-center flex-1 flex-shrink pb-8">
                <Image
                  source={require("@/assets/images/logo.png")}
                  className="w-20 h-20"
                />
                <Text className="text-white text-5xl font-bold mb-2">
                  Farmatic
                </Text>
                <Text className="text-white text-sm">
                  Smart Plant Care System
                </Text>
              </View>

              <View className="bg-white w-full p-8 pt-8 pb-8 rounded-tr-[5rem]">
                <View className="items-center mb-6">
                  <Text className={clsx("font-bold pb-2", fontSize)}>
                    {title}
                  </Text>
                  <Text className="text-gray">{description}</Text>
                </View>
                {children}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
