import { useProduct } from "~/hooks/useProducts";
import Navbar from "~/components/Navbar";
import { Link, useParams } from "react-router";
import { formatCurrency } from "~/ultis/currency";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  if (isNaN(id)) {
    return <div>Invalid product ID</div>;
  }

  const { product, isLoading, error } = useProduct(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="page page--detail">
      <Navbar />
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{product.SupplierId ?? "0"}</p>
          <h1>{product.Name}</h1>
          <p className="detail-card__price">
            {formatCurrency(product.UnitPrice)}
          </p>
          <ul className="spec-list">
            <li>
              <span>CPU</span>
              {/* <Link to={`/products/cpu/${laptop.cpuId}`} target="_blank">
                <strong>{laptop.cpuName}</strong>
              </Link> */}
            </li>
            <li>
              <span>GPU</span>
              {/* <Link to={`/products/gpu/${laptop.gpuId}`} target="_blank">
                <strong>{laptop.gpuName}</strong>
              </Link> */}
            </li>
            <li>
              <span>RAM</span>
              {/* <Link to={`/products/ram/${laptop.ramId}`} target="_blank">
                <strong>{laptop.ramName}</strong>
              </Link> */}
            </li>
            <li>
              <span>Lưu trữ</span>
              {/* <Link
                to={`/products/storage/${laptop.storageId}`}
                target="_blank"
              >
                <strong>{laptop.storageId}</strong>
              </Link> */}
            </li>
          </ul>
          <div className="cta-stack">
            <a className="btn btn--primary btn--lg" href="tel:19006868">
              Đặt mua ngay
            </a>
            <Link className="btn btn--ghost btn--lg" to="/contact">
              Nhận báo giá doanh nghiệp
            </Link>
          </div>
        </div>
        <div className="detail-card__info">
          <h3>Điểm nổi bật</h3>
          <p>
            Dòng máy được ưa chuộng bởi hiệu năng ổn định, thiết kế gọn nhẹ và
            thời lượng pin bền bỉ. Phù hợp cho lập trình viên, designer và đội
            marketing thường xuyên di chuyển.
          </p>
          <div className="badge-list">
            <span>Bảo hành 24 tháng</span>
            <span>Giao nhanh 2h</span>
            <span>Hỗ trợ online 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
