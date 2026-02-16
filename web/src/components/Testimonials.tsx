const testimonials = [
  {
    quote:
      "NewWorldTech đã giúp đội Product có dàn máy đồng bộ, build nhanh hơn 30%. Dịch vụ triển khai cực kỳ chuyên nghiệp.",
    author: "Nguyễn Thành Hưng",
    role: "CTO, UDI Digital",
  },
  {
    quote:
      "Từ tư vấn đến bảo hành đều rõ ràng. Điểm cộng lớn là luôn có máy dự phòng khi cần gấp.",
    author: "Lê Hoàng Phương",
    role: "Head of Design, StudioX",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Khách hàng nói gì?</h2>
      <div className="testimonials__grid">
        {testimonials.map((item) => (
          <article key={item.author}>
            <p>“{item.quote}”</p>
            <h5>{item.author}</h5>
            <span>{item.role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
