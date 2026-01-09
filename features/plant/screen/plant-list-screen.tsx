import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { useState } from "react";
import { SelectPlantList } from "../sections/select-plant-list";

export const PlantListScreen = () => {
  const [search, setSearch] = useState("");
  const { data, loading } = useRealTimeFetch("plantList", []);

  return (
    <MainLayout>
      <Header
        title="Plant Database"
        description="Choose a plant to plant in the greenhouse"
      >
        <FormInput
          iconName="Search"
          placeholder="Search for a plant"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
      </Header>
      <SelectPlantList data={data} loading={loading} />
    </MainLayout>
  );
};
