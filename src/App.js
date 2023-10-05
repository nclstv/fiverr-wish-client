import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormLogin from "./components/form/FormLogin";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

function App() {
  const { isLoginFormShow } = useContext(AuthContext);
  return (
    <>
      <FormLogin show={isLoginFormShow} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
