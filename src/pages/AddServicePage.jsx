import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";
import Input from "../components/utils/Input";
import Spinner from "../components/utils/Spinner";
import Textarea from "../components/utils/Textarea";
import servicesServices from "../services/ServicesServices";

function AddServicePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [estimatePricePerDay, setEstimatePricePerDay] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newServices = { title, image, estimatePricePerDay, description };

    setIsLoading(true);

    servicesServices
      .create(newServices)
      .then((result) => {
        navigate(`/services/${result.data._id}`);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
        setIsLoading(false);
      });
  };

  const handleFileUpload = (e) => {
    setIsImageLoading(true);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    servicesServices
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.data.fileUrl);
        setIsImageLoading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
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
        <div className="bg-white">
          <label
            htmlFor="file"
            className="cursor-pointer relative w-full border top-0  left-0 block w- bg-transparent border-gray-300 rounded-md p-4 text-base font-normal focus:outline-none focus:border-green-500"
          >
            {isImageLoading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : image ? (
              <div
                className="bg-cover bg-center w-full h-40 rounded-md overflow-hidden"
                style={{ backgroundImage: `url(${image})` }}
              >
                <span class="material-symbols-outlined text-white w-full h-full bg-black bg-opacity-30 justify-center items-center flex text-3xl">
                  edit
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span class="material-symbols-outlined">photo_library</span>
                Image
              </div>
            )}
          </label>
        </div>
        <input
          className="hidden"
          type="file"
          id="file"
          onChange={(e) => handleFileUpload(e)}
        ></input>

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
              return (
                <p key={error} className="text-sm text-red-500 p-0 m-0">
                  {error}
                </p>
              );
            })}
        </div>
      </form>
    </div>
  );
}

export default AddServicePage;
