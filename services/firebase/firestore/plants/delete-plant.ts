import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

export const deletePlant = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);

    await deleteDoc(plantRef);

    return { isSuccess: true, message: "Plant deleted successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

export const plantDelete = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plantList", plantId);

    await updateDoc(plantRef, {
      isChosen: false,
    });
    return { isSuccess: true, message: "Plant deleted successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
