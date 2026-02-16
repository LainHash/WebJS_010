import { useCallback, useEffect, useState } from "react";
import type { Laptop } from "../types/laptop";
import { getLaptop, updateLaptop, deleteLaptop } from "../ultis/api";

export function useLaptop(id?: string | number | undefined) {
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLaptop(id);
        if (!mounted) return;
        setLaptop(data || null);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const update = useCallback(async (payload: any) => {
    if (!id) throw new Error("missing id");
    const updated = await updateLaptop(id, payload);
    setLaptop(updated || null);
    return updated;
  }, [id]);

  const remove = useCallback(async () => {
    if (!id) throw new Error("missing id");
    await deleteLaptop(id);
    setLaptop(null);
  }, [id]);

  return { laptop, loading, error, refresh: undefined as unknown as () => Promise<void>, update, remove } as const;
}
