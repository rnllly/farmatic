import { useRealtimeDatabase } from "@/hooks/use-real-time-databases";
import { Text, View } from "react-native";
import { EnvironmentalStatusCard } from "../components/environmental-status-card";
import { getReadableLightLevel } from "../utils";

export const EnvironmentalStatus = () => {
  const { data } = useRealtimeDatabase(`sensor`);

  const lightLevel = getReadableLightLevel(+data?.lightLevel);

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Environmental Status
      </Text>
      <View className="gap-2">
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Soil Moisture 1"
            value={`${data?.soilMoisture1 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
          <EnvironmentalStatusCard
            title="Soil Moisture 2"
            value={`${data?.soilMoisture2 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
          <EnvironmentalStatusCard
            title="Soil Moisture 3"
            value={`${data?.soilMoisture3 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
        </View>
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Temperature"
            value={`${data?.temperature ?? 0}°C`}
            icon="Thermometer"
            iconColor="red"
          />
          <EnvironmentalStatusCard
            title="Humidity"
            value={`${data?.humidity ?? 0}%`}
            icon="Droplet"
            iconColor="blue"
          />
        </View>
      </View>
    </View>
  );
};
