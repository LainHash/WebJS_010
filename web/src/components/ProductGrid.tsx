import ProductCard from "./ProductCard";
import { useProducts } from "~/hooks/useProducts";
import { useEffect, useState } from "react";
import type { Category } from "~/types/Category";
import type { Supplier } from "~/types/Supplier";
import { getCategories, getSuppliers } from "~/services/productService";

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
    categoryFilter,
    setCategoryFilter,
    supplierFilter,
    setSupplierFilter,
  } = useProducts();

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    getSuppliers().then(setSuppliers).catch(console.error);
  }, []);

  const pageCount = Math.ceil(totalCount / 40);

  const handleSortChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(ev.target.value as any);
    setPage(1);
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

          <select
            value={categoryFilter ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setCategoryFilter(v ? parseInt(v, 10) : null);
              setPage(1);
            }}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((c) => (
              <option key={c.Id} value={c.Id}>
                {c.Name}
              </option>
            ))}
          </select>

          <select
            value={supplierFilter ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setSupplierFilter(v ? parseInt(v, 10) : null);
              setPage(1);
            }}
          >
            <option value="">Tất cả nhà cung cấp</option>
            {suppliers.map((s) => (
              <option key={s.Id} value={s.Id}>
                {s.CompanyName}
              </option>
            ))}
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
