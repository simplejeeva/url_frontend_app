import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Background from "./Background";
import ChangePassword from "./components/ChangePassword";
import ForgetPassword from "./components/ForgetPassword";
import Login from "./components/Login";
import Register from "./components/Register";
import Verification from "./components/Verification";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <UserProvider>
        <Background />
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
