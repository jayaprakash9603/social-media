import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExpensesAction } from "../../Redux/Expenses/expense.action";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import "../HomePage/HomePage.css";

// Helper function to sort data
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const HomePage = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("expenseName");
  const [page, setPage] = useState(0); // Current page of grouped expenses
  const [rowsPerPage] = useState(1); // Only 1 day's expenses per page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const { user, error: authError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
      setLoadingAuth(false);
      console.log(expenses);
    } else {
      dispatch(getProfileAction(jwt)).then(() => {
        dispatch(getExpensesAction(jwt));
        setLoadingAuth(false);
      });
    }
  }, [dispatch, jwt, navigate]);

  useEffect(() => {
    if (authError && !user) {
      navigate("/login");
    }
  }, [authError, user, navigate]);

  // Group expenses by date
  const groupedExpenses = expenses.reduce((result, expense) => {
    const date = expense.date; // Assuming the date is a string in 'yyyy-MM-dd' format
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(...expense.expenses); // Assuming expense.expenses is an array
    return result;
  }, {});

  // Get sorted grouped expenses
  const renderGroupedExpenses = () => {
    return Object.keys(groupedExpenses)
      .sort() // Sort by date (ascending order)
      .map((date) => ({
        date,
        expenses: stableSort(
          groupedExpenses[date],
          getComparator(order, orderBy)
        ),
      }));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0); // Reset to the first page
  };

  if (loadingAuth) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  if (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred.";
    if (errorMessage === "Invalid token" || errorMessage.includes("jwt")) {
      return <p>Error: Invalid token. Please log in again.</p>;
    }
    return <p>Error: {errorMessage}</p>;
  }

  const expensesData = renderGroupedExpenses();

  const totalPages = expensesData.length; // Number of days available

  // Only show expenses for the current page's date
  const currentDayExpenses = expensesData[page]
    ? expensesData[page].expenses
    : [];

  return (
    <div className="page-container">
      <h2>Day Wise Expenses</h2>
      {expensesData.length === 0 ? (
        <p>No expenses available for the selected dates.</p>
      ) : (
        <>
          <h3>{new Date(expensesData[page]?.date).toLocaleDateString()}</h3>
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="expenses table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sortDirection={orderBy === "expenseName" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "expenseName"}
                      direction={orderBy === "expenseName" ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, "expenseName")
                      }
                    >
                      Expense Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Net Amount</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Credit Due</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentDayExpenses.map((expense, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{expense.expenseName}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.type}</TableCell>
                    <TableCell>{expense.paymentMethod}</TableCell>
                    <TableCell>{expense.netAmount}</TableCell>
                    <TableCell>{expense.comments}</TableCell>
                    <TableCell>{expense.creditDue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <div className="fixed-pagination">
        <TablePagination
          rowsPerPageOptions={[1]} // Only one date per page
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
