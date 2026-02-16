import { Link } from "react-router";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">giải pháp thiết bị doanh nghiệp</p>
        <h1>
          Đặt chuẩn trải nghiệm
          <span> Laptop NewWorld</span>
        </h1>
        <p className="hero__subtitle">
          Kho laptop sẵn hàng, cấu hình tối ưu cho lập trình, thiết kế và doanh
          nghiệp. Giao nhanh toàn quốc, hỗ trợ cài đặt trong 24h.
        </p>
        <div className="hero__actions">
          <Link to="/products" className="btn btn--primary btn--lg">
            Khám phá sản phẩm
          </Link>
          <Link to="/contact" className="btn btn--ghost btn--lg">
            Nhận tư vấn
          </Link>
        </div>
        <div className="hero__stats">
          <div>
            <p className="stat__value">+5000</p>
            <p className="stat__label">Thiết bị triển khai</p>
          </div>
          <div>
            <p className="stat__value">24/7</p>
            <p className="stat__label">Hỗ trợ kỹ thuật</p>
          </div>
          <div>
            <p className="stat__value">9.5/10</p>
            <p className="stat__label">Mức độ hài lòng</p>
          </div>
        </div>
      </div>
      <div className="hero__card">
        <p className="hero__card-title">Ưu đãi tháng 11</p>
        <ul>
          <li>Giảm 2.000.000đ cho dòng Ultrabook</li>
          <li>Miễn phí làm mới Windows bản quyền</li>
          <li>Tặng gói bảo trì onsite 12 tháng</li>
        </ul>
        <Link to="/products" className="hero__card-link">
          Xem chi tiết ưu đãi →
        </Link>
      </div>
    </section>
  );
}

export default Hero;
