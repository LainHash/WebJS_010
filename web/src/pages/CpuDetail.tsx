import Navbar from "~/components/Navbar";
import { Link, useParams } from "react-router";
import { formatCurrency } from "~/ultis/currency";
import { useCpu } from "~/hooks/useCpu";

export default function CpuDetail() {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  if (isNaN(id)) {
    return <div>Invalid product ID</div>;
  }

  const { cpu, isLoading, error } = useCpu(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!cpu) {
    return <div>CPU not found</div>;
  }
  return (
    <div className="page page--detail">
      <Navbar />
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{cpu.Name ?? "0"}</p>
          <h1>{cpu.CompanyName}</h1>
          <p className="detail-card__price">{formatCurrency(cpu.UnitPrice)}</p>
          <ul className="spec-list">
            <li>
              <span>Cores</span>
              <p>{cpu.Cores}</p>
            </li>
            <li>
              <span>Logicals</span>
              <p>{cpu.Logicals}</p>
            </li>
            <li>
              <span>TDP</span>
              <p>{cpu.Tdp} W</p>
            </li>
            <li>
              <span>Socket</span>
              <p>{cpu.Socket}</p>
            </li>
            <li>
              <span>Base Speed</span>
              <p>{cpu.Speed} GHz</p>
            </li>
            <li>
              <span>Turbo Speed</span>
              <p>{cpu.Turbo} GHz</p>
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
