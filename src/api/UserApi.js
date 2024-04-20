import axios from "axios";

const Auth_Base_Url = `${import.meta.env.VITE_BASE_URL}/user`;

export const getUser = async (authToken) => {
  const token = JSON.parse(authToken);

  try {
    const response = await axios.get(`${Auth_Base_Url}`, {
      headers: { "X-Auth-Token": token },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
