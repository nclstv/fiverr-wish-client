import { Rating } from "@mui/material";
import React, { useState } from "react";
import servicesServices from "../../services/ServicesServices";
import Button from "../utils/Button";
import Textarea from "../utils/Textarea";

function FormRating({ serviceId, getService }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleOnClick = () => {
    const newRating = { comment, rating };
    servicesServices
      .createRating(serviceId, newRating)
      .then((result) => {
        console.log(result);
        getService();
        setComment("");
        setRating(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-full">
        <Textarea value={comment} setValue={setComment}>
          Comment
        </Textarea>
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
