import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
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

export const choosePlant = async (
  adminId: string,
  userId: string,
  plantId: string,
) => {
  try {
    const plantRef = doc(db, "plantList", plantId);
    const plantSnap = await getDoc(plantRef);

    if (!plantSnap.exists()) throw new Error("Plant not found");

    const plantData = plantSnap.data();

    const userPlantRef = doc(
      db,
      "admins",
      adminId,
      "users",
      userId,
      "selectedPlant",
      plantId,
    );

    await setDoc(userPlantRef, {
      name: plantData.name,
      plantDescription: plantData.description,
      soilMoistureRange: plantData.soilMoistureRange,
      temperatureRange: plantData.temperatureRange,
      humidityRange: plantData.humidityRange,
      imageUrl: plantData.imageUrl,
      plantedAt: serverTimestamp(),
    });

    return { isSuccess: true, message: "Plant planted successfully" };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
