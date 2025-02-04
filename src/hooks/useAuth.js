import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  signOut,
  
} from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, setPersistence,
  browserLocalPersistence, } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const isEmail = (str) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str);

  const isPhoneNumber = (str) => /^\d{11,}$/.test(str);

  const sendOtp = async () => {
    if (!isPhoneNumber(emailOrPhone)) {
      setError("Please enter a valid phone number.");
      alert("Please enter a valid phone number.");
      return;
    }

    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: () => {},
    });

    try {
      await setPersistence(auth, browserLocalPersistence);
      const confirmation = await signInWithPhoneNumber(
        auth,
        emailOrPhone,
        recaptchaVerifier,
      );
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Error sending OTP:", err.message);
      setError("Failed to send OTP. Please try again.");
      alert("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      alert("Please enter the OTP.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      console.log("Phone number verified!", result.user);
      alert("Phone number verified successfully!");
    } catch (err) {
      console.error("Error verifying OTP:", err.message);
      setError("Invalid OTP. Please try again.");
      alert("Invalid OTP. Please try again.");
    }
  };

  const loginWithEmail = async () => {
    if (!emailOrPhone || !password) {
      setError("Please fill in all fields.");
      alert("Please fill in all fields.");
      return;
    }

    if (isEmail(emailOrPhone)) {
      try {
        await setPersistence(auth, browserLocalPersistence); 
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailOrPhone,
          password,
        );
        const user = userCredential.user;

        if (!user.emailVerified) {
          setError("Please verify your email address.");
          alert("Please verify your email address.");
          return;
        }

        alert("Login successful!");
        setTimeout(() => navigate("/checkout"), 1000); 
        
      } catch (error) {
        console.error("Error during login:", error.message);
        setError("Invalid email or password.");
        alert("Invalid email or password.");
      }
    } else {
      setError("Please enter a valid email.");
      alert("Please enter a valid email.");
    }
  };

  const googleSignUpHandler = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setEmailOrPhone(user.email || "");
      setPassword(""); 
      alert(`Sign up with Google successful!  
      Welcome, ${user.displayName}! Your email is: ${user.email}`);
    } catch (error) {
      console.error("Error during Google sign-up:", error.message);
      setError("Google sign-up failed.");
      alert("Google sign-up failed.");
    }
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();
    if (!isEmail(emailOrPhone)) {
      setError("Please enter a valid email address.");
      alert("Please enter a valid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, emailOrPhone);
      setMessage("Check your inbox for a password reset link!");
      alert("Check your inbox for a password reset link!");
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error) {
      console.error("Error during password reset:", error.message);
      setError("Failed to send reset email. Please try again.");
      alert("Failed to send reset email. Please try again.");
    }
  };

  const logOutHandler = async () => {
    try {
      await signOut(auth); 
      alert("You have logged out successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Error during logout:", error.message);
      setError("Failed to log out. Please try again.");
      alert("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    otp,
    setOtp,
    isOtpSent,
    sendOtp,
    verifyOtp,
    loginWithEmail,
    googleSignUpHandler,
    error,
    setError,
    message,
  passwordResetHandler,
  logOutHandler,
  };
}


export default useAuth;
