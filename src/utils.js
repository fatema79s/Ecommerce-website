import { useEffect } from "react";
import products from "../src/data/products.json";


const InitializeData = () => {
useEffect(() => {
    const initializeLocalStorage = () => {
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        if (!storedProducts || !Array.isArray(JSON.parse(storedProducts))) {
          localStorage.setItem("products", JSON.stringify(products));
          console.log("Products initialized in LocalStorage.");
        } else {
          console.log("Products already exist and are in correct format.");
        } 
    };
  
    initializeLocalStorage();
  }, []);
};

export default InitializeData;