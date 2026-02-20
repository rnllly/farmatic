import { db } from "@/services/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const getSensors = async (adminId: string) => {
  try {
    const plantRef = doc(db, "users/", adminId, "/sensors", "/latest");
    const plantDoc = await getDoc(plantRef);
    if (!plantDoc.exists()) return null;

    return {
      id: plantDoc.id,
      ...plantDoc.data(),
    };
  } catch (error: any) {
    console.error("Error getting sensor:", error);
    return null;
  }
};
