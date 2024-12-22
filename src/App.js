import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import Parent from "./pages/DetailedExpensesTable/Parent";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [jwt, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route path="/details" element={<Parent />} />
      </Routes>
    </div>
  );
}

export default App;
