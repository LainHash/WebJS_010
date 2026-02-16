import { useCallback, useEffect, useState } from "react";
import type { Laptop } from "../types/laptop";
import { getLaptops, deleteLaptop } from "../ultis/api";

export function useLaptops() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaptops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLaptops();
      setLaptops(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);

  const remove = useCallback(
    async (id: number) => {
      try {
        await deleteLaptop(id);
        setLaptops((s) => s.filter((x) => x.Id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        throw err;
      }
    },
    []
  );

  return { laptops, loading, error, refresh: fetchLaptops, remove } as const;
}
