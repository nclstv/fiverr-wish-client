import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import FormLogin from "./components/form/FormLogin";
import { AuthContext } from "./context/AuthContext";
import AddServicePage from "./pages/AddServicePage";
import HomePage from "./pages/HomePage";
import PasswordEditPage from "./pages/PasswordEditPage";
import ProfilePage from "./pages/ProfilePage";
import ServicePage from "./pages/ServicePage";
import ServiceRequestsPage from "./pages/ServiceRequestsPage";
import SignupPage from "./pages/SignupPage";
import UpdateServicePage from "./pages/UpdateServicePage";

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
        <Route
          path="/password-edit"
          element={
            <IsPrivate>
              <PasswordEditPage />
            </IsPrivate>
          }
        />
        <Route
          path="/services/create"
          element={
            <IsPrivate>
              <AddServicePage headerTitle="Create a service" />
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
        <Route
          path="/services/:serviceId/update"
          element={
            <IsPrivate>
              <UpdateServicePage />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
