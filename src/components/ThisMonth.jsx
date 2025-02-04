import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ThisMonth = ({ products, searchTerm }) => {
  const filteredProducts = products
    .filter((product) => product.group === "groupB")
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

  return (
    <div className="absolute flex h-[518px] flex-col items-start sm:left-[8%] sm:top-[2398px] sm:w-[100%] sm:gap-0 md:left-[5%] md:top-[1808px] md:gap-[60px] lg:top-[1868px] xl:left-[135px] xl:w-[1170px]">
      <div className="flex h-[108px] flex-row items-end sm:w-[100%] sm:gap-0 md:gap-[20%] lg:gap-[39%] xl:w-[1170px] xl:gap-[611px]">
        <div className="flex h-[108px] w-[400px] flex-col items-start sm:gap-10 md:gap-5">
          <div className="flex h-[40px] w-[125px] flex-row items-center gap-4">
            <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
            <div className="h-[20px] w-[89px] font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
              This Month
            </div>
          </div>
          <div className="h-[48px] text-nowrap font-inter font-semibold leading-[48px] tracking-[0.04em] text-black sm:w-[75%] sm:text-[30px] md:w-[400px] md:whitespace-nowrap md:text-[36px]">
            Best Selling Products
          </div>
        </div>
        <div className="top-0 flex w-[159px] cursor-pointer justify-center rounded-md bg-Secondary2 sm:absolute sm:ml-[45%] sm:h-[40px] sm:p-2 md:relative md:ml-0 md:h-[56px] md:p-4">
          <Link
            to="/productlist"
            className="text-[16px] font-medium leading-6 text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="flex w-[100vw] transition-transform duration-500 ease-in-out">
        <div
          className="order-1 flex flex-none flex-shrink-0 flex-grow-0 snap-x snap-mandatory snap-start flex-row items-start overflow-x-auto p-0 transition-transform duration-300 ease-in-out sm:mt-[-50px] sm:w-[calc(100%+30px)] sm:gap-[60px] md:mt-0 md:h-[380px] md:w-[calc(100%+30px)] md:gap-[30px] xl:w-[1170px]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              showHeart={true}
              showStars={true}
              showAddToCart={true}
              hoverAddToCart={true}
              showSpecialColors={false}
              groupName="Group B"
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
              showSpecialPrice={[7, 8, 9].includes(product.id)}
              showSpecialDisplayCol={[7, 8, 9, 10].includes(product.id)}
              imageTop={index === 12 ? "top-[42%]" : "top-[50%]"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThisMonth;

ThisMonth.propTypes = {
  products: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
