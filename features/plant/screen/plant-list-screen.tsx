import { HeaderToo } from "@/components/header-too";
import { MainLayout } from "@/components/layout/main-layout";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { SelectPlantList } from "../sections/select-plant-list";

export const PlantListScreen = () => {
  const { data, loading } = useRealTimeFetch("plantList", []);

  return (
    <MainLayout>
      <HeaderToo
        title="Plant Database"
        description="Choose a plant to plant in the greenhouse"
        showBackButton
      ></HeaderToo>
      <SelectPlantList data={data} loading={loading} />
    </MainLayout>
  );
};
