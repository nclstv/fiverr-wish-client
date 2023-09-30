import React from "react";

function Input({ children, state, setState, secure }) {
  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  return (
    <label className="text-md font-normal">
      {children}
      <input
        type={secure && "password"}
        value={state}
        onChange={handleOnChange}
      />
    </label>
  );
}

export default Input;
