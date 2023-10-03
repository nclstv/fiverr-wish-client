import React from "react";

function Input({ children, state, setState, secure }) {
  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="input-group">
      <input
        placeholder=" "
        type={secure && "password"}
        value={state}
        onChange={handleOnChange}
      />
      <label className="label">{children}</label>
    </div>
  );
}

export default Input;
