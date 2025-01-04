import ProductDetails from "./views/ProductDetails";
import ProductList from "./views/ProductList";

const routes = [
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
