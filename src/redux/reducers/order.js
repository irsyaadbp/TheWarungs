const initialState = {
  recentOrderList: {},
  detailOrder: [],
  productList: [],
  isLoading: false,
  isRejected: false,
  total_price: 0
};

const order = (state = initialState, action) => {
  switch (action.type) {
    // ------------ GET RECENT ORDER -----------------
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
      };
    /* ----------------- ORDER TRANSACTION -----------------*/
    // ------------ GET RECENT ORDER -----------------
    case "GET_PRODUCT_IN_ORDER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "GET_PRODUCT_IN_ORDER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_PRODUCT_IN_ORDER_FULFILLED":
      const productList =
        action.payload.data.status === 200
          ? action.payload.data.result.data.map(item => ({
              ...item,
              isSelected: state.detailOrder.some(row => row.prod_id === item.id)
            }))
          : [];
      return {
        ...state,
        isLoading: false,
        productList: productList
      };
    // -------------- ADD ITEM IN ORDER ---------------------
    case "ADD_ITEM_IN_ORDER":
      state.detailOrder.push({
        prod_id: action.product.id,
        product_name: action.product.product_name,
        sub_total: action.product.price,
        quantity: 1,
        oldPrice: action.product.price,
        oldQuantity: action.product.quantity
      });
      const afterEditAdd = state.productList.map(item => {
        if (item.id === Number(action.product.id))
          return { ...action.product, isSelected: true };
        return item;
      });

      return {
        ...state,
        detailOrder: state.detailOrder,
        productList: afterEditAdd,
        total_price: state.total_price + action.product.price
      };
    case "REMOVE_ITEM_IN_ORDER":
      const removeProduct = state.detailOrder.find(
        item =>
          Number(item.prod_id) ===
          Number(action.product.id || action.product.prod_id)
      );
      const afterRemove = state.detailOrder.filter(
        item =>
          Number(item.prod_id) !==
          Number(action.product.id || action.product.prod_id)
      );
      const afterEditRemove = state.productList.map(item => {
        if (Number(item.id) === Number(action.product.id))
          return { ...item, isSelected: false };
        return item;
      });

      return {
        ...state,
        detailOrder: afterRemove,
        productList: afterEditRemove,
        total_price: state.total_price - removeProduct.sub_total
      };

    case "QUANTITY_CHANGE_IN_ORDER":
      const changeQuantity = state.detailOrder.map(item => {
        if (Number(item.prod_id) === Number(action.product.id))
          return {
            ...item,
            quantity: action.product.quantity,
            sub_total: item.oldPrice * action.product.quantity
          };
        return item;
      });

      const totalPrice = changeQuantity.reduce(
        (prev, next) => prev + next.sub_total,
        0
      );

      return {
        ...state,
        detailOrder: changeQuantity,
        total_price: totalPrice
      };
    case "CHECKOUT_IN_ORDER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false
      };
    case "CHECKOUT_IN_ORDER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "CHECKOUT_IN_ORDER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        detailOrder: [],
        productList: state.productList.map(item => ({...item, isSelected: false})),
        total_price: 0,
        statusInput: action.payload.data
      };
    default:
      return state;
  }
};

export default order;
