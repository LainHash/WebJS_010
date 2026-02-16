const features = [
  {
    title: "Tư vấn cấu hình chuẩn nhu cầu",
    description:
      "Phân tích workload và đề xuất cấu hình tối ưu cho DevOps, Data, Design.",
  },
  {
    title: "Quy trình kiểm định 18 bước",
    description:
      "Mỗi máy đều được burn-in, stress test và vệ sinh trước khi xuất kho.",
  },
  {
    title: "Hậu mãi chủ động",
    description:
      "Gọi lại trong 5 phút, đổi máy tạm thời trong 24h nếu phát sinh lỗi.",
  },
];

function FeatureHighlights() {
  return (
    <section className="card-grid">
      {features.map((feature) => (
        <article className="card" key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  );
}

export default FeatureHighlights;
