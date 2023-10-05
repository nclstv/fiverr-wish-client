import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import FormSignup from "../components/form/FormSignup";
import { AuthContext } from "../context/AuthContext";

function SignupPage() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="flex flex-col w-full justify-center items-center p-8">
      <FormSignup />
    </div>
  );
}

export default SignupPage;
