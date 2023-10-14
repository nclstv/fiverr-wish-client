import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import authServices from "../../services/AuthServices";
import servicesServices from "../../services/ServicesServices";
import Button from "../utils/Button";
import Input from "../utils/Input";
import InputPlace from "../utils/InputPlace";
import Spinner from "../utils/Spinner";

function FormSignup() {
  const navigate = useNavigate();

  const { authenticateUser, storeToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      email,
      username,
      password,
      phoneNumber,
      address,
      profilePicture,
    };

    authServices
      .signup(newUser)
      .then((result) => {
        setIsLoading(false);
        storeToken(result.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
  };

  const handleFileUpload = (e) => {
    setIsImageLoading(true);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    servicesServices
      .uploadImage(uploadData)
      .then((response) => {
        setProfilePicture(response.data.fileUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
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
      <div className="flex justify-center">
        <label
          htmlFor="file"
          className="cursor-pointer flex justify-center items-center bg-white relative w-32 h-32 border left-0 top-0 bg-transparent border-gray-300 rounded-full text-base font-normal"
        >
          {isImageLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : profilePicture ? (
            <div
              className="bg-cover bg-center w-full h-32 rounded-full overflow-hidden"
              style={{ backgroundImage: `url(${profilePicture})` }}
            >
              <span class="material-symbols-outlined text-white bg-green-500 text-xl absolute bottom-0 right-0 w-10 h-10 flex justify-center items-center rounded-full border-2 border-gray-50">
                edit
              </span>
            </div>
          ) : (
            <span class="material-symbols-outlined text-4xl">add_reaction</span>
          )}
        </label>
      </div>
      <input
        className="hidden"
        type="file"
        id="file"
        onChange={(e) => handleFileUpload(e)}
      ></input>
      <Input state={username} setState={setUsername}>
        Full name*
      </Input>
      <Input state={email} setState={setEmail}>
        Email address*
      </Input>
      <Input state={password} setState={setPassword} type="password">
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
