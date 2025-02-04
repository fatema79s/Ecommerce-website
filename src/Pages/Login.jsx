import useAuth from "../hooks/useAuth";
import { auth } from "../firebase";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import _ from 'lodash';

const Login = () => {
  const {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    error,
    setError,
    loginWithEmail,
    verifyOtp,
    isOtpSent,
    message,
    passwordResetHandler,
  } = useAuth();

  const logInHandler = async (e) => {
    e.preventDefault();

    try {
      await setPersistence(auth, browserLocalPersistence); 
    if (isOtpSent) {
      await _.debounce(verifyOtp, 500)();
      } else {
        await _.debounce(loginWithEmail, 500)();
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    setError("An error occurred during login. Please try again.");
    alert("An error occurred during login. Please try again.");
  }
  };

  return (
    <div className="lg:mb-[140px] sm:mb-[-65px] mt-[75px] flex items-center gap-[129px] pl-0 sm:h-[1012px] md:h-[1512px] sm:w-[100%] sm:flex-col lg:h-[781px] lg:flex-row xl:w-[1305px]">
      <div className="rounded-r-[4px] bg-VeryLightGreen sm:w-[90%] lg:h-[781px] lg:w-[805px]">
        <img
          src="src/assets/dl.beatsnoop 1.svg"
          alt="Shopping cart image"
          className="pt-[75px]"
        />
      </div>

      <div className="flex h-[326px] sm:w-[90%] lg:w-[371px] flex-col items-start gap-[40px]">
        <div className="flex h-[78px] sm:w-[90%] lg:w-[339px] flex-col items-start gap-[24px]">
          <h2 className="h-[30px] lg:w-[345px] sm:w-[90%] text-nowrap font-inter text-[36px] font-medium leading-[30px] tracking-[0.04em] text-black">
            Log in to Exclusive
          </h2>
          <p className="h-[24px] sm:w-[90%] lg:w-[191px] font-poppins text-[16px] font-normal leading-[24px] text-black">
            Enter your details below
          </p>
        </div>

        {error && <p className="text-Red">{error}</p>}
        {message && <p className="text-LightGreen">{message}</p>}

        <form
          onSubmit={logInHandler}
          className="flex h-[104px] sm:w-[100%] md:w-[370px] flex-col items-start gap-[40px]"
        >
          <div className="flex h-[32px] md:w-[370px] flex-col items-start gap-[8px]">
            <input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your email or phone number"
              className="w-full border-b border-black border-opacity-50 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 focus:outline-none"
            />
          </div>

          <div className="flex h-[32px] md:w-[370px] flex-col items-start gap-[8px]">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-b border-black border-opacity-50 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 focus:outline-none"
            />
          </div>

          <div className="flex h-[56px] w-[371px] flex-row items-center md:gap-[87px] sm:gap-14">
            <button
              type="submit"
              className="flex h-[56px] w-[143px] flex-row items-center justify-center gap-[10px] rounded-[4px] bg-Secondary2"
            >
              <span className="font-poppins text-[16px] font-medium leading-[24px] text-Text">
                Log In
              </span>
            </button>

            <button
              onClick={passwordResetHandler}
              className="h-[24px] w-[141px] font-poppins text-[16px] font-normal leading-[24px] text-Secondary2"
            >
              Forget Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
