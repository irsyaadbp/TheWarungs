const initialState = {
  categoryList: [],
  isLoading: false,
  isRejected: false
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "GET_GITHUB_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_CATEGORY_FULFILLED":
        return {
            ...state,
            isLoading: false,
            categoryList: action.payload.data.result
        }
    default:
        return state;
  }
};

export default category;