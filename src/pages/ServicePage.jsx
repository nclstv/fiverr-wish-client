import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/utils/Button";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";
import Ratings from "../components/form/Ratings";

function ServicePage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(null);
  const [service, setService] = useState(null);
  const [request, setRequest] = useState(null);
  const [requestsNotification, setRequestsNotification] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    servicesServices
      .getService(id)
      .then((result) => {
        setService(result.data.service);
        setRequest(result.data.request);
        setIsOwner(result.data.service.owner._id === user._id);
      })
      .catch((err) => {
        console.log(err);
      });
    getRequests(id);
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

  const handleRequest = () => {
    servicesServices
      .request(service._id)
      .then((result) => {
        setRequest(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRequests = (id) => {
    servicesServices
      .getServiceRequests(id)
      .then((result) => {
        const pendingRequests = result.data.filter(
          (request) => request.status === "pending"
        );
        setRequestsNotification(pendingRequests.length);
      })
      .catch((err) => {});
  };

  if (service) {
    return (
      <div className="w-full max-w-7xl mx-auto py-4 px-4">
        <div
          style={{ backgroundImage: `url(${service.image})` }}
          className="h-80 w-full rounded-lg bg-center bg-cover flex gap-2 justify-end items-end p-4"
        >
          {/* Service owner settings */}
          {isOwner && (
            <>
              <Link
                className="relative text-base bg-green-500 px-4 py-2 rounded-md text-white"
                to={`/services/${service._id}/requests`}
              >
                {requestsNotification > 0 && (
                  <p className="font-semibold absolute top-[-10px] left-[-10px] w-6 h-6 bg-red-500 rounded-full flex justify-center items-center">
                    {requestsNotification}
                  </p>
                )}
                Requests
              </Link>
              <button className="text-base bg-gray-500 px-4 py-2 rounded-md text-white">
                Update
              </button>
              <button
                onClick={handleDelete}
                className="text-base bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Delete
              </button>
            </>
          )}
        </div>
        <div className="flex flex-row justify-between items-center py-8">
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <h2 className="text-3xl font-bold text-green-500">
            {service.estimatePricePerDay}$ / DAY
          </h2>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <div className="flex flex-row gap-2 items-center ">
            <div
              style={{
                backgroundImage: `url(${service.owner.profilePicture})`,
              }}
              className="h-8 w-8 rounded-full bg-center bg-cover"
            ></div>
            <p className="text-base font-semibold">{service.owner.username}</p>
          </div>
          <p className="mt-2">{service.description}</p>
        </div>
        <h3 className="text-2xl font-semibold mt-4">Contact</h3>
        <div className="mt-4 border rounded-lg p-4 flex flex-col gap-1 items-center">
          <div
            className={`${
              isOwner
                ? null
                : (!request || request.status !== "accepted") &&
                  "blur-md select-none"
            } text-xl text-center`}
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
          {!isOwner && (
            <div>
              {!request && (
                <Button handleOnClick={handleRequest}>
                  Ask for contact informations
                </Button>
              )}
              {request && request.status === "pending" && (
                <p className="bg-orange-500 py-2 px-4 text-white rounded-lg">
                  Request pending
                </p>
              )}
              {request && request.status === "denied" && (
                <p className="bg-red-500 py-2 px-4 text-white rounded-lg">
                  Request denied
                </p>
              )}
            </div>
          )}
        </div>
        <h3 className="text-2xl font-semibold mt-4">Reviews</h3>
        <Ratings serviceId={id} />
      </div>
    );
  }
}

export default ServicePage;
