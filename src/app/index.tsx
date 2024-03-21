import { Route, Routes } from "react-router-dom";
import PageLayout from "components/PageLayout";
import Login from "pages/Login";
import Registration from "pages/Registration";
import StyledComponents from "pages/StyledComponents";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout>index page</PageLayout>} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/styled" element={<StyledComponents />} />
    </Routes>
  );
}

export default App;
