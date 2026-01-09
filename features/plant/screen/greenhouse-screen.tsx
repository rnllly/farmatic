import { Header } from "@/components/header";
import { HeaderIcon } from "@/components/header-icon";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import { where } from "firebase/firestore";
import { Text, View } from "react-native";
import { PlantList } from "../sections/plant-list";

export const GreenhouseScreen = () => {
  const { data, loading } = useRealTimeFetch("plantList", [
    where("isChosen", "==", true),
  ]);

  return (
    <MainLayout>
      <Header title="Farmatic" description="Greenhouse Dashboard" />
      <ScreenContainer>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
          {data?.length === 0 ? (
            <HeaderIcon
              icon="Plus"
              onPress={() => router.push("/plant/add-plant")}
            />
          ) : null}
        </View>
        <PlantList data={data} loading={loading} />
      </ScreenContainer>
    </MainLayout>
  );
};
