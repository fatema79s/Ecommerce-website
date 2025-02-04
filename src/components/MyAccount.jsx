import { Link } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";
import { useCart } from "../contexts/CartContext";


const MyAccount = ({ onCloseMenu }) => {
  const { logOutHandler } = useAuth();
  const { setShowCancellations } = useCart();

  const handleLogout = () => {
    logOutHandler();
  };

  return (
    <div className="absolute z-40 h-[208px] w-[224px] sm:left-[38%] sm:top-[105px] md:left-[65%] md:top-[126px] lg:left-[69%] xl:left-[1081px]">
      <div className="absolute inset-0 rounded-[4px] bg-black/40 backdrop-blur-[75px]">
        <div className="absolute left-[20px] top-[18px] flex h-[180px] w-[192px] flex-col items-start gap-[13px] p-0">
          <Link
            to={"/account"}
            onClick={onCloseMenu}
            className="flex h-[32px] w-[192px] flex-row items-center gap-[16px] p-0"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-center font-poppins text-[14px] font-normal leading-[21px] text-Text">
              Manage My Account
            </p>
          </Link>

          <Link
            to={"/checkout"}
            onClick={onCloseMenu}
            className="flex h-[24px] w-[104px] flex-row items-center gap-[16px] p-0"
          >
            <img
              src="src/assets/icon-mallbag.svg"
              alt="bag icon"
              className="h-[24px] w-[24px]"
            />
            <p className="text-center font-poppins text-[14px] font-normal leading-[21px] text-Text">
              My Order
            </p>
          </Link>

          <Link
            to={"/account"}
            onClick={() => {
              setShowCancellations(true); 
              onCloseMenu();
            }}
            className="flex h-[24px] w-[161px] flex-row items-center gap-[16px] p-0"
          >
            <img
              src="src/assets/icon-cancel.svg"
              alt="cancel icon"
              className="border-text-Text h-[24px] w-[24px] rounded-full"
            />
            <p className="text-center font-poppins text-[14px] font-normal leading-[21px] text-Text">
              My Cancellations
            </p>
          </Link>

          <Link
            onClick={onCloseMenu}
            className="flex h-[24px] w-[120px] flex-row items-center gap-[16px] p-0"
          >
            <img
              src="src/assets/Vector.svg"
              alt="star icon"
              className="h-[24px] w-[24px]"
            />
            <p className="text-center font-poppins text-[14px] font-normal leading-[21px] text-Text">
              My Reviews
            </p>
          </Link>

          <Link
            to="/login"
            onClick={() => {
              handleLogout();
              onCloseMenu();
            }}
            className="flex h-[24px] w-[88px] flex-row items-center gap-[16px] p-0"
          >
            <img
              src="src/assets/Icon-logout.svg"
              alt="logout icon"
              className="h-[24px] w-[24px] scale-x-[-1] transform"
            />
            <p className="text-center font-poppins text-[14px] font-normal leading-[21px] text-Text">
              Logout
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
