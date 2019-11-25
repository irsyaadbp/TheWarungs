import axios from "axios";

export const getCategory = (token, params) => {
  return {
    type: "GET_CATEGORY",
    payload: axios.get(`${process.env.REACT_APP_BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    })
  };
};

export const createNewCategory = (token, input) => {
  return {
    type: "NEW_CATEGORY",
    payload: axios.post(`${process.env.REACT_APP_BASE_URL}/category`, input, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const editCategory = (token, input) => {
    return {
      type: "EDIT_CATEGORY",
      payload: axios.put(`${process.env.REACT_APP_BASE_URL}/category/${input.id}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    };
  };

export const deleteCategory = (token, id) => {
    return {
      type: "DELETE_CATEGORY",
      payload: axios.delete(`${process.env.REACT_APP_BASE_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    };
  };