import React from "react";

function Button({ children }) {
  return (
    <button className="w-full bg-green-500 text-white text-lg font-medium py-3 rounded-md round ">
      {children}
    </button>
  );
}

export default Button;
