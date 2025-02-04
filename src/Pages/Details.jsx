import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import useWishlist from "../hooks/useWishlist";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { DetailsContext } from "../contexts/DetailsContext";
import { WishlistContext } from "../contexts/wishListContext";

const Details = () => {
  const { accountData } = useUser();
  const [storedFullName, setStoredFullName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const { toggleToWishlist } = useContext(WishlistContext);
  const { details, relatedProducts } = useContext(DetailsContext);
  const product = selectedProduct || (Array.isArray(details) ? details[0] : details);
  const { isInWishlist } =
    useWishlist();
    


   

    useEffect(() => {

      if (accountData && accountData.firstName || accountData.lastName) {
        const fullName = `${capitalizeFirstLetter(accountData.firstName)} ${capitalizeFirstLetter(accountData.lastName)}`;

  
        localStorage.setItem("accountData", JSON.stringify(fullName));
        setStoredFullName(fullName); 
      } else {
       return;
      }
    }, [accountData]);

    const capitalizeFirstLetter = (string) => {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

  const handleAddToWishlist = () => {
    toggleToWishlist(product);
  };



useEffect(() => {
    if (selectedProduct) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    }
}, [selectedProduct]);

  

  const clickMinusHandler = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const clickPlussHandler = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="m-auto mb-[140px] mt-[80px] flex h-auto flex-col items-start gap-[140px] p-0 sm:w-[350px] md:w-[700px] lg:w-[900px] xl:w-[1170px]">
      {product && (
        <div className="m-auto flex h-auto flex-col items-start p-0 sm:w-[350px] md:w-[700px] lg:w-[900px] xl:w-[1170px]">
          <div>
            <div className="flex h-[21px] md:w-[353px] sm:w-[350px] flex-row text-nowrap">
            {accountData ? (
              <span className="text-center font-poppins text-[14px] font-normal leading-[21px] text-black/50">
                {storedFullName}
              </span>
              ) : null}
              <span className="md:ml-3 text-center font-poppins text-[14px] font-normal leading-[21px] text-black/50">
                /
              </span>
              {product.category ? (
                <span className="md:ml-3 md:md:mr-3 text-center font-poppins text-[14px] font-normal leading-[21px] text-black/50">
                  {product.category}
                </span>
              ) : null}
              <span className="md:mr-3 text-center font-poppins text-[14px] font-normal leading-[21px] text-black/50">
                /
              </span>
              <span className="text-center font-poppins text-[14px] font-normal leading-[21px] text-black">
                {product.name}
              </span>
            </div>
            <div className="mt-20 flex md:h-[600px] flex-col items-start md:gap-[70px] xl:w-[1170px]">
              <div className="flex md:h-[600px] md:w-[700px] sm:w-[350px] md:flex-row sm:flex-col gap-[30px]">
                {product.show ? (
                  <>
                    <div className="md:flex md:h-[600px] w-[170px] md:flex-col sm:grid sm:grid-cols-2 gap-4 ">
                      <img
                        src="src/assets/SmallImg1.svg"
                        alt="small Havic HV G-92 Gamepad image"
                      />
                      <img
                        src="src/assets/SmallImg2.svg"
                        alt="small Havic HV G-92 Gamepad image"
                      />
                      <img
                        src="src/assets/SmallImg3.svg"
                        alt="small Havic HV G-92 Gamepad image"
                      />
                      <img
                        src="src/assets/SmallImg4.svg"
                        alt="small Havic HV G-92 Gamepad image"
                      />
                    </div>
                    <div className="h-[600px] md:w-[500px] sm:w-[350px]">
                      <img
                        src="src/assets/DetailsImg.svg"
                        alt="Havic HV G-92 Gamepad image"
                      />
                    </div>
                  </>
                ) : (
                  <div className="h-[600px] md:w-[500px] sm:w-[350px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[600px] md:w-[500px] sm:w-[350px]"
                    />
                  </div>
                )}
              </div>

              <div className="flex h-[600px] md:w-[400px] sm:w-[350px] flex-col">
                {product.show ? (
                  <p className="absolute xl:left-[905px] xl:top-[323px] sm:top-[1023px] h-[24px] w-[304px] text-nowrap font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-black">
                    Havic HV G-92 Gamepad
                  </p>
                ) : (
                  <p className="absolute xl:left-[905px] xl:top-[323px] sm:top-[1023px] h-[24px] w-[304px] text-nowrap font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-black">
                    {product.name}
                  </p>
                )}
                <div className="absolute xl:left-[905px] xl:top-[363px] sm:top-[1063px] flex h-[21px] w-[290px] flex-row items-start gap-4">
                  <div className="flex h-[21px] w-[203px] flex-none flex-row items-start gap-2">
                    <div className="flex flex-row items-start">
                      {product?.rating
                        ? Object.values(product.rating).map((star, index) => (
                            <div
                              key={index}
                              className="h-[20px] w-[20px] rounded-[1.4px]"
                            >
                              <img src={star} alt={`Star ${index + 1}`} />
                            </div>
                          ))
                        : null}
                    </div>
                    <span className="h-[21px] w-[95px] flex-none font-poppins text-[14px] font-normal leading-[21px] text-black opacity-50">
                      ({product.reviews} Reviews)
                    </span>
                  </div>
                  <div className="flex h-[21px] w-[71px] flex-none flex-row items-center gap-4">
                    <div className="h-0 w-[16px] flex-none rotate-90 border border-black opacity-50"></div>
                    <span className="h-[21px] w-[55px] flex-none font-poppins text-[14px] font-normal leading-[21px] text-LightGreen opacity-60">
                      In Stock
                    </span>
                  </div>
                </div>
                {product.show ? (
                  <p className="absolute xl:left-[905px] xl:top-[400px] sm:top-[1100px] h-[24px] w-[304px] text-nowrap font-inter text-[24px] font-normal leading-[24px] tracking-[0.03em] text-black">
                    $192.00
                  </p>
                ) : (
                  <p className="absolute left-[905px] xl:top-[400px] sm:top-[1100px] h-[24px] w-[304px] text-nowrap font-inter text-[24px] font-normal leading-[24px] tracking-[0.03em] text-black">
                    ${product.price}
                  </p>
                )}
                {product.show ? (
                  <p className="absolute xl:left-[905px] xl:top-[448px] sm:top-[1148px] h-[63px] w-[373px] font-poppins text-[14px] font-normal leading-[21px] text-black">
                    PlayStation 5 Controller Skin High quality vinyl with air
                    channel adhesive for easy bubble free install & mess free
                    removal Pressure sensitive.
                  </p>
                ) : null}
                <div className="absolute xl:left-[905px] xl:top-[535px] sm:top-[1235px] h-0 md:w-[400px] sm:w-[350px] border border-black opacity-50"></div>
                <div className="absolute xl:left-[906px] xl:top-[559px] sm:top-[1259px] order-2 flex h-5 w-[155] flex-none flex-grow-0 flex-row items-start gap-6">
                  <p className="absolute h-[24px] text-nowrap font-inter text-[20px] font-normal leading-[20px] tracking-[0.03em] text-black">
                    Colours:
                  </p>
                  {product.color ? (
                    <div className="absolute ml-[107px] flex w-12 flex-row gap-2">
                      <div className="absolute flex h-5 w-5 rounded-full border-[2px] border-black">
                        <span
                          className="absolute left-[-6px] top-[-6px] m-2 h-[12px] w-[12px] rounded-full"
                          style={{ background: product.color }}
                        ></span>
                      </div>
                      <div className="absolute ml-6 h-5 w-5 rounded-full bg-Secondary2"></div>
                    </div>
                  ) : null}
                  {product.show ? (
                    <div className="absolute ml-[107px] flex w-12 flex-row gap-2">
                      <div className="absolute flex h-5 w-5 rounded-full border-[2px] border-black">
                        <span
                          className="absolute left-[-6px] top-[-6px] m-2 h-[12px] w-[12px] rounded-full"
                          style={{ background: "#A0BCE0" }}
                        ></span>
                      </div>
                      <div className="absolute ml-6 h-5 w-5 rounded-full bg-Secondary2"></div>
                    </div>
                  ) : null}
                </div>
                <div className="absolute xl:left-[906px] xl:top-[603px] sm:top-[1303px] order-2 flex h-[32px] w-[296px] flex-none flex-grow-0 flex-row items-start">
                  <span className="absolute flex w-12 flex-row gap-2 font-inter text-[20px] font-normal leading-[20px] tracking-[0.03em] text-black">
                    Size:
                  </span>
                  <div className="absolute left-[70px] order-2 flex h-[32px] w-[224] flex-none flex-grow-0 flex-row items-start gap-4">
                    <span className="ruoended-[4px] h-[32px] w-[32px] border border-black/50 pt-[5px] text-center font-poppins text-[14px] font-normal leading-[21px]">
                      XS
                    </span>
                    <span className="ruoended-[4px] h-[32px] w-[32px] border border-black/50 pt-[5px] text-center font-poppins text-[14px] font-normal leading-[21px]">
                      S
                    </span>
                    <span className="ruoended-[4px] h-[32px] w-[32px] border border-black/50 bg-Secondary2 pt-[5px] text-center font-poppins text-[14px] font-normal leading-[21px]">
                      M
                    </span>
                    <span className="ruoended-[4px] h-[32px] w-[32px] border border-black/50 pt-[5px] text-center font-poppins text-[14px] font-normal leading-[21px]">
                      L
                    </span>
                    <span className="ruoended-[4px] h-[32px] w-[32px] border border-black/50 pt-[5px] text-center font-poppins text-[14px] font-normal leading-[21px]">
                      XL
                    </span>
                  </div>
                </div>
                <div className="absolute xl:left-[906px] xl:top-[659px] sm:top-[1359px] flex h-[44px] w-[159px] flex-none flex-row items-start">
                  <button
                    type="button"
                    onClick={clickMinusHandler}
                    className="ruoended-[4px] h-[44px] w-[40px] border border-black/50 text-center font-poppins text-[20px] font-normal leading-[28px] text-black"
                  >
                    -
                  </button>
                  <span className="h-[44px] w-[80px] border-b border-t border-black/50 pt-[8px] text-center font-poppins text-[20px] font-normal leading-[28px] text-black">
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={clickPlussHandler}
                    className="ruoended-[4px] h-[44px] w-[41px] border border-black/50 bg-Secondary2 text-center font-poppins text-[20px] font-normal leading-[28px] text-white"
                  >
                    +
                  </button>
                </div>
                <button className="absolute xl:left-[1081px] sm:left-[182px] xl:top-[659px] sm:top-[1359px] flex h-[44px] md:w-[165px] sm:w-32 cursor-pointer justify-center rounded-md bg-Secondary2 p-2">
                  <span className="text-[16px] font-medium leading-6 text-white">
                    Buy Now
                  </span>
                </button>
                <div className="absolute xl:left-[1265px] xl:top-[661px] sm:top-[1361px] sm:left-80 flex h-10 w-10 border border-black/50 p-[1.5px]">
                  <button
                    onClick={handleAddToWishlist}
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
                </div>
                <div className="absolute xl:left-[906px] xl:top-[743px] sm:top-[1443px] box-border h-[180px] md:w-[399px] sm:w-[360px] rounded-[4px] border border-black/50">
                  <div className="absolute left-0 top-[90px] h-[0px] md:w-[399px] sm:w-[359px] border-b border-black/50 opacity-50"></div>
                  <div className="absolute left-[16px] top-[24px] flex h-[50px] w-[332px] flex-row items-center gap-[16px]">
                    <div className="h-[40px] w-[40px]"></div>
                    <div className="absolute bottom-0 left-0 right-0 top-0"></div>
                  </div>

                  <div className="absolute left-[16px] top-6 flex h-[50px] w-[276px] flex-row items-start gap-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_261_4843)">
                        <path
                          d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 11.8182H11.6667"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.81836 15.4545H8.48503"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 19.0909H11.6667"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_261_4843">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="absolute left-[56px] flex h-[50px] w-[276px] flex-col items-start gap-[8px]">
                      <div className="h-[24px] w-[103px] font-poppins text-[16px] font-medium leading-[24px] text-black">
                        Free Delivery
                      </div>
                      <input
                        className="h-[18px] w-[276px] font-poppins text-[12px] font-medium leading-[18px] text-black underline outline-none"
                        placeholder="Enter your postal code for Delivery Availability"
                      />
                    </div>
                  </div>
                  <div className="absolute left-[16px] top-[106px] flex h-[50px] w-[281px] flex-row items-center gap-[16px]">
                    <div className="h-[40px] w-[40px]"></div>
                    <div className="absolute bottom-[0%] left-[0%] right-[0%] top-[0%]"></div>
                  </div>

                  <div className="absolute left-[16px] top-[106px] flex h-[50px] w-[225px] flex-col items-start gap-[8px]">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_261_4865)">
                        <path
                          d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_261_4865">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="absolute left-[56px] flex h-[50px] w-[225px] flex-col items-start gap-[8px]">
                      <div className="h-[24px] w-[122px] font-poppins text-[16px] font-medium leading-[24px] text-black">
                        Return Delivery
                      </div>
                      <div className="h-[18px] w-[225px] font-poppins text-[12px] font-medium leading-[18px] text-black">
                        Free 30 Days Delivery Returns. Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-auto flex-col items-start gap-[60px] p-0 lg:m-0 sm:m-auto sm:w-[270px] xl:w-[1170px]">
        <div className="flex h-[40px] w-[100px] flex-row items-center gap-[16px]">
          <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
          <div className="h-[20px] w-[64px] text-nowrap font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
            Related Item
          </div>
        </div>
        <div className="grid h-auto items-start gap-[30px] p-0 sm:grid-cols-1 md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 xl:w-[1170px] xl:grid-cols-4">
          {relatedProducts.length === 0 ? (
            <p className="text-nowrap text-[36px] font-medium leading-[40px] text-Red">
              No items
            </p>
          ) : (
            relatedProducts?.map((product, index) => (

<ProductCard
          key={product.id}
          showHeart={true}
          showAddToCart={true}
          hoverAddToCart={true}
          showSpecialColors = {false}
          showDelete={false}
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
          showSpecialContent={[12].includes(product.id)}
          showSpecialNew={[15, 17].includes(product.id)}
          cardHeight={index < 14 ? "h-[322px]" : "h-[350px]"}
          imageTop={index === 12 ? "top-[42%]" : "top-[50%]"}
          showSpecialPrice={[1, 2, 3, 4, 5, 6, 7, 8, 9].includes(product.id)}
          showSpecialDisplayCol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18].includes(
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


export default Details;
