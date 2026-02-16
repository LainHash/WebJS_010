import { Link } from "react-router";
import { formatCurrency } from "../../ultis/number";
import type { Cpu } from "../../types/cpuTypes";

type CpuCardProps = {
  cpu: Cpu;
};

function CpuCard({ cpu }: CpuCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{cpu.brand ?? "CPU"}</div>
      <h3>
        <Link
          to={`/products/cpu/${cpu.id}`}
          className="laptop-card__name"
          target="_blank"
        >
          {cpu.name}
        </Link>
      </h3>
      <ul>
        <li>
          Nhân & Luồng: {cpu.cores}/{cpu.threads}
        </li>
        <li>Xung nhịp cơ bản: {cpu.baseClock}</li>
        <li>Chíp tích hợp: {cpu.igpu}</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(cpu.price)}</span>
        <Link to={`/products/cpu/${cpu.id}`} target="_blank">
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>
      </div>
    </article>
  );
}

export default CpuCard;
