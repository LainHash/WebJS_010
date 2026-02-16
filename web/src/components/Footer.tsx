function Footer() {
  return (
    <footer className="footer">
      <section className="footer__grid">
        <div>
          <h4>NewWorldTech</h4>
          <p>Hệ sinh thái giải pháp văn phòng và thiết bị công nghệ.</p>
        </div>
        <div>
          <h5>Liên hệ</h5>
          <ul>
            <li>Hotline: 1900 6868</li>
            <li>Email: hello@newworld.vn</li>
            <li>Địa chỉ: 54 Nguyễn Cơ Thạch, Hà Nội</li>
          </ul>
        </div>
        <div>
          <h5>Dịch vụ</h5>
          <ul>
            <li>Bảo hành 24 tháng</li>
            <li>Thu cũ đổi mới</li>
            <li>Triển khai doanh nghiệp</li>
          </ul>
        </div>
      </section>
      <p className="footer__copy">© {new Date().getFullYear()} NewWorldTech</p>
    </footer>
  );
}

export default Footer;
