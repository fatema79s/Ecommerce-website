import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useCart } from "../contexts/CartContext";

const Cart = ({ product }) => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [nestedLinks, setNestedLinks] = useState([]);
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 768);

  const {
    cart,

    subtotal,
    total,
    increment,
    decrement,
    removeFromCart,

    message,
    applyCoupon,
    couponChangeHandler,
    temporaryCouponCode,

    updateCart,
    shipping,
  } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname === "/cart") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    const pathArray = location.pathname.split("/").filter((path) => path);
    setNestedLinks(pathArray);
  }, [location.pathname]);

  return (
    <>
      <div>
        {isVisible && (
          <div className="absolute top-[222px] flex h-[21px] w-[134px] flex-row gap-[14px] sm:ml-[12%] md:ml-[3%] lg:ml-[14%] xl:ml-[138px]">
            <nav>
              <ul className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm font-normal text-black opacity-50"
                  >
                    Home /
                  </Link>
                </li>

                {location.pathname
                  .split("/")
                  .filter((segment) => segment)
                  .map((segment, index, array) => {
                    const path = `/${array.slice(0, index + 1).join("/")}`;
                    const isActive = index === array.length - 1;

                    return (
                      <li
                        key={index}
                        className="flex items-center pt-1 text-center text-sm font-normal"
                      >
                        {index > 0 && (
                          <span className="text-gray-500 mx-1">/</span>
                        )}
                        <Link
                          to={path}
                          className={`${
                            isActive
                              ? "text-black opacity-100"
                              : "text-black opacity-50"
                          }`}
                        >
                          {segment}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        )}
      </div>
      {!isSmall ? (
        <div className="relative m-auto mt-[160px] flex h-auto flex-col items-start gap-[80px] p-0 sm:mb-[140px] lg:mb-[300px] lg:w-[1000px] xl:mb-[140px] xl:w-[1170px]">
          <div className="flex h-auto flex-col items-start gap-[24px] p-0 lg:w-[1000px] xl:w-[1170px]">
            <div className="flex h-auto flex-col items-start gap-[40px] p-0 xl:w-[1170px]">
              <div className="order-0 h-[72px] flex-none flex-grow-0 flex-row rounded-[4px] bg-white shadow-[0px_1px_13px_rgba(0,_0,_0,_0.05)] lg:w-[1000px] xl:w-[1170px]">
                <div className="absolute top-[24px] flex h-[24px] flex-row items-center p-0 lg:m-auto lg:gap-56 xl:left-[40px] xl:m-0 xl:w-[1091px] xl:gap-[284px]">
                  <div className="h-[24px] w-[63px] font-poppins text-[16px] leading-[24px] text-black">
                    Product
                  </div>
                  <div className="h-[24px] w-[39px] font-poppins text-[16px] leading-[24px] text-black">
                    Price
                  </div>
                  <div className="h-[24px] w-[69px] font-poppins text-[16px] leading-[24px] text-black">
                    Quantity
                  </div>
                  <div className="h-[24px] w-[68px] font-poppins text-[16px] leading-[24px] text-black">
                    Subtotal
                  </div>
                </div>
              </div>
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="relative order-1 flex h-[102px] flex-row items-center text-nowrap rounded-[4px] bg-white text-center shadow-[0px_1px_13px_rgba(0,_0,_0,_0.05)] lg:w-[1000px] lg:gap-[128px] xl:w-[1170px] xl:gap-[177px]"
                  >
                    <div className="flex flex-row items-center xl:gap-5 xl:pl-10">
                      <div className="h-[54px] w-[54px]">
                        <img src={product.image} alt={product.name} />
                      </div>

                      <button
                        className="absolute top-4 ml-[-10px]"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeFromCart(product.id);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="9" fill="#DB4444" />
                          <path
                            d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div className="left-[114px] top-[39px] h-[24px] w-[96px] font-poppins text-[16px] leading-[24px] text-black">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex flex-row lg:gap-[236px] xl:gap-[282px]">
                      <div className="left-[387px] top-[39px] h-[24px] w-[41px] font-poppins text-[16px] leading-[24px] text-black">
                        {product.price}
                      </div>

                      <div className="left-[710px] top-[29px] flex h-[44px] w-[72px] flex-row gap-4 rounded-[4px] border-[1.5px] border-[#00000066] border-opacity-40 pt-1">
                        <div className="h-[24px] w-[16px] pl-3 pt-1 font-poppins text-[16px] leading-[24px] text-black">
                          {product.count}
                        </div>

                        <div className="flex h-[32px] w-[48px] flex-col items-center p-0">
                          <button
                            className="h-4 w-4"
                            onClick={() => increment(product.id)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.75732 7.36666L4.45732 10.6667L3.51465 9.72399L7.75732 5.48132L12 9.72399L11.0573 10.6667L7.75732 7.36666Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                          <button
                            className="h-4 w-4"
                            onClick={() => decrement(product.id)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.24268 8.63334L11.5427 5.33334L12.4854 6.27601L8.24268 10.5187L4.00002 6.27601L4.94268 5.33334L8.24268 8.63334Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="left-[1063px] top-[39px] h-[24px] w-[41px] font-poppins text-[16px] leading-[24px] text-black">
                        {(product.price * product.count).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-nowrap pl-10 text-[36px] font-medium leading-[40px] text-Red">
                  Your cart is empty.
                </p>
              )}
            </div>
            <div className="flex h-[56px] w-[1170px] flex-row items-start p-0 lg:gap-[585px] xl:gap-[757px]">
              <Link
                to={"/home"}
                className="box-border flex h-[56px] w-[195px] flex-row items-center justify-center gap-[10px] rounded-[4px] border border-[rgba(0,0,0,0.5)] p-[16px_48px]"
              >
                <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-[#000000]">
                  Return To Shop
                </span>
              </Link>
              <button
                onClick={updateCart}
                className="box-border flex h-[56px] w-[218px] flex-row items-center justify-center gap-[10px] rounded-[4px] border border-[rgba(0,0,0,0.5)] p-[16px_48px]"
              >
                <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-[#000000]">
                  Update Cart
                </span>
              </button>
            </div>
          </div>
          <div className="flex h-[324px] items-start lg:w-[1000px] lg:flex-col lg:gap-[100px] xl:w-[1170px] xl:flex-row xl:gap-[173px]">
            <div className="flex h-[56px] w-[527px] flex-col gap-4">
              <div className="flex h-[56px] w-[527px] flex-row items-end gap-4">
                <div className="box-border h-[56px] w-[300px] rounded-[4px] border border-black">
                  <input
                    type="text"
                    value={temporaryCouponCode}
                    onChange={couponChangeHandler}
                    placeholder="Coupon Code"
                    className="h-[24px] w-[276px] text-nowrap py-4 pl-6 pt-7 font-poppins text-[16px] leading-[24px] text-black opacity-50 outline-none"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="flex h-[56px] w-[211px] flex-row items-center justify-center gap-[10px] rounded-[4px] bg-[#DB4444] px-[48px] py-[16px]"
                >
                  <span className="font-poppins text-[16px] leading-[24px] text-white">
                    Apply Coupon
                  </span>
                </button>
              </div>
              {message && (
                <div className="text-[16px] text-black">{message}</div>
              )}
            </div>
            <div className="box-border h-[324px] w-[470px] text-nowrap rounded-[4px] border-[1.5px] border-black px-6 py-8">
              <div className="left-[24px] top-[32px] h-[28px] w-[100px] font-poppins text-[20px] leading-[28px] text-black">
                Cart Total
              </div>
              <div className="mt-6 flex h-[24px] w-[422px] flex-row items-start gap-[282px] text-nowrap">
                <div className="h-[24px] w-[71px] font-poppins text-[16px] leading-[24px] text-black">
                  Subtotal:
                </div>
                <div className="pt- h-[24px] w-[44px] font-poppins text-[16px] leading-[24px] text-black">
                  ${subtotal}
                </div>
              </div>
              <div className="mt-4 h-[0px] w-[422px] border-b border-black opacity-[0.4]"></div>
              <div className="mt-4 flex h-[24px] w-[422px] flex-row items-start gap-[310px] text-nowrap">
                <div className="h-[24px] w-[74px] font-poppins text-[16px] leading-[24px] text-black">
                  Shipping:
                </div>
                <div className="h-[24px] w-[34px] font-poppins text-[16px] leading-[24px] text-black">
                  {shipping()}
                </div>
              </div>
              <div className="mt-4 h-[0px] w-[422px] border-b border-black opacity-[0.4]"></div>
              <div className="mt-4 flex h-[24px] w-[422px] flex-row items-start gap-[310px] text-nowrap">
                <div className="h-[24px] w-[43px] font-poppins text-[16px] leading-[24px] text-black">
                  Total:
                </div>
                <div className="h-[24px] w-[44px] font-poppins text-[16px] leading-[24px] text-black">
                  ${total}
                </div>
              </div>
              <Link
                to={"/checkout"}
                className="m-auto mt-4 flex h-[56px] w-[260px] flex-row items-center justify-center gap-[10px] text-nowrap rounded-[4px] bg-[#DB4444] px-[48px] py-[16px]"
              >
                <span className="font-poppins text-[16px] leading-[24px] text-white">
                  Procees to checkout
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mb-36 mt-40 flex w-[100%] flex-col items-start gap-20 p-0">
          <div className="flex h-auto w-[100%] flex-col items-start gap-6 p-0">
            <div className="flex w-[100%] flex-col items-start gap-10 p-0">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="m-auto flex h-[250px] w-[100%] flex-none flex-col items-center gap-20 rounded bg-white shadow-md"
                  >
                    <div className="m-auto flex h-[220px] flex-col">
                      <div className="relative m-auto flex flex-col items-center gap-4 rounded">
                        <div className="flex flex-row items-center gap-9">
                          <div className="font-poppins text-base text-black">
                            Product
                          </div>
                          <div className="flex flex-row items-center">
                            <div className="h-14 w-14">
                              <img src={product.image} alt={product.name} />
                            </div>
                            <button
                              className="absolute mt-[-50px]"
                              onClick={(event) => {
                                event.stopPropagation();
                                removeFromCart(product.id);
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="9" fill="#DB4444" />
                                <path
                                  d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <div className="text-nowrap font-poppins text-base text-black">
                              {product.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-[254px]">
                          <div className="font-poppins text-base text-black">
                            Price
                          </div>
                          <div className="font-poppins text-base text-black">
                            {product.price}
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-44">
                          <div className="font-poppins text-base text-black">
                            Quantity
                          </div>

                          <div className="left-[710px] top-[29px] flex h-[44px] w-[72px] flex-row gap-4 rounded-[4px] border-[1.5px] border-[#00000066] border-opacity-40 pt-1">
                            <div className="h-[24px] w-[16px] pl-3 pt-1 font-poppins text-[16px] leading-[24px] text-black">
                              {product.count}
                            </div>

                            <div className="flex h-[32px] w-[48px] flex-col items-center p-0">
                              <button
                                className="h-4 w-4"
                                onClick={() => increment(product.id)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.75732 7.36666L4.45732 10.6667L3.51465 9.72399L7.75732 5.48132L12 9.72399L11.0573 10.6667L7.75732 7.36666Z"
                                    fill="black"
                                  />
                                </svg>
                              </button>
                              <button
                                className="h-4 w-4"
                                onClick={() => decrement(product.id)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.24268 8.63334L11.5427 5.33334L12.4854 6.27601L8.24268 10.5187L4.00002 6.27601L4.94268 5.33334L8.24268 8.63334Z"
                                    fill="black"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-[200px]">
                          <div className="font-poppins text-base text-black">
                            Subtotal
                          </div>
                          <div className="font-poppins text-base text-black">
                            {(product.price * product.count).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-nowrap pl-10 text-[36px] font-medium leading-[40px] text-Red">
                  Your cart is empty.
                </p>
              )}
            </div>
            <div className="m-auto mt-10 flex h-[56px] flex-row justify-between gap-4">
              <Link
                to={"/home"}
                className="box-border flex h-[56px] w-40 items-center justify-center gap-2 rounded-[4px] border border-[rgba(0,0,0,0.5)] p-[16px_48px]"
              >
                <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-[#000000]">
                  Return To Shop
                </span>
              </Link>
              <button
                onClick={updateCart}
                className="box-border flex h-[56px] w-44 flex-row items-center justify-center gap-[10px] rounded-[4px] border border-[rgba(0,0,0,0.5)] p-[16px_48px]"
              >
                <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-[#000000]">
                  Update Cart
                </span>
              </button>
            </div>
          </div>
          <div className="m-auto flex flex-col gap-20">
            <div className="flex h-[56px] w-[360px] flex-col gap-4">
              <div className="flex h-[56px] w-[360px] flex-row items-end gap-4">
                <div className="box-border h-[56px] w-40 rounded-[4px] border border-black">
                  <input
                    type="text"
                    value={temporaryCouponCode}
                    onChange={couponChangeHandler}
                    placeholder="Coupon Code"
                    className="h-[24px] w-40 text-nowrap py-4 pl-6 pt-7 font-poppins text-[16px] leading-[24px] text-black opacity-50 outline-none"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="flex h-[56px] w-44 flex-row items-center justify-center gap-[10px] rounded-[4px] bg-[#DB4444] px-[48px] py-[16px]"
                >
                  <span className="text-nowrap font-poppins text-[16px] leading-[24px] text-white">
                    Apply Coupon
                  </span>
                </button>
              </div>
              {message && (
                <div className="text-[16px] text-black">{message}</div>
              )}
            </div>
            <div className="border-gray-400 box-border w-full rounded border p-4 lg:w-96">
              <div className="text-lg font-medium">Cart Total</div>
              <div className="mt-6 flex flex-row justify-between">
                <div className="font-medium">Subtotal:</div>
                <div>${subtotal}</div>
              </div>
              <div className="border-gray-400 mt-4 border-b"></div>
              <div className="mt-4 flex flex-row justify-between">
                <div className="font-medium">Shipping:</div>
                <div>{shipping()}</div>
              </div>
              <div className="border-gray-400 mt-4 border-b"></div>
              <div className="mt-4 flex flex-row justify-between">
                <div className="font-medium">Total:</div>
                <div>${total}</div>
              </div>
              <Link
                to={"/checkout"}
                className="m-auto mt-4 flex h-[56px] w-[260px] flex-row items-center justify-center gap-[10px] text-nowrap rounded-[4px] bg-[#DB4444] px-[48px] py-[16px]"
              >
                <span className="font-poppins text-[16px] leading-[24px] text-white">
                  Procees to checkout
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

Cart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
};
