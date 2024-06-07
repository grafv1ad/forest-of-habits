import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "pages/Account";
import Agreement from "pages/Agreement";
import Attribution from "pages/Attribution";
import Authors from "pages/Authors";
import Components from "pages/Components";
import Forest from "pages/Forest";
import Index from "pages/Index";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Registration from "pages/Registration";
import Sitemap from "pages/Sitemap";
import Tree from "pages/Tree";
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

        <Route path="/forests" element={<Woods />} />
        <Route path="/forest/:forestid" element={<Forest />} />
        <Route path="/forest/shared/:forestid" element={<Forest />} />
        <Route path="/forest/:forestid/tree/:treeid" element={<Tree />} />

        <Route path="/authors" element={<Authors />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/Attribution" element={<Attribution />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/components" element={<Components />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3500}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
