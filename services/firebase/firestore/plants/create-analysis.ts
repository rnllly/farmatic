import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";

interface Props {
  analyzerId: string;
  adminId: string;
  analysis: any;
}

export const createAnalysis = async ({
  analyzerId,
  adminId,
  analysis,
}: Props) => {
  try {
    const ref = collection(db, "analyses");

    await addDoc(ref, {
      analyzerId,
      adminId,
      analysis,
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error("Error creating analysis:", error);
  }
};
