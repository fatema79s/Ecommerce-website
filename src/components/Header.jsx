import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "./Search";
import MyAccount from "./MyAccount";
import { WishlistContext } from "../contexts/wishListContext";
import { useCart } from "../contexts/CartContext";

const Header = ({ activeLink, setActiveLink, onSearchChange }) => {
  const LINKS = [
    { name: "Home", path: "home" },
    { name: "Contact", path: "contact" },
    { name: "About", path: "about" },
    { name: "SignUp", path: "signup" },
  ];

  console.log("Active link:", activeLink);
  const { wishlist } = useContext(WishlistContext);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isAccountMenueHidden, setIsAccountMenueHidden] = useState(false);
  

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/home";
  const isAccountPage = location.pathname === "/account";

  let icon;
  if (isHomePage) {
    icon = null;
  } else if (isAccountPage) {
    icon = (
      <img
        src="src/assets/Account-bg.svg"
        alt="User account icon"
        className="h-6 w-6"
      />
    );
  } else {
    icon = (
      <img
      src="src/assets/userAccount.svg"
      alt="User account icon"
      className="h-6 w-6"
    />
    );
  }

  const toggleMenu = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);

  const { cart } = useCart();

  const onClickHandler = () => setIsAccountMenueHidden(!isAccountMenueHidden);

  return (
    <>
      <header className="mt-[40px] h-[38px] items-center justify-between sm:hidden md:ml-[5%] md:flex md:justify-center md:gap-6 lg:gap-14 xl:ml-[135px] xl:w-[1170px] xl:justify-stretch xl:gap-[130px]">
        <div className="flex flex-row md:items-center md:gap-3 lg:gap-10 xl:gap-[190px]">
          <h1 className="font-inter text-[24px] font-bold leading-[24px] tracking-[0.03em] text-black">
            Exclusive
          </h1>

          <nav className="flex flex-row text-center md:gap-[10px] lg:gap-5 xl:gap-[48px]">
            {LINKS.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveLink(link.name);
                  navigate(`/${link.path}`);
                }}
                className={`cursor-pointer text-nowrap font-poppins text-[16px] leading-[24px] text-black ${
                  typeof activeLink === 'string' && activeLink.toLowerCase() === link.name.toLowerCase()
                    ? "underline decoration-[#00000080] underline-offset-4"
                    : ""
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex w-[395px] flex-row items-center md:gap-2 lg:gap-4 xl:gap-6">
          <Search onSearchChange={onSearchChange} />
          <div className="flex w-[128px] flex-row md:gap-2 lg:gap-4">
            <Link to={"/wishlist"}>
              <div className="absolute ml-4 h-[17px] w-4 rounded-full bg-Secondary2">
                <span className="flex h-[17px] w-[7px] pl-[5px] font-poppins text-[12px] leading-[18px] text-Text">
                  {wishlist.length}
                </span>
              </div>
              <img
                src="src/assets/Heart-icon.svg"
                alt="Heart icon"
                className="h-7 w-7"
              />
            </Link>
            <Link to={"/cart"}>
              <div className="absolute ml-4 h-[17px] w-4 rounded-full bg-Secondary2">
                <span className="flex h-[17px] w-[7px] pl-[5px] font-poppins text-[12px] leading-[18px] text-Text">
                  {cart.length}
                </span>
              </div>
              <img
                src="src/assets/Cart1 with buy.svg"
                alt="Shopping cart icon"
                className="h-6 w-6"
              />
            </Link>
            <button
              type="button"
              onClick={onClickHandler}
              className="cursor-pointer"
            >
              <span className="h-6 w-6">{icon}</span>
            </button>
            {isAccountMenueHidden && <MyAccount onCloseMenu={onClickHandler} />}
          </div>
        </div>
      </header>

      <header className="mt-6 flex w-[100%] flex-row items-center justify-center gap-x-[150px] md:hidden">
        <h1 className="w-[30%] font-inter text-[24px] font-bold leading-[24px] tracking-[0.03em] text-black">
          Exclusive
        </h1>
        <button
          className="flex w-[4%] cursor-pointer flex-col items-center gap-1"
          onClick={toggleMenu}
          type="button"
        >
          <span
            className={`h-[3px] w-[100%] bg-black transition-transform duration-300 ${
              isBurgerMenuOpen ? "translate-y-[0px] rotate-45" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] w-[100%] bg-black transition-opacity duration-300 ${
              isBurgerMenuOpen ? "hidden opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] w-[100%] bg-black transition-transform duration-300 ${
              isBurgerMenuOpen ? "-translate-y-[7.5px] -rotate-45" : ""
            }`}
          ></span>
        </button>
        {isBurgerMenuOpen && (
          <div className="absolute z-20 mt-[185px] w-[100%] border-b-[0.5px] border-t-[0.5px] border-black border-opacity-30 bg-white py-8 shadow-md">
            <nav className="flex flex-row items-center justify-center gap-[11%]">
            {LINKS.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveLink(link.name);
                  navigate(`/${link.path}`);
                }}
                className={`cursor-pointer text-nowrap font-poppins text-[16px] leading-[24px] text-black ${
                  activeLink === link.name
                    ? "underline decoration-[#00000080] underline-offset-4"
                    : ""
                }`}
              >
                {link.name}
              </button>
            ))}
            </nav>
            <div className="mt-2 flex flex-row items-center justify-center gap-[3%]">
              <Search onSearchChange={onSearchChange} />
              <Link to={"/wishlist"}>
                <div className="absolute ml-4 h-[17px] w-4 rounded-full bg-Secondary2">
                  <span className="flex h-[17px] w-[7px] pl-[4px] font-poppins text-[12px] leading-[18px] text-Text">
                    {wishlist.length}
                  </span>
                </div>
                <img
                  src="src/assets/Heart-icon.svg"
                  alt="Heart icon"
                  className="h-7 w-7"
                />
              </Link>
              <Link to={"/cart"}>
                <div className="absolute ml-4 h-[17px] w-4 rounded-full bg-Secondary2">
                  <span className="flex h-[17px] w-[7px] pl-[5px] font-poppins text-[12px] leading-[18px] text-Text">
                    {cart.length}
                  </span>
                </div>
                <img
                  src="src/assets/Cart1 with buy.svg"
                  alt="Shopping cart icon"
                  className="h-6 w-6"
                />
              </Link>

              <button
              type="button"
              onClick={onClickHandler}
              className="cursor-pointer"
            >
              <span className="h-6 w-6">{icon}</span>
            </button>
              {isAccountMenueHidden && <MyAccount onCloseMenu={onClickHandler} />}
            </div>
          </div>
        )}
      </header>

      <span className="sticky z-50 mt-4 flex w-[100%] flex-1 border-b-[0.5px] border-black border-opacity-30 sm:hidden lg:block"></span>
    </>
  );
};

export default Header;
