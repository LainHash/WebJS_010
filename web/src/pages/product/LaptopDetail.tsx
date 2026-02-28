import Navbar from "~/components/Navbar";
import { Link, useParams } from "react-router";
import { formatCurrency } from "~/ultis/currency";
import { useLaptop } from "~/hooks/useLaptop";
// import { useCpu } from "~/hooks/useCpu";
// import { useGpu } from "~/hooks/useGpu";

export default function LaptopDetail() {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  if (isNaN(id)) {
    return <div>Invalid product ID</div>;
  }

  const {
    laptop,
    isLoading: isLaptopLoading,
    error: laptopError,
  } = useLaptop(id);
  if (isLaptopLoading) {
    return <div>Loading...</div>;
  }
  if (laptopError) {
    return <div>Error: {laptopError}</div>;
  }
  if (!laptop) {
    return <div>Laptop not found</div>;
  }

  return (
    <div className="page page--detail">
      <Navbar />
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{laptop.Name ?? "0"}</p>
          <h1>{laptop.CompanyName}</h1>
          <p className="detail-card__price">
            {formatCurrency(laptop.UnitPrice)}
          </p>
          <ul className="spec-list">
            <li>
              <span>Type</span>
              <p>{laptop.Type}</p>
            </li>
            <li>
              <span>CPU</span>
              <Link to={`/products/cpu/${laptop.CpuId}`}>{laptop.CpuName}</Link>
            </li>
            <li>
              <span>GPU</span>
              <Link to={`/products/gpu/${laptop.GpuId}`}>{laptop.GpuName}</Link>
            </li>
            <li>
              <span>Screen Resolution</span>
              <p>{laptop.ScreenResolution}</p>
            </li>
            <li>
              <span>Memory</span>
              <p>{laptop.Memory}</p>
            </li>
            <li>
              <span>Operating System</span>
              <p>{laptop.OpSys}</p>
            </li>
            <li>
              <span>Inches</span>
              <p>{laptop.Inches}</p>
            </li>
            <li>
              <span>Weight</span>
              <p>{laptop.Weight}</p>
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
