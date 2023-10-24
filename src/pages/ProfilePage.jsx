import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/utils/Input";
import InputPhone from "../components/utils/InputPhone";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [ratings, setRatings] = useState(null);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  useEffect(() => {
    servicesServices
      .servicesMe()
      .then((result) => {
        setServices(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getRequest();
    getRatingsMe();
  }, []);

  const getRequest = () => {
    servicesServices
      .getMyRequest()
      .then((result) => {
        setRequests(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteRequest = (requestId) => {
    servicesServices
      .deleteRequest(requestId)
      .then(() => {
        getRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = () => {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };

  const getRatingsMe = () => {
    servicesServices
      .getRatingMe()
      .then((result) => {
        setRatings(result.data);
      })
      .catch((err) => {});
  };

  const updateProfile = () => {
    const update = { email, username, phoneNumber };
    servicesServices
      .updateProfile(update)
      .then(({ data }) => {
        user.username = data.username;
        user.phoneNumber = data.phoneNumber;
        user.email = data.email;
        setIsEditable(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-3xl ${
            i <= rating ? "text-orange-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (user) {
    return (
      <div className="w-full max-w-7xl mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row items-center space-x-8">
          <div
            style={{ backgroundImage: `url(${user.profilePicture})` }}
            className="h-20 w-20 rounded-full bg-center bg-cover"
          ></div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold">{user.username}</h1>

            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined">location_on</span>
              <h2 className="text-lg">{user.address}</h2>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1">
            {isEditable ? (
              <Input state={email} setState={setEmail}>
                Email
              </Input>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-500">{user.email}</p>
              </>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1">
            {isEditable ? (
              <Input state={username} setState={setUsername}>
                Full name
              </Input>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Full name</h2>
                <p className="text-gray-500">{user.username}</p>
              </>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border flex flex-col gap-1">
            {isEditable ? (
              <InputPhone value={phoneNumber} onChange={setPhoneNumber}>
                Phone number
              </InputPhone>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Phone number</h2>
                <p className="text-gray-500">+{user.phoneNumber}</p>
              </>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Password</h2>
              <p className="text-gray-500">************</p>
            </div>
            {/* <Link to="/password-edit">
              <span className="material-symbols-outlined bg-green-500 h-10 w-10 flex justify-center items-center text-xl rounded-lg text-white cursor-pointer">
                edit
              </span>
            </Link> */}
          </div>
        </div>

        {!isEditable && (
          <button
            onClick={handleEditClick}
            className="my-4 px-8 py-1 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-md"
          >
            Edit profile
          </button>
        )}
        {isEditable && (
          <div>
            <button
              onClick={updateProfile}
              className="my-4 px-8 py-1 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-md"
            >
              Save
            </button>
            <button
              className="my-4 px-8 py-1 bg-red-500 text-white rounded-md ml-2"
              onClick={handleEditClick}
            >
              Cancel
            </button>
          </div>
        )}

        {services.length !== 0 && (
          <h2 className="text-2xl font-semibold py-8">Services Offered</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link to={`/services/${service._id}`} key={service._id}>
              <div className=" flex gap-4 items-start">
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
                  <p className="font-semibold">
                    Estimate ${service.estimatePricePerDay} / Day
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {requests.length !== 0 && (
          <h2 className="text-2xl font-semibold py-8">My requests</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div
              className={`flex gap-4 items-start relative `}
              key={request._id}
            >
              <div
                className="bg-center bg-cover h-20 aspect-square rounded-md"
                style={{ backgroundImage: `url(${request.service.image})` }}
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                  {request.service.title}
                </h2>
                <p className="text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                  @{request.service.owner.username}
                </p>
                <div className="flex flex-row gap-2 items-center">
                  <p
                    className={`text-gray-500 ${
                      request.status === "pending"
                        ? "text-yellow-500"
                        : request.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.status[0].toUpperCase() + request.status.slice(1)}
                  </p>
                  <Link
                    className="text-sm ml-auto"
                    to={`/services/${request.service._id}`}
                  >
                    Show more
                  </Link>
                  <button
                    onClick={() => handleDeleteRequest(request._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ratings && ratings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Ratings Sent</h2>
            <div className="py-4">
              {ratings.map((rating) => {
                return (
                  <Link to={`/services/${rating.service._id}`} key={rating._id}>
                    <div className="border-b py-4">
                      <h1 className="font-bold">{rating.service.title}</h1>
                      <RatingStars rating={rating.rating} />
                      <p>{rating.comment}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePage;
