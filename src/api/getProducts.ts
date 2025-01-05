import axios from "axios";

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
