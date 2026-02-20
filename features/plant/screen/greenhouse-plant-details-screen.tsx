import { HeaderToo } from "@/components/header-too";
import { Image } from "@/components/image";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { useRealTimeDocument } from "@/hooks/use-realtime-document";
import { deletePlant, getPlant } from "@/services/firebase/firestore/plants";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Controller } from "../sections/controller";
import { EnvironmentalStatus } from "../sections/environmental-status";
import { PlantInfoSection } from "../sections/plant-info";

export const GreenhousePlantDetailsScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const { adminId } = useAuth();
  const { data: plant, loading } = useFetch(
    () =>
      adminId
        ? getPlant(id as string, adminId as string)
        : Promise.resolve(null),
    [adminId],
  );
  const { data: sensor } = useRealTimeDocument(
    adminId ? `users/${adminId}/sensors/latest` : null,
  );
  const { data: fan } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/fanDevice` : null,
  );
  const { data: light } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/lightDevice` : null,
  );
  const { data: sprinkler1 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler1` : null,
  );
  const { data: sprinkler2 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler2` : null,
  );
  const { data: sprinkler3 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler3` : null,
  );
  if (loading || !adminId || !plant) return <Loader />;
  const confirmDelete = () => {
    if (!plant?.id) return;

    Alert.alert(
      "Delete Plant",
      `Are you sure you want to delete "${plant.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              router.back();
              const result = await deletePlant(
                plant.id as string,
                adminId as string,
              );
              if (!result.isSuccess)
                return Alert.alert("Error", result.message);
            } catch (e: any) {
              Alert.alert("Error", e?.message || "Failed to delete plant");
            }
          },
        },
      ],
    );
  };
  return (
    <MainLayout>
      <HeaderToo
        title="Plant Details"
        description="View your plant information"
        showBackButton
        rightIcon="Trash"
        onRightIconPress={confirmDelete}
      />
      <ScreenContainer scrollable>
        <Image
          uri={plant?.[0]?.plant?.imageUrl || plant?.imageUrl}
          styles="mb-6 rounded-xl"
          height={250}
        />
        <PlantInfoSection
          styles="mb-6"
          plant={{
            ...plant,
          }}
        />
        {sensor || fan || light || sprinkler1 || sprinkler2 || sprinkler3 ? (
          <>
            <EnvironmentalStatus />
            <Controller />
          </>
        ) : null}
      </ScreenContainer>
    </MainLayout>
  );
};
