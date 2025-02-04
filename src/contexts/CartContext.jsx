import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [originalPrice, setOriginalPrice] = useState(() => {
    const storedOriginalPrice = localStorage.getItem("originalPrice");
    return storedOriginalPrice ? JSON.parse(storedOriginalPrice) : 0;
  });
  const [discountedPrice, setDiscountedPrice] = useState(() => {
    const storedDiscountedPrice = localStorage.getItem("discountedPrice");
    return storedDiscountedPrice ? JSON.parse(storedDiscountedPrice) : null;
  });
  const [couponCode, setCouponCode] = useState(() => {
    const storedCouponCode = localStorage.getItem("couponCode");
    return storedCouponCode || "";
  });

  const [cancellations, setCancellations] = useState(() => {
    const storedCancellations = localStorage.getItem('cancellations');
    return storedCancellations ? JSON.parse(storedCancellations) : [];
  });

  const [returns, setReturns] = useState(() => {
    const storedReturns = localStorage.getItem('returns');
    return storedReturns ? JSON.parse(storedReturns) : [];
  });

  const [showCancellations, setShowCancellations] = useState(false);
  const [temporaryCouponCode, setTemporaryCouponCode] = useState(couponCode);
  const [temporaryDiscountedPrice, setTemporaryDiscountedPrice] =
    useState(0);
  const [message, setMessage] = useState("");
  
  const discountCodes = {
    DISCOUNT10: 0.1,
    DISCOUNT20: 0.2,
    FREESHIP: 0.15,
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setOriginalPrice(calculateSubtotal());

  }, [cart]);

  useEffect(() => {
    localStorage.setItem("originalPrice", JSON.stringify(originalPrice));
    localStorage.setItem("discountedPrice", JSON.stringify(discountedPrice));
    localStorage.setItem("couponCode", couponCode);
  }, [originalPrice, discountedPrice, couponCode]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item,
        );
      } else {
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  };

  const increment = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const decrement = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, count: Math.max(item.count - 1, 1) }
            : item,
        )
        .filter((item) => item.count > 0),
    );
  };


  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addCancellation = (cancellation) => {
    setCancellations((prevCancellations) => [...prevCancellations, cancellation]);
    localStorage.setItem('cancellations', JSON.stringify(cancellations));
  };

  const addReturn = (returnItem) => {
    setReturns((prevReturns) => [...prevReturns, returnItem]);
    localStorage.setItem('returns', JSON.stringify(returns));
  };

  const getTotalItems = () => {
    return cart.reduce((total, product) => total + product.count, 0);
  };
  const updateCartCount = () => {
    const totalItems = cart.reduce((total, product) => total + product.count, 0);
    return totalItems;
  };
  

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.count, 0);
  };

  const calculateDiscountedPrice = () => {
    if (couponCode && originalPrice > 0) {
      const discountPercentage = discountCodes[couponCode];
      const discount = originalPrice * discountPercentage;
      return originalPrice - discount;
    }
    return originalPrice;
  };

  const applyCoupon = () => {
    if (temporaryCouponCode && discountCodes[temporaryCouponCode]) {
      const discount = discountCodes[temporaryCouponCode];
      const newDiscountedPrice = originalPrice - originalPrice * discount;
      setMessage(
        `Code applied successfully! Discount has been applied: ${discount * 100}%,`
      );
      setTemporaryDiscountedPrice(newDiscountedPrice);
      setDiscountedPrice(newDiscountedPrice); 
    } else {
      setMessage("The entered code is incorrect or empty.");
      setTemporaryDiscountedPrice(originalPrice);
      setDiscountedPrice(null);
    }

    setCouponCode(temporaryCouponCode);
    setTemporaryCouponCode("");
  };

  const shipping = () => {
    if (subtotal < 1000.00) {
      return 50;
      } 
      if  (subtotal === 1000.00) {
        return 30;
        } 
        if  (subtotal > 1000.00) {
          return "Free";
        }
      };

  const updateCart = () => {
    const newSubtotal = calculateSubtotal();
    setSubtotal(newSubtotal);

    const finalDiscountedPrice = calculateDiscountedPrice();
    setDiscountedPrice(finalDiscountedPrice);

    const total = finalDiscountedPrice;
  setTotal(total);
  };

  const couponChangeHandler = (event) => {
    setTemporaryCouponCode(event.target.value);
  };

  const clearCoupon = () => {
    setCouponCode("");
    setDiscountedPrice(null);
    setMessage("");
  };

  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        subtotal,
        total,
        discountCodes,
        increment,
        decrement,
        removeFromCart,
        getTotalItems,
        updateCartCount,
        calculateSubtotal,
        calculateDiscountedPrice,
        temporaryCouponCode,
        originalPrice,
        discountedPrice,
        couponCode,
        setCouponCode,
        message,
        applyCoupon,
        couponChangeHandler,
        clearCoupon,
        updateCart,  
        shipping, 
        cancellations,
        returns,
        addCancellation,
        addReturn,
        showCancellations,
        setShowCancellations,   
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};   