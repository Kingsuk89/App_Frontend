import axios from "axios";

const Auth_Base_Url = `${import.meta.env.VITE_BASE_URL}/in_query`;

export const PostQuery = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
