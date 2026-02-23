import { Link, NavLink } from "react-router";
// import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/products", label: "Sản phẩm" },
  // { to: "/contact", label: "Liên hệ" },
];

function Navbar() {
  // const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          NewWorld<span>Tech</span>
        </Link>
        <p className="navbar__tagline">Laptop chuẩn doanh nghiệp</p>
      </div>
      <nav className="navbar__links">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              ["navbar__link", isActive ? "navbar__link--active" : ""]
                .filter(Boolean)
                .join(" ")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="navbar__cta">
        {/* {isAuthenticated ? (
          <>
            <span className="navbar__user">Xin chào, {user?.userName}</span>
            <button onClick={logout} className="btn btn--ghost">
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn--ghost">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn--primary">
              Đăng ký
            </Link>
          </>
        )} */}
        <Link to="/login" className="btn btn--ghost">
          Đăng nhập
        </Link>
        <Link to="/register" className="btn btn--primary">
          Đăng ký
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
