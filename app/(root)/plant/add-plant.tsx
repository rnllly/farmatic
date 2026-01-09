import { PlantListScreen } from "@/features/plant/screen/plant-list-screen";

const AddPlant = () => {
  return <PlantListScreen />;
};

export default AddPlant;

// import { AddPlantScreen } from "@/features/plant";
// import { useLocalSearchParams } from "expo-router";

// const AddPlant = () => {
//   const {
//     selectedPlantId,
//     selectedPlantName,
//     selectedPlantImage,
//     selectedPlantDescription,
//     selectedPlantMoistureMin,
//     selectedPlantMoistureMax,
//     selectedPlantTemperatureMin,
//     selectedPlantTemperatureMax,
//     selectedPlantHumidityMin,
//     selectedPlantHumidityMax,
//   } = useLocalSearchParams();

//   const moistureRange =
//     selectedPlantMoistureMin && selectedPlantMoistureMax
//       ? {
//           min: parseFloat(selectedPlantMoistureMin as string),
//           max: parseFloat(selectedPlantMoistureMax as string),
//         }
//       : undefined;

//   const temperatureRange =
//     selectedPlantTemperatureMin && selectedPlantTemperatureMax
//       ? {
//           min: parseFloat(selectedPlantTemperatureMin as string),
//           max: parseFloat(selectedPlantTemperatureMax as string),
//         }
//       : undefined;

//   const humidityRange =
//     selectedPlantHumidityMin && selectedPlantHumidityMax
//       ? {
//           min: parseFloat(selectedPlantHumidityMin as string),
//           max: parseFloat(selectedPlantHumidityMax as string),
//         }
//       : undefined;

//   return (
//     <AddPlantScreen
//       selectedPlantId={selectedPlantId as string}
//       selectedPlantName={selectedPlantName as string}
//       selectedPlantImage={selectedPlantImage as string}
//       selectedPlantDescription={selectedPlantDescription as string}
//       selectedPlantMoistureRange={moistureRange}
//       selectedPlantTemperatureRange={temperatureRange}
//       selectedPlantHumidityRange={humidityRange}
//     />
//   );
// };

// export default AddPlant;
