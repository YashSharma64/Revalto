import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Registerpage.jsx"
import Login from "./pages/Loginpage.jsx"; 
import Homepage from "./pages/Homepage.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import SellPage from "./pages/SellPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/sell" element={<SellPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
