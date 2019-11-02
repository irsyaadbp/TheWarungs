const initialState = {
  registerResponse: {},
  loginResponse: {},
  token: null,
  isLoading: false,
  isRejected: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "USER_REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "USER_REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        registerResponse: action.payload.data
      };
    case "USER_LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        registerResponse: {}
      };
    case "USER_LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        registerResponse: {}
      };
    case "USER_LOGIN_FULFILLED":
      const response = action.payload.data;
      localStorage.setItem("user", JSON.stringify(response.result));
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        loginResponse: response,
        registerResponse: {}
      };
    case "USER_TOKEN":
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        token: !localStorage.getItem("user")
          ? null
          : JSON.parse(localStorage.getItem("user")).token
      };
    case "USER_LOGOUT":
        return {
            ...state,
            isLoading: false,
            isRejected: false,
            token: null
        }
    default:
      return state;
  }
};

export default auth;
