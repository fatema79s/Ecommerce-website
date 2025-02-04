const Featured = () => {
  return (
    <div className="xl:ml-[135px] sm:ml-0 lg:mt-[2373px] md:mt-[2673px] sm:mt-[2803px] flex min-h-[600px] xl:w-[1170px] sm:w-[100%] flex-col items-start gap-[60px] p-0">
      <div className="flex h-[108px] w-[216px] sm:pl-[8%] flex-col items-start gap-[20px] xl:p-0">
        <div className="flex h-[40px] w-[110px] flex-row items-center gap-[16px] p-0">
          <div className="h-[40px] w-[20px] rounded-[4px] bg-Secondary2"></div>
          <div className="h-[20px] w-[74px] font-poppins text-[16px] font-semibold leading-[20px] text-Secondary2">
            Featured
          </div>
        </div>
        <div className="h-[48px] w-[216px] font-inter text-[36px] font-semibold leading-[48px] tracking-[0.04em] text-black text-nowrap">
          New Arrival
        </div>
      </div>

      <div className="flex min-h-[600px] xl:w-[1170px] xl:m-0 md:m-auto sm:w-[100%] md:w-[70%] xl:flex-row sm:flex-col items-start gap-[30px] p-0">
        <div className="relative h-[600px] xl:w-[570px] sm:w-[100%] rounded-[4px] bg-black">
          <img
            src="src/assets/playstation_5.svg"
            className="absolute left-[29px] top-[89px] h-[511px] w-[511px]"
            alt="playstation_5 image"
          />
          <div className="absolute left-[32px] top-[446px] flex h-[122px] w-[242px] flex-col items-start gap-[16px]">
            <div className="h-[24px] w-[162px] font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-Text text-nowrap">
              PlayStation 5
            </div>
            <p className="h-[42px] w-[242px] font-poppins font-normal text-[14px] leading-[21px] text-Text">
              Black and White version of the PS5 coming out on sale.
            </p>
            <a
              href="#"
              className="h-[24px] w-[81px] text-[16px] font-poppins font-medium leading-[24px] text-white"
            >
              Shop Now
              <div className="absolute h-[0.5px] w-[81px] border-t border-white border-opacity-50 mt-[-2px]"></div>
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[600px] xl:w-[570px] sm:w-[100%] flex-col items-center md:gap-[32px] sm:gap-[30px] p-0">
          <div className="relative h-[284px] w-[570px] sm:w-[100%] rounded-[4px] bg-[#0D0D0D]">
            <div className="absolute left-[24px] top-[138px] flex h-[122px] w-[255px] flex-col items-start gap-[16px]">
              <div className="h-[24px] w-[255px] font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-Text">
                Women’s Collections
              </div>
              <p className="h-[42px] w-[255px] font-poppins text-[14px] font-normal leading-[21px] text-Text">
                Featured woman collections that <br /> give you another vibe.
              </p>
              <a
                href="#"
                className="h-[24px] w-[81px] font-poppins text-[16px] font-medium leading-[24px] text-white"
              >
                Shop Now
                <div className="absolute h-[0.5px] w-[81px] border-t border-white border-opacity-50 mt-[-2px]"></div>
              </a>
            </div>
          </div>

          <div className="flex min-h-[284px] xl:w-[570px] md:flex-row sm:flex-col items-center justify-center gap-8 p-0">
            <div className="relative h-[284px] w-[270px] flex-none flex-grow-0 rounded-[4px] bg-black">
              <div
                className="absolute h-[196px] w-[196px] rounded-full m-10"
                style={{
                    backgroundColor: "#D9D9D9",
                    opacity: "90%",
                    filter: "blur(150px)",
                  }}
              ></div>
                <img
            src="src/assets/Amazon wireless speakers.svg"
            className="absolute left-[30px] top-[31px] h-[222px] w-[210px]"
            alt="Amazon wireless speakers image"
          />
              <div className="absolute left-[30px] top-[31px] h-[222px] w-[210px]"></div>

              <div className="absolute left-1/2 top-1/2 h-[221px] w-[190px] translate-x-[-50%] translate-y-[-50%]"></div>

              <div className="absolute left-[24px] top-[175px] flex h-[85px] w-[191px] flex-col items-start gap-2 p-0">
                <div className="flex h-[53px] w-[191px] flex-col items-start gap-2 p-0">
                  <h2 className="h-[24px] w-[114px] font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-Text">
                    Speakers
                  </h2>

                  <p className="h-[21px] w-[191px] font-poppins font-normal text-[14px] leading-[21px] text-Text">
                    Amazon wireless speakers
                  </p>
                </div>

                <div className="flex h-[24px] w-[81px] flex-col items-start p-0">
                  <a
                    href="#"
                    className="h-[24px] w-[81px] font-poppins text-[16px] font-medium leading-[24px] text-white"
                  >
                    Shop Now
                    <div className="absolute h-[0.5px] w-[81px] border-t border-white border-opacity-50 mt-[-2px]"></div>
                  </a>

                </div>
              </div>
            </div>

            <div className="relative order-1 h-[284px] w-[270px] flex-none flex-grow-0 rounded-[4px] bg-black">
              <div
                className="h-[238px] w-[238px] rounded-full mx-4 my-5"
                style={{
                  backgroundColor: "#D9D9D9",
                  opacity: "90%",
                  filter: "blur(150px)",
                }}
              ></div>
              <img
                src="src/assets/GUCCI-Perfume.svg"
            className="absolute left-[30px] top-[30px] h-[222px] w-[210px]"
            alt="GUCCI-Perfume image"
          />
              <div className="absolute left-1/2 top-1/2 h-[222px] w-[210px] translate-x-[-50%] translate-y-[-50%] transform"></div>

              <div className="absolute left-1/2 top-1/2 h-[203px] w-[201px] translate-x-[-50%] translate-y-[-50%] transform bg-[url('.png')]"></div>

              <div className="absolute left-[24px] top-[175px] flex h-[85px] w-[191px] flex-col items-start gap-2 p-0">
                <div className="flex h-[53px] w-[191px] flex-col items-start gap-2 p-0">
                  <h2 className="h-[24px] w-[104px] font-inter text-[24px] font-semibold leading-[24px] tracking-[0.03em] text-Text">
                    Perfume
                  </h2>

                  <p className="h-[21px] w-[191px] font-poppins font-normal text-[14px] leading-[21px] text-Text">
                    GUCCI INTENSE OUD EDP
                  </p>
                </div>

                <div className="flex h-[24px] w-[81px] flex-col items-start p-0">
                  <a
                    href="#"
                    className="h-[24px] w-[81px] font-poppins text-[16px] font-medium leading-[24px] text-white"
                  >
                    Shop Now
                    <div className="absolute h-[0.5px] w-[81px] border-t border-white border-opacity-50 mt-[-2px]"></div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
