import { useEffect, useState } from "react";
import { FilterParametersType, ProductType } from "../utils/types";
import { getProducts } from "../api/getProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import ProductFilters from "../components/ProductFilters";
import { useCart } from "../hooks/useCart";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [parameters, setParameters] = useState<FilterParametersType>({
    searchTerm: searchTerm,
    brands: [],
    models: [],
    sortBy: [
      { label: "Price High To Low", value: "price_inc" },
      { label: "Price Low To High", value: "price_dec" },
      { label: "Old To New", value: "to_new" },
      { label: "New To Old", value: "to_old" },
    ],
  });

  const { addToCart } = useCart();

  const filterParameters = () => {
    const brands = Array.from(
      new Set(filteredProducts.map((item) => item.brand))
    ).map((brand) => ({
      label: brand,
      value: brand,
    }));

    const models = Array.from(
      new Set(filteredProducts.map((item) => item.model))
    ).map((model) => ({
      label: model,
      value: model,
    }));
    setParameters({ ...parameters, brands: brands, models: models });
  };

  useEffect(() => {
    filterParameters();
  }, [searchTerm, productList]);

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
        filterParameters();
        console.log(data);
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

  const sortByPriceDec = (products: ProductType[]) => {
    const sortedItems = [...products].sort((a, b) => a.price - b.price);
    return sortedItems;
  };

  const sortByPriceInc = (products: ProductType[]) => {
    const sortedItems = [...products].sort((a, b) => b.price - a.price);
    return sortedItems;
  };

  const sortByNewest = (products: ProductType[]) => {
    const sortedItems = [...products].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sortedItems;
  };

  const sortByOldest = (products: ProductType[]) => {
    const sortedItems = [...products].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sortedItems;
  };

  const sortProducts: Record<string, (params: ProductType[]) => ProductType[]> =
    {
      price_inc: sortByPriceInc,
      price_dec: sortByPriceDec,
      to_new: sortByOldest,
      to_old: sortByNewest,
    };

  const handleApplyFilters = (filters: string | any) => {
    const filtered = productList.filter((product) => {
      if (
        searchTerm.length > 0 &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (filters.model.length > 0 && !filters.model.includes(product.model))
        return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand))
        return false;
      return true;
    });

    if (filters.sortBy) {
      const sortFunction = sortProducts[filters.sortBy];
      const sortedProducts = sortFunction(filtered);
      setFilteredProducts(sortedProducts);
    } else {
      setFilteredProducts(filtered);
    }
  };

  const handleAddCart = (product: ProductType) => {
    addToCart(product);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="container mx-auto flex flex-row gap-10 ">
        <ProductFilters
          onApplyFilters={handleApplyFilters}
          parameters={parameters}
        />

        <div className="flex-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentShowedProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} handleClick={handleAddCart} />
                </div>
              );
            })}
          </div>
          <Pagination
            handleChange={handlePageChange}
            pageCount={numberOfPage}
          />
        </div>
      </div>
    </>
  );
};

export default ProductListContainer;
