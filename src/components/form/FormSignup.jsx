import React, { useState } from "react";
import authServices from "../../services/AuthServices";
import Button from "../utils/Button";
import Input from "../utils/Input";

function FormSignup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email, username, password, phoneNumber, address };

    authServices
      .signup(newUser)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-gray-50 p-4 gap-4 h-screen justify-center"
    >
      <h1 className="text-center font-bold text-3xl">Create an account</h1>
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
      <Input state={phoneNumber} setState={setPhoneNumber}>
        Phone number*
      </Input>
      <Input state={address} setState={setAddress}>
        Postal address*
      </Input>
      <div className="border-b border-gray-300 h-0 my-4" />
      <Button>Register</Button>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </form>
  );
}

export default FormSignup;
