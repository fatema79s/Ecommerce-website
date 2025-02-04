import axios from "axios"; 

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data; 
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; 
  }
};

export default fetchProducts;
