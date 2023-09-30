import React from "react";

function Button({ children }) {
  return (
    <button className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white text-lg font-medium py-3 rounded-md round ">
      {children}
    </button>
  );
}

export default Button;
