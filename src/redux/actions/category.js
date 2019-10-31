import axios from "axios";

export const getCategory = (params) => {
    return {
        type: "GET_CATEGORY",
        payload: axios.get(`${process.env.REACT_APP_BASE_URL}/category`, params)
    }
}