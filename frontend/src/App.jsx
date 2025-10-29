

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginpage.jsx"; // ✅ relative path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
