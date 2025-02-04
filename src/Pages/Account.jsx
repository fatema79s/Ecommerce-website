import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from 'lodash';
import { auth, db } from "../firebase";
import { setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";


const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null);
  const [nestedLinks, setNestedLinks] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const { accountData, setAccountData, setSelectedPayment, fetchAccountDetails } = useUser();
  const [showReturns, setShowReturns] = useState(false);
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { cancellations, returns, showCancellations, setShowCancellations } =
    useCart();

    useEffect(() => {
      const updatedNestedLinks = ["Home", "My Account"];
      setNestedLinks(updatedNestedLinks);
    }, [location.pathname]);
  
    useEffect(() => {
      const testFetch = async () => {
        const data = await fetchAccountDetails();
        console.log("Fetched Data:", data);
      };
      testFetch();
    }, []);

    useEffect(() => {
      const checkUserAndLoadData = () => {
        setIsLoading(true);
  
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
       
            navigate("/login");
          } else {
  
            try {
              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
  
        
                setSelectedPayment(userData.billingDetails.paymentMethod || "");
                setAccountData(userData.billingDetails || {});
                setLastName(userData.billingDetails?.lastName || "");

                localStorage.setItem("selectedPayment", userData.billingDetails.paymentMethod || "");
                localStorage.setItem("accountData", JSON.stringify(userData.billingDetails || {}));
                localStorage.setItem("lastName", userData.billingDetails?.lastName || "");
              }
               
            } catch (error) {
              console.error("Error loading account data:", error.message);
              alert("Failed to load account data.");
            } finally {
              setIsLoading(false);
            }
          }
        });
  
  
        return () => unsubscribe();
      };
  
      checkUserAndLoadData();
    }, [navigate, setAccountData, setSelectedPayment]);
  
    const handleLastNameChange = async (e) => {
      const newLastName = e.target.value;
      setLastName(newLastName);
  
      try {
        const updatedBillingDetails = { ...accountData, lastName: newLastName };

        await setDoc(doc(db, "users", auth.currentUser.uid), { billingDetails: updatedBillingDetails }, { merge: true });
  
        setAccountData(updatedBillingDetails);
  

        localStorage.setItem("accountData", JSON.stringify(updatedBillingDetails));
        localStorage.setItem("lastName", newLastName);
  
      } catch (error) {
        console.error("Error updating last name:", error.message);
        alert("Failed to save last name.");
      }
    };
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const fullName = `${capitalizeFirstLetter(accountData.firstName)} ${capitalizeFirstLetter(accountData.lastName)}`;

  const changeFormHandler = (e) => {
    const { id, value } = e.target;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = _.debounce(() => {
      setAccountData((prevData) => ({ ...prevData, [id]: value }));
    }, 500)();
  };

  const updateFormHandler = async () => {
    if (!accountData.firstName || !accountData.lastName) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDoc,
        { billingDetails: accountData },
        { merge: true }
      );
      setOriginalData(accountData);
      localStorage.setItem("accountData", JSON.stringify(accountData));
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error.message);
      alert("Failed to save changes. Please try again.");
    }
  };

  const cancelHandler = () => {
    setAccountData(originalData);
  };

  const closeOverlay = () => {
    if (showReturns) setShowReturns(false);
    if (showCancellations) setShowCancellations(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  };

  return (
    <>
      <div className="absolute top-[222px] flex h-[21px] w-[134px] flex-row items-center gap-[14px] text-nowrap sm:left-12 lg:left-[135px]">
        <nav>
          <ul className="flex items-center space-x-2">
            {nestedLinks.map((segment, index) => {
              const isActive = index === nestedLinks.length - 1;
              const path =
                index === 0 ? "/" : `/${nestedLinks.slice(1, index).join("/")}`;

              return (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="xt-black mx-1 opacity-50">/</span>
                  )}
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

      <div className="absolute text-nowrap font-poppins text-[14px] font-normal sm:left-[50%] sm:top-[272px] md:left-[70%] md:top-[222px] xl:left-[1166px]">
        <span className="text-black">Welcome! </span>
        <span className="text-Secondary2">{fullName}</span>
      </div>

      <div className="absolute top-[323px] flex h-[30px] w-[166px] flex-col items-start gap-[24px] text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-black sm:left-[47px] xl:left-[135px]">
        Manage My Account
      </div>

      <div className="absolute top-[363px] flex h-auto w-[165px] flex-col items-start gap-2 sm:left-[87px] xl:left-[170px]">
        <div className="h-auto w-[76px] font-poppins text-[16px] font-normal leading-[24px] text-[#DB4444]">
          My Profile
        </div>

        <div className="flex flex-row gap-4">
          <div className="h-auto w-auto text-nowrap font-poppins text-[16px] font-normal leading-[24px] text-black opacity-50">
            {accountData.streetAddress}
          </div>
          <span className="text-black">-</span>
          <div className="h-auto w-auto text-nowrap font-poppins text-[16px] font-normal leading-[24px] text-black opacity-50">
            {accountData.townCity}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="h-auto w-auto text-nowrap font-poppins text-[16px] font-normal leading-[24px] text-black opacity-50">
            {accountData.paymentMethod}
          </div>
        </div>
      </div>

      <Link to={"/cart"} className="absolute top-[475px] flex h-auto w-[82px] flex-col items-start gap-[24px] text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-black sm:left-[47px] xl:left-[135px]">
        My Orders
      </Link>

      <div className="absolute top-[515px] flex h-auto w-[138px] flex-col items-start gap-2 sm:left-[87px] xl:left-[170px]">
        <div
          onClick={() => setShowReturns(true)}
          className="h-[24px] w-[88px] cursor-pointer font-poppins text-[16px] font-normal leading-[24px] text-black opacity-50"
        >
          My Returns
        </div>
        <div
          onClick={() => setShowCancellations(true)}
          className="h-[24px] w-[138px] cursor-pointer font-poppins text-[16px] font-normal leading-[24px] text-black opacity-50"
        >
          My Cancellations
        </div>
      </div>

      {showReturns && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="mb-4 text-lg font-bold">My Returns</h2>
            {returns.length > 0 ? (
              <ul className="mb-4">
                {returns.map((item, index) => (
                  <li key={index} className="text-left">
                    {item.name} - {item.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-gray-500">No returns found.</p>
            )}
            <button
              onClick={closeOverlay}
              className="px-4 py-2 text-Red rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}


      {showCancellations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="mb-4 text-lg font-bold">My Cancellations</h2>
            {cancellations.length > 0 ? (
              <ul className="mb-4">
                {cancellations.map((item, index) => (
                  <li key={index} className="text-left">
                    {item.name} - {item.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-gray-500">No cancellations found.</p>
            )}
            <button
              onClick={closeOverlay}
              className="px-4 py-2 text-Red rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Link to={"/wishlist"} className="absolute top-[587px] flex h-auto w-[93px] flex-col items-start gap-[24px] text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-black sm:left-[47px] xl:left-[135px]">
        My WishList
      </Link>

      <div className="h-auto rounded-[4px] bg-white py-10 shadow-[0px_1px_13px_rgba(0,0,0,0.05)] sm:m-auto sm:mt-[581px] xl:ml-[435px] xl:mt-[181px]">
        <h2 className="top-[40px] h-[28px] w-[155px] text-nowrap pl-[80px] font-poppins text-[20px] font-medium leading-[28px] text-[#DB4444]">
          Edit Your Profile
        </h2>
        <div className="m-auto mt-6 flex h-auto items-start sm:w-[330px] sm:flex-col sm:gap-6 md:w-[710px] md:flex-row lg:gap-[50px]">
          <div className="flex h-[82px] w-[330px] flex-col items-start gap-2">
            <label
              htmlFor="firstName"
              className="h-[24px] w-[85px] font-poppins text-[16px] font-normal leading-[24px] text-black"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={accountData.firstName || ""}
              onChange={changeFormHandler}
              className="h-[50px] w-[330px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex h-[82px] w-[330px] flex-col items-start gap-2">
            <label
              htmlFor="lastName"
              className="h-[24px] w-[85px] font-poppins text-[16px] font-normal leading-[24px] text-black"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className="h-[50px] w-[330px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="m-auto mt-6 flex h-auto items-start sm:w-[330px] sm:flex-col sm:gap-6 md:w-[710px] md:flex-row lg:gap-[50px]">
          <div className="flex h-[82px] w-[330px] flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="h-[24px] w-[44px] font-poppins text-[16px] font-normal leading-[24px] text-black"
            >
              Email
            </label>
            <input
              id="emailAddress"
              type="email"
              value={accountData.emailAddress}
              onChange={changeFormHandler}
              className="h-[50px] w-[330px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex h-[82px] w-[330px] flex-col items-start gap-2">
            <label
              htmlFor="address"
              className="h-[24px] w-[66px] font-poppins text-[16px] font-normal leading-[24px] text-black"
            >
              Address
            </label>
            <input
              id="streetAddress"
              type="text"
              value={accountData.streetAddress}
              onChange={changeFormHandler}
              className="h-[50px] w-[330px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="m-auto mt-6 flex h-[214px] flex-col items-start gap-4 sm:w-[330px] md:w-[710px]">
          <div className="flex h-[82px] w-[710px] flex-col items-start gap-2 sm:w-[330px] md:w-[710px]">
            <label
              htmlFor="password"
              className="h-[24px] w-[154px] text-nowrap font-poppins text-[16px] font-normal leading-[24px] text-black"
            >
              Password Changes
            </label>
            <input
              id="CurrentPassword"
              type="password"
              className="h-[50px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none sm:w-[330px] md:w-[710px]"
              placeholder="Current Password"
            />
          </div>
          <input
            id="NewPassword"
            type="password"
            className="h-[50px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none sm:w-[330px] md:w-[710px]"
            placeholder="New Password"
          />
          <input
            id="ConfirmNewPasswod"
            type="password"
            className="h-[50px] rounded-[4px] bg-[#F5F5F5] px-4 outline-none sm:w-[330px] md:w-[710px]"
            placeholder="Confirm New Password"
          />
        </div>

        <div className="flex h-auto w-[303px] flex-row items-center gap-8 pt-6 sm:m-auto xl:ml-[567px]">
          <button
            type="button"
            onClick={cancelHandler}
            className="h-[24px] w-[57px] font-poppins text-[16px] font-normal leading-[24px] text-black"
          >
            Cancel
          </button>
          <button
            onClick={updateFormHandler}
            className="flex h-[56px] w-[214px] flex-row items-center justify-center gap-2 rounded-[4px] bg-[#DB4444] px-[48px] py-[16px]"
          >
            <span className="h-[24px] w-[118px] text-nowrap font-poppins text-[16px] font-medium leading-[24px] text-[#FAFAFA]">
              Save Changes
            </span>
          </button>
        </div>
      </div>
      <div className="mb-[140px]"></div>
    </>
  );
};

export default Account;
