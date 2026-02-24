import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import type { RegisterData } from "../contexts/AuthContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(form);
      setSuccess("Đăng ký thành công, bạn có thể đăng nhập ngay.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      let msg = "Registration failed";
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.errors && Array.isArray(parsed.errors)) {
            msg = parsed.errors.map((e: any) => e.msg).join("; ");
          } else if (typeof parsed === "string") {
            msg = parsed;
          }
        } catch (_e) {
          msg = err.message;
        }
      }
      setError(msg);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <h1 className="auth-card__title">Đăng ký</h1>
          <p className="auth-card__subtitle">Tạo tài khoản mới</p>
        </header>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Tên đăng nhập
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mật khẩu
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Họ
            <input
              type="text"
              name="lastname"
              value={form.lastname || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Tên
            <input
              type="text"
              name="firstname"
              value={form.firstname || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Giới tính
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
            >
              <option value="">Chọn</option>
              <option value="M">Nam</option>
              <option value="F">Nữ</option>
            </select>
          </label>
          <label>
            Ngày sinh
            <input
              type="date"
              name="birthday"
              value={form.birthday || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Thành phố
            <input
              type="text"
              name="city"
              value={form.city || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Quốc gia
            <input
              type="text"
              name="country"
              value={form.country || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Địa chỉ
            <input
              type="text"
              name="address"
              value={form.address || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Số điện thoại
            <input
              type="text"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            CIC
            <input
              type="text"
              name="cic"
              value={form.cic || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Đăng ký
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
