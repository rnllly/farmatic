import { Button } from "@/components/form/button";
import { HeaderToo } from "@/components/header-too";
import { Image } from "@/components/image";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { choosePlant, selectPlant } from "@/services/firebase/firestore/plants";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { PlantInfoSection } from "../sections/plant-info";

export const PlantDetailsScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const { adminId, user } = useAuth();
  const { data: plant, loading } = useFetch(
    () => selectPlant(id as string),
    [],
  );
  const { data: Data } = useRealTimeFetch("plantList", []);
  if (loading || !plant) return <Loader />;

  const handlePress = async () => {
    if (!plant?.id || !user || !adminId) return;
    try {
      const result = await choosePlant(user.id as string, plant.id as string);
      if (!result.isSuccess) return Alert.alert("Error", result.message);
      router.push("/(root)/(main)/home");
    } catch (e: any) {
      Alert.alert("Error", e?.message || "Failed to choose plant");
    }
  };

  return (
    <MainLayout>
      <HeaderToo
        title={plant?.name || "Loading..."}
        description={`Add ${plant.name} to the greenhouse?`}
        showBackButton
      />
      <ScreenContainer scrollable>
        <Image
          uri={Data?.[0]?.analysis?.imageUrl || plant?.imageUrl}
          styles="mb-6 rounded-xl"
          height={250}
        />
        <PlantInfoSection
          plant={{
            ...plant,
          }}
        />
        <Button label="Choose plant" onPress={handlePress} />
      </ScreenContainer>
    </MainLayout>
  );
};
