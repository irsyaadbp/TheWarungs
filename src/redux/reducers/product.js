const initialState = {
  productList: [],
  infoPage: {},
  isLoading: false,
  isRejected: false,
  message: ""
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        productList:
          action.payload.data.status === 200
            ? action.payload.data.result.data
            : [],
        infoPage: action.payload.data.status === 200 ? action.payload.data.result.infoPage : {}
      };
    // ------------ NEW ------------
    case "NEW_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "NEW_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "NEW_PRODUCT_FULFILLED":
      if (action.payload.data.status === 200) {
        const newData = action.payload.data.result[0];
        state.productList.push(newData);
      }
      return {
        ...state,
        isLoading: false,
        productList: state.productList,
        message: action.payload.data
      };
    //// ------------ EDIT ------------
    case "EDIT_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "EDIT_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "EDIT_PRODUCT_FULFILLED":
      let afterEdit = state.productList;
      if (action.payload.data.status === 200) {
        afterEdit = state.productList.map(product => {
          if (product.id === Number(action.payload.data.result[0].id))
            return action.payload.data.result[0];
          return product;
        });
      }
      return {
        ...state,
        isLoading: false,
        productList: afterEdit,
        message: action.payload.data
      };
    // ------------ DELETE ------------
    case "DELETE_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "DELETE_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "DELETE_PRODUCT_FULFILLED":
      let id = "";
      let afterDelete = state.productList;
      if (action.payload.data.status === 200) {
        id = action.payload.data.result.id;
        afterDelete = state.productList.filter(item => item.id !== Number(id));
      }
      return {
        ...state,
        isLoading: false,
        productList: afterDelete,
        message: action.payload.data
      };
    default:
      return state;
  }
};

export default product;
