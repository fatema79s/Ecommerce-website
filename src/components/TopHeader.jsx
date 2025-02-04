import LanguageMenu from "./LanguageMenu";

const TopHeader = () => {
  return (
    <>
      <div className="left-0 top-0 h-[48px] w-[100%] bg-black text-center sm:hidden md:block">
        <div className="flex flex-row items-baseline text-center md:justify-center xl:justify-stretch md:gap-x-[50px] lg:gap-x-[180px] md:pl-0 xl:gap-x-[216px] xl:pl-[445px]">
          <div className="flex w-[550px] flex-row gap-x-2 text-center">
            <p className="flex font-poppins text-[14px] font-normal leading-6 text-Text text-nowrap sm:hidden md:block">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
            <a
              href="#"
              className="flex cursor-pointer text-center font-poppins text-[14px] font-semibold leading-6 text-Text underline sm:hidden md:block"
            >
              ShopNow
            </a>
          </div>
          <div className="flex sm:hidden md:block">
            <LanguageMenu />
          </div>
        </div>
      </div>

      <div className="left-0 top-0 h-[96px] w-[100%] bg-black md:hidden">
        <div className="grid-row grid justify-center gap-y-3 pt-5 text-center md:hidden">
          <p className="font-poppins text-[10.5px] font-semibold text-Text">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <div className="flex flex-row items-center justify-center gap-x-28 md:hidden">
            <a
              href="#"
              className="cursor-pointer text-center font-poppins text-[14px] font-semibold leading-6 text-Text underline"
            >
              ShopNow
            </a>

            <LanguageMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
