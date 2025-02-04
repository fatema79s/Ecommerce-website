import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext();

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [accountData, setAccountData] = useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        townCity: "",
        phoneNumber: "",
        emailAddress: "",
        paymentMethod: "",
    });
    const [selectedPayment, setSelectedPayment] = useState("");

    const saveBillingDetails = async (billingDetails) => {
        if (auth.currentUser) {
          try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
              await setDoc(userRef, {
                billingDetails: {
                  ...userDoc.data().billingDetails,
                  ...billingDetails,
                },
                paymentMethod: selectedPayment,
              }, { merge: true });
              localStorage.setItem("accountData", JSON.stringify(billingDetails));
              localStorage.setItem("selectedPayment", selectedPayment);
            }
          } catch (error) {
            console.error("Error saving billing details:", error.message);
          }
        }
      };
      

      

const fetchAccountDetails = async () => {
    if (auth.currentUser) {
      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const billingDetails = data.billingDetails || {};
          const paymentMethod = billingDetails.paymentMethod || "Not Selected";
  
          setAccountData({ ...billingDetails });
          setSelectedPayment(paymentMethod);
  
        localStorage.setItem("accountData", JSON.stringify(data.billingDetails || {}));
        localStorage.setItem("selectedPayment", data.paymentMethod || "Not Selected");
  
     
          return { ...billingDetails, paymentMethod };
        } else {
          console.warn("No document found for user.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching account details:", error.message);
        return null;
      }
    }
    return null;
  };
  

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    return (
        <UserContext.Provider value={{ accountData, selectedPayment, setAccountData, setSelectedPayment, saveBillingDetails, fetchAccountDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, useUser, UserProvider };
