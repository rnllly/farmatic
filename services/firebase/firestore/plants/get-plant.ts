import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../config";

export const getPlant = async (plantId: string, adminId: string) => {
  try {
    const plantRef = doc(db, "users/", adminId, "/selectedPlant", plantId);
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

export const selectPlant = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);
    const plantDoc = await getDoc(plantRef);
    if (!plantDoc.exists()) return null;

    return {
      id: plantDoc.id,
      ...plantDoc.data(),
    };
  } catch (error: any) {
    console.error("Error selecting plant by ID:", error);
    return null;
  }
};

export const choosePlant = async (userId: string, plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);
    const plantSnap = await getDoc(plantRef);

    if (!plantSnap.exists()) throw new Error("Plant not found");

    const plantData = plantSnap.data();

    const userPlantRef = doc(db, "users", userId, "selectedPlant", plantId);

    await setDoc(userPlantRef, {
      ...plantData,
      plantedAt: serverTimestamp(),
    });

    return { isSuccess: true, message: "Plant planted successfully" };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
