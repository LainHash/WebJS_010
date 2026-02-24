import { useEffect, useState, useCallback } from "react";
import type { Gpu } from "~/types/Gpu";
import { getGpu } from "~/services/gpuService";

interface UseGpuResult {
  gpu: Gpu | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useGpu(id: number): UseGpuResult {
  const [gpu, setGpu] = useState<Gpu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchGpu = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getGpu(id);
      setGpu(response.gpu);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch GPU");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGpu();
  }, [fetchGpu]);

  const reload = useCallback(() => {
    fetchGpu();
  }, [fetchGpu]);

  return {
    gpu,
    isLoading,
    error,
    reload,
  };
}
