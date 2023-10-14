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
    <div className="w-full max-w-7xl mx-auto py-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {services &&
          services.map(({ _id, title, owner, estimatePricePerDay, image }) => {
            return (
              <div
                key={_id}
                className="rounded-lg p-4 border cursor-pointer bg-gray-50"
                onClick={() => handleOnClick(_id)}
              >
                <div
                  style={{ backgroundImage: `url(${image})` }}
                  className="h-40 w-full rounded-lg bg-center bg-cover"
                ></div>
                <div className="flex flex-row items-center gap-2 py-4">
                  <div
                    style={{ backgroundImage: `url(${owner.profilePicture})` }}
                    className="h-10 w-10 rounded-full bg-center bg-cover"
                  ></div>
                  <div>
                    <h1 className="text-lg font-semibold leading-none">
                      {title}
                    </h1>
                    <p className="text-base leading-none mt-1">
                      {owner.username}
                    </p>
                  </div>
                </div>
                {/* <p className="text-sm text-gray-500">28km away - Paris</p> */}
                <p className="text-2xl font-bold text-green-500 leading-none">
                  {estimatePricePerDay}$ / DAY
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
