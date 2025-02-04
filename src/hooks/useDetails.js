import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "../contexts/DetailsContext";

const useDetails = (product) => {
  const navigate = useNavigate();
  const { details, toggleToDetails, toggleToRelatedProducts } = useContext(DetailsContext);
    useContext(DetailsContext);

  

  const addToDetails = () => {
    toggleToDetails(product);
    navigate("/details");
  };

  const addToRelatedProducts = () => {
    toggleToRelatedProducts(product);
  };

  return { details, addToDetails , addToRelatedProducts };
};

export default useDetails; 
