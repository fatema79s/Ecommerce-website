import SearchProvider from "./contexts/SearchContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { WishlistProvider } from "./contexts/wishListContext";
import Home from "./Pages/Home";
import ProductList from "./components/ProductList";
import Layout from "./Pages/Layout";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Wishlist from "./Pages/Wishlist";
import Details from "./Pages/Details";
import About from "./Pages/About";
import Error from "./Pages/Error";
import Cart from "./Pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import CheckOut from "./Pages/CheckOut";
import Account from "./Pages/Account";
import Contact from "./Pages/Contact";
import { DetailsProvider } from "./contexts/DetailsContext";
import { UserProvider } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import fetchProducts from "../src/hooks/useFetchProduct";


function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
    });
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <SearchProvider>
      <BrowserRouter>
        <WishlistProvider>
          <CartProvider>
            <DetailsProvider>
              <UserProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="productList" element={<ProductList products={products} searchTerm={searchTerm} />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                    <Route path="about" element={<About />} />
                    <Route path="wishlist" element={<Wishlist products={products} searchTerm={searchTerm} />} />
                    <Route path="details" element={<Details />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="account" element={<Account />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<Error />} />
                  </Route>
                </Routes>
              </UserProvider>
            </DetailsProvider>
          </CartProvider>
        </WishlistProvider>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
