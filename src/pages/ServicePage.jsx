import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/utils/Button";
import servicesServices from "../services/ServicesServices";

function ServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    servicesServices
      .getService(id)
      .then((result) => {
        setService(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
          <div className="blur-md text-xl text-center select-none">
            <p>
              Email: <span className="font-bold">email@email.com</span>
            </p>
            <p>
              Mobile: <span className="font-bold">00 00 00 00 00</span>
            </p>
          </div>
          <div>
            <Button>Ask for contact informations</Button>
          </div>
        </div>
        <h3 className="text-2xl font-semibold mt-4">Reviews</h3>
      </div>
    );
  }
}

export default ServicePage;
