import axios from "axios";

const Auth_Base_Url = `${import.meta.env.VITE_BASE_URL}/review`;

export const getReview = async (authToken) => {
  const token = JSON.parse(authToken);
  try {
    const response = await axios.get(`${Auth_Base_Url}`, {
      headers: { "X-Auth-Token": token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
