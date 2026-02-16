import { Link } from "react-router";
import { formatCurrency } from "../../ultis/number";
import type { Storage } from "../../types/storageTypes";

type StorageCardProps = {
  storage: Storage;
};

function StorageCard({ storage }: StorageCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{storage.brand ?? "Storage"}</div>
      <h3>
        <Link
          to={`/products/cpu/${storage.id}`}
          className="laptop-card__name"
          target="_blank"
        >
          {storage.name}
        </Link>
      </h3>
      <ul>
        <li>Loại: {storage.storageType}</li>
        <li>Chuẩn: {storage.interfaceType}</li>
        <li>Dung lượng: {storage.capacity}GB</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(storage.price)}</span>
        <Link to={`/products/storage/${storage.id}`} target="_blank">
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>
      </div>
    </article>
  );
}

export default StorageCard;
