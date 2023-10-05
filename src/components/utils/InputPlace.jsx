import { useEffect, useRef } from "react";
import "../../assets/styles/placeAutocomplete.css";

function InputPlace({ value, setValue }) {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "fr" },
    fields: ["address_components", "name"],
    types: ["address"],
  };

  const handlePlaceChanged = () => {
    setValue(inputRef.current.value);
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", handlePlaceChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="input-group">
      <input
        placeholder=" "
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="label">Address*</label>
    </div>
  );
}
export default InputPlace;
