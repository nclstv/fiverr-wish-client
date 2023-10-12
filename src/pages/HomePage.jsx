import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState(null);
  const { isLoggedIn, setIsLoginFormShow } = useContext(AuthContext);

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

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {services &&
          services.map(({ _id, title, owner, estimatePricePerDay, image }) => {
            return (
              <div
                className="rounded-lg shadow-lg p-4 border cursor-pointer"
                onClick={() => handleOnClick(_id)}
              >
                <div
                  style={{ backgroundImage: `url(${image})` }}
                  className="h-40 w-full rounded-lg bg-center bg-cover mb-4"
                ></div>
                <h1 className="text-xl font-semibold">{title}</h1>
                {/* <p className="text-sm text-gray-500">28km away - Paris</p> */}
                <p className="text-2xl font-bold mt-4 text-green-500">
                  {estimatePricePerDay}$ / DAY
                </p>
                <div className="flex flex-row items-center gap-2 py-2">
                  <div
                    style={{ backgroundImage: `url(${owner.profilePicture})` }}
                    className="h-8 w-8 rounded-full bg-center bg-cover"
                  ></div>
                  <p className="text-base">@{owner.username}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
