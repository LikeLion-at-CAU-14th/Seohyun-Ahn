import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/signup" element={<Signup />} />;

        <Route
        path="/mypage"
        element={
          <PrivateRoute>
            <Mypage />
          </PrivateRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;