import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormRating from "../components/form/FormRating";
import Ratings from "../components/form/Ratings";
import Button from "../components/utils/Button";
import { AuthContext } from "../context/AuthContext";
import servicesServices from "../services/ServicesServices";

function ServicePage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(null);
  const [service, setService] = useState(null);
  const [request, setRequest] = useState(null);
  const [requestsNotification, setRequestsNotification] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getService(id);
    getRequests(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getService = (id) => {
    servicesServices
      .getService(id)
      .then((result) => {
        setService(result.data.service);
        setRequest(result.data.request);
        setIsOwner(result.data.service.owner._id === user._id);
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    servicesServices
      .delete(service._id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {});
  };

  const handleRequest = () => {
    servicesServices
      .request(service._id)
      .then((result) => {
        setRequest(result.data);
      })
      .catch((err) => {});
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
              <Link to={`/services/${id}/update`}>
                <button className="text-base bg-gray-500 px-4 py-2 rounded-md text-white">
                  Update
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="text-base bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Delete
              </button>
            </>
          )}
        </div>
        <h3 className="mt-8 text-sm">
          {new Date(service.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h3>
        <h1 className="text-3xl font-bold mt-2">{service.title}</h1>
        <h2 className="text-xl mt-2 font-medium">
          Estimate ${service.estimatePricePerDay} / Day
        </h2>

        <div className=" mt-12">
          <h2 className="text-xl font-bold text-gray-700">About the service</h2>
          <p className="mt-2 text-gray-500">{service.description}</p>
        </div>

        <div className=" mt-12">
          <h2 className="text-xl font-bold text-gray-700">
            About the provider
          </h2>
          <div className="flex items-center gap-3 my-4">
            <div
              style={{
                backgroundImage: `url(${service.owner.profilePicture})`,
              }}
              className="h-10 w-10 rounded-full bg-center bg-cover"
            />
            <p className="text-lg">{service.owner.username}</p>
          </div>
          <div className="border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-bold">From</p>
              <p>{service.owner.city}</p>
            </div>
            <div>
              <p className="font-bold">Member since</p>
              <p>
                {new Date(service.owner.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="font-bold">Email</p>
              <p className={service.owner.email ? null : "blur-sm select-none"}>
                {service.owner.email ? service.owner.email : "email@email.com"}
              </p>
            </div>
            <div>
              <p className="font-bold">Phone number</p>
              <p
                className={
                  service.owner.phoneNumber ? null : "blur-sm select-none"
                }
              >
                {service.owner.phoneNumber
                  ? "+" + service.owner.phoneNumber
                  : "00 00 00 00 00"}
              </p>
            </div>
          </div>
          {!isOwner && (
            <div className="mt-4 max-w-sm">
              {!request && (
                <Button handleOnClick={handleRequest}>
                  Ask for contact informations
                </Button>
              )}
              {request && request.status === "pending" && (
                <p className="text-orange-500">Request pending</p>
              )}
              {request && request.status === "denied" && (
                <p className="text-red-500">Request denied</p>
              )}
            </div>
          )}
        </div>

        <div className=" mt-12">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Reviews</h2>
          <FormRating serviceId={id} getService={() => getService(id)} />
          <Ratings
            ratings={service.ratings}
            getService={getService}
            serviceId={id}
          />
        </div>
      </div>
    );
  }
}

export default ServicePage;
