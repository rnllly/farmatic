import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config";

export const getPlant = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);
    const plantDoc = await getDoc(plantRef);

    if (!plantDoc.exists()) return null;

    return {
      id: plantDoc.id,
      ...plantDoc.data(),
    };
  } catch (error: any) {
    console.error("Error getting plant by ID:", error);
    return null;
  }
};

export const choosePlant = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);

    await updateDoc(plantRef, {
      isChosen: true,
      plantedAt: serverTimestamp(),
    });
    return { isSuccess: true, message: "Plant planted successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
