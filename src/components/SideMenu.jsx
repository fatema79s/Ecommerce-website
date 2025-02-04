import { useEffect, useState, useRef } from "react";

const SideMenu = () => {
  const carouselRef = useRef({ smScreen: null,women: null, men: null });
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [transformValue, setTransformValue] = useState({
    smScreen: "translateX(0px)",
    woman: "translateX(0px)",
    men: "translateX(0px)"
  });
  const [isMoving, setIsMoving] = useState({ smScreen: false, woman: false, men: false });
  const [zIndexValue, setZIndexValue] = useState({ smScreen: 0, woman: -20, men: -20 });
  const [isArrowRight, setIsArrowRight] = useState({ smScreen: false, woman: false, men: false });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 375px) and (max-width: 1023px)",
    );

    const handleResize = () => setIsMdScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const moveCarouselhandler = (section) => {
    if (isMoving[section]) return;

    setIsMoving((prev) => ({ ...prev, [section]: true }));

    const isMovingLeft = transformValue[section] === "translateX(0px)";
    
    const newTransformValues = {
      smScreen: "translateX(-335px)",
      women: "translateX(-135px)",
      men: "translateX(-135px)"
    };
    const newTransformValue = isMovingLeft ? newTransformValues[section] : "translateX(0px)";
  
    

    setIsArrowRight((prevValue) => ({
      ...prevValue,
      [section]: !prevValue[section]
    }));

    setTransformValue((prevValue) => {
      return {
        ...prevValue,
        [section]: newTransformValue
      };
    });

    setZIndexValue((prevValue) => ({
      ...prevValue,
      [section]: isMovingLeft ? 40 : -10
    }));

    setTimeout(() => {
      setIsMoving((prev) => ({ ...prev, [section]: false }));
    }, 500);
  };


  return (
    <>
    <div className="sideMenu">
      <div className="absolute z-30 ml-1 mt-[-50px] flex lg:hidden">
        <button
          onClick={(event) => {
            event.stopPropagation();
            moveCarouselhandler("smScreen");
          }}
          className="h-[44px] w-[44px] transform cursor-pointer transition-transform duration-300 ease-in-out rounded-full hover:bg-[rgba(190,190,190,0.3)]"
          type="button"
          disabled={isMoving.smScreen}
          style={{ transform: isArrowRight.smScreen ? "rotate(-180deg)" : "rotate(0deg)" }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div
        className="relative xl:ml-[135px] flex h-full max-w-[217px] flex-col items-start lg:bg-white lg:gap-4 lg:border-r-[0.5px] lg:border-black lg:border-opacity-30 lg:pr-4 lg:pl-0 lg:ml-12 sm:ml-0 sm:mt-4 lg:mt-0 md:mt-[56px] sm:gap-3 lg:border-solid sm:border-none sm:bg-black sm:pl-5"
        ref={carouselRef.current.smScreen}
        style={{ transform: !transformValue.smScreen, zIndex: zIndexValue.smScreen }}
      >
        <div className="lg:mt-[40px] flex lg:h-[24px] w-full cursor-pointer flex-row items-start justify-between sm:mt-5">
          <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text text-nowrap">
            Woman’s Fashion
          </div>
          <button
          onClick={(event) => {
            event.stopPropagation();
            moveCarouselhandler("woman");
          }}
           type="button"
          disabled={isMoving.woman}
          style={{ transform: isArrowRight.woman ? "rotate(-180deg)" : "rotate(0deg)" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="lg:fill-black sm:fill-white"
          >
            <path
              d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z"
              className="fill-current"
            />
          </svg>
          </button>
          

        </div>

        <div className="flex h-[24px] w-full cursor-pointer flex-row items-start justify-between">
          <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text text-nowrap">
            Men’s Fashion
          </div>
          <button
          onClick={(event) => {
            event.stopPropagation();
            moveCarouselhandler("men");
          }}
           type="button"
          disabled={isMoving.men}
          style={{ transform: isArrowRight.men ? "rotate(-180deg)" : "rotate(0deg)" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="lg:fill-black sm:fill-white"
          >
            <path
              d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z"
              className="fill-current"
            />
          </svg>
          </button>
        
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Electronics
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Home & Lifestyle
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Medicine
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Sports & Outdoor
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Baby’s & Toys
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Groceries & Pets
        </div>

        <div className="cursor-pointer text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
          Health & Beauty
        </div>
      </div>
    </div>
    <div
    className="relative max-w-[80px] items-start lg:bg-white sm:bg-black mt-[-325px] sm:left-[217px] lg:left-[194px] xl:left-[280px] py-5 rounded-md z-[-20]"
    ref={carouselRef.current.woman}
    style={{ transform: !transformValue.woman, zIndex: zIndexValue.woman }}
  >
    <div className="flex flex-col gap-4 ">
      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Dresses
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Tops
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Skirts
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Shoes
      </div>
    </div>
    </div>

    <div className="relative  max-w-[80px] items-start lg:bg-white sm:bg-black mt-[-140px] sm:left-[217px] lg:left-[194px] xl:left-[280px] py-5 rounded-md z-[-10]"
    ref={carouselRef.current.men}
    style={{ transform: !transformValue.men, zIndex: zIndexValue.men }}
  >
    <div className="flex flex-col gap-4 ">
      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      T-Shirts
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Jeans
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Jackets
      </div>

      <div className="text-center font-poppins text-[16px] font-normal leading-[24px] lg:text-black sm:text-Text">
      Shoes
      </div>
      </div>
    </div>
    </>
  );
};

export default SideMenu;
