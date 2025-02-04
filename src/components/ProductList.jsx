import PropTypes from "prop-types";
import fetchProducts from "../hooks/useFetchProduct";
import { SearchContext } from "../contexts/SearchContext";
import { useContext, useEffect, useState } from "react";
import Error from "../Pages/Error";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products?.filter(product =>
    product && product.name && product.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  if (!products) return <div>Loading...</div>;
  if (error) return <Error />;

  

  return (
    <div className="sm: m-auto mb-[140px] pt-20 grid w-[270px] justify-between gap-10 md:mt-12 md:w-[560px] md:grid-cols-2 lg:w-[930px] lg:grid-cols-3 xl:w-[1170px] xl:grid-cols-4">
      {filteredProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          showHeart={true}
          showAddToCart={true}
          hoverAddToCart={true}
          showStars = {true}
          img={product.image}
          name={product.name}
          originalPrice={product.originalPrice}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          discount={product.discount}
          category={product.category}
          show={product.show}
          color={product.color}
          product={product}
          searchTerm={searchTerm}
          showSpecialContent={[12].includes(product.id)}
          showSpecialNew={[15, 17].includes(product.id)}
          showSpecialColors={[15, 16, 17, 18].includes(product.id)}
          showSpecialDisplayRow={[11, 12, 13, 14, 15, 16, 17, 18].includes(
            product.id,
          )}
          cardHeight={index < 14 ? "h-[322px]" : "h-[350px]"}
          imageTop={index === 12 ? "top-[42%]" : "top-[50%]"}
          showSpecialPrice={[1, 2, 3, 4, 5, 6, 7, 8, 9].includes(product.id)}
          showSpecialDisplayCol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(
            product.id,
          )}
          showSpecialDiscount={[1, 2, 3, 4, 5, 6].includes(product.id)}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      discount: PropTypes.number,
      rating: PropTypes.arrayOf(PropTypes.string).isRequired,
      reviews: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      color: PropTypes.string,
      category: PropTypes.string.isRequired,
      show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // قبول `boolean` أو `string`
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  showSpecialContent: PropTypes.bool,
  showSpecialNew: PropTypes.bool,
  showSpecialDiscount: PropTypes.bool,
  showSpecialPrice: PropTypes.bool,
  showSpecialColors: PropTypes.bool,
  showSpecialDisplay: PropTypes.bool,
  showSpecialDisplayRow: PropTypes.bool,
  showSpecialDisplayCol: PropTypes.bool,
  cardHeight: PropTypes.string,
  imageTop: PropTypes.string,
  category: PropTypes.string,
};

export default ProductList;
