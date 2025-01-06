import CartContainer from "../containers/CartContainer";
import ProductListContainer from "../containers/ProductListContainer";

const ProductList: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-row gap-10">
      <ProductListContainer />
      <CartContainer />
    </div>
  );
};

export default ProductList;
