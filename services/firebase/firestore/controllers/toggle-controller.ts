import { ref, set } from "firebase/database";
import { realTimeDB } from "../../config";

export const toggleController = async (
  type: "fan" | "light" | "sprinkler",
  currentValue?: boolean
) => {
  try {
    const path = `controllers/${type}`;

    const controllerRef = ref(realTimeDB, path);

    await set(controllerRef, !currentValue);
  } catch (err) {
    console.error("Error toggling controller:", err);
  }
};
