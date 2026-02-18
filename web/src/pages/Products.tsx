import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "~/components/ProductGrid";

function ProductsPage() {
  return (
    <div className="page page--narrow">
      <Navbar />
      <div className="section__header">
        <p className="eyebrow">Danh mục sản phẩm</p>
        <h1>Kho sản phẩm cập nhật theo ngày</h1>
        <p className="section__subtitle">
          Toàn bộ máy đã được burn-in, stress test và vệ sinh. Giá hiển thị đã
          bao gồm VAT.
        </p>
      </div>
      <ProductGrid />
      <Footer />
    </div>
  );
}

export default ProductsPage;
