// src/hooks/useExpenses.js

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpensesAction } from "../../Redux/Expenses/expense.action";

const useExpenses = (jwt) => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (jwt) {
      dispatch(getExpensesAction(jwt));
    }
  }, [dispatch, jwt]);

  // Group expenses by date
  // const groupedExpensesData = useMemo(() => {
  //   return expenses.reduce((result, expense) => {
  //     const date = expense.date;
  //     if (!result[date]) {
  //       result[date] = [];
  //     }
  //     result[date].push(...expense.expenses);
  //     return result;
  //   }, {});
  // }, [expenses]);

  // const dataForTable = useMemo(() => {
  //   return Object.keys(groupedExpensesData).map((date) => ({
  //     expenseName: `${new Date(date).toLocaleDateString()}`,
  //     totalAmount: groupedExpensesData[date].reduce(
  //       (sum, expense) => sum + expense.amount,
  //       0
  //     ),
  //   }));
  // }, [groupedExpensesData]);

  return { loading, error };
};

export default useExpenses;
