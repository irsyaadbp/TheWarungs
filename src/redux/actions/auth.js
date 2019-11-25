import axios from "axios";

export const register = input => {
  return {
    type: "USER_REGISTER",
    payload: axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/register`,
      input
    )
  };
};

export const login = input => {
  return {
    type: "USER_LOGIN",
    payload: axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, input)
  };
};

export const getUserDetail = () => {
  return {
    type: "USER_DETAIL",
  };
};

export const logout = () => {
  return {
    type: "USER_LOGOUT",
    payload: localStorage.removeItem("user")
  };
};
