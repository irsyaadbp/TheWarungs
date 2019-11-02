import axios from "axios";

export const getRecentOrder = (token, params) => {
    return {
        type: "GET_RECENT_ORDER",
        payload: axios.get(`${process.env.REACT_APP_BASE_URL}/order`, {
            headers: {
              "Authorization": `Bearer ${token}`
            },
            params
          })
    }
}