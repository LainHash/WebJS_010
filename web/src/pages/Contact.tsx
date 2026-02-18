import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <div className="page page--contact">
      <Navbar />
      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Liên hệ</p>
          <h1>Đặt lịch tư vấn cùng chuyên gia giải pháp</h1>
          <p>
            Vui lòng để lại thông tin, đội ngũ NewWorldTech sẽ kết nối qua email
            hoặc Zalo trong 15 phút làm việc.
          </p>
        </div>
      </section>

      <div className="contact__grid">
        <ContactForm />
        <div className="contact__info">
          <h3>Trải nghiệm trực tiếp</h3>
          <p>Showroom mở cửa hằng ngày 8h00 - 21h00.</p>
          <ul>
            <li>54 Nguyễn Cơ Thạch, Nam Từ Liêm, Hà Nội</li>
            <li>17 Nguyễn Thị Minh Khai, Quận 1, TP.HCM</li>
          </ul>
          <div className="contact__hotline">
            <p>Hotline</p>
            <a href="tel:19006868">1900 6868</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
