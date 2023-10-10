import { useState } from "react";
import Button from "../components/utils/Button";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";
import servicesServices from "../services/ServicesServices";

function AddServicePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [estimatePricePerDay, setEstimatePricePerDay] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newServices = { title, image, estimatePricePerDay, description };

    setIsLoading(true);

    servicesServices
      .create(newServices)
      .then((result) => {
        console.log(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full justify-center flex py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-50 border-gray-200 border p-8 gap-4 justify-center w-full max-w-md rounded-xl"
      >
        <h1 className="text-center font-medium text-xl text-gray-700">
          Create your services.
        </h1>
        <div className="border-b border-gray-300 h-0 my-4" />
        <Input state={title} setState={setTitle}>
          Title
        </Input>
        <Input state={image} setState={setImage}>
          Image URL
        </Input>
        <Input
          type="number"
          state={estimatePricePerDay}
          setState={setEstimatePricePerDay}
        >
          Estimate price per day
        </Input>
        <Textarea value={description} setValue={setDescription}>
          Description
        </Textarea>
        <div className="border-b border-gray-300 h-0 my-4" />
        <Button isLoading={isLoading}>Create a service</Button>
        <div>
          {errors &&
            errors.map((error) => {
              return <p className="text-sm text-red-500 p-0 m-0">{error}</p>;
            })}
        </div>
      </form>
    </div>
  );
}

export default AddServicePage;
