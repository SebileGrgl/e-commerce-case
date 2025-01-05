import { Navigate } from "react-router-dom";
import ProductList from "./views/ProductList";
import ProductDetails from "./views/ProductDetails";

const routes = [
  {
    path: "/",
    element: <Navigate to="/product-list" />,
  },
  {
    path: "/product-list",
    element: <ProductList />,
  },
  {
    path: "/product-list/:id",
    element: <ProductDetails />,
  },
];

export default routes;
