import { useEffect, useMemo, useState } from "react";
import RamCard from "./RamCard";
import type { Ram } from "../../types/ramTypes";
import { fetchRams } from "../../services/ramServices";

type SortKey = "price-asc" | "price-desc" | "name";

function RamGrid() {
  const [items, setItems] = useState<Ram[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("price-asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetchRams({ q: query })
      .then((data) => {
        if (ignore) return;
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      })
      .finally(() => !ignore && setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [query]);

  useEffect(() => {
    setVisibleCount(12);
  }, [query]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [items, sortBy]);

  const visibleItems = useMemo(() => {
    return sortedItems.slice(0, visibleCount);
  }, [sortedItems, visibleCount]);

  return (
    <section className="laptop-grid">
      <div className="laptop-grid__toolbar">
        <input
          type="search"
          placeholder="Tìm theo tên, RAM..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortKey)}
        >
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name">Tên (A-Z)</option>
        </select>
      </div>
      {isLoading && <p className="state state--loading">Đang tải dữ liệu...</p>}
      {error && <p className="state state--error">{error}</p>}
      {!isLoading && !error && sortedItems.length === 0 && (
        <p className="state">Không tìm thấy sản phẩm phù hợp.</p>
      )}
      <div className="laptop-grid__items">
        {visibleItems.map((item) => (
          <RamCard key={item.id} ram={item} />
        ))}
      </div>
      {!isLoading && !error && sortedItems.length > visibleCount && (
        <div className="laptop-grid__more">
          <button
            className="btn btn--secondary"
            onClick={() => setVisibleCount((c) => c + 12)}
          >
            Xem thêm
          </button>
        </div>
      )}
    </section>
  );
}

export default RamGrid;
