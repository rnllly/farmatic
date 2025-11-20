import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { analyzePlant } from "@/services/firebase/ai";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import { Alert, ToastAndroid, View } from "react-native";
import { HowItWorks } from "../sections/how-it-works";
import { IdentifyMethod } from "../sections/identify-method";

export const IdentifierScreen = () => {
  const router = useRouter();
  const { adminId, user } = useAuth();
  const { data: analysisData } = useRealTimeFetch("analyses", [
    where("adminId", "==", adminId || ""),
    orderBy("createdAt", "desc"),
    limit(1),
  ]);
  const handleSelectImage = async (mode: "camera" | "gallery") => {
    try {
      const image = mode === "camera" ? await takePhoto() : await pickImage();
      if (!image) return;

      const type = getImageType(image.uri);

      await analyzePlant({
        analyzerId: user?.id as string,
        adminId: adminId as string,
        imageUri: image.uri,
        imageType: type,
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    } finally {
      ToastAndroid.show("Plant analyzed successfully", ToastAndroid.SHORT);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Plant Identifier"
        description="Identify plants by taking a photo or uploading an image"
      />
      <View className="p-6">
        <IdentifyMethod
          onTakePicture={() => handleSelectImage("camera")}
          onUploadImage={() => handleSelectImage("gallery")}
        />
        <HowItWorks />
      </View>
    </MainLayout>
  );
};
