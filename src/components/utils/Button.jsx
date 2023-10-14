import React from "react";
import Spinner from "./Spinner";

function Button({ children, isLoading, handleOnClick }) {
  return (
    <button
      onClick={handleOnClick}
      className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white text-lg font-medium py-3 px-6 rounded-md round "
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

export default Button;
