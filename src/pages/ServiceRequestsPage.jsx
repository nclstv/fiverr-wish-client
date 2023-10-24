import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import servicesServices from "../services/ServicesServices";

function ServiceRequestsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getService(serviceId);
    getRequests(serviceId);
  }, [serviceId]);

  const getService = (serviceId) => {
    servicesServices
      .getService(serviceId)
      .then((result) => {
        setService(result.data.service);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRequests = (serviceId) => {
    servicesServices
      .getServiceRequests(serviceId)
      .then((result) => {
        setRequests(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRequest = (requestId, status) => {
    servicesServices
      .updateRequest(requestId, status)
      .then(() => {
        getRequests(serviceId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (service)
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 justify-start">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-xl gap-1 bg-gray-200 px-3 py-2 rounded-full"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
          </button>
          <h1 className="text-3xl font-bold my-8">{service.title}</h1>
        </div>
        <table className=" bg-gray-50 border rounded-lg w-full border-collapse">
          <thead className="text-left bg-gray-100">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => {
                return (
                  <tr key={request._id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-start">
                        <div
                          style={{
                            backgroundImage: `url(${request.requestUser.profilePicture})`,
                          }}
                          className="h-8 w-8 bg-cover bg-center rounded-full"
                        />
                        <p>{request.requestUser.username}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      {request.status === "pending" && (
                        <p className="text-orange-500 flex items-center gap-1">
                          <span className="material-symbols-outlined">
                            hourglass_empty
                          </span>
                          Pending
                        </p>
                      )}
                      {request.status === "accepted" && (
                        <p className="text-green-500 flex items-center gap-1">
                          <span className="material-symbols-outlined">
                            check_circle
                          </span>
                          Accepted
                        </p>
                      )}
                      {request.status === "denied" && (
                        <p className="text-red-500 flex items-center gap-1">
                          <span className="material-symbols-outlined">
                            do_not_disturb_on
                          </span>
                          Deny
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-row gap-2">
                        {request.status !== "accepted" && (
                          <button
                            onClick={() =>
                              updateRequest(request._id, "accepted")
                            }
                            className="bg-green-500 text-white py-1 px-4 rounded-md"
                          >
                            Accept
                          </button>
                        )}
                        {request.status !== "denied" && (
                          <button
                            onClick={() => updateRequest(request._id, "denied")}
                            className="bg-red-500 text-white py-1 px-4 rounded-md"
                          >
                            Deny
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center text-base py-10" colSpan={3}>
                  No request for the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}

export default ServiceRequestsPage;
