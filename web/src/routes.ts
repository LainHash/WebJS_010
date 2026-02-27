import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),
  route("contact", "pages/Contact.tsx"),
  route("login", "pages/auth/Login.tsx"),
  route("register", "pages/auth/Register.tsx"),
  route("products", "pages/product/Products.tsx"),
  route("products/laptop/:id", "pages/product/LaptopDetail.tsx"),
  route("products/cpu/:id", "pages/product/CpuDetail.tsx"),
  route("products/gpu/:id", "pages/product/GpuDetail.tsx"),
] satisfies RouteConfig;
