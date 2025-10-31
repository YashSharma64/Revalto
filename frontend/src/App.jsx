import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginpage.jsx"; 
import Homepage from "./pages/homepage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
