import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),
  route("products", "pages/Products.tsx"),
  route("products/:id", "pages/ProductDetail.tsx"),
  route("products/laptop/:id", "pages/LaptopDetail.tsx"),
  route("products/cpu/:id", "pages/CpuDetail.tsx"),
  route("products/gpu/:id", "pages/GpuDetail.tsx"),
] satisfies RouteConfig;
