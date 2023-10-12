import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import FormLogin from "./components/form/FormLogin";
import { AuthContext } from "./context/AuthContext";
import AddServicePage from "./pages/AddServicePage";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
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
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/services/create"
          element={
            <IsPrivate>
              <AddServicePage />
            </IsPrivate>
          }
        />
        <Route
          path="/services/:id"
          element={
            <IsPrivate>
              <ServicePage />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
