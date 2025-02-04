import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import _ from 'lodash';
import { useCart } from "../contexts/CartContext";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";


const CheckOut = (product) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nestedLinks, setNestedLinks] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { accountData, setAccountData, selectedPayment, setSelectedPayment, saveBillingDetails, fetchAccountDetails } = useUser();


  const formFields = [
    { id: "firstName", label: "First Name", type: "text", required: true },
    { id: "companyName", label: "Company Name", type: "text", required: false },
    {
      id: "streetAddress",
      label: "Street Address",
      type: "text",
      required: true,
    },
    { id: "apartment", label: "Apartment", type: "text", required: false },
    { id: "townCity", label: "Town/City", type: "text", required: true },
    { id: "phoneNumber", label: "Phone Number", type: "tel", required: true },
    {
      id: "emailAddress",
      label: "Email Address",
      type: "email",
      required: true,
    },
  ];

  const {
    cart,
    calculateDiscountedPrice,
    calculateSubtotal,
    applyCoupon,
    couponChangeHandler,
    temporaryCouponCode,
    shipping,
  } = useCart();


  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  const changeFormHandler = (e) => {
    const { id, value } = e.target;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = _.debounce(() => {
      setAccountData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }, 500)();

    setTimeoutId(newTimeoutId);
  };

  const saveFormHandler = async () => {
    if (!accountData.firstName || !accountData.streetAddress || !accountData.townCity || !accountData.phoneNumber || !accountData.emailAddress) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        await saveBillingDetails(accountData);
        alert("Your billing information has been saved successfully!");
    } catch (error) {
        console.error("Error saving billing details:", error.message);
        alert("Failed to save your billing information. Please try again.");
    }
};
  

const selectedPaymentMethodHandler = async (paymentMethod) => {
  setSelectedPayment(paymentMethod);
  await saveBillingDetails({ ...accountData, paymentMethod });
  const updatedData = await fetchAccountDetails();
  console.log("Fetched Data:", updatedData);
};

useEffect(() => {
  fetchAccountDetails();
}, []);


