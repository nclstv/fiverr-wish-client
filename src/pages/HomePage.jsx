import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step from "../components/layouts/Step";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState(null);
  const [isStepShow, setIsStepShow] = useState(
    localStorage.getItem("hideStep") ? false : true
  );
  const { isLoggedIn, setIsLoginFormShow, user } = useContext(AuthContext);

  useEffect(() => {
    servicesServices
      .getServices()
      .then((result) => {
        setServices(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnClick = (id) => {
    if (isLoggedIn) {
      navigate(`/services/${id}`);
    } else {
      setIsLoginFormShow(true);
    }
  };

  const handleStepClose = () => {
    localStorage.setItem("hideStep", true);
    setIsStepShow(false);
  };

  const handleStepShow = () => {
    localStorage.removeItem("hideStep");
    setIsStepShow(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-14 px-4">
      {/* Centered Welcome Message for All Users */}
      <div className="text-center my-14 rounded-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome {user && user.username} to Prolink!
        </h1>
        <p className="mt-2 text-lg text-gray-500 max-w-4xl">
          Discover a world of opportunities where you can offer and find various
          services in your local community. Whether you're looking for help or
          want to share your skills, you've come to the right place.
        </p>
        {isStepShow && isLoggedIn ? (
          <div className="flex flex-col p-4 gap-4 bg-gray-50 border rounded-lg mb-4 w-full text-left mt-14">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-green-500 font-bold">
                Step to complete
              </h2>
              <span
                className="material-symbols-outlined cursor-pointer"
                onClick={handleStepClose}
              >
                close
              </span>
            </div>
            <Step
              name="Update profile"
              descritpion="Update your profile information to ensure that it reflects the most accurate and current details."
              number={1}
            />
            <Step
              name="Create a service"
              descritpion="Create a new service by providing necessary details and specifications. This step is essential for offering or availing specific services."
              number={2}
            />
            <Step
              name="Request a service"
              descritpion=" This step is crucial for users who are seeking particular services from others within the system."
              number={3}
            />
          </div>
        ) : (
          isLoggedIn && (
            <button className="mt-4" onClick={handleStepShow}>
              Show steps
            </button>
          )
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services &&
          services.map(
            ({ _id, title, owner, estimatePricePerDay, image, ratings }) => {
              const ratingSum = ratings.reduce(
                (acc, rating) => acc + rating.rating,
                0
              );
              const ratingAvg = ratingSum / ratings.length;
              return (
                <div
                  key={_id}
                  className="cursor-pointer"
                  onClick={() => handleOnClick(_id)}
                >
                  <div
                    style={{ backgroundImage: `url(${image})` }}
                    className="aspect-video w-full bg-center bg-cover rounded-lg"
                  ></div>
                  <div className="py-2">
                    <div className="flex flex-row items-center gap-2">
                      <div
                        style={{
                          backgroundImage: `url(${owner.profilePicture})`,
                        }}
                        className="h-7 w-7 rounded-full bg-center bg-cover"
                      />
                      <p className="text-sm font-bold">{owner.username}</p>
                    </div>
                    <h1 className="text-md mt-2 h-[48px] overflow-hidden text-ellipsis line-clamp-2">
                      {title}
                    </h1>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-2xl mt-[-2px]">★</span>
                      <span className="font-bold">
                        {ratingAvg ? ratingAvg.toFixed(2) : 0}
                      </span>
                      <span className="text-gray-500">({ratings.length})</span>
                    </div>
                    <p className="mt-1 font-bold">
                      Estimate ${estimatePricePerDay} / Day
                    </p>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default HomePage;
