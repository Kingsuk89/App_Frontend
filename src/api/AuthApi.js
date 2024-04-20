import axios from "axios";

const Auth_Base_Url = `http://localhost:4000/auth`;

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/signup`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const userLogin = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const ResetUserForm = async (data) => {
  try {
    const response = await axios.post(`${Auth_Base_Url}/request`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};
