import { useState, useEffect } from "react";

const MusicCountDown = ({ targetDate }) => {

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
  
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
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
      <div className="h-[62px] w-[62px] flex-none flex-grow-0 rounded-full bg-white">
          <div className="flex flex-col items-center pt-4">
            <span className="font-poppins text-[16px] font-semibold leading-[20px] text-black">
            {timeLeft.hours ?? "00"}
            </span>
            <span className="my-[-4px] font-poppins text-[11px] font-medium leading-[18px] text-black">
              Hours
            </span>
          </div>
        </div>

        <div className="h-[62px] w-[62px] flex-none flex-grow-0 rounded-full bg-white">
          <div className="flex flex-col items-center pt-4">
            <span className="font-poppins text-[16px] font-semibold leading-[20px] text-black">
            {timeLeft.days ?? "00"}
            </span>
            <span className="my-[-4px] font-poppins text-[11px] font-medium leading-[18px] text-black">
              Days
            </span>
          </div>
        </div>

        <div className="h-[62px] w-[62px] flex-none flex-grow-0 rounded-full bg-white">
          <div className="flex flex-col items-center pt-4">
            <span className="font-poppins text-[16px] font-semibold leading-[20px] text-black">
            {timeLeft.minutes ?? "00"}
            </span>
            <span className="my-[-4px] font-poppins text-[11px] font-medium leading-[18px] text-black">
              Minutes
            </span>
          </div>
        </div>

        <div className="h-[62px] w-[62px] flex-none flex-grow-0 rounded-full bg-white">
          <div className="flex flex-col items-center pt-4">
            <span className="font-poppins text-[16px] font-semibold leading-[20px] text-black">
            {timeLeft.seconds ?? "00"}
            </span>
            <span className="my-[-4px] font-poppins text-[11px] font-medium leading-[18px] text-black">
              Seconds
            </span>
          </div>
        </div>
        </>
    );
  }

  export default MusicCountDown;