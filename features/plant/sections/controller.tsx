import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { ControllerCard } from "@/features/plant/components/controller-card";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeDocument } from "@/hooks/use-realtime-document";
import { formatDate } from "@/utils/date";
import clsx from "clsx";
import { Text, View } from "react-native";

interface Props {
  styles?: string;
}

export const Controller = ({ styles }: Props) => {
  const { adminId } = useAuth();
  const { data: fan, loading } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/fanDevice` : null,
  );
  const { data: light } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/lightDevice` : null,
  );
  const { data: sprinkler1 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler1` : null,
  );
  const { data: sprinkler2 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler2` : null,
  );
  const { data: sprinkler3 } = useRealTimeDocument(
    adminId ? `users/${adminId}/controllers/sprinkler3` : null,
  );

  if (!fan || !light || !sprinkler1 || !sprinkler2 || !sprinkler3)
    return (
      <EmptyState
        icon="Folder"
        title="No Greenhouse Yet"
        description="Your environmental status will appear here."
      />
    );

  if (loading || !adminId) return <Loader />;

  return (
    <View className={clsx(styles, "mb-6")}>
      <Text className="text-2xl font-bold text-gray-800 mb-4">Controller</Text>
      <ControllerCard
        title="Fan"
        icon="Fan"
        value={fan?.fan ? "On" : "Off"}
        colorScheme={{
          iconBgClass: "bg-green-100",
          iconColor: "#059669",
          switchOnColor: "#10b981",
          statusBgClass: "bg-green-50",
          statusTextClass: "text-green-700",
        }}
      />
      <ControllerCard
        title="Light"
        icon="Lightbulb"
        value={light?.light ? "On" : "Off"}
        colorScheme={{
          iconBgClass: "bg-yellow-100",
          iconColor: "#f59e0b",
          switchOnColor: "#f59e0b",
          statusBgClass: "bg-yellow-50",
          statusTextClass: "text-yellow-700",
        }}
      />
      <ControllerCard
        title="Sprinkler 1"
        icon="Droplet"
        value={formatDate(sprinkler1?.openedAt)}
        colorScheme={{
          iconBgClass: "bg-blue-100",
          iconColor: "#60a5fa",
          switchOnColor: "#60a5fa",
          statusBgClass: "bg-blue-50",
          statusTextClass: "text-blue-700",
        }}
      />
      <ControllerCard
        title="Sprinkler 2"
        icon="Droplet"
        value={formatDate(sprinkler2?.openedAt)}
        colorScheme={{
          iconBgClass: "bg-blue-100",
          iconColor: "#60a5fa",
          switchOnColor: "#60a5fa",
          statusBgClass: "bg-blue-50",
          statusTextClass: "text-blue-700",
        }}
      />
      <ControllerCard
        title="Sprinkler 3"
        icon="Droplet"
        value={formatDate(sprinkler3?.openedAt)}
        colorScheme={{
          iconBgClass: "bg-blue-100",
          iconColor: "#60a5fa",
          switchOnColor: "#60a5fa",
          statusBgClass: "bg-blue-50",
          statusTextClass: "text-blue-700",
        }}
      />
    </View>
  );
};
