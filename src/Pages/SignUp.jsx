import { useState } from "react";
import _ from 'lodash';
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
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
    googleSignUpHandler,
  } = useAuth();

  const signInHandler = async (e) => {
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
    <div className="mb-[140px] mt-[75px] flex items-center gap-[129px] pl-0 sm:h-[1012px] md:h-[1512px] sm:w-[100%] sm:flex-col lg:h-[781px] lg:flex-row xl:w-[1305px]">
      <div className="rounded-r-[4px] bg-VeryLightGreen sm:w-[90%] lg:h-[781px] lg:w-[805px]">
        <img
          src="src/assets/dl.beatsnoop 1.svg"
          alt="Shopping cart image"
          className="pt-[75px] sm:w-[100%]"
        />
      </div>

      <div className="flex h-[530px] flex-col items-start gap-[48px] sm:w-[90%] lg:w-[371px]">
        <div className="flex h-[78px] flex-col items-start gap-[24px] sm:w-[90%] lg:w-[339px]">
          <h1 className="h-[30px] text-nowrap font-inter text-[36px] font-medium leading-[30px] tracking-[0.04em] text-black sm:w-[90%] md:w-[339px]">
            Create an account
          </h1>
          <p className="h-[24px] font-poppins text-[16px] font-normal leading-[24px] text-black sm:w-[90%] lg:w-[191px] md:pl-0 sm:pl-1">
            Enter your details below
          </p>
        </div>

        {error && <p className="text-Red">{error}</p>}

        <form
          onSubmit={signInHandler}
          className="flex h-[404px] flex-col items-center gap-[40px] sm:w-[100%] md:w-[371px]"
        >
          <div className="flex h-[176px] flex-col items-start gap-[40px] w-[370px]">
            <div className="flex h-8 flex-col items-start gap-[8px] md:w-[370px] md:pl-0 sm:pl-5">
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-b border-black border-opacity-50 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 focus:outline-none"
              />
            </div>

            <div className="flex h-8 flex-col items-start gap-[8px] md:w-[370px] md:pl-0 sm:pl-5">
              <input
                id="email"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full border-b border-black border-opacity-50 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 focus:outline-none"
              />
            </div>

            <div className="flex h-8 flex-col items-start gap-[8px] md:w-[370px] md:pl-0 sm:pl-5">
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border-b border-black border-opacity-50 font-poppins text-[16px] font-normal leading-[24px] text-black opacity-40 focus:outline-none"
              />
            </div>

            <div className="flex h-[188px] w-[371px] flex-col items-start gap-[16px]">
              <button
                type="submit"
                className="h-[56px] rounded-[4px] bg-Secondary2 font-poppins text-[16px] font-medium text-white sm:m-auto md:m-0 sm:w-[90%] md:w-[371px]"
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={googleSignUpHandler}
                className="flex h-[56px] flex-row items-center justify-center gap-[16px] rounded-[4px] border border-black border-opacity-40 sm:m-auto md:m-0 sm:w-[90%] md:w-[371px]"
              >
                <div className="flex flex-row items-center gap-[16px]">
                  <img src="src/assets/Icon-Google.svg" alt="Google icon" />
                </div>
                <span className="font-poppins text-[16px] font-normal text-black">
                  Sign up with Google
                </span>
              </button>
            </div>

            <div className="m-auto flex flex-row items-center gap-[16px] md:w-[248px]">
              <span className="text-nowrap font-poppins text-[16px] font-normal text-black opacity-70">
                Already have an account?
              </span>
              <div className="flex flex-col items-start gap-[4px] md:w-[47px]">
                <Link
                  to="/login"
                  className="text-nowrap font-poppins text-[16px] font-medium text-black opacity-70"
                >
                  Log in
                </Link>
                <div className="w-full border-b border-black opacity-50"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
