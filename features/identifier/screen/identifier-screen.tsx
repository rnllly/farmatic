import { HeaderToo } from "@/components/header-too";
import { MainLayout } from "@/components/layout/main-layout";
import { Loader } from "@/components/loader";
import { useAuth } from "@/hooks/use-auth";
import { analyzePlant } from "@/services/firebase/ai";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { HowItWorks } from "../sections/how-it-works";
import { IdentifyMethod } from "../sections/identify-method";

export const IdentifierScreen = () => {
  const router = useRouter();
  const { adminId, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = async (mode: "camera" | "gallery") => {
    try {
      const image = mode === "camera" ? await takePhoto() : await pickImage();
      if (!image) return;
      setIsLoading(true);

      const type = getImageType(image.uri);

      await analyzePlant({
        analyzerId: user?.id as string,
        adminId: adminId as string,
        imageUri: image.uri,
        imageType: type,
      });
      setIsLoading(false);
      router.push("/(root)/(main)/analysis");
    } catch (err) {
      console.error(err);
      const message = (err as any)?.message || (err as any)?.code;
      if (message === "PERMISSION_DENIED") {
        Alert.alert(
          "Permission denied",
          mode === "camera"
            ? "Camera permission is required to take a photo. Please enable it in Settings."
            : "Photo library permission is required to select an image. Please enable it in Settings.",
        );
        return;
      }
      Alert.alert("Error", "Could not analyze the image.");
    }
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Loader message="Analyzing plant..." />
      ) : (
        <>
          <HeaderToo
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
        </>
      )}
    </MainLayout>
  );
};
