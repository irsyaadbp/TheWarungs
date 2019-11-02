const initialState = {
    recentOrderList: {},
    isLoading: false,
    isRejected: false
  };
  
  const recentOrder = (state = initialState, action) => {
    switch (action.type) {
      case "GET_RECENT_ORDER_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false
        };
      case "GET_RECENT_ORDER_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_RECENT_ORDER_FULFILLED":
          return {
              ...state,
              isLoading: false,
              recentOrderList: action.payload.data
          }
      default:
          return state;
    }
  };
  
  export default recentOrder;