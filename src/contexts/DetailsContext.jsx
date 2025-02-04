// ProductContext.js
import { createContext, useState, useEffect } from "react";
import fetchProducts from '../hooks/useFetchProduct'; 

const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]); 
  const [details, setDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); 


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); 
     
        setAllProducts(data); 
      } catch (error) {
        console.error("Failed to fetch products:", error); 
      }
    };
  
    const savedDetails = localStorage.getItem("details");
    const savedRelatedProducts = localStorage.getItem("relatedProducts");
  
    if (savedDetails) {
      try {
        setDetails(JSON.parse(savedDetails));
      } catch (error) {
        console.error("Failed to parse saved details:", error);
      }
    }
  
    if (savedRelatedProducts) { 
      try {
        setRelatedProducts(JSON.parse(savedRelatedProducts));
      } catch (error) {
        console.error("Failed to parse saved related products:", error); 
      }
    }
  
    loadProducts();
  }, []);

const toggleToDetails = (product) => {
  setDetails(product);
  localStorage.setItem("details", JSON.stringify(product));
  toggleToRelatedProducts(product); 
  return product;
};

const toggleToRelatedProducts = async (product) => {
  if (!product) {
    console.error("Product is undefined");
    return;
  }

  try {
    const allProducts = await fetchProducts(); 
    const related = allProducts.filter(
      (item) => item && item.category === product.category && item.id !== product.id 
    );

    setRelatedProducts(related);
    localStorage.setItem("relatedProducts", JSON.stringify(related)); 
  } catch (error) {
    console.error("Failed to fetch related products:", error);
  }
};


  return (
    <DetailsContext.Provider
      value={{
        allProducts,
        details,
        setDetails,
        relatedProducts,
        setRelatedProducts,
        toggleToDetails,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export { DetailsProvider, DetailsContext };