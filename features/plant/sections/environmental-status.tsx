import { EmptyState } from "@/components/empty-state";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeDocument } from "@/hooks/use-realtime-document";
import { Text, View } from "react-native";
import { EnvironmentalStatusCard } from "../components/environmental-status-card";

export const EnvironmentalStatus = () => {
  const { adminId } = useAuth();
  const { data: sensor } = useRealTimeDocument(
    adminId ? `users/${adminId}/sensors/latest` : null,
  );
  if (!sensor)
    return (
      <EmptyState
        title="No Greenhouse Yet"
        description="Your environmental status will appear here."
      />
    );

  return (
    <View className="mb-6 ">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Environmental Status
      </Text>
      <View className="gap-2">
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Soil Moisture 1"
            value={`${sensor?.soilMoisture1 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
          <EnvironmentalStatusCard
            title="Soil Moisture 2"
            value={`${sensor?.soilMoisture2 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
          <EnvironmentalStatusCard
            title="Soil Moisture 3"
            value={`${sensor?.soilMoisture3 ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
        </View>
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Temperature"
            value={`${sensor?.temperature ?? 0}°C`}
            icon="Thermometer"
            iconColor="red"
          />
          <EnvironmentalStatusCard
            title="Humidity"
            value={`${sensor?.humidity ?? 0}%`}
            icon="Droplet"
            iconColor="blue"
          />
        </View>
      </View>
    </View>
  );
};
