import { Link } from "react-router";
import { formatCurrency } from "../../ultis/number";
import type { Laptop } from "../../types/laptopTypes";

type LaptopCardProps = {
  laptop: Laptop;
};

function LaptopCard({ laptop }: LaptopCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{laptop.brand ?? "Laptop"}</div>
      <h3>
        <Link
          to={`/products/laptop/${laptop.id}`}
          className="laptop-card__name"
          target="_blank"
        >
          {laptop.name}
        </Link>
      </h3>
      <ul>
        <li>CPU: {laptop.cpuName}</li>
        <li>GPU: {laptop.gpuName}</li>
        <li>RAM: {laptop.ramName}</li>
        <li>Ổ cứng: {laptop.storageName}</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(laptop.price)}</span>
        <Link
          className="price_link"
          to={`/products/laptop/${laptop.id}`}
          target="_blank"
        >
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>
      </div>
    </article>
  );
}

export default LaptopCard;
