import { formatCurrency } from "~/ultis/currency";
import type { Product } from "~/types/Product";
import { Link } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="product-card">
      <div className="product-card__badge">{"Product"}</div>
      <h3>
        <Link
          to={`/products/product/${product.Id}`}
          className="product-card__name"
          target="_blank"
        >
          {product.Name}
        </Link>
      </h3>
      <ul>
        <li>Id: {product.Id}</li>
        <li>Name: {product.Name}</li>
        {product.CategoryName && <li>Category: {product.CategoryName}</li>}
        {product.CompanyName && <li>Supplier: {product.CompanyName}</li>}
      </ul>
      <div className="product-card__price">
        <span>{formatCurrency(product.UnitPrice)}</span>
        <Link
          className="price_link"
          to={`/products/product/${product.Id}`}
          target="_blank"
        >
          <ShoppingCartIcon className="w-5 h-5" />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
