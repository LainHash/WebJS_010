import { useState } from "react";
import type { FormEvent } from "react";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Họ tên
        <input
          required
          value={formState.name}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
        />
      </label>
      <label>
        Email công việc
        <input
          required
          type="email"
          value={formState.email}
          onChange={(event) =>
            setFormState({ ...formState, email: event.target.value })
          }
        />
      </label>
      <label>
        Công ty / Team
        <input
          value={formState.company}
          onChange={(event) =>
            setFormState({ ...formState, company: event.target.value })
          }
        />
      </label>
      <label>
        Nhu cầu triển khai
        <textarea
          rows={4}
          value={formState.message}
          onChange={(event) =>
            setFormState({ ...formState, message: event.target.value })
          }
        />
      </label>
      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang gửi..." : "Đặt lịch tư vấn"}
      </button>
      {submitted && (
        <p className="state state--success">
          Đã nhận thông tin, chúng tôi sẽ liên hệ sớm!
        </p>
      )}
    </form>
  );
}

export default ContactForm;
