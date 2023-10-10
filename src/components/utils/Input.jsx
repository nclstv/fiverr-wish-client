import React from "react";

function Input({ children, state, setState, type }) {
  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="input-group bg-white">
      <input
        placeholder=" "
        type={type}
        value={state}
        onChange={handleOnChange}
      />
      <label className="label">{children}</label>
    </div>
  );
}

export default Input;
