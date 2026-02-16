import { Link } from "react-router";
import { formatCurrency } from "../../ultis/number";
import type { Gpu } from "../../types/gpuTypes";

type GpuCardProps = {
  gpu: Gpu;
};

function GpuCard({ gpu }: GpuCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{gpu.brand ?? "GPU"}</div>
      <h3>
        <Link
          to={`/products/cpu/${gpu.id}`}
          className="laptop-card__name"
          target="_blank"
        >
          {gpu.name}
        </Link>
      </h3>
      <ul>
        <li>CUDA Cores: {gpu.cudaCore}</li>
        <li>VRAM: {gpu.vram}GB</li>
        <li>PCIe: Gen {gpu.pcie}</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(gpu.price)}</span>
        <Link to={`/products/gpu/${gpu.id}`} target="_blank">
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>
      </div>
    </article>
  );
}

export default GpuCard;
