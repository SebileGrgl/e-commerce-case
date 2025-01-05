import { useEffect, useState } from "react";
import { ProductType } from "../utils/types";
import { getProducts } from "../api/getProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ProductListContainer: React.FC = () => {
  const itemsPerPage = 12;
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentShowedProducts, setCurrentShowedProducts] = useState<
    ProductType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState<number>(0);

  useEffect(() => {
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentShowedProducts(
      filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProducts();
        setProductList(data);
        setFilteredProducts(data);
        console.log(currentShowedProducts);
      } catch (error) {
        setError("Error fetching products!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setNumberOfPage(Math.ceil(filteredProducts.length / itemsPerPage));
    setCurrentPage(0);
  }, [filteredProducts]);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentShowedProducts.map((product) => {
        return (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        );
      })}

      <Pagination handleChange={handlePageChange} pageCount={numberOfPage} />
    </div>
  );
};

export default ProductListContainer;
