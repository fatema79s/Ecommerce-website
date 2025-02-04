const LowerPage = () => {
  return (
    <div className="m-auto mt-[140px] flex min-h-[161px] xl:w-[943px] lg:flex-row sm:flex-col items-center justify-center gap-[88px] xl:mb-0 sm:mb-[140px]">
      <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
        <img
          src="src/assets/Delivery cartage.svg"
          className="h-[80px] w-[80px]"
          alt="Delivery cartage image"
        />
        <div className="flex h-[57px] w-[249px] flex-col items-center gap-[8px]">
          <h2 className="h-[28px] w-[242px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
            FREE AND FAST DELIVERY
          </h2>
          <p className="font-regular h-[21px] w-[249px] text-center font-poppins text-[14px] leading-[21px] text-[#000000]">
            Free delivery for all orders over $140
          </p>
        </div>
      </div>

      <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
        <img
          src="src/assets/Head phone.svg"
          className="h-[80px] w-[80px]"
          alt="Head phone image"
        />
        <div className="flex h-[57px] w-[247px] flex-col items-center gap-[8px]">
          <h2 className="h-[28px] w-[247px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
            24/7 CUSTOMER SERVICE
          </h2>
          <p className="font-regular h-[21px] w-[219px] font-poppins text-[14px] leading-[21px] text-[#000000]">
            Friendly 24/7 customer support
          </p>
        </div>
      </div>

      <div className="flex h-[161px] w-[249px] flex-col items-center gap-[24px]">
        <img
          src="src/assets/True sign.svg"
          className="h-[80px] w-[80px]"
          alt="True sign image"
        ></img>
        <div className="flex h-[57px] w-[256px] flex-col items-center gap-[8px]">
          <h2 className="h-[28px] w-[256px] font-poppins text-[20px] font-semibold leading-[28px] text-[#000000]">
            MONEY BACK GUARANTEE
          </h2>
          <p className="font-regular h-[21px] w-[220px] font-poppins text-[14px] leading-[21px] text-[#000000] text-nowrap">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default LowerPage;
