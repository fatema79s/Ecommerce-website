import { useState, useEffect } from "react";

const CountDown = ({ targetDate }) => {

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  return (
    <>
      <div className="flex flex-col items-start gap-1">
        <span className="font-poppins text-[12px] font-medium leading-[18px] text-black">
          Days
        </span>
        <span className="font-inter text-[32px] font-bold leading-[30px] text-black">
          {timeLeft.days ?? "00"}
        </span>
      </div>
      <div className="mx-2 mb-2 flex flex-col items-start gap-2">
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
      </div>

      <div className="left-1/4 top-0 flex flex-col items-start gap-1">
        <span className="font-poppins text-[12px] font-medium leading-[18px] text-black">
          Hours
        </span>
        <span className="font-inter text-[32px] font-bold leading-[30px] text-black">
          {timeLeft.hours ?? "00"}
        </span>
      </div>
      <div className="mx-2 mb-2 flex flex-col items-start gap-2">
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
      </div>

      <div className="left-1/2 top-0 flex flex-col items-start gap-1">
        <span className="font-poppins text-[12px] font-medium leading-[18px] text-black">
          Minutes
        </span>
        <span className="font-inter text-[32px] font-bold leading-[30px] text-black">
          {timeLeft.minutes ?? "00"}
        </span>
      </div>
      <div className="mx-2 mb-2 flex flex-col items-start gap-2">
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
        <div className="h-[4px] w-[4px] rounded bg-[#E07575]"></div>
      </div>

      <div className="left-3/4 top-0 flex flex-col items-start gap-1">
        <span className="font-poppins text-[12px] font-medium leading-[18px] text-black">
          Seconds
        </span>
        <span className="font-inter text-[32px] font-bold leading-[30px] text-black">
          {timeLeft.seconds ?? "00"}
        </span>
      </div>
    </>
  );
};

export default CountDown;
