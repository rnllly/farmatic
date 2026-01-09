import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { PlantCard } from "../components/plant-card";

interface Props {
  data: any[];
  loading: boolean;
}
export const PlantList = ({ data, loading }: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Plant Yet"
        description="Your plants will appear here."
      />
    );
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{
        gap: 12,
        padding: 20,
      }}
      renderItem={({ item }) => (
        <PlantCard
          image={item.imageUrl}
          name={item.name}
          onPress={() =>
            router.push({
              pathname: "/plant/greenhouse/[id]",
              params: { id: item.id },
            })
          }
        />
      )}
    />
  );
};
