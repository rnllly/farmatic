import { HeaderIcon } from "@/components/header-icon";
import { HeaderToo } from "@/components/header-too";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import { where } from "firebase/firestore";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { PlantList } from "../sections/plant-list";
import { UserGuide } from "../sections/user-guide";

export const GreenhouseScreen = () => {
  const { data, loading } = useRealTimeFetch("plantList", [
    where("isChosen", "==", true),
  ]);
  const [isGuideOpen, setGuideOpen] = useState(false);
  const confirmDelete = () => {
    setGuideOpen(true);
  };

  return (
    <MainLayout>
      <HeaderToo
        title="Farmatic"
        description="Greenhouse Dashboard"
        rightIcon="CircleQuestionMark"
        onRightIconPress={confirmDelete}
      />
      <ScreenContainer>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
          {data?.length === 0 ? (
            <HeaderIcon
              icon="Plus"
              onPress={() => router.push("/plant/add-plant")}
            />
          ) : null}
          <UserGuide
            visible={isGuideOpen}
            onClose={() => setGuideOpen(false)}
          />
        </View>
        <PlantList data={data} loading={loading} />
      </ScreenContainer>
    </MainLayout>
  );
};
