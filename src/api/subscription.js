import axios from "axios";

const Auth_Base_Url = `${import.meta.env.VITE_BASE_URL}/payment`;

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

export const UpdatePlaneStatus = async ({
  authToken,
  order_id,
  plan_status,
}) => {
  const token = JSON.parse(authToken);
  try {
    const response = await axios.put(
      `${Auth_Base_Url}/status_up`,
      { order_id, plan_status },
      {
        headers: { "X-Auth-Token": token, "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
