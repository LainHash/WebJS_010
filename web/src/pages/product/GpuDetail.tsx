import { useProduct } from "~/hooks/useProducts";
import Navbar from "~/components/Navbar";
import { Link, useParams } from "react-router";
import { formatCurrency } from "~/ultis/currency";
import { useGpu } from "~/hooks/useGpu";

export default function GpuDetail() {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  if (isNaN(id)) {
    return <div>Invalid product ID</div>;
  }

  const { gpu, isLoading, error } = useGpu(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!gpu) {
    return <div>GPU not found</div>;
  }
  return (
    <div className="page page--detail">
      <Navbar />
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{gpu.Name ?? "0"}</p>
          <h1>{gpu.CompanyName}</h1>
          <p className="detail-card__price">{formatCurrency(gpu.UnitPrice)}</p>
          <ul className="spec-list">
            <li>
              <span>Memory Size</span>
              <p>{gpu.MemorySize} GB</p>
            </li>
            <li>
              <span>Memory Type</span>
              <p>{gpu.MemoryType}</p>
            </li>
            <li>
              <span>Clock</span>
              <p>{gpu.Clock} MHz</p>
            </li>
            <li>
              <span>Unified Shader</span>
              <p>{gpu.UnifiedShader}</p>
            </li>
            <li>
              <span>TMU</span>
              <p>{gpu.Tmu}</p>
            </li>
            <li>
              <span>ROP</span>
              <p>{gpu.Rop}</p>
            </li>
            <li>
              <span>Bus</span>
              <p>{gpu.Bus}</p>
            </li>
            <li>
              <span>iGPU</span>
              <p>{gpu.Igpu ? "Yes" : "No"}</p>
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
