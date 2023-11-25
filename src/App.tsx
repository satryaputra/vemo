import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import DashboardPage from "./pages/DashboardPage";
import ListVehiclesPage from "./pages/ListVehiclesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vehicles" element={<ListVehiclesPage />} />
      </Route>
    </Routes>
  );
}
