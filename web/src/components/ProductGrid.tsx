import ProductCard from "./ProductCard";
import { useProducts } from "~/hooks/useProducts";

const ProductGrid = () => {
  const {
    products,
    isLoading,
    error,
    page,
    totalCount,
    sort,
    setPage,
    setSort,
  } = useProducts();

  const pageCount = Math.ceil(totalCount / 40);

  const handleSortChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(ev.target.value as any);
    setPage(1); // reset to first page when sorting changes
  };

  return (
    <>
      <section className="product-grid">
        <div className="product-grid__toolbar">
          <select value={sort} onChange={handleSortChange} className="">
            <option value="">Sắp xếp</option>
            <option value="name-asc">Tên (A-Z)</option>
            <option value="name-desc">Tên (Z-A)</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>

        {isLoading && (
          <p className="state state--loading">Đang tải dữ liệu...</p>
        )}
        {error && <p className="state state--error">{error}</p>}
        <div className="product-grid__items">
          {products.map((product) => (
            <ProductCard key={product.Id} product={product} />
          ))}
        </div>

        <div className="product-grid__more">
          <button
            className="btn btn--secondary"
            disabled={page <= 1}
            onClick={() => {
              setPage(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            &laquo; Trước
          </button>
          <span className="px-4">
            {page} / {pageCount || 1}
          </span>
          <button
            className="btn btn--secondary"
            disabled={page >= pageCount}
            onClick={() => {
              setPage(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Tiếp &raquo;
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
