import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import authServices from "../../services/AuthServices";
import Button from "../utils/Button";
import Input from "../utils/Input";

function FormLogin({ show }) {
  // Retrieve values from AuthContext
  const { authenticateUser, storeToken, isLoggedIn, setIsLoginFormShow } =
    useContext(AuthContext);

  const formRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setIsLoginFormShow(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    setIsLoading(true);

    authServices
      .login(user)
      .then((result) => {
        setIsLoading(false);
        storeToken(result.data.authToken);
        authenticateUser(user);
        setIsLoginFormShow(false);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
  };

  if (show && !isLoggedIn) {
    return (
      <div
        onClick={handleOutsideClick}
        className="absolute bg-black bg-opacity-50 w-full h-screen top-0 left-0 flex justify-center items-center z-50"
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`relative flex flex-col bg-gray-50 border-gray-200 border p-8 gap-4 justify-center w-full max-w-md rounded-xl`}
        >
          <h1 className="text-center font-medium text-xl text-gray-700">
            Sign in to your account
          </h1>
          <span
            onClick={() => setIsLoginFormShow(false)}
            className="material-symbols-outlined text-3xl absolute top-6 right-6 cursor-pointer"
          >
            close
          </span>
          <div className="border-b border-gray-300 h-0 my-4" />
          <Input state={email} setState={setEmail}>
            Email address*
          </Input>
          <Input state={password} setState={setPassword} type="password">
            Password*
          </Input>
          <div className="border-b border-gray-300 h-0 my-4" />
          <Button isLoading={isLoading}>Sign in</Button>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default FormLogin;
