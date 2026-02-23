export interface Cpu {
  Id: number;
  Cores: number;
  Logicals: number;
  Tdp: number;
  Socket: string;
  Speed: number;
  Turbo: number;
}

export interface CpuResponse {
  cpu: Cpu;
  success: boolean;
}

export interface CpuListResponse {
  cpus: Cpu[];
  success: boolean;
  totalCount: number;
}
