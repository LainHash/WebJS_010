import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),
  route("products", "pages/Products.tsx"),
  route("products/product/:id", "pages/ProductDetail.tsx"),

] satisfies RouteConfig;
