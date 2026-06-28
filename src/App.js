import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import RequestList from "./pages/RequestList";
import Approval from "./pages/Approval";
import DeveloperAssignment from "./pages/DeveloperAssignment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-form" element={<RequestForm />} />
        <Route path="/request-list" element={<RequestList />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/developer-assignment" element={<DeveloperAssignment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;