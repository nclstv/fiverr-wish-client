import React from "react";
import FormSignup from "../components/form/FormSignup";

function SignupPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center min-h-screen gap-8">
      <h1 className="font-bold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-green-500 to-lime-500 flex">
        Prolink
      </h1>
      <FormSignup />
    </div>
  );
}

export default SignupPage;
