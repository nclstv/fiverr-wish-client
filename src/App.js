import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import FormLogin from "./components/form/FormLogin";
import { AuthContext } from "./context/AuthContext";
import AddServicePage from "./pages/AddServicePage";
import EmailEditPage from "./pages/EmailEditPage";
import HomePage from "./pages/HomePage";
import PasswordEditPage from "./pages/PasswordEditPage";
import ProfilePage from "./pages/ProfilePage";
import ServicePage from "./pages/ServicePage";
import ServiceRequestsPage from "./pages/ServiceRequestsPage";
import SignupPage from "./pages/SignupPage";
import UsernameEditPage from "./pages/UsernameEditPage";

function App() {
  const { isLoginFormShow } = useContext(AuthContext);
  return (
    <>
      <FormLogin show={isLoginFormShow} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/username-edit" element={<UsernameEditPage />} />
        <Route path="/email-edit" element={<EmailEditPage />} />
        <Route path="/password-edit" element={<PasswordEditPage />} />
        <Route
          path="/services/create"
          element={
            <IsPrivate>
              <AddServicePage />
            </IsPrivate>
          }
        />
        <Route
          path="/services/:serviceId/requests"
          element={
            <IsPrivate>
              <ServiceRequestsPage />
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
