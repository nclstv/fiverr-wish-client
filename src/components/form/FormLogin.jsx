import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import authServices from "../../services/AuthServices";
import Button from "../utils/Button";
import Input from "../utils/Input";

function FormLogin({ show }) {
  const { authenticateUser, storeToken, isLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  if (show && !isLoggedIn) {
    return (
      <div className="absolute bg-black bg-opacity-50 w-full h-screen top-0 left-0 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col bg-gray-50 border-gray-200 border p-8 gap-4 justify-center w-full max-w-md rounded-xl`}
        >
          <h1 className="text-center font-medium text-xl text-gray-700">
            Welcome back.
          </h1>
          <div className="border-b border-gray-300 h-0 my-4" />
          <Input state={email} setState={setEmail}>
            Email address*
          </Input>
          <Input state={password} setState={setPassword} secure={true}>
            Password*
          </Input>
          <div className="border-b border-gray-300 h-0 my-4" />
          <Button isLoading={isLoading}>Sign in</Button>
          {<p className="text-red-500 text-sm text-center font-semibold"></p>}
        </form>
      </div>
    );
  }
}

export default FormLogin;
