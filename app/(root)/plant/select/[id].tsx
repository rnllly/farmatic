import { PlantDetailsScreen } from "@/features/plant/screen/plant-details-screen";
import { useLocalSearchParams } from "expo-router";

const PlantDetails = () => {
  const { id } = useLocalSearchParams();
  return <PlantDetailsScreen id={id as string} />;
};

export default PlantDetails;
