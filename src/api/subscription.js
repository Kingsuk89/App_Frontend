import axios from "axios";

const Auth_Base_Url = `http://localhost:4000/payment`;

export const getSubscriptionData = async (authToken) => {
  const token = JSON.parse(authToken);
  try {
    const response = await axios.get(`${Auth_Base_Url}/get_all`, {
      headers: { "X-Auth-Token": token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const createOrder = async (authToken) => {
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
