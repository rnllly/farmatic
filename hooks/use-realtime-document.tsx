import { db } from "@/services/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useRealTimeDocument<T = any>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path) return;

    const ref = doc(db, path);

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setData({ id: snapshot.id, ...snapshot.data() } as T);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [path]);

  return { data, loading };
}
