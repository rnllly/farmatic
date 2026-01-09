import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { formatFirestoreDate } from "@/utils/date";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

interface AnalysisItem {
  id: string;
  createdAt: any;
  analysis: {
    commoName: string;
    scientificName: string;
    description: string;
    healthStatus: string;
    careGuide: string;
    imageUrl: string;
  };
}

interface Props {
  data: AnalysisItem[];
  loading: boolean;
}

const getHealthStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "healthy":
      return "bg-green-500";
    case "sick":
      return "bg-red-500";
    case "growing":
      return "bg-blue-500";
    case "needs attention":
      return "bg-orange-500";
    case "dead":
      return "bg-gray-500";
    case "harvestable":
      return "bg-purple-500";
    default:
      return "bg-gray-300";
  }
};

const getHealthStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case "healthy":
      return "Healthy";
    case "sick":
      return "Sick";
    case "growing":
      return "Growing";
    case "needs attention":
      return "Needs Attention";
    case "dead":
      return "Dead";
    case "harvestable":
      return "Harvestable";
    default:
      return "Unknown";
  }
};
export const AnalysisHistory = ({ data, loading }: Props) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading analysis history...</Text>
      </View>
    );
  }
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Analysis History Yet"
        description="Your analysis history will appear here. Start by analyzing your first plant."
        buttonText="Analyze Plants"
        onPress={() => router.push("/home")}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) =>
        item.id?.toString() || `analysis-${Math.random()}`
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
      overScrollMode="never"
      renderItem={({ item, index }) => (
        <View
          className={`bg-white rounded-2xl shadow-md overflow-hidden ${index < data.length - 1 ? "mb-6" : ""}`}
        >
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <View className="flex-row items-center gap-2">
              <Icon name="Calendar" size={16} color="#6B7280" />
              <Text className="text-gray-600 font-medium">
                {formatFirestoreDate(item.createdAt)}
              </Text>
            </View>
            <View
              className={`px-2 py-1 rounded-full ${getHealthStatusColor(
                item.analysis.healthStatus
              )}`}
            >
              <Text className="text-white text-sm font-semibold">
                {getHealthStatusText(item.analysis.healthStatus)}
              </Text>
            </View>
          </View>
          <View className="p-4">
            <View className="flex-row gap-4 mb-4">
              <Image
                uri={item.analysis.imageUrl}
                height={200}
                styles="rounded-xl"
              />
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Icon name="Info" size={20} color="#6B7280" />
                <Text className="text-lg font-semibold text-gray-700">
                  Care Guide
                </Text>
              </View>
              <Text className="text-sm text-gray-600 leading-5">
                {item.analysis.careGuide}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};
