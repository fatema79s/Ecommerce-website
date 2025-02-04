import { useContext, useState, useEffect } from "react";
import Category from "../components/Category";
import Featured from "../components/Featured";
import LowerPage from "../components/LowerPage";
import OurProducts from "../components/OurProducts";
import ThisMonth from "../components/ThisMonth";
import Todays from "../components/Todays";
import UpperPage from "../components/UpperPage";
import YourMusic from "../components/YourMusic";
import fetchProducts from "../hooks/useFetchProduct";
import { SearchContext } from "../contexts/SearchContext";


const Home = () => {
  const { searchTerm } = useContext(SearchContext);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        if (!products || !Array.isArray(products)) {
          throw new Error("Fetched data is not an array");
        }
        setGroupA(products.filter((product) => product.group === "groupA"));
        setGroupB(products.filter((product) => product.group === "groupB"));
        setGroupC(products.filter((product) => product.group === "groupC"));
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []); 
  
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="min-h-[5300px]">
      <UpperPage searchTerm={searchTerm} />
      <Todays groupName="Group A" products={groupA} searchTerm={searchTerm} />
      <Category />
      <ThisMonth
        groupName="Group B"
        products={groupB}
        searchTerm={searchTerm}
      />
      <YourMusic />
      <OurProducts
        groupName="Group C"
        products={groupC}
        searchTerm={searchTerm}
      />
      <Featured />
      <LowerPage />
    </div>
  );
};

export default Home;
