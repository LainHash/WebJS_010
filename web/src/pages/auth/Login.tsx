import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      let msg = "Login failed";
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
          <h1 className="auth-card__title">Đăng nhập</h1>
          <p className="auth-card__subtitle">Nhập email và mật khẩu của bạn</p>
        </header>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Đăng nhập
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
