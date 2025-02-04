import PropTypes from "prop-types";
import useWishlist from "../hooks/useWishlist";
import { useCart } from "../contexts/CartContext";
import useDetails from "../hooks/useDetails";
import { useContext } from "react";
import { WishlistContext } from "../contexts/wishListContext";
// import useDetails from "../hooks/useDetails";



const ProductCard = ({
  product,
  showSpecialNew,
  showSpecialDiscount,
  showSpecialPrice,
  showSpecialColors = true,
  showSpecialDisplayCol,
  showSpecialDisplayRow,
  cardHeight,
  imageTop,
  showHeart = true,
  showAddToCart = true,
  hoverAddToCart = true,
  showStars = true,
  showDelete = false,
  showEye = true,
}) => {
 
 
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist } =
    useWishlist(product);
const { addToDetails, addToRelatedProducts } = useDetails(product);
console.log("Selected product:", product);
console.log("Adding to related products:", product);
const { removeFromWishlist, discountedProducts, setDiscountedProducts } = useContext(WishlistContext);

const addToJustForYou = () => {
    const isProductInList = discountedProducts.some(item => item.id === product.id);
    
    if (!isProductInList) {
      setDiscountedProducts(prevProducts => [...prevProducts, product]);
    } else {
      console.log("Product is already in Just For You");
    }

};



  return (
    <div key={product.id} className="product">
      <div
        className={`flex ${cardHeight} w-[270px] transform flex-col items-start gap-4 transition-transform duration-300 ease-in-out hover:z-10 sm:mt-[150px] sm:h-[370px] md:mt-0 lg:h-[350px]`}
      >
        <div className="relative h-[250px] w-[270px] rounded-[4px] bg-Secondary">
          {showSpecialNew && (
            <div className="absolute left-[12px] top-[12px] flex h-[26px] w-[55px] flex-row items-center justify-center rounded-[4px] bg-LightGreen p-[4px_12px]">
              <span className="font-poppins text-[12px] font-normal leading-[18px] text-Text">
                New
              </span>
            </div>
          )}

          {showSpecialDiscount ? (
            <div className="absolute left-[12px] top-[12px] flex h-[26px] w-[55px] flex-row items-center justify-center rounded-[4px] bg-Secondary2 p-[4px_12px]">
              <span className="font-poppins text-[12px] font-normal leading-[18px] text-Text">
                -{product.discount}%
              </span>
            </div>
          ) : null}
{showAddToCart &&(
          <button
            onClick={() => addToCart(product)}
            className={`absolute bottom-0 left-0 right-0 h-[41px] w-full rounded-b-[4px] bg-black transition-opacity duration-300 ${
              hoverAddToCart ? 'opacity-0 hover:opacity-100' : 'opacity-100'
            }`}
          >
            <div className="absolute left-1/2 top-2 z-50 h-[24px] w-[96px] -translate-x-1/2 transform text-[16px] font-medium leading-[24px] text-Text">
              Add To Cart
            </div>
          </button>)}

          <div className="absolute right-[12px] top-[12px] flex flex-col gap-[8px]">
            {showHeart && (
              <button
              onClick={() => {
                addToWishlist(product)
                addToJustForYou(product)
              }}
              className={isInWishlist ? "remove" : "add"}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isInWishlist ? "fill-Red" : ""}
              >
                <circle cx="17" cy="17" r="17" fill="white" />
                <path
                  d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z"
                  stroke={!isInWishlist ? "black" : "white"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

{showDelete && (
  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <img src="src/assets/DeleteIcon.svg" alt="Delete icon" />
                  </button>
)}
          
              {showEye && (
                <button
                onClick={() => {
                  addToDetails(product);
                  addToRelatedProducts(product);
                }}
                
                 className="relative h-[34px] w-[34px]"

              >
                <img src="src/assets/Fill Eye.svg" alt="eye icon" />
              </button>
            )}
          </div>

          <button 
          

             type="button"
            className={`absolute left-[50%] ${imageTop} h-[152px] w-[172px] -translate-x-1/2 -translate-y-1/2 transform`}
          >
              <img src={product.image} alt={product.name} />
          </button>
        </div>

        {showSpecialDisplayCol && (
          <div className="flex h-auto w-[201px] flex-col items-start gap-[8px] text-nowrap">
            <span className="font-poppins text-[16px] font-medium leading-[24px] text-black">
              {product.name}
            </span>

            <div className="flex flex-row items-start gap-[12px]">
              <span className="font-poppins text-[16px] font-medium leading-[24px] text-Secondary2">
                ${product.price}
              </span>
              {showSpecialPrice && (
                <span className="font-poppins text-[16px] font-medium leading-[24px] text-black line-through opacity-50">
                  ${product.originalPrice}
                </span>
              )}
            </div>
{showStars && (
            <div className="flex flex-row items-start gap-[8px]">
              <div className="flex flex-row items-start">
                {product.rating.map((star, index) => (
                  <div
                    key={index}
                    className="h-[20px] w-[20px] rounded-[1.4px]"
                  >
                    <img src={star} alt={`Star ${index + 1}`} />
                  </div>
                ))}
              </div>
              <span className="font-poppins text-[14px] font-semibold leading-[21px] text-black opacity-50">
                ({product.reviews})
              </span>
            </div>
            )}
          </div>
        )}

        {showSpecialDisplayRow && (
          <div className="flex h-auto w-[201px] flex-col items-start gap-[8px] text-nowrap">
            <span className="font-poppins text-[16px] font-medium leading-[24px] text-black">
              {product.name}
            </span>

            <div className="flex flex-row items-start gap-[12px]">
              <span className="font-poppins text-[16px] font-medium leading-[24px] text-Secondary2">
                ${product.price}
              </span>
              {showStars && (
            <div className="flex flex-row items-start gap-[8px]">
              <div className="flex flex-row items-start">
                {product.rating.map((star, index) => (
                  <div
                    key={index}
                    className="h-[20px] w-[20px] rounded-[1.4px]"
                  >
                    <img src={star} alt={`Star ${index + 1}`} />
                  </div>
                ))}
              </div>
              <span className="font-poppins text-[14px] font-semibold leading-[21px] text-black opacity-50">
                ({product.reviews})
              </span>
            </div>
            )}
            </div>
          </div>
        )}

        {showSpecialColors && (
          <div className="order-2 flex h-5 w-12 flex-none flex-grow-0 flex-row items-start gap-2 p-0">
            <div className="absolute flex h-5 w-5 rounded-full border-[2px] border-black">
              <span
                className="absolute left-[-6px] top-[-6px] m-2 h-[12px] w-[12px] rounded-full"
                style={{ background: product.color }}
              ></span>
            </div>
            <div className="absolute ml-6 h-5 w-5 rounded-full bg-Secondary2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
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
  showHeart: PropTypes.bool,
};

export default ProductCard;
