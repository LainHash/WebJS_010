import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/HomePage.tsx"),

  // legacy / alternate path used by components
  route("laptops", "pages/laptop/Index.tsx"),
  route("laptops/create", "pages/laptop/Create.tsx"),
  route("laptops/:id/edit", "pages/laptop/Edit.tsx"),
  route("laptops/:id", "pages/laptop/Detail.tsx"),
] satisfies RouteConfig;
