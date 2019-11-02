const initialState = {
  categoryList: [],
  infoPage: {},
  isLoading: false,
  isRejected: false,
  message: ""
};

const category = (state = initialState, action) => {
  switch (action.type) {
    // ------------ NEW ------------
    case "GET_CATEGORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "GET_CATEGORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_CATEGORY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        categoryList: action.payload.data.result.data,
        infoPage: action.payload.data.result.infoPage
      };
    // ------------ NEW ------------
    case "NEW_CATEGORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "NEW_CATEGORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "NEW_CATEGORY_FULFILLED":
      if (action.payload.data.status === 200) {
        const newData = action.payload.data.result[0];
        state.categoryList.push(newData);
      }
      return {
        ...state,
        isLoading: false,
        categoryList: state.categoryList,
        message: action.payload.data
      };
    //// ------------ EDIT ------------
    case "EDIT_CATEGORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "EDIT_CATEGORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "EDIT_CATEGORY_FULFILLED":
      console.log(action.payload.data, "edit fulfiled");
      let afterEdit = state.categoryList;
      if (action.payload.data.status === 200) {
        afterEdit = state.categoryList.map(category => {
          if (category.id === Number(action.payload.data.result[0].id))
            return action.payload.data.result[0];
          return category;
        });
      }
      return {
        ...state,
        isLoading: false,
        categoryList: afterEdit,
        message: action.payload.data
      };
    // ------------ DELETE ------------
    case "DELETE_CATEGORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "DELETE_CATEGORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "DELETE_CATEGORY_FULFILLED":
      let id = "";
      let afterDelete = state.categoryList;
      if (action.payload.data.status === 200) {
        id = action.payload.data.result.id;
        afterDelete = state.categoryList.filter(item => item.id !== Number(id));
      }
      return {
        ...state,
        isLoading: false,
        categoryList: afterDelete,
        message: action.payload.data
      };
    default:
      return state;
  }
};

export default category;
