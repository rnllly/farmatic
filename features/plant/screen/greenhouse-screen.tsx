import { HeaderIcon } from "@/components/header-icon";
import { HeaderToo } from "@/components/header-too";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { EnvironmentalStatus } from "../sections/environmental-status";
import { PlantList } from "../sections/plant-list";
import { UserGuide } from "../sections/user-guide";

export const GreenhouseScreen = () => {
  const { adminId } = useAuth();
  const { data, loading } = useRealTimeFetch(`users/${adminId}/selectedPlant`);
  const [isGuideOpen, setGuideOpen] = useState(false);
  const openGuide = () => {
    setGuideOpen(true);
  };

  return (
    <MainLayout>
      <HeaderToo
        title="Farmatic"
        description="Greenhouse Dashboard"
        rightIcon="CircleQuestionMark"
        onRightIconPress={openGuide}
      />
      <UserGuide visible={isGuideOpen} onClose={() => setGuideOpen(false)} />
      <ScreenContainer>
        <EnvironmentalStatus />
      </ScreenContainer>
      <ScreenContainer>
        <View className="flex-row items-center justify-between">
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
