import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function InputPhone({ value, onChange }) {
  return (
    <PhoneInput
      country={"us"}
      value={value}
      onChange={onChange}
      inputStyle={{ width: "100%" }}
      containerStyle={{ marginBottom: "50px" }}
      inputProps={{
        name: "phoneNumber",
        required: true,
        className:
          "relative z-10 block w-full bg-transparent border border-gray-300 rounded-md pl-12 py-4 text-base font-normal focus:outline-none focus:border-green-500",
      }}
      inputClass=""
    />
  );
}

export default InputPhone;
