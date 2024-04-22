import axios from "axios";

const Auth_Base_Url = `${import.meta.env.VITE_BASE_URL}/auth`;

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/signup`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const verifyUser = async ({ data, email }) => {
  try {
    const response = await axios.post(
      `${Auth_Base_Url}/verifyOTP?email=${email}`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const userLogin = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const ResetUserForm = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/request`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const UserResetPass = async ({ data, email }) => {
  try {
    const response = await axios.post(
      `${Auth_Base_Url}/reset?email=${email}`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
