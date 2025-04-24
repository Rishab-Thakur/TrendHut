import axios from "axios";
import { Product } from "../interface/Product";

const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

export default fetchProductsAPI;
