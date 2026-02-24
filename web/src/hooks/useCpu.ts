import { useEffect, useState, useCallback } from "react";
import type { Cpu } from "~/types/Cpu";
import { getCpu } from "~/services/cpuService";

interface UseCpuResult {
  cpu: Cpu | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useCpu(id: number): UseCpuResult {
  const [cpu, setCpu] = useState<Cpu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCpu = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCpu(id);
      setCpu(response.cpu);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch CPU");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCpu();
  }, [fetchCpu]);

  const reload = useCallback(() => {
    fetchCpu();
  }, [fetchCpu]);

  return {
    cpu,
    isLoading,
    error,
    reload,
  };
}
