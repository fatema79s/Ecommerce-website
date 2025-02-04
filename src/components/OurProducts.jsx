import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const OurProducts = ({ products, searchTerm, transform }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformValue, setTransformValue] = useState("translateX(0)");
  const [isMoving, setIsMoving] = useState(false);
  const [productsToShow, setProductsToShow] = useState(4);

  const filteredProducts = products
    .filter((product) => product.group === "groupC")
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

  const productWidth = 280;

  useEffect(() => {
    const updateProductsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1250) {
        setProductsToShow(4);
      } else if (width >= 900) {
        setProductsToShow(3);
      } else if (width >= 600) {
        setProductsToShow(2);
      } else {
        setProductsToShow(1);
      }
    };

    window.addEventListener("resize", updateProductsToShow);
    updateProductsToShow();

    return () => {
      window.removeEventListener("resize", updateProductsToShow);
    };
  }, []);

  const moveCarousel = (direction) => {
    if (isMoving) return;
    setIsMoving(true);

    const carousel = carouselRef.current;
    if (!carousel) {
      console.error("Carousel reference is null");
      setIsMoving(false);
      return;
    }

    const products = carousel.getElementsByClassName("product");
    const productsCount = products.length;
    const maxIndex = (productsCount - productsToShow) / 2;

    let newIndex = currentIndex;

    if (direction === "next") {
      if (currentIndex >= maxIndex) {
        setIsMoving(false);
        return;
      }
      newIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setTransformValue(`translateX(-${newIndex * productWidth}px)`);
    }

    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };
  return (
    <>
      <div className="absolute flex h-[1016px] flex-col items-start p-0 sm:left-[8%] sm:top-[3945px] md:left-[5%] md:top-[3298px] lg:top-[3098px] xl:left-[135px] xl:w-[1170px]">
        <div className="flex w-[1170px] flex-col sm:gap-[110px] md:h-[900px] md:gap-[60px]">
          <div className="flex h-[108px] w-[1170px] flex-row items-end sm:gap-0 md:gap-[20%] xl:gap-[672px]">
            <div className="flex h-[108px] w-[400px] flex-col items-start gap-[20px]">
              <div className="flex h-[40px] w-[142px] flex-row items-center gap-[16px]">
                <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
                <div className="h-[20px] w-[106px] text-nowrap font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
                  Our Products
                </div>
              </div>
              <div className="h-[48px] w-[398px] whitespace-nowrap font-inter font-semibold leading-[48px] tracking-[0.04em] text-black sm:text-[30px] md:text-[36px]">
                Explore Our Products
              </div>
            </div>
            <div className="flex h-[46px] w-[100px] flex-row items-end gap-2 sm:absolute sm:left-[19%] sm:top-[130px] md:relative md:left-[0%] md:top-0 lg:left-[17%] xl:left-0">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  moveCarousel("prev");
                }}
                className="h-[46px] w-[46px] cursor-pointer"
                disabled={isMoving}
              >
                <img
                  src="src/assets/Fill With Left Arrow.svg"
                  alt="Left Arrow image"
                ></img>
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  moveCarousel("next");
                }}
                className="h-[46px] w-[46px] cursor-pointer"
                disabled={isMoving}
              >
                <img
                  src="src/assets/Fill with Right Arrow.svg"
                  alt="Right Arrow image"
                ></img>
              </button>
            </div>
          </div>

          <div className="w-[100vw] overflow-x-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: transformValue,
              }}
            >
              <div
                className="grid grid-cols-4 items-start p-0 transition-transform duration-300 ease-in-out sm:mt-[-150px] sm:gap-x-[300px] md:mt-0 md:h-[732px] md:gap-y-[30px] lg:gap-x-[30px] xl:w-[1170px]"
                style={{ transform }}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showHeart={true}
                    showStars={true}
                    showAddToCart={true}
                    hoverAddToCart={true}
                    groupName="Group C"
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
                    searchTerm={searchTerm}
                    showSpecialContent={[12].includes(product.id)}
                    showSpecialNew={[15, 17].includes(product.id)}
                    showSpecialColors={[15, 16, 17, 18].includes(product.id)}
                    showSpecialDisplayRow={[
                      11, 12, 13, 14, 15, 16, 17, 18,
                    ].includes(product.id)}
                    cardHeight={index < 14 ? "h-[322px]" : "h-[350px]"}
                    imageTop={index === 12 ? "top-[42%]" : "top-[50%]"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="relative mb-3 flex h-[56px] w-[234px] items-center justify-center gap-2.5 rounded-[4px] bg-Secondary2 p-4 sm:top-[2760px] md:top-[2510px] lg:top-[2270px]"
          type="button"
        >
          <Link
            to="/productlist"
            className="cursor-pointer text-[16px] font-medium leading-6 text-white"
          >
            View All Products
          </Link>
        </button>
      </div>
    </>
  );
};

OurProducts.propTypes = {
  products: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default OurProducts;
