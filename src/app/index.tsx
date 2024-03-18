import { Route, Routes } from "react-router-dom";
import PageLayout from "components/PageLayout";
import StyledComponents from "pages/StyledComponents";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout>main content</PageLayout>} />
      <Route
        path="/styled"
        element={
          <PageLayout>
            <StyledComponents />
          </PageLayout>
        }
      />
    </Routes>
  );
}

export default App;
