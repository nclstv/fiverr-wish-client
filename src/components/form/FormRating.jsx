import { Rating } from "@mui/material";
import React, { useState } from "react";
import servicesServices from "../../services/ServicesServices";
import Button from "../utils/Button";
import Textarea from "../utils/Textarea";

function FormRating({ serviceId, getService }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState(null);

  const handleOnClick = () => {
    const newRating = { comment, rating };
    setErrors(null);
    servicesServices
      .createRating(serviceId, newRating)
      .then((result) => {
        getService();
        setComment("");
        setRating(0);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.message) {
          setErrors(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <div className="w-full">
        <Textarea value={comment} setValue={setComment}>
          Comment
        </Textarea>
        {errors && <p className="mt-2 text-red-500">{errors}</p>}
      </div>
      <div className="py-4 flex justify-between items-center">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        />
        <div>
          <Button handleOnClick={handleOnClick}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default FormRating;
