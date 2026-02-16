import { Link } from "react-router";
import { formatCurrency } from "../../ultis/number";
import type { Ram } from "../../types/ramTypes";

type RamCardProps = {
  ram: Ram;
};

function RamCard({ ram }: RamCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{ram.brand ?? "RAM"}</div>
      <h3>
        <Link
          to={`/products/cpu/${ram.id}`}
          className="laptop-card__name"
          target="_blank"
        >
          {ram.name}
        </Link>
      </h3>
      <ul>
        <li>Dung lượng: {ram.capacity}GB</li>
        <li>Thế hệ: {ram.gen}</li>
        <li>Tốc độ: {ram.speed}MHz</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(ram.price)}</span>
        <Link to={`/products/ram/${ram.id}`} target="_blank">
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>
      </div>
    </article>
  );
}

export default RamCard;
