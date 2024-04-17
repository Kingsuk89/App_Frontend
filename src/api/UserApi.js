import axios from "axios";

const Auth_Base_Url = `http://localhost:4000/user`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWZhNjU1ZTMzODYxY2JkNmNjYTY0YyIsImZ1bGxOYW1lIjoiS2luZ3N1ayBiZXJhIiwiaWF0IjoxNzEzMzU1NTAwfQ.iDXraFSc-IowE_Cen45lh9WKTzov4yxuKPEuVZhHHZI`;

export const getUser = async () => {
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
