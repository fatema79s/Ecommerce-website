import MusicCountDown from "./MusicCountDown";


const YourMusic = () => {
  const targetDate = new Date();
  targetDate.setSeconds(targetDate.getSeconds() + (5 * 24 * 60 * 60) + (23 * 60 * 60) + (59 * 60) + 35);
  
  return (
    <div className="absolute xl:left-[135px] lg:top-[2526px] md:top-[2406px] sm:top-[3056px] sm:left-0 lg:h-[500px] sm:h-[830px] xl:w-[1170px] sm:w-[100%] bg-black">
      <h5 className="absolute xl:left-14 lg:left-[2%] sm:left-[7%] md:left-[10%] top-[69px] h-[20px] w-[90px] font-poppins text-[16px] font-semibold leading-[20px] text-LightGreen">
        Categories
      </h5>
      <h2 className="absolute xl:left-14 lg:left-[2%] sm:left-[7%] md:left-[10%] lg:top-[121px] sm:top-[451px] h-[120px] lg:w-[443px] font-inter md:text-[48px] sm:text-[37px] font-semibold leading-[60px] tracking-[0.04em] text-Text">
        Enhance Your <br />Music Experience
      </h2>
      <div className="absolute xl:left-14 lg:left-[2%] sm:left-[7%] md:left-[10%] lg:top-[273px] sm:top-[603px] flex h-[62px] w-[320px] flex-row gap-6">
        <MusicCountDown targetDate={targetDate} />
      </div>
      <button className="absolute xl:left-14 lg:left-[2%] sm:left-[7%] md:left-[10%] lg:top-[375px] sm:top-[705px] flex h-14 w-[171px] flex-row items-center justify-center gap-[10px] rounded-[4px] bg-LightGreen px-12 py-4 font-poppins text-[16px] font-[500] leading-[24px] text-Text">
        Buy Now!
      </button>
      <div
        className="absolute xl:left-[552px] lg:left-[40%] sm:left-[12%] top-0 h-[500px] xl:w-[504px] lg:w-[60%] sm:w-[70%] rounded-full"
        style={{
          backgroundColor: "#D9D9D9",
          opacity: "30%",
          filter: "blur(100px)",
        }}
      ></div>
      <img
        src="src/assets/JBL_BOOMBOX_2_HERO.svg"
        alt="JBL_BOOMBOX_2_HERO"
        className="absolute xl:left-[526px] lg:left-[22%] top-[37px] h-[420px] xl:w-[600px] sm:w-[100%]"
      />
    </div>
  );
};

export default YourMusic;
