import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/AuthServices";
import Button from "../utils/Button";
import Input from "../utils/Input";
import InputPlace from "../utils/InputPlace";

function FormSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = { email, username, password, phoneNumber, address };

    authServices
      .signup(newUser)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col bg-gray-50 border-gray-200 border p-8 gap-4 justify-center w-full max-w-md rounded-xl ${
        errorMessage && "border-red-400"
      }`}
    >
      <h1 className="text-center font-medium text-xl text-gray-700">
        Welcome, create your account.
      </h1>
      <div className="border-b border-gray-300 h-0 my-4" />
      <Input state={email} setState={setEmail}>
        Email address*
      </Input>
      <Input state={username} setState={setUsername}>
        Username*
      </Input>
      <Input state={password} setState={setPassword} secure={true}>
        Password*
      </Input>
      <InputPlace value={address} setValue={setAddress} />
      <Input state={phoneNumber} setState={setPhoneNumber}>
        Phone number*
      </Input>
      <div className="border-b border-gray-300 h-0 my-4" />
      <Button isLoading={isLoading}>Register</Button>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center font-semibold">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

export default FormSignup;
