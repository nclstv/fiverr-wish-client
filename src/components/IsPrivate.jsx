import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./utils/Spinner";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <div className="p-40 w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsPrivate;
