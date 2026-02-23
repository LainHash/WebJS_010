export interface Gpu {
  Id: number;
  MemorySize: number;
  MemoryType: string;
  Clock: number;
  UnifiedShader: number;
  Tmu: number;
  Rop: number;
  Bus: string;
  Igpu: boolean;
}
