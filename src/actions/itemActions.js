import axios from "axios";

export const getAllItems = () => (dispatch, getState) => {
  axios
    .get("http://localhost:5000/items/getAllItems")
    .then((res) =>
      dispatch({
        type: "GET_ITEMS_SUCCESS",
        payload: res.data,
      })
    )
    .catch((e) => {
      dispatch({
        type: "GET_ITEMS_FAIL",
        payload: e.response.data.msg,
      });
    });
};
export const addItem = (item) => (dispatch) => {
  dispatch({
    type: "ADD_ITEM",
    payload: item,
  });
};
export const saveItemForDetail = (item) => (dispatch) => {
  dispatch({
    type: "SAVE_ITEM_FOR_DETAIL",
    payload: item,
  });
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch({
    type: "DELETE_ITEM",
    payload: itemId,
  });
};

export const changeCartItemCount = (cartItems) => (dispatch) => {
  dispatch({
    type: "CHANGE_CART_ITEM_COUNT",
    payload: cartItems,
  });
};
export const saveTotal = (total) => (dispatch) => {
  dispatch({
    type: "SAVE_TOTAL",
    payload: total,
  });
};
