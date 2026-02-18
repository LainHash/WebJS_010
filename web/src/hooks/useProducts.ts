import { useEffect, useState, useCallback, useMemo } from "react";
import type { Product } from "~/types/Product";
import { getProduct, getProducts } from "~/services/productService";

interface UseProductsResult {
  products: Product[]; // visible products after sort/page
  isLoading: boolean;
  error: string | null;
  page: number;
  totalCount: number;
  sort: SortCriteria;
  setPage: (p: number) => void;
  setSort: (criteria: SortCriteria) => void;
  reload: () => void;
}

export type SortCriteria =
  | ""
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export function useProducts(
  initialPage: number = 1,
  pageSize: number = 40,
): UseProductsResult {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState<SortCriteria>("");

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProducts(page, pageSize);
      const list = Array.isArray(response) ? response : response.products;
      setAllProducts(list || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  // fetch once or when page/pageSize changes (API currently ignored though)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sorted = useMemo(() => {
    const arr = [...allProducts];
    switch (sort) {
      case "name-asc":
        return arr.sort((a, b) => a.Name.localeCompare(b.Name));
      case "name-desc":
        return arr.sort((a, b) => b.Name.localeCompare(a.Name));
      case "price-asc":
        return arr.sort((a, b) => a.UnitPrice - b.UnitPrice);
      case "price-desc":
        return arr.sort((a, b) => b.UnitPrice - a.UnitPrice);
      default:
        return arr;
    }
  }, [allProducts, sort]);

  const totalCount = sorted.length;
  const products = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  return {
    products,
    isLoading,
    error,
    page,
    totalCount,
    sort,
    setPage,
    setSort,
    reload: fetchProducts,
  };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProduct(id);
      setProduct(response.product);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, reload: fetchProduct };
}
