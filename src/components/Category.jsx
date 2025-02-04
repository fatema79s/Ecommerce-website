import BrowseByCategory from "./BrowseByCategory";
import { useState, useRef,useEffect } from "react";


const Category = () => {
  const CATEGORYCARDS = [
    {
      id: 1,
      name: "Phones",
      image: "src/assets/Category-CellPhone.svg",
      whiteImage: "src/assets/Category-CellPhoneWhite.svg",
    },
    {
      id: 2,
      name: "Computers",
      image: "src/assets/Category-Computer.svg",
      whiteImage: "src/assets/Category-ComputerWhite.svg",
    },
    {
      id: 3,
      name: "SmartWatch",
      image: "src/assets/Category-SmartWatch.svg",
      whiteImage: "src/assets/Category-SmartWatchWhite.svg",
    },
    {
      id: 4,
      name: "Camera",
      image: "src/assets/Category-Camera.svg",
      whiteImage: "src/assets/Category-CameraWhite.svg",
    },
    {
      id: 5,
      name: "HeadPhones",
      image: "src/assets/Category-Headphone.svg",
      whiteImage: "src/assets/Category-HeadphoneWhite.svg",
    },
    {
      id: 6,
      name: "Gaming",
      image: "src/assets/Category-Gamepad.svg",
      whiteImage: "src/assets/Category-GamepadWhite.svg",
    },
  ];

  const [clickedCategory, setClickedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformValue, setTransformValue] = useState("translateX(0)");
  const [isMoving, setIsMoving] = useState(false);
  const [categoryCardsToShow, setCategoryCardsToShow] = useState(6);

  const categoryCardWidth = 210;
  
  useEffect(() => {

    const updatesetCategoryCardsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1250) {
        setCategoryCardsToShow(6);
      } else if (width >= 900) {
        setCategoryCardsToShow(4);
      } else if (width >= 600) {
        setCategoryCardsToShow(3);
      } else {
        setCategoryCardsToShow(2);
      }
    };

    window.addEventListener("resize", updatesetCategoryCardsToShow);
    updatesetCategoryCardsToShow();

    return () => window.removeEventListener("resize", updatesetCategoryCardsToShow);
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

    const categoryCards = carousel.getElementsByClassName("categoryCards");
    const categoryCardsCount = categoryCards.length;
    const maxIndex = categoryCardsCount - categoryCardsToShow;

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
      setTransformValue(`translateX(-${newIndex * categoryCardWidth}px)`);
    }
    
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  const categoryClickHandler = (categoryCard) => {
    setClickedCategory(categoryCard.id);
  };

  const categoryHoverHandler = (categoryCard) => {
    setHoveredCategory(categoryCard.id);
  };

  return (
    <>
    <div className="absolute xl:left-[135px] md:left-[5%] sm:left-[8%] mt-[70px] flex md:h-[313px] sm:h-[430px] w-[1170px] flex-col items-start gap-[55px]">
      <div className="flex h-[108px] w-[1170px] flex-row items-end lg:gap-x-[691px] sm:gap-x-0">
        <div className="flex h-[108px] w-[379px] flex-col items-start gap-[20px]">
          <div className="flex h-[40px] w-[126px] flex-row items-center gap-[16px]">
            <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
            <div className="h-[20px] w-[90px] font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
              Category
            </div>
          </div>
          <div className="h-[48px] w-[379px] whitespace-nowrap font-inter lg:text-[36px] sm:text-[30px] font-semibold leading-[48px] tracking-[0.04em] text-black">
            Browse By Category
          </div>
        </div>
        <div className="md:relative md:top-0 xl:left-0 flex h-[46px] w-[100px] flex-row items-center gap-2 sm:absolute lg:left-[-20%] md:left-[20%] sm:left-[19%] sm:top-[130px]">
          <button onClick={(event) => {
                  event.stopPropagation();
                  moveCarousel("prev");
                }}
                className="h-[46px] w-[46px]"
                disabled={isMoving}>
            <img src="src/assets/Fill With Left Arrow.svg" alt="Left Arrow image" />
          </button>

          <button onClick={(event) => {
                  event.stopPropagation();
                  moveCarousel("next");
                }}
                className="h-[46px] w-[46px]"
                disabled={isMoving}>
          <img src="src/assets/Fill with Right Arrow.svg" alt="Right Arrow image" />
          </button>
        </div>
      </div>

      <div className="xl:w-[1170px] sm:w-[100vw] overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out "
            style={{
              transform: transformValue,
            }}
          >
      <div className="flex md:h-[145px] sm:h-[180px] flex-row items-start gap-[30px] md:p-0 sm:pt-[35px] transition-transform duration-300 ease-in-out">
        {CATEGORYCARDS.map((categoryCard) => (
          <BrowseByCategory 
          key={categoryCard.id} 
          categoryCard={categoryCard} 
          onClick={() => categoryClickHandler(categoryCard)}
          onMouseEnter={() => categoryHoverHandler(categoryCard)}
          onMouseLeave={() => setHoveredCategory(null)}
          isSelected={clickedCategory === categoryCard.id}
          isHovered={hoveredCategory === categoryCard.id}
          transform={transformValue}
          />
        ))}
      </div>
      </div>
      </div>
    </div>
    <span className="md:mt-[443px] sm:mt-[503px] flex w-[100%] flex-1 border-b-[0.5px] border-black border-opacity-30"></span>
    </>
  );
};

export default Category;


     
