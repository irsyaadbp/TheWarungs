import axios from "axios";

export const getProduct = (token, params) => {
  return {
    type: "GET_PRODUCT",
    payload: axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    })
  };
};

export const createNewProduct = (token, input) => {
  return {
    type: "NEW_PRODUCT",
    payload: axios.post(`${process.env.REACT_APP_BASE_URL}/product`, input, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const editProduct = (token, input) => {
    console.log(token, input, "action edit")
    return {
      type: "EDIT_PRODUCT",
      payload: axios.put(`${process.env.REACT_APP_BASE_URL}/product/${input.id}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    };
  };

export const deleteProduct = (token, id) => {
    return {
      type: "DELETE_PRODUCT",
      payload: axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    };
  };