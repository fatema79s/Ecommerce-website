import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchProducts from "../hooks/useFetchProduct";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [clickedProductId, setClickedProductId] = useState(null); 
  const navigate = useNavigate();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [products, setProducts] = useState([]); 

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    const savedData = {
      wishlist: localStorage.getItem("wishlist"),
    };

    if (savedData.wishlist) {
      setWishlist(JSON.parse(savedData.wishlist));
    }
  }, []);

  const toggleToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isProductInWishlist = prevWishlist.some(
        (item) => item.id === product.id
      );

      const updatedWishlist = isProductInWishlist
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, { ...product }];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      return updatedWishlist;
    });
  };

  const removeFromList = (list, setList, id, storageKey) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeFromWishlist = (id) => {
    removeFromList(wishlist, setWishlist, id, "wishlist");
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data); 
      } catch (error) {
        console.error("Failed to fetch products:", error); 
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
   
    const filteredProducts = products.filter(product => product.discount > 0);
    setDiscountedProducts(filteredProducts);
  }, [products]);




  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleToWishlist,
        removeFromWishlist,
        clearWishlist,
        clickedProductId,
        navigate,
        discountedProducts,
        setDiscountedProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };
