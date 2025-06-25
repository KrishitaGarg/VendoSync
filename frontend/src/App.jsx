import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import JoinMarketplace from "./pages/JoinMarketplace";
import Signin from "./pages/Signin";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/join-marketplace" element={<JoinMarketplace />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}
