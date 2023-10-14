import React, { useEffect, useState } from "react";
import axios from "axios";

const Ratings = ({ serviceId }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/services/${serviceId}/ratings`)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [serviceId]);

  return (
    <div>
      <h3>Ratings:</h3>
      {ratings.map((rating, index) => (
        <div key={index}>
          <h4>{rating.user}:</h4>
          <p>{rating.description}</p>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                style={{
                  color: rating.rating >= value ? "gold" : "gray",
                  fontSize: "24px",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p>Rating: {rating.rating} stars</p>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
