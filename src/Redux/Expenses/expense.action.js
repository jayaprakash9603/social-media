import { api } from "../../config/api";
import {
  GET_ALL_EXPENSES_FAILURE,
  GET_ALL_EXPENSES_REQUEST,
  GET_ALL_EXPENSES_SUCCESS,
} from "./expense.actionType";

export const getExpensesAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_EXPENSES_REQUEST });

  try {
    const { data } = await api.get(`/api/expenses/day-wise`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_ALL_EXPENSES_SUCCESS, payload: data });
    console.log("get users post ", data);
  } catch (error) {
    console.log("error users post ", error);
    dispatch({ type: GET_ALL_EXPENSES_FAILURE, payload: error });
  }
};
