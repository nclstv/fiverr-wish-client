import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import servicesServices from "../../services/ServicesServices";

const Ratings = ({ ratings, getService, serviceId }) => {
  const { user } = useContext(AuthContext);

  const handleDeleteRating = (ratingId) => {
    servicesServices
      .deleteRating(ratingId)
      .then(() => {
        getService(serviceId);
      })
      .catch(() => {});
  };

  return (
    <div>
      {ratings &&
        ratings.map((rating) => (
          <div key={rating._id} className="py-4 border-b">
            <div className="flex items-center gap-2">
              <div
                style={{
                  backgroundImage: `url(${rating.user.profilePicture})`,
                }}
                className="h-8 w-8 rounded-full bg-cover bg-center"
              />
              <h4>{rating.user.username}</h4>
              {rating.user._id === user._id && (
                <button
                  onClick={() => handleDeleteRating(rating._id)}
                  className="text-red-400 ml-auto"
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  style={{
                    color:
                      rating.rating >= value ? "orange" : "rgba(0,0,0,0.2)",
                    fontSize: "24px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p>{rating.comment}</p>
          </div>
        ))}
    </div>
  );
};

export default Ratings;
