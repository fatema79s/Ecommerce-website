import { useContext } from "react";
import { WishlistContext } from "../contexts/wishListContext";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import PropTypes from "prop-types";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist, discountedProducts, clearWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useCart();
    
      const moveAllToCart = () => {
        wishlist.forEach((product) => addToCart(product));
        clearWishlist();
      };

      

  return (
    <div className="m-auto mb-[140px] mt-[80px] flex h-auto flex-col items-start gap-[80px] p-0 sm:w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1170px]">
      <div className="flex h-auto flex-col items-start justify-center gap-[60px] p-0 sm:w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1170px]">
        <div className="flex h-[65px] flex-row items-center justify-center p-0 sm:w-[300px] sm:gap-[109px] md:w-[700px] md:gap-[366px] lg:w-[900px] lg:gap-[565px] xl:w-[1170px] xl:gap-[835px]">
          <div className="h-[26px] w-[112px] text-nowrap text-center font-poppins text-[20px] font-normal leading-[26px] text-black">
            Wishlist ({wishlist.length})
          </div>
          <Link
            to={"/cart"}
            className="flex h-[56px] flex-row items-center justify-center gap-[10px] rounded-[4px] border border-black/50 px-[48px] py-[16px] sm:w-[143px] md:w-[223px]"
          >
            <div
            onClick={moveAllToCart}
             className="h-[24px] w-[127px] text-nowrap text-center font-poppins text-[16px] font-medium leading-[24px] text-black">
              Move All To Bag
            </div>
          </Link>
        </div>
        <div className="grid h-auto items-start gap-[30px] p-0 sm:grid-cols-1 md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 xl:w-[1170px] xl:grid-cols-4">
          {wishlist.length === 0 ? (
            <p className="text-nowrap text-[36px] font-medium leading-[40px] text-Red">
              No items in wishlist
            </p>
          ) : (
            wishlist.map((product, index) => (
<ProductCard
          key={product.id}
          showHeart={false}
          showAddToCart={true}
          hoverAddToCart={false}
          showDelete={true}
          showEye={false}
          showStars={false}
          showSpecialColors={false}
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
          showSpecialContent={[12].includes(product.id)}
          showSpecialNew={[15, 17].includes(product.id)}
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
            ))
          )}
        </div>
      </div>

      <div className="flex h-auto flex-col items-start gap-[60px] p-0 sm:w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1170px]">
        <div className="flex h-[65px] flex-row items-center justify-center p-0 sm:w-[300px] sm:gap-[56px] md:w-[700px] md:gap-[395px] lg:w-[900px] lg:lg:gap-[594px] xl:w-[1170px] xl:gap-[864px]">
          <div className="flex h-[40px] w-[156px] flex-row items-center gap-[16px]">
            <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
            <div className="h-[26px] w-[120px] text-nowrap font-poppins text-[20px] font-normal leading-[26px] text-black">
              Just For You
            </div>
          </div>
          <button
            type="button"
            className="flex h-[56px] w-[150px] flex-row items-center justify-center gap-[10px] rounded-[4px] border border-black/50 px-[48px] py-[16px]"
          >
            <div className="h-[24px] w-[54px] text-nowrap text-center font-poppins text-[16px] font-medium leading-[24px] text-black">
              See All
            </div>
          </button>
        </div>
        <div className="grid h-auto items-start gap-[30px] p-0 sm:grid-cols-1 md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 xl:w-[1170px] xl:grid-cols-4">
          {discountedProducts.length === 0 ? (
            <p className="text-nowrap text-[36px] font-medium leading-[40px] text-Red">
              No items yet
            </p>
          ) : (
            discountedProducts.map((product, index) => (
<ProductCard
          key={product.id}
          showHeart={false}
          showAddToCart={true}
          hoverAddToCart={false}
          showDelete={false}
          showEye={true}
          showStars={true}
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
      ))
    )}
        </div>
      </div>
    </div>
  );
};


Wishlist.propTypes =  {
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
      show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), 
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


export default Wishlist;
