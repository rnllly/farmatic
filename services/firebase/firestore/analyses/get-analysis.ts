import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../config";

export const getAnalysis = async ({ adminId }: { adminId: string }) => {
  try {
    const q = query(
      collection(db, "analyses"),
      where("adminId", "==", adminId),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const docSnap = querySnapshot.docs[0];

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error: any) {
    console.error("Error getting plant by query:", error);
    return null;
  }
};