const placeOrderHandler = async () => {
  if (!auth.currentUser) {
      alert("User is not logged in.");
      return;
  }

  if (!selectedPayment || !accountData.firstName || !accountData.streetAddress || 
      !accountData.townCity || !accountData.phoneNumber || !accountData.emailAddress) {
      alert("Please fill in all required fields and select a payment method.");
      return;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
      alert("Your cart is empty.");
      return;
  }

  const orderData = {
      userId: auth.currentUser.uid,
      items: cart,
      total: calculateDiscountedPrice(),
      paymentMethod: selectedPayment,
      shippingAddress: accountData,
      orderDate: new Date(),
  };

  try {
      console.log("Order Data:", orderData);
      const orderDoc = doc(db, "orders", `${auth.currentUser.uid}_${Date.now()}`);
      await setDoc(orderDoc, orderData);
      setOrderSuccess(true);
  } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place your order. Please try again.");
  }
};



  const closeOverlay = () => {
    setOrderSuccess(false); 
    navigate("/account");
  };

  useEffect(() => {
    const pathArray = location.pathname.split("/").filter((path) => path);

    const updatedNestedLinks = ["Account", ...pathArray, "CheckOut"];
    setNestedLinks(updatedNestedLinks);
  }, [location.pathname]);

  return (
    <>
      <div className="absolute top-[222px] flex h-[21px] w-[134px] flex-row items-center gap-[14px] text-nowrap sm:left-12 lg:left-[135px]">
        <nav>
          <ul className="flex items-center space-x-2">
          {nestedLinks.map((segment, index) => {
            const isActive = index === nestedLinks.length - 1;
            const path =
              index === 0
                ? "/"
                : `/${nestedLinks.slice(1, index).join("/")}`;

              return (
                <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-1 xt-black opacity-50">/</span>}
                {isActive ? (
                  <span className="text-black opacity-100">{segment}</span>
                ) : (
                  <Link
                    to={path}
                    className="text-sm font-normal text-black opacity-50"
                  >
                    {segment}
                  </Link>
                )}
              </li>
            );
          })}
          </ul>
        </nav>
      </div>

      <div className="absolute top-[323px] flex h-[30px] w-[252px] flex-col items-start gap-[24px] text-nowrap font-inter text-[36px] font-medium leading-[30px] tracking-[0.04em] text-black sm:left-10 md:left-[135px]">
        Billing Details
      </div>
      <div className="mb-[140px] flex gap-[173px] sm:flex-col xl:flex-row">
        <form className="mt-[260px] flex h-[814px] flex-col items-start gap-[24px] sm:ml-10 md:ml-[135px] lg:w-[470px]">
          <div className="flex h-[766px] flex-col items-start gap-[32px] md:w-[470px]">
            {formFields.map((field) => (
              <div
                key={field.id}
                className="flex h-[82px] flex-col items-start gap-[8px] md:w-[470px]"
              >
                <label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-Secondary2">*</span>}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={accountData[field.id]}
                  onChange={changeFormHandler}
                  className="h-[50px] text-nowrap rounded-[4px] bg-[#F5F5F5] pl-5 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 outline-none md:w-[470px]"
                />
              </div>
            ))}
          </div>

          <div className="flex h-[24px] w-[451px] flex-row items-start gap-[16px]">
            <button
              onClick={saveFormHandler}
              type="button"
              className="relative h-[24px] w-[24px] rounded-[4px] bg-Secondary2 outline-none px-1 py-[6px]"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6L6.25 11L15 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="md:-[24px] text-nowrap font-poppins text-black sm:text-[11px] sm:font-semibold md:text-[16px] md:font-normal">
              Save this information for faster check-out next time
            </div>
          </div>
        </form>

        <div className="sm:w-[370px] flex h-auto flex-col items-start gap-8 sm:m-auto md:w-[527px] xl:m-0 xl:pt-[291px] xl:left-[778px]">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex h-[140px] flex-col items-end gap-8 sm:m-auto xl:m-0 sm:w-[370px] md:w-[425px]"
            >
              <div className="flex h-[54px] flex-row items-center gap-6 sm:w-[370px] md:w-[425px]">
                <div className="h-[54px] w-[54px] bg-cover bg-center">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="flex h-[24px] w-[347px] flex-row items-center justify-between">
                  <span className="font-poppins text-[16px] leading-[24px] text-black">
                    {product.name}
                  </span>
                  <span className="font-poppins text-[16px] leading-[24px] text-black">
                    {(product.price * product.count).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-start gap-4 sm:m-auto md:w-[422px] lg:m-0">
            <div className="sm:w-[300px] flex h-[24px] flex-row items-start sm:gap-52 md:w-[422px] md:justify-between">
              <span className="font-poppins text-[16px] leading-[24px] text-black">
                Subtotal:
              </span>
              <span className="font-poppins text-[16px] leading-[24px] text-black">
                ${calculateSubtotal()}
              </span>
            </div>
            <div className="sm:w-[320px] border-b border-black opacity-40 md:w-[422px]"></div>
            <div className="sm-w-[300px] flex h-[24px] flex-row items-start justify-between sm:gap-52 md:w-[422px]">
              <span className="font-poppins text-[16px] leading-[24px] text-black">
                Shipping:
              </span>
              <span className="font-poppins text-[16px] leading-[24px] text-black">
              {shipping()}
              </span>
            </div>
            <div className="sm:w-[320px] border-b border-black opacity-40 md:w-[422px]"></div>
            <div className="sm-w-[300px] flex h-[24px] flex-row items-start justify-between sm:gap-[240px] md:w-[422px]">
              <span className="font-poppins text-[16px] leading-[24px] text-black">
                Total:
              </span>
              <span className="font-poppins text-[16px] leading-[24px] text-black">
                ${calculateDiscountedPrice()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:m-auto lg:m-0">
            <div className="flex h-[28px] flex-row items-center sm:gap-16 md:w-[427px] md:gap-[155px]">
              <div
                onClick={() => selectedPaymentMethodHandler("bank")}
                className={`flex h-[24px] w-[80px] flex-row items-start gap-[16px] cursor-pointer${
                  selectedPayment === "bank" ? "border-2 border-black" : ""
                }`}
              >
                <div
                  className={`h-[24px] w-[24px] rounded-full border-[1.5px] ${
                    selectedPayment === "bank"
                      ? "border-black"
                      : "border-gray-400"
                  }`}
                >
                  {selectedPayment === "bank" && (
                    <div className="m-[4px] h-[14px] w-[14px] rounded-full bg-black"></div>
                  )}
                </div>
                <span className="font-poppins text-[16px] leading-[24px] text-black">
                  Bank
                </span>
              </div>

              <div className="flex h-[28px] w-[192px] flex-row items-start gap-[8px]">
                <button type="button" className="h-[28px] w-[42px]">
                 <img src="src/assets/bKash.svg" alt="bkash-icon" />
                 
                </button>
                <button type="button" className="h-[28px] w-[42px]">
                <img src="src/assets/VISA.svg" alt="bkash-icon" />
               
                </button>
                <button type="button" className="h-[28px] w-[42px]">
               
                <img src="src/assets/MasterCard.svg" alt="bkash-icon" />
                </button>
                <button type="button" className="h-[28px] w-[42px]">
                <img src="src/assets/Nagad.svg" alt="bkash-icon" />
                 
                </button>
              </div>
            </div>

            <div
              onClick={() => selectedPaymentMethodHandler("Cash on delivery")}
              className={`flex h-[24px] w-[174px] flex-row items-start gap-[16px] cursor-pointer${
                selectedPayment === "Cash on delivery" ? "border-2 border-black" : ""
              }`}
            >
              <div
                className={`h-[24px] w-[24px] rounded-full border-[1.5px] ${
                  selectedPayment === "Cash on delivery" ? "border-black" : "border-gray-400"
                }`}
              >
                {selectedPayment === "Cash on delivery" && (
                  <div className="m-[4px] h-[14px] w-[14px] rounded-full bg-black"></div>
                )}
              </div>
              <span className="font-poppins font-normal text-[16px] text-nowrap leading-[24px] text-black">
                Cash on delivery
              </span>
            </div>

            <div className="sm:w-[300px] md:w-[427px] flex h-[56px] flex-row items-center gap-6 xl:w-[527px]">
              <div className="box-border h-[56px] rounded-[4px] border border-black sm:w-44 md:w-[300px]">
                <input
                  type="text"
                  value={temporaryCouponCode}
                  onChange={couponChangeHandler}
                  placeholder="Coupon Code"
                  className="md:w-[270px h-[24px] text-nowrap py-4 pl-6 pt-7 font-poppins text-[16px] leading-[24px] text-black opacity-50 outline-none sm:w-36"
                />
              </div>
              <button type="button"
                onClick={applyCoupon}
                className="sm:w-40 flex h-[56px] flex-row items-center justify-center rounded-[4px] bg-Secondary2 px-12 py-4 xl:w-[211px]"
              >
                <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-white">
                  Apply Coupon
                </span>
              </button>
            </div>
            <button
            type="submit"
              onClick={placeOrderHandler}
              className="flex h-[56px] w-[190px] flex-row items-center justify-center rounded-[4px] bg-Secondary2 px-12 py-4"
            >
              <span className="text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-white">
                Place Order
              </span>
            </button>
          </div>
        </div>
        {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              🎉 Your order has been placed successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your items will be shipped soon.
            </p>
            <button
              onClick={closeOverlay}
              className="px-4 py-2 text-Red rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default CheckOut;
