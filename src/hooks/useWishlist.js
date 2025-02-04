import { useContext } from "react";
import { WishlistContext } from "../contexts/wishListContext";

const useWishlist = (product) => {
  const { wishlist, toggleToWishlist, toggleToJustForYou, removeFromWishlist } =
    useContext(WishlistContext);

  const isInWishlist =
    product && Array.isArray(wishlist)
      ? wishlist.some((item) => item.id === product.id)
      : false;

  const addToWishlist = () => {
    toggleToWishlist(product);
  };

  const removeFromWishList = () => {
    removeFromWishlist(product.id);
  };

  const addToJustForYou = () => {
    toggleToJustForYou(product);
  };
  return { wishlist, isInWishlist, addToWishlist, addToJustForYou, removeFromWishList };
};

export default useWishlist;
