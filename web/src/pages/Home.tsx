import Hero from "../components/Hero";
import FeatureHighlights from "../components/FeatureHighlights";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link } from "react-router";

function HomePage() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Lợi thế cạnh tranh</p>
          <h2>Chuẩn hóa trải nghiệm vận hành với NewWorldTech</h2>
        </div>
        <FeatureHighlights />
      </section>
      <section className="section section--accent">
        <div className="section__content">
          <h2>Gói triển khai doanh nghiệp</h2>
          <p>
            Từ 10 máy trở lên, bạn có sẵn chuyên gia tư vấn cấu hình, tạo image
            chuẩn, bàn giao tại văn phòng và bảo trì onsite.
          </p>
          <ul className="checklist">
            <li>Quản trị vòng đời thiết bị (DLM)</li>
            <li>Dashboard theo dõi bảo hành</li>
            <li>Tài trợ máy demo trong 07 ngày</li>
          </ul>
          <Link to="/contact" className="btn btn--primary">
            Đăng ký gói doanh nghiệp
          </Link>
        </div>
        <div className="section__content">
          <div className="stat-card">
            <p>Thời gian triển khai trung bình</p>
            <h3>72 giờ</h3>
          </div>
          <div className="stat-card">
            <p>Đội ngũ kỹ sư đạt chứng chỉ</p>
            <h3>36+</h3>
          </div>
          <div className="stat-card">
            <p>Tỷ lệ xử lý ticket lần đầu</p>
            <h3>93%</h3>
          </div>
        </div>
      </section>
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;
