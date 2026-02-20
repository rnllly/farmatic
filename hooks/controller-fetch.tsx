import { db } from "@/services/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const getControls = async (adminId: string, controllerName: string) => {
  try {
    const plantRef = doc(db, "users/", adminId, "/controllers", controllerName);
    const plantDoc = await getDoc(plantRef);
    if (!plantDoc.exists()) return null;

    return {
      id: plantDoc.id,
      ...plantDoc.data(),
    };
  } catch (error: any) {
    console.error("Error getting controller:", error);
    return null;
  }
};
