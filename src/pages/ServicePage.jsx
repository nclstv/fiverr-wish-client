import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/utils/Button";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

function ServicePage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(null);
  const [service, setService] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    servicesServices
      .getService(id)
      .then((result) => {
        setService(result.data);
        setIsOwner(result.data.owner._id === user._id);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = () => {
    servicesServices
      .delete(service._id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (service) {
    return (
      <div className="w-full max-w-7xl mx-auto py-4">
        <div
          style={{ backgroundImage: `url(${service.image})` }}
          className="h-80 w-full rounded-lg bg-center bg-cover"
        ></div>
        <div className="flex flex-row justify-between items-center py-8">
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <h2 className="text-3xl font-bold text-green-500">
            {service.estimatePricePerDay}$ / DAY
          </h2>
        </div>
        {/* Service owner settings */}
        {isOwner && (
          <div className="mb-4 flex gap-2 justify-end w-full">
            <button className="text-base bg-gray-500 px-4 py-2 rounded-md text-white">
              Update
            </button>
            <button
              onClick={handleDelete}
              className="text-base bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        )}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <div className="flex flex-row gap-2 items-center ">
            <div
              style={{
                backgroundImage: `url(${service.owner.profilePicture})`,
              }}
              className="h-8 w-8 rounded-full bg-center bg-cover"
            ></div>
            <p className="text-base">@{service.owner.username}</p>
          </div>
          <p className="mt-2">{service.description}</p>
        </div>
        <h3 className="text-2xl font-semibold mt-4">Contact</h3>
        <div className="mt-4 border rounded-lg p-4 flex flex-col gap-1 items-center">
          <div
            className={`${
              !service.owner.email && "blur-md"
            } text-xl text-center select-none`}
          >
            <p>
              Email:{" "}
              <span className="font-bold">
                {service.owner.email ? service.owner.email : "email@email.com"}
              </span>
            </p>
            <p>
              Mobile:{" "}
              <span className="font-bold">
                {" "}
                {service.owner.phoneNumber
                  ? service.owner.phoneNumber
                  : "00 00 00 00 00"}
              </span>
            </p>
          </div>
          <div>
            {!service.owner.email && (
              <Button>Ask for contact informations</Button>
            )}
          </div>
        </div>
        <h3 className="text-2xl font-semibold mt-4">Reviews</h3>
      </div>
    );
  }
}

export default ServicePage;
