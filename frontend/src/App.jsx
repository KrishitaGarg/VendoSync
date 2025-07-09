import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import JoinMarketplace from "./pages/JoinMarketplace";
import Signin from "./pages/Signin";
import AddItem from "./pages/Inventory/AddItem";
import InventoryManagement from "./pages/InventoryManagement";
import EditItem from "./pages/Inventory/EditItem";
import ItemList from "./pages/Inventory/ItemList";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/join-marketplace" element={<JoinMarketplace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
        <Route path="/item-list" element={<ItemList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
