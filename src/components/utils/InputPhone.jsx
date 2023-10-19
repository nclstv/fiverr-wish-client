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
      inputProps={{
        name: "phoneNumber",
        required: true,
        className:
          "pl-12 py-4 text-base border focus:outline-none focus:border-green-500 rounded-lg",
      }}
    />
  );
}

export default InputPhone;
