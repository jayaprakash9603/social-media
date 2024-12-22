import {
  GET_ALL_EXPENSES_FAILURE,
  GET_ALL_EXPENSES_REQUEST,
  GET_ALL_EXPENSES_SUCCESS,
} from "./expense.actionType";

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EXPENSES_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_EXPENSES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
