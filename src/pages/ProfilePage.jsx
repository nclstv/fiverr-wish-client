import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-3xl ${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    servicesServices
      .servicesMe()
      .then((result) => {
        setServices(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ratings = [
    { id: 1, rating: 5, comment: "Great service!" },
    { id: 2, rating: 4, comment: "Very satisfied." },
  ];

  if (user) {
    return (
      <div className="w-full max-w-7xl mx-auto py-4">
        <div className="flex flex-col md:flex-row items-center space-x-8">
          <div
            style={{ backgroundImage: `url(${user.profilePicture})` }}
            className="h-20 w-20 rounded-full bg-center bg-cover"
          ></div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold">{user.username}</h1>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1 items-start">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-500">{user.email}</p>
            <Link to="/email-edit">
              <p className="bg-green-500 py-1 px-4 text-white rounded-lg">
                Change
              </p>
            </Link>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1 items-start">
            <h2 className="text-xl font-semibold">Username</h2>
            <p className="text-gray-500">@{user.username}</p>
            <Link to="/username-edit">
              <p className="bg-green-500 py-1 px-4 text-white rounded-lg">
                Change
              </p>
            </Link>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1 items-start">
            <h2 className="text-xl font-semibold">Password</h2>
            <p className="text-gray-500">******</p>
            <Link to="/password-edit">
              <p className="bg-green-500 py-1 px-4 text-white rounded-lg">
                Change
              </p>
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold py-8">Services Offered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link to={`/services/${service._id}`}>
              <div className="rounded-lg bg-gray-50 p-4 border flex gap-4 items-start">
                <div
                  className="bg-center bg-cover h-20 aspect-square rounded-md"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                    {service.description}
                  </p>
                  <p className="text-gray-500">
                    {service.estimatePricePerDay}$ / DAY
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Ratings Sent</h2>
          <ul>
            {ratings.map((rating) => (
              <li key={rating.id} className="mt-2">
                <div className="text-gray-500">
                  <RatingStars rating={rating.rating} />
                </div>
                <div className="text-gray-600">{rating.comment}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
