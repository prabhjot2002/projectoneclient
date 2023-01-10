const initialState = {
  foodItems: [],
  coverItems: [],
  carItems: [],
  itemForDetail: {},
  cartItems: [],
  total: 0,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCESS":
      return {
        ...state,
        foodItems: action.payload.food,
        coverItems: action.payload.covers,
      };
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "CHANGE_CART_ITEM_COUNT":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SAVE_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    case "SAVE_ITEM_FOR_DETAIL":
      return {
        ...state,
        itemForDetail: action.payload,
      };

    default:
      return state;
  }
};

export default itemReducer;
