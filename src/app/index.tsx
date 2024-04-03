import { Route, Routes } from "react-router-dom";
import Components from "pages/Components";
import Index from "pages/Index";
import Login from "pages/Login";
import Registration from "pages/Registration";
import Woods from "pages/Woods";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/components" element={<Components />} />
      <Route path="/woods" element={<Woods />} />
    </Routes>
  );
}

export default App;
