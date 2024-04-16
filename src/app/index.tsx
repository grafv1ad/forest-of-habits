import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "pages/Account";
import Agreement from "pages/Agreement";
import Components from "pages/Components";
import Index from "pages/Index";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Registration from "pages/Registration";
import Woods from "pages/Woods";
import { useAppDispatch } from "store";
import { getUserInfo } from "store/slices/user";

import "./index.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Index />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/woods" element={<Woods />} />
        <Route path="/components" element={<Components />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
