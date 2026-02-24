import { useEffect, useState, useCallback, useMemo } from "react";
import type { Laptop } from "~/types/Laptop";
import { getLaptop } from "~/services/laptopService";

interface UseLaptopResult {
  laptop: Laptop | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useLaptop(id: number): UseLaptopResult {
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchLaptop = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getLaptop(id);
      setLaptop(response.laptop);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch laptop");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLaptop();
  }, [fetchLaptop]);

  const reload = useCallback(() => {
    fetchLaptop();
  }, [fetchLaptop]);

  return {
    laptop,
    isLoading,
    error,
    reload,
  };
}
