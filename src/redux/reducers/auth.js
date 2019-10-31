const initialState = {
  registerResponse: {},
  loginResponse: {},
  isLoading: false,
  isRejected: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
      case "USER_REGISTER_PENDING":
          return{
              ...state,
              isLoading: true,
              isRejected: false
          };
    case "USER_REGISTER_REJECTED":
        return{
            ...state,
            isLoading:false,
            isRejected: true
        };
    case "USER_REGISTER_FULFILLED":
        return {
            ...state,
            isLoading: false,
            isRejected: false,
            registerResponse: action.payload.data
        };
    default:
        return state;
  }
};

export default auth;
