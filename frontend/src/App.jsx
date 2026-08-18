import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Gastos from "./pages/Gastos";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/gastos" element={<Gastos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
