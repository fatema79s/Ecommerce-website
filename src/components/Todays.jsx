import PropTypes from "prop-types";
import CountDown from "./Countdown";
import { useEffect, useRef, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const Todays = ({ products, searchTerm, transform }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformValue, setTransformValue] = useState("translateX(0)");
  const [isMoving, setIsMoving] = useState(false);
  const [productsToShow, setProductsToShow] = useState(4); 

  const filteredProducts = products
    .filter((product) => product.group === "groupA")
    .filter((product) => 
      product.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + (3 * 24 * 60 * 60) + (23 * 60 * 60) + (19 * 60) + 56);
  const productWidth = 295;

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

    return () => window.removeEventListener("resize", updateProductsToShow);
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
    const maxIndex = productsCount - productsToShow;

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
      <div className="absolute flex flex-col items-start gap-[40px] sm:left-[8%] sm:mt-[595px] sm:h-[700px] md:left-[5%] md:mt-[200px] lg:mt-[285px] lg:h-[669px] xl:left-[135px] xl:w-[1308px]">
        <div className="flex h-[103px] w-[1170px] flex-row items-end gap-[470px]">
          <div className="flex h-[103px] w-[600px] flex-row items-end gap-[87px]">
            <div className="flex h-[103px] w-[211px] flex-col items-start gap-[24px]">
              <div className="flex h-[40px] w-[100px] flex-row items-center gap-[16px]">
                <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
                <div className="h-[20px] w-[64px] font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
                  Today’s
                </div>
              </div>
              <div className="h-[48px] w-[211px] whitespace-nowrap font-inter font-semibold leading-[48px] tracking-[0.04em] text-black sm:text-[30px] lg:text-[36px]">
                Flash Sales
              </div>
            </div>

            <div className="flex flex-row items-end sm:absolute sm:top-32 md:relative md:top-0">
              <CountDown targetDate={targetDate} />
            </div>

            <div className="z-10 flex h-[46px] w-[100px] flex-row items-end gap-2 sm:absolute sm:left-[19%] sm:top-[210px] sm:float-end md:relative md:left-[0%] md:top-0 lg:left-[35%] xl:left-[440px]">
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
                />
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
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-[100vw] overflow-x-hidden" ref={carouselRef}>
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: transformValue,
            }}
          >
             <div className="flex md:h-[425px] flex-row items-start gap-[30px] transition-transform duration-300 ease-in-out sm:z-10 sm:pl-0 sm:pt-[0px] md:pl-0 md:pt-0 xl:w-[1170px]" style={{ transform }}>
        {filteredProducts.map((product, index) => (
          <ProductCard
          key={product.id}
          showHeart={true}
          showStars = {true}
          showAddToCart={true}
          hoverAddToCart={true}
          showSpecialColors = {false}
          groupName="Group A"
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
            transform={transformValue}
            searchTerm={searchTerm}
            showSpecialContent={[2].includes(product.id)}
            showSpecialDiscount={[1, 2, 3, 4, 5, 6].includes(product.id)}
            showSpecialPrice={[1, 2, 3, 4, 5, 6].includes(product.id)}
            showSpecialDisplayCol={[1, 2, 3, 4, 5, 6].includes(product.id)}
            imageTop={index === 12 ? "top-[42%]" : "top-[50%]"}
          />
        ))}
      </div>
              
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="relative flex h-[56px] w-[234px] items-center justify-center gap-2.5 rounded-md bg-Secondary2 p-4 sm:mt-[1305px] md:mt-[755px] lg:mt-[825px]"
          type="button"
        >
          <Link
            to="/productlist"
           className="cursor-pointer text-[16px] font-medium leading-6 text-white">
            View All Products
          </Link>
        </button>
      </div>
      <span className="flex w-[100%] flex-1 border-b-[0.5px] border-black border-opacity-30 sm:mt-[60px] lg:mt-[53px]"></span>
    </>
  );
};






Todays.propTypes = {
  products: PropTypes.array.isRequired,  
  searchTerm: PropTypes.string.isRequired,  
};

export default Todays;
